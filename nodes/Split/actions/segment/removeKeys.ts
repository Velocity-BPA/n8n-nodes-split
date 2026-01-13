/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';
import { formatKeysArray } from '../../utils';

export async function removeKeys(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const segmentName = this.getNodeParameter('segmentName', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;
  const keys = this.getNodeParameter('keys', index) as string;
  const comments = this.getNodeParameter('comments', index, '') as string;

  const keysArray = formatKeysArray(keys);

  const body: IDataObject = {
    keys: keysArray,
  };

  if (comments) {
    body.comment = comments;
  }

  const responseData = await splitApiRequest.call(
    this,
    'DELETE',
    `/segments/ws/${workspaceId}/${segmentName}/environments/${environmentId}/keys`,
    body,
  ) as IDataObject;

  return [{ json: responseData }];
}
