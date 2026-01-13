/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const workspaceOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['workspace'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new workspace',
        action: 'Create a workspace',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a workspace',
        action: 'Delete a workspace',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a workspace',
        action: 'Get a workspace',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all workspaces',
        action: 'List workspaces',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a workspace',
        action: 'Update a workspace',
      },
    ],
    default: 'list',
  },
];

export const workspaceFields: INodeProperties[] = [
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
        resource: ['workspace'],
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
        resource: ['workspace'],
        operation: ['list'],
        returnAll: [false],
      },
    },
  },

  // ----------------------------------
  //         get / update / delete
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
        resource: ['workspace'],
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
    description: 'The name of the workspace to create',
    displayOptions: {
      show: {
        resource: ['workspace'],
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
        resource: ['workspace'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Require Title and Comments',
        name: 'requiresTitleAndComments',
        type: 'boolean',
        default: false,
        description: 'Whether changes require a title and comments',
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
        resource: ['workspace'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the workspace',
      },
      {
        displayName: 'Require Title and Comments',
        name: 'requiresTitleAndComments',
        type: 'boolean',
        default: false,
        description: 'Whether changes require a title and comments',
      },
    ],
  },
];
