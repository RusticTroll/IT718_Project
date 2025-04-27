import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Xit: a.model({
    username: a.string().required(),
    text: a.string().required(),
    createdAt: a.datetime(),
    parentId: a.string().default('None')
  })
  .authorization(allow => [
    allow.owner().to(['create', 'update', 'delete']),
    allow.authenticated().to(['read'])
  ])
  .secondaryIndexes((index) => [index('parentId').sortKeys(['createdAt'])])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
