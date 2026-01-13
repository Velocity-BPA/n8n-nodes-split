/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IExecuteFunctions,
  ILoadOptionsFunctions,
  IHookFunctions,
  IWebhookFunctions,
  IHttpRequestMethods,
  IRequestOptions,
  IDataObject,
  JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

import { SPLIT_API_BASE_URL } from '../constants/constants';

type SplitFunctions =
  | IExecuteFunctions
  | ILoadOptionsFunctions
  | IHookFunctions
  | IWebhookFunctions;

/**
 * Make an authenticated request to the Split API
 */
export async function splitApiRequest(
  this: SplitFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body?: IDataObject | IDataObject[],
  query?: IDataObject,
): Promise<IDataObject | IDataObject[]> {
  const credentials = await this.getCredentials('splitApi');

  const options: IRequestOptions = {
    method,
    uri: `${SPLIT_API_BASE_URL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${credentials.adminApiKey}`,
      'Content-Type': 'application/json',
    },
    json: true,
  };

  if (query && Object.keys(query).length > 0) {
    options.qs = query;
  }

  if (body && (Array.isArray(body) || Object.keys(body).length > 0)) {
    options.body = body;
  }

  try {
    const response = await this.helpers.request(options);
    return response as IDataObject | IDataObject[];
  } catch (error: unknown) {
    throw new NodeApiError(this.getNode(), error as JsonObject);
  }
}

/**
 * Make a paginated request to the Split API
 */
export async function splitApiRequestAllItems(
  this: SplitFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body?: IDataObject,
  query?: IDataObject,
  propertyName = 'objects',
): Promise<IDataObject[]> {
  const returnData: IDataObject[] = [];

  let responseData: IDataObject;
  const qs = { ...query, offset: 0, limit: 50 };

  do {
    responseData = (await splitApiRequest.call(this, method, endpoint, body, qs)) as IDataObject;

    const items = responseData[propertyName] as IDataObject[] | undefined;
    if (items && Array.isArray(items)) {
      returnData.push(...items);
    }

    qs.offset = (qs.offset as number) + (qs.limit as number);
  } while (
    responseData[propertyName] &&
    (responseData[propertyName] as IDataObject[]).length === qs.limit
  );

  return returnData;
}

/**
 * Validate required parameters (standalone version for utility use)
 */
export function validateRequiredParams(
  params: Record<string, unknown>,
  required: string[],
): void {
  for (const param of required) {
    if (!params[param] || params[param] === '') {
      throw new Error(`The parameter "${param}" is required but was not provided`);
    }
  }
}

/**
 * Validate required parameters with n8n context
 */
export function validateRequiredParamsWithContext(
  context: IExecuteFunctions,
  params: Record<string, unknown>,
  required: string[],
): void {
  for (const param of required) {
    if (!params[param]) {
      throw new NodeOperationError(
        context.getNode(),
        `The parameter "${param}" is required but was not provided`,
      );
    }
  }
}

/**
 * Build JSON Patch operations array
 */
export function buildPatchOperations(
  op: string,
  path: string,
  value?: unknown,
): IDataObject[] {
  const patchOp: IDataObject = {
    op,
    path,
  };
  if (value !== undefined) {
    patchOp.value = value;
  }
  return [patchOp];
}

/**
 * Build multiple JSON Patch operations
 */
export function buildPatchOperationsArray(
  operations: Array<{ op: string; path: string; value?: unknown }>,
): IDataObject[] {
  return operations.map((operation) => {
    const patchOp: IDataObject = {
      op: operation.op,
      path: operation.path,
    };
    if (operation.value !== undefined) {
      patchOp.value = operation.value;
    }
    return patchOp;
  });
}

/**
 * Parse JSON string safely
 */
export function parseJsonParameter(
  value: string | IDataObject | IDataObject[],
  paramName?: string,
): IDataObject | IDataObject[] {
  if (typeof value === 'object') {
    return value;
  }
  if (!value || value.trim() === '') {
    return {};
  }
  try {
    return JSON.parse(value) as IDataObject | IDataObject[];
  } catch {
    throw new Error(`Invalid JSON${paramName ? ` in parameter "${paramName}"` : ''}: ${value}`);
  }
}

/**
 * Handle error response from Split API
 */
export function handleSplitError(error: unknown): never {
  const err = error as IDataObject;
  if (err.response && typeof err.response === 'object') {
    const response = err.response as IDataObject;
    if (response.body && typeof response.body === 'object') {
      const body = response.body as IDataObject;
      const message = (body.message as string) || 'Unknown error occurred';
      const errorType = (body.type as string) || 'error';
      throw new Error(`Split API Error (${errorType}): ${message}`);
    }
  }
  throw error;
}
