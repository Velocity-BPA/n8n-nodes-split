/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';

export async function get(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const splitName = this.getNodeParameter('splitName', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;

  const responseData = await splitApiRequest.call(
    this,
    'GET',
    `/splits/ws/${workspaceId}/${splitName}/environments/${environmentId}`,
  ) as IDataObject;

  return [{ json: responseData }];
}
