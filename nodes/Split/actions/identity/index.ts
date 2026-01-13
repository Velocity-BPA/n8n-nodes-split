/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';

export async function save(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;
  const trafficTypeName = this.getNodeParameter('trafficTypeName', index) as string;
  const key = this.getNodeParameter('key', index) as string;
  const attributesJson = this.getNodeParameter('attributes', index, '{}') as string;

  let attributes: IDataObject = {};
  try {
    attributes = JSON.parse(attributesJson) as IDataObject;
  } catch {
    throw new Error('Invalid JSON in Attributes parameter');
  }

  const body: IDataObject = {
    key,
    trafficTypeId: trafficTypeName,
    environmentId,
    values: attributes,
  };

  const responseData = await splitApiRequest.call(
    this,
    'PUT',
    `/trafficTypes/${trafficTypeName}/environments/${environmentId}/identities/${key}/ws/${workspaceId}`,
    body,
  ) as IDataObject;

  return [{ json: responseData }];
}

export async function get(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;
  const trafficTypeName = this.getNodeParameter('trafficTypeName', index) as string;
  const key = this.getNodeParameter('key', index) as string;

  const responseData = await splitApiRequest.call(
    this,
    'GET',
    `/trafficTypes/${trafficTypeName}/environments/${environmentId}/identities/${key}/ws/${workspaceId}`,
  ) as IDataObject;

  return [{ json: responseData }];
}

export async function remove(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;
  const trafficTypeName = this.getNodeParameter('trafficTypeName', index) as string;
  const key = this.getNodeParameter('key', index) as string;

  await splitApiRequest.call(
    this,
    'DELETE',
    `/trafficTypes/${trafficTypeName}/environments/${environmentId}/identities/${key}/ws/${workspaceId}`,
  );

  return [{ json: { success: true, key, deleted: true } }];
}
