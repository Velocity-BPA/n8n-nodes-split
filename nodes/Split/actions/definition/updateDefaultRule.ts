/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { splitApiRequest } from '../../transport';
import { parseTreatmentDistribution } from '../../utils';

export async function updateDefaultRule(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const workspaceId = this.getNodeParameter('workspaceId', index) as string;
  const splitName = this.getNodeParameter('splitName', index) as string;
  const environmentId = this.getNodeParameter('environmentId', index) as string;
  const treatmentsDistribution = this.getNodeParameter('treatmentsDistribution', index) as string;
  const comments = this.getNodeParameter('comments', index, '') as string;
  const title = this.getNodeParameter('title', index, '') as string;

  const treatments = parseTreatmentDistribution(treatmentsDistribution);

  const operations: IDataObject[] = [
    {
      op: 'replace',
      path: '/defaultRule',
      value: treatments,
    },
  ];

  const query: IDataObject = {};
  if (comments) {
    query.comment = comments;
  }
  if (title) {
    query.title = title;
  }

  const responseData = await splitApiRequest.call(
    this,
    'PATCH',
    `/splits/ws/${workspaceId}/${splitName}/environments/${environmentId}`,
    operations,
    query,
  ) as IDataObject;

  return [{ json: responseData }];
}
