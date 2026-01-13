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
  const filters = this.getNodeParameter('filters', index, {}) as IDataObject;

  const query: IDataObject = {};
  
  if (filters.tag) {
    query.tag = filters.tag;
  }
  if (filters.name) {
    query.name = filters.name;
  }

  let responseData: IDataObject[];

  if (returnAll) {
    responseData = await splitApiRequestAllItems.call(
      this,
      'GET',
      `/splits/ws/${workspaceId}`,
      undefined,
      query,
    );
  } else {
    const limit = this.getNodeParameter('limit', index) as number;
    query.limit = limit;
    query.offset = 0;
    const response = await splitApiRequest.call(
      this,
      'GET',
      `/splits/ws/${workspaceId}`,
      undefined,
      query,
    ) as IDataObject;
    responseData = (response.objects as IDataObject[]) || [];
  }

  return responseData.map((item) => ({ json: item }));
}
