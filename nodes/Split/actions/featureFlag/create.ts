/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';
import { formatTags } from '../../utils';

export async function create(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const trafficTypeName = this.getNodeParameter('trafficTypeName', index) as string;
  const name = this.getNodeParameter('name', index) as string;
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

  const body: IDataObject = {
    name,
  };

  if (additionalFields.description) {
    body.description = additionalFields.description;
  }

  if (additionalFields.tags) {
    body.tags = formatTags(additionalFields.tags as string);
  }

  const responseData = await splitApiRequest.call(
    this,
    'POST',
    `/splits/ws/${workspaceId}/trafficTypes/${trafficTypeName}`,
    body,
  ) as IDataObject;

  return [{ json: responseData }];
}
