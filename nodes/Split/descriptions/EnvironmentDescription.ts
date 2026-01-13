/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const environmentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['environment'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new environment',
        action: 'Create an environment',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete an environment',
        action: 'Delete an environment',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get an environment',
        action: 'Get an environment',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all environments',
        action: 'List environments',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an environment',
        action: 'Update an environment',
      },
    ],
    default: 'list',
  },
];

export const environmentFields: INodeProperties[] = [
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
        resource: ['environment'],
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
        resource: ['environment'],
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
        resource: ['environment'],
        operation: ['list'],
        returnAll: [false],
      },
    },
  },

  // ----------------------------------
  //         get / update / delete
  // ----------------------------------
  {
    displayName: 'Environment ID',
    name: 'environmentId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the environment',
    displayOptions: {
      show: {
        resource: ['environment'],
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
    description: 'The name of the environment to create',
    displayOptions: {
      show: {
        resource: ['environment'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Production',
    name: 'production',
    type: 'boolean',
    default: false,
    description: 'Whether this is a production environment',
    displayOptions: {
      show: {
        resource: ['environment'],
        operation: ['create'],
      },
    },
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
        resource: ['environment'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the environment',
      },
      {
        displayName: 'Production',
        name: 'production',
        type: 'boolean',
        default: false,
        description: 'Whether this is a production environment',
      },
    ],
  },
];
