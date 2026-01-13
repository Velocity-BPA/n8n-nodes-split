/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
  IHookFunctions,
  IWebhookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
  IDataObject,
} from 'n8n-workflow';

import { logLicensingNotice } from './utils';

export class SplitTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Split Trigger',
    name: 'splitTrigger',
    icon: 'file:split.svg',
    group: ['trigger'],
    version: 1,
    subtitle: '={{$parameter["event"]}}',
    description: 'Receive webhooks from Split for feature flag events',
    defaults: {
      name: 'Split Trigger',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'splitApi',
        required: false,
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
      },
    ],
    properties: [
      {
        displayName: 'Event',
        name: 'event',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'All Events',
            value: 'all',
            description: 'Receive all Split webhook events',
          },
          {
            name: 'Audit Log',
            value: 'auditLog',
            description: 'Administrative actions audit log',
          },
          {
            name: 'Impressions',
            value: 'impressions',
            description: 'Feature flag evaluation impressions',
          },
          {
            name: 'Metric Alert',
            value: 'metricAlert',
            description: 'Metric threshold alerts',
          },
          {
            name: 'Significance Event',
            value: 'significanceEvent',
            description: 'Experiment statistical significance events',
          },
          {
            name: 'Split Change',
            value: 'splitChange',
            description: 'Feature flag configuration changes',
          },
          {
            name: 'Segment Change',
            value: 'segmentChange',
            description: 'Segment configuration changes',
          },
        ],
        default: 'all',
        description: 'The type of event to listen for',
      },
      {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        placeholder: 'Add Option',
        default: {},
        options: [
          {
            displayName: 'Validate Payload',
            name: 'validatePayload',
            type: 'boolean',
            default: false,
            description: 'Whether to validate the webhook payload structure',
          },
          {
            displayName: 'Include Headers',
            name: 'includeHeaders',
            type: 'boolean',
            default: false,
            description: 'Whether to include request headers in the output',
          },
          {
            displayName: 'Filter by Workspace',
            name: 'workspaceFilter',
            type: 'string',
            default: '',
            description: 'Only process events from this workspace ID',
          },
          {
            displayName: 'Filter by Environment',
            name: 'environmentFilter',
            type: 'string',
            default: '',
            description: 'Only process events from this environment ID',
          },
        ],
      },
    ],
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        // Split webhooks are configured externally in Split dashboard
        // This just confirms the webhook URL is set up
        return true;
      },
      async create(this: IHookFunctions): Promise<boolean> {
        // Log licensing notice
        logLicensingNotice(this.logger);

        // Webhook creation is manual in Split dashboard
        // Log the webhook URL for user to configure
        const webhookUrl = this.getNodeWebhookUrl('default');
        this.logger.info(`Split webhook URL: ${webhookUrl}`);
        this.logger.info(
          'Configure this URL in your Split dashboard under Admin Settings > Integrations > Webhooks',
        );
        return true;
      },
      async delete(this: IHookFunctions): Promise<boolean> {
        // Webhook deletion is manual in Split dashboard
        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const event = this.getNodeParameter('event') as string;
    const options = this.getNodeParameter('options', {}) as {
      validatePayload?: boolean;
      includeHeaders?: boolean;
      workspaceFilter?: string;
      environmentFilter?: string;
    };

    const req = this.getRequestObject();
    const body = this.getBodyData();
    const headers = this.getHeaderData();

    // Determine event type from payload
    const eventType = (body.type as string) || (body.eventType as string) || 'unknown';

    // Filter by event type if specific event selected
    if (event !== 'all') {
      const eventTypeMap: Record<string, string[]> = {
        auditLog: ['audit', 'audit_log', 'auditLog'],
        impressions: ['impression', 'impressions'],
        metricAlert: ['metric_alert', 'metricAlert', 'alert'],
        significanceEvent: ['significance', 'significanceEvent', 'significance_event'],
        splitChange: ['split_change', 'splitChange', 'split', 'feature_flag'],
        segmentChange: ['segment_change', 'segmentChange', 'segment'],
      };

      const allowedTypes = eventTypeMap[event] || [];
      if (!allowedTypes.some((t) => eventType.toLowerCase().includes(t.toLowerCase()))) {
        // Event doesn't match filter, skip
        return {
          noWebhookResponse: true,
        };
      }
    }

    // Filter by workspace if specified
    if (options.workspaceFilter) {
      const workspace = body.workspace as IDataObject | undefined;
      const data = body.data as IDataObject | undefined;
      const workspaceId =
        (body.workspaceId as string) ||
        (workspace?.id as string) ||
        (data?.workspaceId as string);
      if (workspaceId && workspaceId !== options.workspaceFilter) {
        return {
          noWebhookResponse: true,
        };
      }
    }

    // Filter by environment if specified
    if (options.environmentFilter) {
      const environment = body.environment as IDataObject | undefined;
      const data = body.data as IDataObject | undefined;
      const environmentId =
        (body.environmentId as string) ||
        (environment?.id as string) ||
        (data?.environmentId as string);
      if (environmentId && environmentId !== options.environmentFilter) {
        return {
          noWebhookResponse: true,
        };
      }
    }

    // Validate payload structure if enabled
    if (options.validatePayload) {
      if (!body || typeof body !== 'object') {
        return {
          webhookResponse: {
            status: 400,
            body: { error: 'Invalid payload structure' },
          },
        };
      }
    }

    // Build output data
    const outputData: IDataObject = {
      eventType,
      timestamp: (body.timestamp as string) || new Date().toISOString(),
      payload: body,
    };

    // Include headers if requested
    if (options.includeHeaders) {
      outputData.headers = headers;
    }

    // Add metadata
    outputData.metadata = {
      receivedAt: new Date().toISOString(),
      webhookPath: req.path,
      method: req.method,
    };

    return {
      workflowData: [[{ json: outputData }]],
    };
  }
}
