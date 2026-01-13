/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const metricOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['metric'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new metric',
        action: 'Create a metric',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a metric',
        action: 'Delete a metric',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a metric',
        action: 'Get a metric',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all metrics',
        action: 'List metrics',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a metric',
        action: 'Update a metric',
      },
    ],
    default: 'list',
  },
];

export const metricFields: INodeProperties[] = [
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
        resource: ['metric'],
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
        resource: ['metric'],
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
        resource: ['metric'],
        operation: ['list'],
        returnAll: [false],
      },
    },
  },

  // ----------------------------------
  //         get / update / delete
  // ----------------------------------
  {
    displayName: 'Metric ID',
    name: 'metricId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the metric',
    displayOptions: {
      show: {
        resource: ['metric'],
        operation: ['get', 'update', 'delete'],
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
    description: 'The name of the metric to create',
    displayOptions: {
      show: {
        resource: ['metric'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Event Type ID',
    name: 'eventTypeId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the event type this metric tracks',
    displayOptions: {
      show: {
        resource: ['metric'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Metric Type',
    name: 'metricType',
    type: 'options',
    required: true,
    default: 'count',
    description: 'The type of metric calculation',
    options: [
      { name: 'Count', value: 'count' },
      { name: 'Sum', value: 'sum' },
      { name: 'Average', value: 'average' },
    ],
    displayOptions: {
      show: {
        resource: ['metric'],
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
        resource: ['metric'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the metric',
      },
    ],
  },

  // ----------------------------------
  //         update
  // ----------------------------------
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['metric'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'New description for the metric',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the metric',
      },
    ],
  },
];
