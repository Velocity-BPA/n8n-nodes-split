/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';
import { buildExecutionData, formatKeysArray } from '../../utils';

export async function importKeys(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const segmentName = this.getNodeParameter('segmentName', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;
  const keys = this.getNodeParameter('keys', index) as string;
  const replaceExisting = this.getNodeParameter('replaceExisting', index, false) as boolean;
  const comments = this.getNodeParameter('comments', index, '') as string;

  const keyList = formatKeysArray(keys);

  const query: IDataObject = {};
  if (comments) query.comment = comments;

  const method = replaceExisting ? 'PUT' : 'POST';

  const response = await splitApiRequest.call(
    this,
    method,
    `/segments/ws/${workspaceId}/${segmentName}/environments/${environmentId}/keys/import`,
    { keys: keyList },
    query,
  );

  return buildExecutionData(response as IDataObject);
}
