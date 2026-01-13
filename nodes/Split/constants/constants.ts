/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

export const SPLIT_API_BASE_URL = 'https://api.split.io/internal/api/v2';
export const SPLIT_SDK_BASE_URL = 'https://sdk.split.io';

export const DEFAULT_PAGE_SIZE = 50;
export const MAX_PAGE_SIZE = 200;

export const RESOURCES = {
  FEATURE_FLAG: 'featureFlag',
  DEFINITION: 'definition',
  SEGMENT: 'segment',
  ENVIRONMENT: 'environment',
  WORKSPACE: 'workspace',
  TRAFFIC_TYPE: 'trafficType',
  IDENTITY: 'identity',
  METRIC: 'metric',
  API_KEY: 'apiKey',
} as const;

export const METRIC_TYPES = [
  { name: 'Count', value: 'count' },
  { name: 'Sum', value: 'sum' },
  { name: 'Average', value: 'average' },
] as const;

export const API_KEY_TYPES = [
  { name: 'Admin', value: 'admin' },
  { name: 'Server-side', value: 'server-side' },
  { name: 'Client-side', value: 'client-side' },
] as const;

export const MATCHER_TYPES = [
  { name: 'In Segment', value: 'IN_SEGMENT' },
  { name: 'Whitelist', value: 'WHITELIST' },
  { name: 'Equal To', value: 'EQUAL_TO' },
  { name: 'Greater Than or Equal To', value: 'GREATER_THAN_OR_EQUAL_TO' },
  { name: 'Less Than or Equal To', value: 'LESS_THAN_OR_EQUAL_TO' },
  { name: 'Between', value: 'BETWEEN' },
  { name: 'Equal To Set', value: 'EQUAL_TO_SET' },
  { name: 'Part Of Set', value: 'PART_OF_SET' },
  { name: 'Contains All Of Set', value: 'CONTAINS_ALL_OF_SET' },
  { name: 'Starts With', value: 'STARTS_WITH' },
  { name: 'Ends With', value: 'ENDS_WITH' },
  { name: 'Contains String', value: 'CONTAINS_STRING' },
  { name: 'Matches String', value: 'MATCHES_STRING' },
  { name: 'In Split Treatment', value: 'IN_SPLIT_TREATMENT' },
  { name: 'Equal To Boolean', value: 'EQUAL_TO_BOOLEAN' },
  { name: 'All Keys', value: 'ALL_KEYS' },
] as const;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const LICENSING_NOTICE = `[Velocity BPA Licensing Notice]
This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.`;
