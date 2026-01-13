/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

// API Response Types
export interface ISplitApiResponse<T = unknown> {
  objects?: T[];
  data?: T;
  offset?: number;
  limit?: number;
  totalCount?: number;
}

// Workspace Types
export interface IWorkspace {
  id: string;
  name: string;
  requiresTitleAndComments: boolean;
}

// Environment Types
export interface IEnvironment {
  id: string;
  name: string;
  production: boolean;
  creationTime?: number;
}

// Traffic Type Types
export interface ITrafficType {
  id: string;
  name: string;
  displayAttributeId?: string;
}

// Split (Feature Flag) Types
export interface ISplit {
  id?: string;
  name: string;
  description?: string;
  trafficType: ITrafficType;
  creationTime?: number;
  tags?: ITag[];
}

export interface ITag {
  name: string;
}

// Split Definition Types
export interface ISplitDefinition {
  name: string;
  environment: IEnvironment;
  trafficType: ITrafficType;
  killed: boolean;
  treatments: ITreatment[];
  defaultTreatment: string;
  baselineTreatment?: string;
  trafficAllocation?: number;
  rules?: IRule[];
  defaultRule: IBucket[];
  creationTime?: number;
  lastUpdateTime?: number;
}

export interface ITreatment {
  name: string;
  description?: string;
  configurations?: string;
}

export interface IRule {
  condition: ICondition;
  buckets: IBucket[];
}

export interface ICondition {
  combiner?: 'AND';
  matchers: IMatcher[];
}

export interface IMatcher {
  type: string;
  attribute?: string;
  strings?: string[];
  negate?: boolean;
}

export interface IBucket {
  treatment: string;
  size: number;
}

// Segment Types
export interface ISegment {
  name: string;
  description?: string;
  trafficType: ITrafficType;
  creationTime?: number;
  tags?: ITag[];
}

export interface ISegmentKeys {
  keys: string[];
  count?: number;
}

// Identity Types
export interface IIdentity {
  key: string;
  trafficTypeId: string;
  environmentId: string;
  values?: Record<string, unknown>;
}

// Metric Types
export interface IMetric {
  id?: string;
  name: string;
  description?: string;
  metricType: 'count' | 'sum' | 'average';
  eventTypeId: string;
}

// API Key Types
export interface IApiKey {
  id?: string;
  name: string;
  type: 'admin' | 'server-side' | 'client-side';
  roles?: string[];
  allEnvironments?: boolean;
  environments?: IEnvironment[];
}

// Operation Types
export interface IPatchOperation {
  op: 'replace' | 'add' | 'remove';
  path: string;
  value?: unknown;
}

// Error Types
export interface ISplitError {
  type: string;
  message: string;
  code: number;
}

// Resource Name Union Type
export type SplitResource =
  | 'featureFlag'
  | 'definition'
  | 'segment'
  | 'environment'
  | 'workspace'
  | 'trafficType'
  | 'identity'
  | 'metric'
  | 'apiKey';

// Feature Flag Operations
export type FeatureFlagOperation =
  | 'list'
  | 'get'
  | 'create'
  | 'update'
  | 'delete'
  | 'kill'
  | 'restore';

// Definition Operations
export type DefinitionOperation =
  | 'get'
  | 'updateTargeting'
  | 'updateDefaultRule'
  | 'activate'
  | 'deactivate';

// Segment Operations
export type SegmentOperation =
  | 'list'
  | 'get'
  | 'create'
  | 'update'
  | 'delete'
  | 'addKeys'
  | 'removeKeys'
  | 'getKeys';

// Environment Operations
export type EnvironmentOperation = 'list' | 'get' | 'create' | 'update' | 'delete';

// Workspace Operations
export type WorkspaceOperation = 'list' | 'get' | 'create' | 'update' | 'delete';

// Traffic Type Operations
export type TrafficTypeOperation = 'list' | 'get' | 'create';

// Identity Operations
export type IdentityOperation = 'save' | 'get' | 'delete';

// Metric Operations
export type MetricOperation = 'list' | 'get' | 'create' | 'update' | 'delete';

// API Key Operations
export type ApiKeyOperation = 'list' | 'create' | 'delete';
