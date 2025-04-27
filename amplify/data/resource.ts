import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Xit: a.model({
    user_id: a.string().required(),
    text: a.string().required(),
    createdAt: a.datetime(),
    parent_id: a.string().default('None'),
    user: a.belongsTo('User', 'user_id')
  })
  .authorization(allow => [
    allow.owner().to(['create', 'update', 'delete']),
    allow.authenticated().to(['read'])
  ])
  .secondaryIndexes((index) => [
    index('parent_id').sortKeys(['createdAt']).queryField('listByParent'),
    index('user_id').sortKeys(['createdAt']).queryField('listByUser')
  ]),
  User: a.model({
    user_id: a.string().required(),
    username: a.string().required(),
    following: a.string().array().required(),
    blocking: a.string().array().required(),
    xits: a.hasMany('Xit', 'user_id')
  })
  .identifier(['user_id'])
  .authorization(allow => [
    allow.owner().to(['create', 'update']),
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
