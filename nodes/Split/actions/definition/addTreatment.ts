/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';
import { buildExecutionData } from '../../utils';

export async function addTreatment(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const splitName = this.getNodeParameter('splitName', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;
  const treatmentName = this.getNodeParameter('treatmentName', index) as string;
  const treatmentDescription = this.getNodeParameter('treatmentDescription', index, '') as string;
  const comments = this.getNodeParameter('comments', index, '') as string;
  const title = this.getNodeParameter('title', index, '') as string;

  const treatment: IDataObject = { name: treatmentName };
  if (treatmentDescription) {
    treatment.description = treatmentDescription;
  }

  const operations = [
    {
      op: 'add',
      path: '/treatments/-',
      value: treatment,
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
