/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';
import { buildExecutionData } from '../../utils';

export async function exportKeys(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const segmentName = this.getNodeParameter('segmentName', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;

  const response = await splitApiRequest.call(
    this,
    'GET',
    `/segments/ws/${workspaceId}/${segmentName}/environments/${environmentId}/keys/export`,
  );

  return buildExecutionData(response as IDataObject);
}
