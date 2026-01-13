/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { splitApiRequest, splitApiRequestAllItems } from '../../transport';
import { buildExecutionData, formatKeysArray } from '../../utils';

export async function list(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;

  let response: IDataObject | IDataObject[];

  if (returnAll) {
    response = await splitApiRequestAllItems.call(
      this,
      'GET',
      `/groups/ws/${workspaceId}`,
    );
  } else {
    const limit = this.getNodeParameter('limit', index) as number;
    const apiResponse = await splitApiRequest.call(
      this,
      'GET',
      `/groups/ws/${workspaceId}`,
      undefined,
      { limit },
    );
    response = ((apiResponse as IDataObject).objects as IDataObject[]) || (apiResponse as IDataObject[]);
  }

  return buildExecutionData(response as IDataObject | IDataObject[]);
}

export async function get(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const groupId = this.getNodeParameter('groupId', index) as string;

  const response = await splitApiRequest.call(
    this,
    'GET',
    `/groups/ws/${workspaceId}/${groupId}`,
  );

  return buildExecutionData(response as IDataObject);
}

export async function create(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const name = this.getNodeParameter('name', index) as string;
  const additionalFields = this.getNodeParameter('additionalFields', index) as IDataObject;

  const body: IDataObject = { name };

  if (additionalFields.description) {
    body.description = additionalFields.description;
  }

  if (additionalFields.metrics) {
    body.metrics = formatKeysArray(additionalFields.metrics as string);
  }

  const response = await splitApiRequest.call(
    this,
    'POST',
    `/groups/ws/${workspaceId}`,
    body,
  );

  return buildExecutionData(response as IDataObject);
}

export async function update(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const groupId = this.getNodeParameter('groupId', index) as string;
  const updateFields = this.getNodeParameter('updateFields', index) as IDataObject;

  const operations: IDataObject[] = [];

  if (updateFields.name) {
    operations.push({
      op: 'replace',
      path: '/name',
      value: updateFields.name,
    });
  }

  if (updateFields.description !== undefined) {
    operations.push({
      op: 'replace',
      path: '/description',
      value: updateFields.description,
    });
  }

  const response = await splitApiRequest.call(
    this,
    'PATCH',
    `/groups/ws/${workspaceId}/${groupId}`,
    operations,
  );

  return buildExecutionData(response as IDataObject);
}

export async function remove(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const groupId = this.getNodeParameter('groupId', index) as string;

  await splitApiRequest.call(
    this,
    'DELETE',
    `/groups/ws/${workspaceId}/${groupId}`,
  );

  return buildExecutionData({ success: true, groupId });
}

export async function addMetrics(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const groupId = this.getNodeParameter('groupId', index) as string;
  const metricNames = this.getNodeParameter('metricNames', index) as string;

  const metrics = formatKeysArray(metricNames);

  const response = await splitApiRequest.call(
    this,
    'PUT',
    `/groups/ws/${workspaceId}/${groupId}/metrics`,
    { metrics },
  );

  return buildExecutionData(response as IDataObject);
}

export async function removeMetrics(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const groupId = this.getNodeParameter('groupId', index) as string;
  const metricNames = this.getNodeParameter('metricNames', index) as string;

  const metrics = formatKeysArray(metricNames);

  const response = await splitApiRequest.call(
    this,
    'DELETE',
    `/groups/ws/${workspaceId}/${groupId}/metrics`,
    { metrics },
  );

  return buildExecutionData(response as IDataObject);
}
