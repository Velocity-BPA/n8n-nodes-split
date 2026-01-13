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
      `/trafficTypes/ws/${workspaceId}`,
    );
  } else {
    const limit = this.getNodeParameter('limit', index) as number;
    const query: IDataObject = { limit, offset: 0 };
    const response = await splitApiRequest.call(
      this,
      'GET',
      `/trafficTypes/ws/${workspaceId}`,
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
  const trafficTypeId = this.getNodeParameter('trafficTypeId', index) as string;

  const responseData = await splitApiRequest.call(
    this,
    'GET',
    `/trafficTypes/ws/${workspaceId}/${trafficTypeId}`,
  ) as IDataObject;

  return [{ json: responseData }];
}

export async function create(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const name = this.getNodeParameter('name', index) as string;
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

  const body: IDataObject = {
    name,
  };

  if (additionalFields.displayAttributeId) {
    body.displayAttributeId = additionalFields.displayAttributeId;
  }

  const responseData = await splitApiRequest.call(
    this,
    'POST',
    `/trafficTypes/ws/${workspaceId}`,
    body,
  ) as IDataObject;

  return [{ json: responseData }];
}
