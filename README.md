# n8n-nodes-split

> [Velocity BPA Licensing Notice]
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for **Split** (by Harness) - the feature flag and experimentation platform. This node provides complete access to Split's Admin API for automating feature flag management, targeting rules, segments, environments, and experimentation workflows.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Features

- **Feature Flags (Splits)**: Create, update, delete, kill, restore, and manage tags
- **Split Definitions**: Configure targeting rules, treatments, default rules, and rollout percentages
- **Segments**: Manage user segments with key-based targeting, import/export keys
- **Environments**: Manage deployment environments (staging, production, etc.)
- **Workspaces**: Organize and manage workspaces
- **Traffic Types**: Configure traffic types for different user categories
- **Identities**: Manage user identities and attributes
- **Metrics**: Configure metrics for experimentation
- **Groups (Metric Groups)**: Organize metrics into groups
- **API Keys**: Manage API keys with different permission levels
- **Audit Log**: View, search, and export audit log entries
- **Rollout Plans**: Create and manage gradual rollout plans
- **Webhook Triggers**: Receive real-time notifications for Split events

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-split`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-split
```

### Development Installation

```bash
# 1. Extract the zip file
unzip n8n-nodes-split.zip
cd n8n-nodes-split

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Create symlink to n8n custom nodes directory
# For Linux/macOS:
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-split

# For Windows (run as Administrator):
# mklink /D %USERPROFILE%\.n8n\custom\n8n-nodes-split %CD%

# 5. Restart n8n
n8n start
```

## Credentials Setup

### Split API Credentials

| Field | Type | Description |
|-------|------|-------------|
| Admin API Key | Password | Split Admin API key from Admin Settings → API Keys |
| Organization ID | String | Your Split organization identifier |

### Creating API Credentials in Split

1. Log in to your Split dashboard
2. Navigate to **Admin Settings** → **API Keys**
3. Click **Create API Key**
4. Select **Admin** key type for full access
5. Copy the generated API key
6. In n8n, create new **Split API** credentials
7. Paste the API key and enter your Organization ID

## Resources & Operations

### Feature Flags (Splits)

| Operation | Description |
|-----------|-------------|
| List | List all feature flags in a workspace |
| Get | Get details of a specific feature flag |
| Create | Create a new feature flag |
| Update | Update feature flag properties (PATCH) |
| Delete | Delete a feature flag |
| Kill | Kill a feature flag in an environment |
| Restore | Restore a killed feature flag |
| Associate Tags | Add tags to a feature flag |
| Remove Tags | Remove tags from a feature flag |

### Split Definitions

| Operation | Description |
|-----------|-------------|
| Get | Get definition for a specific environment |
| Update Targeting | Update targeting rules using JSON Patch |
| Update Default Rule | Update the default rollout percentages |
| Activate | Activate a feature flag in an environment |
| Deactivate | Deactivate (kill) a feature flag |
| Set Default Treatment | Set the default treatment |
| Add Treatment | Add a treatment variation |
| Remove Treatment | Remove a treatment variation |
| Add Targeting Rule | Add a targeting rule |
| Update Targeting Rule | Update an existing targeting rule |
| Remove Targeting Rule | Remove a targeting rule |

### Segments

| Operation | Description |
|-----------|-------------|
| List | List all segments |
| Get | Get segment details |
| Create | Create a new segment |
| Update | Update segment properties |
| Delete | Delete a segment |
| Add Keys | Add user keys to a segment |
| Remove Keys | Remove user keys from a segment |
| Get Keys | Get all keys in a segment |
| Import Keys | Bulk import keys to a segment |
| Export Keys | Export segment keys |
| Get Size | Get the number of keys in a segment |

### Environments

| Operation | Description |
|-----------|-------------|
| List | List all environments |
| Get | Get environment details |
| Create | Create a new environment |
| Update | Update environment properties |
| Delete | Delete an environment |

### Workspaces

| Operation | Description |
|-----------|-------------|
| List | List all workspaces |
| Get | Get workspace details |
| Create | Create a new workspace |
| Update | Update workspace properties |
| Delete | Delete a workspace |

### Traffic Types

| Operation | Description |
|-----------|-------------|
| List | List all traffic types |
| Get | Get traffic type details |
| Create | Create a new traffic type |

### Identities

| Operation | Description |
|-----------|-------------|
| Save | Create or update an identity |
| Get | Get identity details |
| Delete | Delete an identity |

### Metrics

| Operation | Description |
|-----------|-------------|
| List | List all metrics |
| Get | Get metric details |
| Create | Create a new metric |
| Update | Update metric properties |
| Delete | Delete a metric |

### API Keys

| Operation | Description |
|-----------|-------------|
| List | List all API keys |
| Create | Create a new API key |
| Delete | Delete an API key |

### Groups (Metric Groups)

| Operation | Description |
|-----------|-------------|
| List | List all metric groups |
| Get | Get metric group details |
| Create | Create a new metric group |
| Update | Update metric group properties |
| Delete | Delete a metric group |
| Add Metrics | Add metrics to a group |
| Remove Metrics | Remove metrics from a group |

### Audit Log

| Operation | Description |
|-----------|-------------|
| List | List audit log entries |
| Get Entry | Get a specific audit log entry |
| Search | Search audit log entries |
| Export | Export audit log data |

### Rollout Plans

| Operation | Description |
|-----------|-------------|
| List | List all rollout plans |
| Get | Get rollout plan details |
| Create | Create a new rollout plan |
| Update | Update rollout plan properties |
| Delete | Delete a rollout plan |
| Activate | Activate a rollout plan |
| Pause | Pause a rollout plan |

## Trigger Node

The **Split Trigger** node receives webhook events from Split:

| Event Type | Description |
|------------|-------------|
| All Events | Receive all Split webhook events |
| Audit Log | Administrative actions audit log |
| Impressions | Feature flag evaluation impressions |
| Metric Alert | Metric threshold alerts |
| Significance Event | Experiment statistical significance events |
| Split Change | Feature flag configuration changes |
| Segment Change | Segment configuration changes |

### Webhook Configuration

1. Add the **Split Trigger** node to your workflow
2. Copy the webhook URL from the node
3. In Split, go to **Admin Settings** → **Integrations** → **Webhooks**
4. Add the webhook URL and select the events you want to receive

## Usage Examples

### Create a Feature Flag

```javascript
// Node configuration
{
  "resource": "featureFlag",
  "operation": "create",
  "workspaceId": "ws-123456",
  "trafficTypeName": "user",
  "name": "new-checkout-flow",
  "additionalFields": {
    "description": "New checkout experience",
    "tags": "checkout, experiment"
  }
}
```

### Update Rollout Percentage

```javascript
// Node configuration
{
  "resource": "definition",
  "operation": "updateDefaultRule",
  "workspaceId": "ws-123456",
  "splitName": "new-checkout-flow",
  "environmentId": "env-production",
  "treatmentsDistribution": "on:25, off:75"
}
```

### Add Users to Segment

```javascript
// Node configuration
{
  "resource": "segment",
  "operation": "addKeys",
  "workspaceId": "ws-123456",
  "segmentName": "beta-users",
  "environmentId": "env-production",
  "keys": "user-1, user-2, user-3"
}
```

## Split Concepts

### Feature Flags (Splits)

Feature flags (called "splits" in Split) allow you to control feature releases independently of code deployments. Each split can have multiple treatments (variations) that users can be assigned to.

### Treatments

Treatments are the different variations of a feature flag. Common treatments include:
- `on` / `off` - Simple binary flags
- `control` / `variant_a` / `variant_b` - A/B/C testing variations
- Custom treatments for multivariate tests

### Targeting Rules

Targeting rules determine which users see which treatment based on:
- User attributes (location, plan type, etc.)
- Segment membership
- Individual user targeting
- Percentage-based rollouts

### Segments

Segments are reusable groups of users that can be targeted across multiple feature flags. Users can be added to segments by their key (user ID).

### Environments

Environments represent different deployment stages (development, staging, production). Each environment has its own feature flag configurations.

## Error Handling

The node handles Split API errors with descriptive messages:

| Error Code | Description |
|------------|-------------|
| 400 | Bad request - Invalid parameters |
| 401 | Unauthorized - Check API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 429 | Rate limited - Too many requests |
| 500 | Server error - Split API issue |

Enable **Continue On Fail** to process remaining items if one fails.

## Security Best Practices

1. **Use Admin API Keys Carefully**: Admin keys have full access - use more restrictive key types when possible
2. **Rotate Keys Regularly**: Rotate API keys periodically for security
3. **Environment Separation**: Use different API keys for different environments
4. **Audit Logging**: Enable audit log webhooks to track changes
5. **Credential Storage**: Store credentials securely in n8n's credential manager

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes with tests
4. Run linting: `npm run lint:fix`
5. Run tests: `npm test`
6. Commit changes: `git commit -m "Add my feature"`
7. Push to branch: `git push origin feature/my-feature`
8. Open a Pull Request

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-split/issues)
- **Email**: support@velobpa.com
- **Split Documentation**: [docs.split.io](https://docs.split.io)
- **n8n Community**: [community.n8n.io](https://community.n8n.io)

## Acknowledgments

- [Split.io](https://split.io) for their feature flag platform
- [n8n](https://n8n.io) for the workflow automation platform
- The n8n community for inspiration and support
