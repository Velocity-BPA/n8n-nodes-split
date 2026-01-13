/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const definitionOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['definition'],
      },
    },
    options: [
      {
        name: 'Activate',
        value: 'activate',
        description: 'Activate a feature flag in an environment',
        action: 'Activate a split definition',
      },
      {
        name: 'Add Targeting Rule',
        value: 'addTargetingRule',
        description: 'Add a targeting rule to the definition',
        action: 'Add targeting rule',
      },
      {
        name: 'Add Treatment',
        value: 'addTreatment',
        description: 'Add a treatment variation',
        action: 'Add treatment',
      },
      {
        name: 'Deactivate',
        value: 'deactivate',
        description: 'Deactivate a feature flag in an environment',
        action: 'Deactivate a split definition',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a split definition for an environment',
        action: 'Get a split definition',
      },
      {
        name: 'Remove Targeting Rule',
        value: 'removeTargetingRule',
        description: 'Remove a targeting rule from the definition',
        action: 'Remove targeting rule',
      },
      {
        name: 'Remove Treatment',
        value: 'removeTreatment',
        description: 'Remove a treatment variation',
        action: 'Remove treatment',
      },
      {
        name: 'Set Default Treatment',
        value: 'setDefaultTreatment',
        description: 'Set the default treatment',
        action: 'Set default treatment',
      },
      {
        name: 'Update Default Rule',
        value: 'updateDefaultRule',
        description: 'Update the default rule (rollout percentages)',
        action: 'Update default rule',
      },
      {
        name: 'Update Targeting',
        value: 'updateTargeting',
        description: 'Update targeting rules using JSON Patch',
        action: 'Update targeting rules',
      },
      {
        name: 'Update Targeting Rule',
        value: 'updateTargetingRule',
        description: 'Update an existing targeting rule',
        action: 'Update targeting rule',
      },
    ],
    default: 'get',
  },
];

export const definitionFields: INodeProperties[] = [
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
        resource: ['definition'],
      },
    },
  },
  {
    displayName: 'Split Name',
    name: 'splitName',
    type: 'string',
    required: true,
    default: '',
    description: 'The name of the feature flag (split)',
    displayOptions: {
      show: {
        resource: ['definition'],
      },
    },
  },
  {
    displayName: 'Environment ID',
    name: 'environmentId',
    type: 'string',
    required: true,
    default: '',
    description: 'The ID of the environment (e.g., "Production", "Staging")',
    displayOptions: {
      show: {
        resource: ['definition'],
      },
    },
  },

  // ----------------------------------
  //         updateDefaultRule
  // ----------------------------------
  {
    displayName: 'Treatments Distribution',
    name: 'treatmentsDistribution',
    type: 'string',
    required: true,
    default: 'on:50,off:50',
    description:
      'Treatment distribution as "treatment:percentage" pairs separated by commas (e.g., "on:80,off:20")',
    displayOptions: {
      show: {
        resource: ['definition'],
        operation: ['updateDefaultRule'],
      },
    },
  },

  // ----------------------------------
  //         updateTargeting
  // ----------------------------------
  {
    displayName: 'Patch Operations',
    name: 'patchOperations',
    type: 'json',
    required: true,
    default: '[]',
    description:
      'JSON Patch operations array. Example: [{"op": "replace", "path": "/defaultRule", "value": [{"treatment": "on", "size": 100}]}]',
    displayOptions: {
      show: {
        resource: ['definition'],
        operation: ['updateTargeting'],
      },
    },
  },
  {
    displayName: 'Comments',
    name: 'comments',
    type: 'string',
    default: '',
    description: 'Comments for the change (required if workspace has comments enabled)',
    displayOptions: {
      show: {
        resource: ['definition'],
        operation: ['updateTargeting', 'updateDefaultRule', 'activate', 'deactivate'],
      },
    },
  },
  {
    displayName: 'Title',
    name: 'title',
    type: 'string',
    default: '',
    description: 'Title for the change (required if workspace has title enabled)',
    displayOptions: {
      show: {
        resource: ['definition'],
        operation: ['updateTargeting', 'updateDefaultRule', 'activate', 'deactivate', 'addTreatment', 'removeTreatment', 'setDefaultTreatment', 'addTargetingRule', 'updateTargetingRule', 'removeTargetingRule'],
      },
    },
  },

  // ----------------------------------
  //         setDefaultTreatment
  // ----------------------------------
  {
    displayName: 'Default Treatment',
    name: 'defaultTreatment',
    type: 'string',
    required: true,
    default: 'off',
    description: 'The treatment to serve as default',
    displayOptions: {
      show: {
        resource: ['definition'],
        operation: ['setDefaultTreatment'],
      },
    },
  },

  // ----------------------------------
  //         addTreatment
  // ----------------------------------
  {
    displayName: 'Treatment Name',
    name: 'treatmentName',
    type: 'string',
    required: true,
    default: '',
    description: 'The name of the treatment to add',
    displayOptions: {
      show: {
        resource: ['definition'],
        operation: ['addTreatment', 'removeTreatment'],
      },
    },
  },
  {
    displayName: 'Treatment Description',
    name: 'treatmentDescription',
    type: 'string',
    default: '',
    description: 'Description of the treatment',
    displayOptions: {
      show: {
        resource: ['definition'],
        operation: ['addTreatment'],
      },
    },
  },

  // ----------------------------------
  //         Targeting Rules
  // ----------------------------------
  {
    displayName: 'Rule Index',
    name: 'ruleIndex',
    type: 'number',
    required: true,
    default: 0,
    description: 'The index of the targeting rule (0-based)',
    displayOptions: {
      show: {
        resource: ['definition'],
        operation: ['updateTargetingRule', 'removeTargetingRule'],
      },
    },
  },
  {
    displayName: 'Rule (JSON)',
    name: 'rule',
    type: 'json',
    required: true,
    default: '{}',
    description: 'The targeting rule as JSON. Example: {"buckets": [{"treatment": "on", "size": 100}], "condition": {"combiner": "AND", "matchers": []}}',
    displayOptions: {
      show: {
        resource: ['definition'],
        operation: ['addTargetingRule', 'updateTargetingRule'],
      },
    },
  },
];
