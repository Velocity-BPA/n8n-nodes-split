/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';
import { buildExecutionData, formatTags } from '../../utils';

export async function associateTags(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const splitName = this.getNodeParameter('splitName', index) as string;
  const tags = this.getNodeParameter('tags', index) as string;

  const tagList = formatTags(tags);

  const response = await splitApiRequest.call(
    this,
    'POST',
    `/splits/ws/${workspaceId}/${splitName}/tags`,
    tagList,
  );

  return buildExecutionData(response as IDataObject);
}
