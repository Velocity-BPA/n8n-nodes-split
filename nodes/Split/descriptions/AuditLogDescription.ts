/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const auditLogOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['auditLog'],
      },
    },
    options: [
      {
        name: 'Export',
        value: 'export',
        description: 'Export audit log data',
        action: 'Export audit log data',
      },
      {
        name: 'Get Entry',
        value: 'getEntry',
        description: 'Get a specific audit log entry',
        action: 'Get a specific audit log entry',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List audit log entries',
        action: 'List audit log entries',
      },
      {
        name: 'Search',
        value: 'search',
        description: 'Search audit log entries',
        action: 'Search audit log entries',
      },
    ],
    default: 'list',
  },
];

export const auditLogFields: INodeProperties[] = [
  // Entry ID - getEntry
  {
    displayName: 'Entry ID',
    name: 'entryId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['auditLog'],
        operation: ['getEntry'],
      },
    },
    default: '',
    description: 'The ID of the audit log entry',
  },
  // Return All - list, search
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['auditLog'],
        operation: ['list', 'search'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  // Limit - list, search
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['auditLog'],
        operation: ['list', 'search'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
    default: 50,
    description: 'Max number of results to return',
  },
  // Search Query - search
  {
    displayName: 'Search Query',
    name: 'searchQuery',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['auditLog'],
        operation: ['search'],
      },
    },
    default: '',
    description: 'The search query string',
  },
  // Filters - list, search, export
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['auditLog'],
        operation: ['list', 'search', 'export'],
      },
    },
    options: [
      {
        displayName: 'Workspace ID',
        name: 'workspaceId',
        type: 'string',
        default: '',
        description: 'Filter by workspace ID',
      },
      {
        displayName: 'Environment ID',
        name: 'environmentId',
        type: 'string',
        default: '',
        description: 'Filter by environment ID',
      },
      {
        displayName: 'After',
        name: 'after',
        type: 'dateTime',
        default: '',
        description: 'Return entries after this timestamp',
      },
      {
        displayName: 'Before',
        name: 'before',
        type: 'dateTime',
        default: '',
        description: 'Return entries before this timestamp',
      },
      {
        displayName: 'Action Type',
        name: 'action',
        type: 'options',
        options: [
          { name: 'All', value: '' },
          { name: 'Create', value: 'create' },
          { name: 'Update', value: 'update' },
          { name: 'Delete', value: 'delete' },
          { name: 'Kill', value: 'kill' },
          { name: 'Restore', value: 'restore' },
          { name: 'Activate', value: 'activate' },
          { name: 'Deactivate', value: 'deactivate' },
        ],
        default: '',
        description: 'Filter by action type',
      },
      {
        displayName: 'Resource Type',
        name: 'resourceType',
        type: 'options',
        options: [
          { name: 'All', value: '' },
          { name: 'Split', value: 'split' },
          { name: 'Segment', value: 'segment' },
          { name: 'Environment', value: 'environment' },
          { name: 'Workspace', value: 'workspace' },
          { name: 'Traffic Type', value: 'trafficType' },
          { name: 'API Key', value: 'apiKey' },
          { name: 'User', value: 'user' },
        ],
        default: '',
        description: 'Filter by resource type',
      },
      {
        displayName: 'User Email',
        name: 'userEmail',
        type: 'string',
        default: '',
        description: 'Filter by user email who performed the action',
      },
    ],
  },
  // Export Format - export
  {
    displayName: 'Format',
    name: 'format',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['auditLog'],
        operation: ['export'],
      },
    },
    options: [
      { name: 'JSON', value: 'json' },
      { name: 'CSV', value: 'csv' },
    ],
    default: 'json',
    description: 'The export format',
  },
];
