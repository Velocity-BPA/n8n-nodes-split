/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import {
  featureFlagOperations,
  featureFlagFields,
  definitionOperations,
  definitionFields,
  segmentOperations,
  segmentFields,
  environmentOperations,
  environmentFields,
  workspaceOperations,
  workspaceFields,
  trafficTypeOperations,
  trafficTypeFields,
  identityOperations,
  identityFields,
  metricOperations,
  metricFields,
  apiKeyOperations,
  apiKeyFields,
  groupOperations,
  groupFields,
  auditLogOperations,
  auditLogFields,
  rolloutPlanOperations,
  rolloutPlanFields,
} from './descriptions';

import * as featureFlag from './actions/featureFlag';
import * as definition from './actions/definition';
import * as segment from './actions/segment';
import * as environment from './actions/environment';
import * as workspace from './actions/workspace';
import * as trafficType from './actions/trafficType';
import * as identity from './actions/identity';
import * as metric from './actions/metric';
import * as apiKey from './actions/apiKey';
import * as group from './actions/group';
import * as auditLog from './actions/auditLog';
import * as rolloutPlan from './actions/rolloutPlan';

import { logLicensingNotice } from './utils';

export class Split implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Split',
    name: 'split',
    icon: 'file:split.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Split feature flag and experimentation platform',
    defaults: {
      name: 'Split',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'splitApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'API Key',
            value: 'apiKey',
          },
          {
            name: 'Audit Log',
            value: 'auditLog',
          },
          {
            name: 'Definition',
            value: 'definition',
          },
          {
            name: 'Environment',
            value: 'environment',
          },
          {
            name: 'Feature Flag',
            value: 'featureFlag',
          },
          {
            name: 'Group (Metric Group)',
            value: 'group',
          },
          {
            name: 'Identity',
            value: 'identity',
          },
          {
            name: 'Metric',
            value: 'metric',
          },
          {
            name: 'Rollout Plan',
            value: 'rolloutPlan',
          },
          {
            name: 'Segment',
            value: 'segment',
          },
          {
            name: 'Traffic Type',
            value: 'trafficType',
          },
          {
            name: 'Workspace',
            value: 'workspace',
          },
        ],
        default: 'featureFlag',
      },
      // Feature Flag
      ...featureFlagOperations,
      ...featureFlagFields,
      // Definition
      ...definitionOperations,
      ...definitionFields,
      // Segment
      ...segmentOperations,
      ...segmentFields,
      // Environment
      ...environmentOperations,
      ...environmentFields,
      // Workspace
      ...workspaceOperations,
      ...workspaceFields,
      // Traffic Type
      ...trafficTypeOperations,
      ...trafficTypeFields,
      // Identity
      ...identityOperations,
      ...identityFields,
      // Metric
      ...metricOperations,
      ...metricFields,
      // API Key
      ...apiKeyOperations,
      ...apiKeyFields,
      // Group (Metric Group)
      ...groupOperations,
      ...groupFields,
      // Audit Log
      ...auditLogOperations,
      ...auditLogFields,
      // Rollout Plan
      ...rolloutPlanOperations,
      ...rolloutPlanFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // Log licensing notice once per node load
    logLicensingNotice(this.logger);

    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let result: INodeExecutionData[] = [];

        switch (resource) {
          case 'featureFlag':
            switch (operation) {
              case 'list':
                result = await featureFlag.list.call(this, i);
                break;
              case 'get':
                result = await featureFlag.get.call(this, i);
                break;
              case 'create':
                result = await featureFlag.create.call(this, i);
                break;
              case 'update':
                result = await featureFlag.update.call(this, i);
                break;
              case 'delete':
                result = await featureFlag.remove.call(this, i);
                break;
              case 'kill':
                result = await featureFlag.kill.call(this, i);
                break;
              case 'restore':
                result = await featureFlag.restore.call(this, i);
                break;
              case 'associateTags':
                result = await featureFlag.associateTags.call(this, i);
                break;
              case 'removeTags':
                result = await featureFlag.removeTags.call(this, i);
                break;
            }
            break;

          case 'definition':
            switch (operation) {
              case 'get':
                result = await definition.get.call(this, i);
                break;
              case 'updateTargeting':
                result = await definition.updateTargeting.call(this, i);
                break;
              case 'updateDefaultRule':
                result = await definition.updateDefaultRule.call(this, i);
                break;
              case 'activate':
                result = await definition.activate.call(this, i);
                break;
              case 'deactivate':
                result = await definition.deactivate.call(this, i);
                break;
              case 'setDefaultTreatment':
                result = await definition.setDefaultTreatment.call(this, i);
                break;
              case 'addTreatment':
                result = await definition.addTreatment.call(this, i);
                break;
              case 'removeTreatment':
                result = await definition.removeTreatment.call(this, i);
                break;
              case 'addTargetingRule':
                result = await definition.addTargetingRule.call(this, i);
                break;
              case 'updateTargetingRule':
                result = await definition.updateTargetingRule.call(this, i);
                break;
              case 'removeTargetingRule':
                result = await definition.removeTargetingRule.call(this, i);
                break;
            }
            break;

          case 'segment':
            switch (operation) {
              case 'list':
                result = await segment.list.call(this, i);
                break;
              case 'get':
                result = await segment.get.call(this, i);
                break;
              case 'create':
                result = await segment.create.call(this, i);
                break;
              case 'update':
                result = await segment.update.call(this, i);
                break;
              case 'delete':
                result = await segment.remove.call(this, i);
                break;
              case 'addKeys':
                result = await segment.addKeys.call(this, i);
                break;
              case 'removeKeys':
                result = await segment.removeKeys.call(this, i);
                break;
              case 'getKeys':
                result = await segment.getKeys.call(this, i);
                break;
              case 'importKeys':
                result = await segment.importKeys.call(this, i);
                break;
              case 'exportKeys':
                result = await segment.exportKeys.call(this, i);
                break;
              case 'getSize':
                result = await segment.getSize.call(this, i);
                break;
            }
            break;

          case 'environment':
            switch (operation) {
              case 'list':
                result = await environment.list.call(this, i);
                break;
              case 'get':
                result = await environment.get.call(this, i);
                break;
              case 'create':
                result = await environment.create.call(this, i);
                break;
              case 'update':
                result = await environment.update.call(this, i);
                break;
              case 'delete':
                result = await environment.remove.call(this, i);
                break;
            }
            break;

          case 'workspace':
            switch (operation) {
              case 'list':
                result = await workspace.list.call(this, i);
                break;
              case 'get':
                result = await workspace.get.call(this, i);
                break;
              case 'create':
                result = await workspace.create.call(this, i);
                break;
              case 'update':
                result = await workspace.update.call(this, i);
                break;
              case 'delete':
                result = await workspace.remove.call(this, i);
                break;
            }
            break;

          case 'trafficType':
            switch (operation) {
              case 'list':
                result = await trafficType.list.call(this, i);
                break;
              case 'get':
                result = await trafficType.get.call(this, i);
                break;
              case 'create':
                result = await trafficType.create.call(this, i);
                break;
            }
            break;

          case 'identity':
            switch (operation) {
              case 'save':
                result = await identity.save.call(this, i);
                break;
              case 'get':
                result = await identity.get.call(this, i);
                break;
              case 'delete':
                result = await identity.remove.call(this, i);
                break;
            }
            break;

          case 'metric':
            switch (operation) {
              case 'list':
                result = await metric.list.call(this, i);
                break;
              case 'get':
                result = await metric.get.call(this, i);
                break;
              case 'create':
                result = await metric.create.call(this, i);
                break;
              case 'update':
                result = await metric.update.call(this, i);
                break;
              case 'delete':
                result = await metric.remove.call(this, i);
                break;
            }
            break;

          case 'apiKey':
            switch (operation) {
              case 'list':
                result = await apiKey.list.call(this, i);
                break;
              case 'create':
                result = await apiKey.create.call(this, i);
                break;
              case 'delete':
                result = await apiKey.remove.call(this, i);
                break;
            }
            break;

          case 'group':
            switch (operation) {
              case 'list':
                result = await group.list.call(this, i);
                break;
              case 'get':
                result = await group.get.call(this, i);
                break;
              case 'create':
                result = await group.create.call(this, i);
                break;
              case 'update':
                result = await group.update.call(this, i);
                break;
              case 'delete':
                result = await group.remove.call(this, i);
                break;
              case 'addMetrics':
                result = await group.addMetrics.call(this, i);
                break;
              case 'removeMetrics':
                result = await group.removeMetrics.call(this, i);
                break;
            }
            break;

          case 'auditLog':
            switch (operation) {
              case 'list':
                result = await auditLog.list.call(this, i);
                break;
              case 'getEntry':
                result = await auditLog.getEntry.call(this, i);
                break;
              case 'search':
                result = await auditLog.search.call(this, i);
                break;
              case 'export':
                result = await auditLog.exportAuditLog.call(this, i);
                break;
            }
            break;

          case 'rolloutPlan':
            switch (operation) {
              case 'list':
                result = await rolloutPlan.list.call(this, i);
                break;
              case 'get':
                result = await rolloutPlan.get.call(this, i);
                break;
              case 'create':
                result = await rolloutPlan.create.call(this, i);
                break;
              case 'update':
                result = await rolloutPlan.update.call(this, i);
                break;
              case 'delete':
                result = await rolloutPlan.remove.call(this, i);
                break;
              case 'activate':
                result = await rolloutPlan.activate.call(this, i);
                break;
              case 'pause':
                result = await rolloutPlan.pause.call(this, i);
                break;
            }
            break;
        }

        returnData.push(...result);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
