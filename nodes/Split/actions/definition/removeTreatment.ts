/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';
import { buildExecutionData } from '../../utils';

export async function removeTreatment(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const splitName = this.getNodeParameter('splitName', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;
  const treatmentName = this.getNodeParameter('treatmentName', index) as string;
  const comments = this.getNodeParameter('comments', index, '') as string;
  const title = this.getNodeParameter('title', index, '') as string;

  // First get current definition to find treatment index
  const currentDef = await splitApiRequest.call(
    this,
    'GET',
    `/splits/ws/${workspaceId}/${splitName}/environments/${environmentId}`,
  ) as IDataObject;

  const treatments = (currentDef.treatments as IDataObject[]) || [];
  const treatmentIndex = treatments.findIndex((t) => t.name === treatmentName);

  if (treatmentIndex === -1) {
    throw new Error(`Treatment "${treatmentName}" not found`);
  }

  const operations = [
    {
      op: 'remove',
      path: `/treatments/${treatmentIndex}`,
    },
  ];

  const query: IDataObject = {};
  if (comments) query.comment = comments;
  if (title) query.title = title;

  const response = await splitApiRequest.call(
    this,
    'PATCH',
    `/splits/ws/${workspaceId}/${splitName}/environments/${environmentId}`,
    operations,
    query,
  );

  return buildExecutionData(response as IDataObject);
}
