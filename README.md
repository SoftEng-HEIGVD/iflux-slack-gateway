# iflux-slack-gateway
Integration gateway between slack and the iflux.io middleware

## Development setup

Create a `.env` file in the root directory of the project and put the following content:

```bash
COMMON_SLACK_ENABLE=false

SLACK_ACTION_TYPE=http://localhost:3000/schemas/actionTypes/slackMessageSending
```

### Mandatory

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| COMMON_SLACK_ENABLE        | Enable/Disable Slack system. |
| SLACK_ACTION_TYPE          | Define the slack message type. Must be unique. |
