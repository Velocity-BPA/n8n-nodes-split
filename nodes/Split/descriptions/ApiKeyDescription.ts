/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const apiKeyOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['apiKey'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new API key',
        action: 'Create an API key',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete an API key',
        action: 'Delete an API key',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all API keys',
        action: 'List API keys',
      },
    ],
    default: 'list',
  },
];

export const apiKeyFields: INodeProperties[] = [
  // ----------------------------------
  //         Common Fields
  // ----------------------------------
  {
    displayName: 'Workspace ID',
    name: 'workspaceId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the workspace',
    displayOptions: {
      show: {
        resource: ['apiKey'],
      },
    },
  },

  // ----------------------------------
  //         list
  // ----------------------------------
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    description: 'Whether to return all results or only up to a given limit',
    displayOptions: {
      show: {
        resource: ['apiKey'],
        operation: ['list'],
      },
    },
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    default: 50,
    description: 'Max number of results to return',
    typeOptions: {
      minValue: 1,
      maxValue: 200,
    },
    displayOptions: {
      show: {
        resource: ['apiKey'],
        operation: ['list'],
        returnAll: [false],
      },
    },
  },

  // ----------------------------------
  //         delete
  // ----------------------------------
  {
    displayName: 'API Key ID',
    name: 'apiKeyId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the API key to delete',
    displayOptions: {
      show: {
        resource: ['apiKey'],
        operation: ['delete'],
      },
    },
  },

  // ----------------------------------
  //         create
  // ----------------------------------
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    description: 'The name of the API key to create',
    displayOptions: {
      show: {
        resource: ['apiKey'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Key Type',
    name: 'keyType',
    type: 'options',
    required: true,
    default: 'server-side',
    description: 'The type of API key',
    options: [
      { name: 'Admin', value: 'admin' },
      { name: 'Server-side', value: 'server-side' },
      { name: 'Client-side', value: 'client-side' },
    ],
    displayOptions: {
      show: {
        resource: ['apiKey'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['apiKey'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'All Environments',
        name: 'allEnvironments',
        type: 'boolean',
        default: true,
        description: 'Whether the key has access to all environments',
      },
      {
        displayName: 'Environment IDs',
        name: 'environments',
        type: 'string',
        default: '',
        description: 'Comma-separated list of environment IDs (if not all environments)',
      },
    ],
  },
];
