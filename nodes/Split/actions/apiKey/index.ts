/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { splitApiRequest, splitApiRequestAllItems } from '../../transport';

export async function list(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;

  let responseData: IDataObject[];

  if (returnAll) {
    responseData = await splitApiRequestAllItems.call(
      this,
      'GET',
      `/apiKeys/ws/${workspaceId}`,
    );
  } else {
    const limit = this.getNodeParameter('limit', index) as number;
    const query: IDataObject = { limit, offset: 0 };
    const response = await splitApiRequest.call(
      this,
      'GET',
      `/apiKeys/ws/${workspaceId}`,
      undefined,
      query,
    ) as IDataObject;
    responseData = (response.objects as IDataObject[]) || [];
  }

  return responseData.map((item) => ({ json: item }));
}

export async function create(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const name = this.getNodeParameter('name', index) as string;
  const keyType = this.getNodeParameter('keyType', index) as string;
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

  const body: IDataObject = {
    name,
    type: keyType,
  };

  if (additionalFields.allEnvironments !== undefined) {
    body.allEnvironments = additionalFields.allEnvironments;
  }

  if (additionalFields.environments) {
    const envs = (additionalFields.environments as string).split(',').map((e) => e.trim());
    body.environments = envs.map((id) => ({ id }));
  }

  const responseData = await splitApiRequest.call(
    this,
    'POST',
    `/apiKeys/ws/${workspaceId}`,
    body,
  ) as IDataObject;

  return [{ json: responseData }];
}

export async function remove(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const apiKeyId = this.getNodeParameter('apiKeyId', index) as string;

  await splitApiRequest.call(
    this,
    'DELETE',
    `/apiKeys/ws/${workspaceId}/${apiKeyId}`,
  );

  return [{ json: { success: true, apiKeyId, deleted: true } }];
}
