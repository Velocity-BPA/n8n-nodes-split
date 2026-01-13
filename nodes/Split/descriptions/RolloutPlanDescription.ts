/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const rolloutPlanOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
      },
    },
    options: [
      {
        name: 'Activate',
        value: 'activate',
        description: 'Activate a rollout plan',
        action: 'Activate a rollout plan',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a rollout plan',
        action: 'Create a rollout plan',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a rollout plan',
        action: 'Delete a rollout plan',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a rollout plan',
        action: 'Get a rollout plan',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all rollout plans',
        action: 'List all rollout plans',
      },
      {
        name: 'Pause',
        value: 'pause',
        description: 'Pause a rollout plan',
        action: 'Pause a rollout plan',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a rollout plan',
        action: 'Update a rollout plan',
      },
    ],
    default: 'list',
  },
];

export const rolloutPlanFields: INodeProperties[] = [
  // Workspace ID - all operations
  {
    displayName: 'Workspace ID',
    name: 'workspaceId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
      },
    },
    default: '',
    description: 'The ID of the workspace',
  },
  // Plan ID - get, update, delete, activate, pause
  {
    displayName: 'Plan ID',
    name: 'planId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
        operation: ['get', 'update', 'delete', 'activate', 'pause'],
      },
    },
    default: '',
    description: 'The ID of the rollout plan',
  },
  // Split Name - create, list
  {
    displayName: 'Split Name',
    name: 'splitName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the feature flag for this rollout plan',
  },
  // Plan Name - create
  {
    displayName: 'Plan Name',
    name: 'planName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the rollout plan',
  },
  // Environment ID - create
  {
    displayName: 'Environment ID',
    name: 'environmentId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The environment ID for this rollout plan',
  },
  // Stages - create
  {
    displayName: 'Stages (JSON)',
    name: 'stages',
    type: 'json',
    required: true,
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
        operation: ['create'],
      },
    },
    default: '[]',
    description: 'JSON array of rollout stages. Each stage should have percentage and optional delay.',
  },
  // Return All - list
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
        operation: ['list'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  // Limit - list
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
        operation: ['list'],
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
  // Filters - list
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
        operation: ['list'],
      },
    },
    options: [
      {
        displayName: 'Split Name',
        name: 'splitName',
        type: 'string',
        default: '',
        description: 'Filter by feature flag name',
      },
      {
        displayName: 'Environment ID',
        name: 'environmentId',
        type: 'string',
        default: '',
        description: 'Filter by environment ID',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'All', value: '' },
          { name: 'Active', value: 'active' },
          { name: 'Paused', value: 'paused' },
          { name: 'Completed', value: 'completed' },
          { name: 'Draft', value: 'draft' },
        ],
        default: '',
        description: 'Filter by rollout plan status',
      },
    ],
  },
  // Additional Fields - create
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the rollout plan',
      },
      {
        displayName: 'Schedule (JSON)',
        name: 'schedule',
        type: 'json',
        default: '{}',
        description: 'JSON object defining the rollout schedule',
      },
      {
        displayName: 'Treatment',
        name: 'treatment',
        type: 'string',
        default: 'on',
        description: 'The treatment to roll out',
      },
    ],
  },
  // Update Fields - update
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['rolloutPlan'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the rollout plan',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'New description for the rollout plan',
      },
      {
        displayName: 'Stages (JSON)',
        name: 'stages',
        type: 'json',
        default: '',
        description: 'Updated rollout stages',
      },
      {
        displayName: 'Schedule (JSON)',
        name: 'schedule',
        type: 'json',
        default: '',
        description: 'Updated rollout schedule',
      },
    ],
  },
];
