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
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;

  let responseData: IDataObject[];

  if (returnAll) {
    responseData = await splitApiRequestAllItems.call(
      this,
      'GET',
      '/workspaces',
    );
  } else {
    const limit = this.getNodeParameter('limit', index) as number;
    const query: IDataObject = { limit, offset: 0 };
    const response = await splitApiRequest.call(
      this,
      'GET',
      '/workspaces',
      undefined,
      query,
    ) as IDataObject;
    responseData = (response.objects as IDataObject[]) || [];
  }

  return responseData.map((item) => ({ json: item }));
}

export async function get(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;

  const responseData = await splitApiRequest.call(
    this,
    'GET',
    `/workspaces/${workspaceId}`,
  ) as IDataObject;

  return [{ json: responseData }];
}

export async function create(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const name = this.getNodeParameter('name', index) as string;
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

  const body: IDataObject = {
    name,
  };

  if (additionalFields.requiresTitleAndComments !== undefined) {
    body.requiresTitleAndComments = additionalFields.requiresTitleAndComments;
  }

  const responseData = await splitApiRequest.call(
    this,
    'POST',
    '/workspaces',
    body,
  ) as IDataObject;

  return [{ json: responseData }];
}

export async function update(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

  const operations: IDataObject[] = [];

  if (updateFields.name !== undefined) {
    operations.push({
      op: 'replace',
      path: '/name',
      value: updateFields.name,
    });
  }

  if (updateFields.requiresTitleAndComments !== undefined) {
    operations.push({
      op: 'replace',
      path: '/requiresTitleAndComments',
      value: updateFields.requiresTitleAndComments,
    });
  }

  const responseData = await splitApiRequest.call(
    this,
    'PATCH',
    `/workspaces/${workspaceId}`,
    operations,
  ) as IDataObject;

  return [{ json: responseData }];
}

export async function remove(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;

  await splitApiRequest.call(
    this,
    'DELETE',
    `/workspaces/${workspaceId}`,
  );

  return [{ json: { success: true, workspaceId, deleted: true } }];
}
