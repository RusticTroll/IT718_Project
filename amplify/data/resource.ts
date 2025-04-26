import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Xit: a.model({
    username: a.string().required(),
    text: a.string().required(),
  })
  .authorization(allow => [
    allow.owner().to(['create', 'update', 'delete']),
    allow.authenticated().to(['read'])
  ])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
