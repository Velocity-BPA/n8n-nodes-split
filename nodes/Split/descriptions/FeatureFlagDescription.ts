/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const featureFlagOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['featureFlag'],
      },
    },
    options: [
      {
        name: 'Associate Tags',
        value: 'associateTags',
        description: 'Add tags to a feature flag',
        action: 'Associate tags with a feature flag',
      },
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new feature flag',
        action: 'Create a feature flag',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a feature flag',
        action: 'Delete a feature flag',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a feature flag',
        action: 'Get a feature flag',
      },
      {
        name: 'Kill',
        value: 'kill',
        description: 'Kill a feature flag in an environment',
        action: 'Kill a feature flag',
      },
      {
        name: 'List',
        value: 'list',
        description: 'List all feature flags',
        action: 'List feature flags',
      },
      {
        name: 'Remove Tags',
        value: 'removeTags',
        description: 'Remove tags from a feature flag',
        action: 'Remove tags from a feature flag',
      },
      {
        name: 'Restore',
        value: 'restore',
        description: 'Restore a killed feature flag',
        action: 'Restore a feature flag',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update a feature flag',
        action: 'Update a feature flag',
      },
    ],
    default: 'list',
  },
];

export const featureFlagFields: INodeProperties[] = [
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
        resource: ['featureFlag'],
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
        resource: ['featureFlag'],
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
        resource: ['featureFlag'],
        operation: ['list'],
        returnAll: [false],
      },
    },
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['featureFlag'],
        operation: ['list'],
      },
    },
    options: [
      {
        displayName: 'Tag',
        name: 'tag',
        type: 'string',
        default: '',
        description: 'Filter by tag name',
      },
      {
        displayName: 'Name Filter',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Filter by name (partial match)',
      },
    ],
  },

  // ----------------------------------
  //         get
  // ----------------------------------
  {
    displayName: 'Split Name',
    name: 'splitName',
    type: 'string',
    required: true,
    default: '',
    description: 'The name of the feature flag (split)',
    displayOptions: {
      show: {
        resource: ['featureFlag'],
        operation: ['get', 'update', 'delete', 'kill', 'restore', 'associateTags', 'removeTags'],
      },
    },
  },

  // ----------------------------------
  //         associateTags / removeTags
  // ----------------------------------
  {
    displayName: 'Tags',
    name: 'tags',
    type: 'string',
    required: true,
    default: '',
    description: 'Comma-separated list of tag names',
    displayOptions: {
      show: {
        resource: ['featureFlag'],
        operation: ['associateTags', 'removeTags'],
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
    description: 'The name of the traffic type (e.g., "user", "account")',
    displayOptions: {
      show: {
        resource: ['featureFlag'],
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
    description: 'The name of the feature flag to create',
    displayOptions: {
      show: {
        resource: ['featureFlag'],
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
        resource: ['featureFlag'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the feature flag',
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
        resource: ['featureFlag'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'New description for the feature flag',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'New name for the feature flag',
      },
    ],
  },

  // ----------------------------------
  //         kill / restore
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
        resource: ['featureFlag'],
        operation: ['kill', 'restore'],
      },
    },
  },
  {
    displayName: 'Default Treatment',
    name: 'defaultTreatment',
    type: 'string',
    required: true,
    default: 'off',
    description: 'The treatment to serve when the flag is killed',
    displayOptions: {
      show: {
        resource: ['featureFlag'],
        operation: ['kill'],
      },
    },
  },
];
