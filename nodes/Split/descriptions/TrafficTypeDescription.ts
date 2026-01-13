/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const trafficTypeOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['trafficType'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new traffic type',
        action: 'Create a traffic type',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a traffic type',
        action: 'Get a traffic type',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all traffic types',
        action: 'List traffic types',
      },
    ],
    default: 'list',
  },
];

export const trafficTypeFields: INodeProperties[] = [
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
        resource: ['trafficType'],
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
        resource: ['trafficType'],
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
        resource: ['trafficType'],
        operation: ['list'],
        returnAll: [false],
      },
    },
  },

  // ----------------------------------
  //         get
  // ----------------------------------
  {
    displayName: 'Traffic Type ID',
    name: 'trafficTypeId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the traffic type',
    displayOptions: {
      show: {
        resource: ['trafficType'],
        operation: ['get'],
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
    description: 'The name of the traffic type to create',
    displayOptions: {
      show: {
        resource: ['trafficType'],
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
        resource: ['trafficType'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Display Attribute ID',
        name: 'displayAttributeId',
        type: 'string',
        default: '',
        description: 'The attribute to display for this traffic type',
      },
    ],
  },
];
