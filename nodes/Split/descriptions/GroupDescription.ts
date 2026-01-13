/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['group'],
      },
    },
    options: [
      {
        name: 'Add Metrics',
        value: 'addMetrics',
        description: 'Add metrics to a group',
        action: 'Add metrics to a group',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a metric group',
        action: 'Create a metric group',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a metric group',
        action: 'Delete a metric group',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a metric group',
        action: 'Get a metric group',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all metric groups',
        action: 'List all metric groups',
      },
      {
        name: 'Remove Metrics',
        value: 'removeMetrics',
        description: 'Remove metrics from a group',
        action: 'Remove metrics from a group',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a metric group',
        action: 'Update a metric group',
      },
    ],
    default: 'list',
  },
];

export const groupFields: INodeProperties[] = [
  // Workspace ID - all operations
  {
    displayName: 'Workspace ID',
    name: 'workspaceId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['group'],
      },
    },
    default: '',
    description: 'The ID of the workspace',
  },
  // Group ID - get, update, delete, addMetrics, removeMetrics
  {
    displayName: 'Group ID',
    name: 'groupId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['get', 'update', 'delete', 'addMetrics', 'removeMetrics'],
      },
    },
    default: '',
    description: 'The ID of the metric group',
  },
  // Name - create
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['create'],
      },
    },
    default: '',
    description: 'The name of the metric group',
  },
  // Metrics - addMetrics, removeMetrics
  {
    displayName: 'Metric Names',
    name: 'metricNames',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['addMetrics', 'removeMetrics'],
      },
    },
    default: '',
    description: 'Comma-separated list of metric names to add or remove',
  },
  // Return All - list
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['group'],
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
        resource: ['group'],
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
  // Additional Fields - create
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['group'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the metric group',
      },
      {
        displayName: 'Metrics',
        name: 'metrics',
        type: 'string',
        default: '',
        description: 'Comma-separated list of metric names to include',
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
        resource: ['group'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the metric group',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'New description for the metric group',
      },
    ],
  },
];
