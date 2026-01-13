/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class SplitApi implements ICredentialType {
  name = 'splitApi';
  displayName = 'Split API';
  documentationUrl = 'https://docs.split.io/reference/api-overview';
  properties: INodeProperties[] = [
    {
      displayName: 'Admin API Key',
      name: 'adminApiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'Split Admin API Key. Create one in Admin Settings > API Keys.',
    },
    {
      displayName: 'Organization ID',
      name: 'organizationId',
      type: 'string',
      default: '',
      required: true,
      description:
        'Your Split Organization ID. Found in Admin Settings > Organization settings.',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '={{"Bearer " + $credentials.adminApiKey}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.split.io/internal/api/v2',
      url: '/workspaces',
      method: 'GET',
    },
  };
}
