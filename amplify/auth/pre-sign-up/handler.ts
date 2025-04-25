import type { PreSignUpTriggerHandler } from 'aws-lambda'
import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider'

const client = new CognitoIdentityProviderClient()

export const handler: PreSignUpTriggerHandler = async (event) => {
  const getMatchingDisplaynameCommand = new ListUsersCommand({
    UserPoolId: event.userPoolId,
    Filter: `"preferred_username" = "${event.request.userAttributes['preferred_username']}"`,
  })

  const response = await client.send(getMatchingDisplaynameCommand)
  if (response.Users?.length != 0) {
    throw new Error('Username is already taken.')
  }

  return event
}
