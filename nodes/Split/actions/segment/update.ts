/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';

export async function update(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const segmentName = this.getNodeParameter('segmentName', index) as string;
  const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

  const operations: IDataObject[] = [];

  if (updateFields.description !== undefined) {
    operations.push({
      op: 'replace',
      path: '/description',
      value: updateFields.description,
    });
  }

  if (updateFields.name !== undefined) {
    operations.push({
      op: 'replace',
      path: '/name',
      value: updateFields.name,
    });
  }

  const responseData = await splitApiRequest.call(
    this,
    'PATCH',
    `/segments/ws/${workspaceId}/${segmentName}`,
    operations,
  ) as IDataObject;

  return [{ json: responseData }];
}
