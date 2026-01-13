/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { splitApiRequest, splitApiRequestAllItems, parseJsonParameter } from '../../transport';
import { buildExecutionData } from '../../utils';

export async function list(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;
  const filters = this.getNodeParameter('filters', index) as IDataObject;

  const query: IDataObject = {};

  if (filters.splitName) {
    query.splitName = filters.splitName;
  }
  if (filters.environmentId) {
    query.environmentId = filters.environmentId;
  }
  if (filters.status) {
    query.status = filters.status;
  }

  let response: IDataObject | IDataObject[];

  if (returnAll) {
    response = await splitApiRequestAllItems.call(
      this,
      'GET',
      `/rolloutPlans/ws/${workspaceId}`,
      undefined,
      query,
    );
  } else {
    const limit = this.getNodeParameter('limit', index) as number;
    query.limit = limit;
    const apiResponse = await splitApiRequest.call(
      this,
      'GET',
      `/rolloutPlans/ws/${workspaceId}`,
      undefined,
      query,
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
  const planId = this.getNodeParameter('planId', index) as string;

  const response = await splitApiRequest.call(
    this,
    'GET',
    `/rolloutPlans/ws/${workspaceId}/${planId}`,
  );

  return buildExecutionData(response as IDataObject);
}

export async function create(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const splitName = this.getNodeParameter('splitName', index) as string;
  const planName = this.getNodeParameter('planName', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;
  const stagesJson = this.getNodeParameter('stages', index) as string;
  const additionalFields = this.getNodeParameter('additionalFields', index) as IDataObject;

  const stages = parseJsonParameter(stagesJson, 'stages');

  const body: IDataObject = {
    name: planName,
    splitName,
    environmentId,
    stages,
  };

  if (additionalFields.description) {
    body.description = additionalFields.description;
  }

  if (additionalFields.schedule) {
    body.schedule = parseJsonParameter(additionalFields.schedule as string, 'schedule');
  }

  if (additionalFields.treatment) {
    body.treatment = additionalFields.treatment;
  }

  const response = await splitApiRequest.call(
    this,
    'POST',
    `/rolloutPlans/ws/${workspaceId}`,
    body,
  );

  return buildExecutionData(response as IDataObject);
}

export async function update(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const planId = this.getNodeParameter('planId', index) as string;
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

  if (updateFields.stages) {
    operations.push({
      op: 'replace',
      path: '/stages',
      value: parseJsonParameter(updateFields.stages as string, 'stages'),
    });
  }

  if (updateFields.schedule) {
    operations.push({
      op: 'replace',
      path: '/schedule',
      value: parseJsonParameter(updateFields.schedule as string, 'schedule'),
    });
  }

  const response = await splitApiRequest.call(
    this,
    'PATCH',
    `/rolloutPlans/ws/${workspaceId}/${planId}`,
    operations,
  );

  return buildExecutionData(response as IDataObject);
}

export async function remove(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const planId = this.getNodeParameter('planId', index) as string;

  await splitApiRequest.call(
    this,
    'DELETE',
    `/rolloutPlans/ws/${workspaceId}/${planId}`,
  );

  return buildExecutionData({ success: true, planId });
}

export async function activate(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const planId = this.getNodeParameter('planId', index) as string;

  const response = await splitApiRequest.call(
    this,
    'PUT',
    `/rolloutPlans/ws/${workspaceId}/${planId}/activate`,
  );

  return buildExecutionData(response as IDataObject);
}

export async function pause(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const planId = this.getNodeParameter('planId', index) as string;

  const response = await splitApiRequest.call(
    this,
    'PUT',
    `/rolloutPlans/ws/${workspaceId}/${planId}/pause`,
  );

  return buildExecutionData(response as IDataObject);
}
