/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const segmentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['segment'],
      },
    },
    options: [
      {
        name: 'Add Keys',
        value: 'addKeys',
        description: 'Add keys to a segment',
        action: 'Add keys to a segment',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new segment',
        action: 'Create a segment',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a segment',
        action: 'Delete a segment',
      },
      {
        name: 'Export Keys',
        value: 'exportKeys',
        description: 'Export segment keys',
        action: 'Export segment keys',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a segment',
        action: 'Get a segment',
      },
      {
        name: 'Get Keys',
        value: 'getKeys',
        description: 'Get keys in a segment',
        action: 'Get segment keys',
      },
      {
        name: 'Get Size',
        value: 'getSize',
        description: 'Get the number of keys in a segment',
        action: 'Get segment size',
      },
      {
        name: 'Import Keys',
        value: 'importKeys',
        description: 'Bulk import keys to a segment',
        action: 'Import keys to a segment',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all segments',
        action: 'List segments',
      },
      {
        name: 'Remove Keys',
        value: 'removeKeys',
        description: 'Remove keys from a segment',
        action: 'Remove keys from a segment',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a segment',
        action: 'Update a segment',
      },
    ],
    default: 'list',
  },
];

export const segmentFields: INodeProperties[] = [
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
        resource: ['segment'],
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
        resource: ['segment'],
        operation: ['list', 'getKeys'],
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
        resource: ['segment'],
        operation: ['list', 'getKeys'],
        returnAll: [false],
      },
    },
  },

  // ----------------------------------
  //         get / update / delete / addKeys / removeKeys / getKeys / importKeys / exportKeys / getSize
  // ----------------------------------
  {
    displayName: 'Segment Name',
    name: 'segmentName',
    type: 'string',
    required: true,
    default: '',
    description: 'The name of the segment',
    displayOptions: {
      show: {
        resource: ['segment'],
        operation: ['get', 'update', 'delete', 'addKeys', 'removeKeys', 'getKeys', 'importKeys', 'exportKeys', 'getSize'],
      },
    },
  },

  // ----------------------------------
  //         environment for keys operations
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
        resource: ['segment'],
        operation: ['addKeys', 'removeKeys', 'getKeys', 'importKeys', 'exportKeys', 'getSize'],
      },
    },
  },

  // ----------------------------------
  //         create
  // ----------------------------------
  {
    displayName: 'Traffic Type Name',
    name: 'trafficTypeName',
    type: 'string',
    required: true,
    default: 'user',
    description: 'The name of the traffic type',
    displayOptions: {
      show: {
        resource: ['segment'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    description: 'The name of the segment to create',
    displayOptions: {
      show: {
        resource: ['segment'],
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
        resource: ['segment'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the segment',
      },
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        description: 'Comma-separated list of tags',
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
        resource: ['segment'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'New description for the segment',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the segment',
      },
    ],
  },

  // ----------------------------------
  //         addKeys / removeKeys / importKeys
  // ----------------------------------
  {
    displayName: 'Keys',
    name: 'keys',
    type: 'string',
    required: true,
    default: '',
    description: 'Comma-separated list of keys to add or remove',
    displayOptions: {
      show: {
        resource: ['segment'],
        operation: ['addKeys', 'removeKeys', 'importKeys'],
      },
    },
  },
  {
    displayName: 'Comments',
    name: 'comments',
    type: 'string',
    default: '',
    description: 'Comments for the change',
    displayOptions: {
      show: {
        resource: ['segment'],
        operation: ['addKeys', 'removeKeys', 'importKeys'],
      },
    },
  },
  {
    displayName: 'Replace Existing',
    name: 'replaceExisting',
    type: 'boolean',
    default: false,
    description: 'Whether to replace all existing keys (true) or append to them (false)',
    displayOptions: {
      show: {
        resource: ['segment'],
        operation: ['importKeys'],
      },
    },
  },
];
