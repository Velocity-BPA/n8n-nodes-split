/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { splitApiRequest, splitApiRequestAllItems } from '../../transport';

export async function getKeys(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const segmentName = this.getNodeParameter('segmentName', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;

  let responseData: IDataObject[];

  if (returnAll) {
    responseData = await splitApiRequestAllItems.call(
      this,
      'GET',
      `/segments/ws/${workspaceId}/${segmentName}/environments/${environmentId}`,
      undefined,
      undefined,
      'keys',
    );
    return [{ json: { keys: responseData } }];
  } else {
    const limit = this.getNodeParameter('limit', index) as number;
    const query: IDataObject = { limit, offset: 0 };
    const response = await splitApiRequest.call(
      this,
      'GET',
      `/segments/ws/${workspaceId}/${segmentName}/environments/${environmentId}`,
      undefined,
      query,
    ) as IDataObject;
    return [{ json: response }];
  }
}
