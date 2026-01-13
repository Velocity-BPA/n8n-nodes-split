/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';

export async function remove(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const segmentName = this.getNodeParameter('segmentName', index) as string;

  await splitApiRequest.call(
    this,
    'DELETE',
    `/segments/ws/${workspaceId}/${segmentName}`,
  );

  return [{ json: { success: true, segmentName, deleted: true } }];
}
