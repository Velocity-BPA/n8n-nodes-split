/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const identityOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['identity'],
      },
    },
    options: [
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete an identity',
        action: 'Delete an identity',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get an identity',
        action: 'Get an identity',
      },
      {
        name: 'Save',
        value: 'save',
        description: 'Save/update an identity',
        action: 'Save an identity',
      },
    ],
    default: 'save',
  },
];

export const identityFields: INodeProperties[] = [
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
        resource: ['identity'],
      },
    },
  },
  {
    displayName: 'Environment ID',
    name: 'environmentId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the environment',
    displayOptions: {
      show: {
        resource: ['identity'],
      },
    },
  },
  {
    displayName: 'Traffic Type Name',
    name: 'trafficTypeName',
    type: 'string',
    required: true,
    default: 'user',
    description: 'The name of the traffic type',
    displayOptions: {
      show: {
        resource: ['identity'],
      },
    },
  },
  {
    displayName: 'Key',
    name: 'key',
    type: 'string',
    required: true,
    default: '',
    description: 'The identity key (user ID, account ID, etc.)',
    displayOptions: {
      show: {
        resource: ['identity'],
      },
    },
  },

  // ----------------------------------
  //         save
  // ----------------------------------
  {
    displayName: 'Attributes',
    name: 'attributes',
    type: 'json',
    default: '{}',
    description: 'Identity attributes as JSON object',
    displayOptions: {
      show: {
        resource: ['identity'],
        operation: ['save'],
      },
    },
  },
];
