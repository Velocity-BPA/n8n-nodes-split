/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { splitApiRequest, splitApiRequestAllItems } from '../../transport';
import { buildExecutionData } from '../../utils';

export async function list(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;
  const filters = this.getNodeParameter('filters', index) as IDataObject;

  const query: IDataObject = {};

  if (filters.workspaceId) {
    query.workspaceId = filters.workspaceId;
  }
  if (filters.environmentId) {
    query.environmentId = filters.environmentId;
  }
  if (filters.after) {
    query.after = new Date(filters.after as string).getTime();
  }
  if (filters.before) {
    query.before = new Date(filters.before as string).getTime();
  }
  if (filters.action) {
    query.action = filters.action;
  }
  if (filters.resourceType) {
    query.resourceType = filters.resourceType;
  }
  if (filters.userEmail) {
    query.userEmail = filters.userEmail;
  }

  let response: IDataObject | IDataObject[];

  if (returnAll) {
    response = await splitApiRequestAllItems.call(
      this,
      'GET',
      '/auditLog',
      undefined,
      query,
    );
  } else {
    const limit = this.getNodeParameter('limit', index) as number;
    query.limit = limit;
    const apiResponse = await splitApiRequest.call(
      this,
      'GET',
      '/auditLog',
      undefined,
      query,
    );
    response = ((apiResponse as IDataObject).objects as IDataObject[]) || (apiResponse as IDataObject[]);
  }

  return buildExecutionData(response as IDataObject | IDataObject[]);
}

export async function getEntry(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const entryId = this.getNodeParameter('entryId', index) as string;

  const response = await splitApiRequest.call(
    this,
    'GET',
    `/auditLog/${entryId}`,
  );

  return buildExecutionData(response as IDataObject);
}

export async function search(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const returnAll = this.getNodeParameter('returnAll', index) as boolean;
  const searchQuery = this.getNodeParameter('searchQuery', index) as string;
  const filters = this.getNodeParameter('filters', index) as IDataObject;

  const query: IDataObject = {
    q: searchQuery,
  };

  if (filters.workspaceId) {
    query.workspaceId = filters.workspaceId;
  }
  if (filters.environmentId) {
    query.environmentId = filters.environmentId;
  }
  if (filters.after) {
    query.after = new Date(filters.after as string).getTime();
  }
  if (filters.before) {
    query.before = new Date(filters.before as string).getTime();
  }
  if (filters.action) {
    query.action = filters.action;
  }
  if (filters.resourceType) {
    query.resourceType = filters.resourceType;
  }
  if (filters.userEmail) {
    query.userEmail = filters.userEmail;
  }

  let response: IDataObject | IDataObject[];

  if (returnAll) {
    response = await splitApiRequestAllItems.call(
      this,
      'GET',
      '/auditLog/search',
      undefined,
      query,
    );
  } else {
    const limit = this.getNodeParameter('limit', index) as number;
    query.limit = limit;
    const apiResponse = await splitApiRequest.call(
      this,
      'GET',
      '/auditLog/search',
      undefined,
      query,
    );
    response = ((apiResponse as IDataObject).objects as IDataObject[]) || (apiResponse as IDataObject[]);
  }

  return buildExecutionData(response as IDataObject | IDataObject[]);
}

export async function exportAuditLog(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const format = this.getNodeParameter('format', index) as string;
  const filters = this.getNodeParameter('filters', index) as IDataObject;

  const query: IDataObject = {
    format,
  };

  if (filters.workspaceId) {
    query.workspaceId = filters.workspaceId;
  }
  if (filters.environmentId) {
    query.environmentId = filters.environmentId;
  }
  if (filters.after) {
    query.after = new Date(filters.after as string).getTime();
  }
  if (filters.before) {
    query.before = new Date(filters.before as string).getTime();
  }
  if (filters.action) {
    query.action = filters.action;
  }
  if (filters.resourceType) {
    query.resourceType = filters.resourceType;
  }
  if (filters.userEmail) {
    query.userEmail = filters.userEmail;
  }

  const response = await splitApiRequest.call(
    this,
    'GET',
    '/auditLog/export',
    undefined,
    query,
  );

  return buildExecutionData(response as IDataObject);
}
