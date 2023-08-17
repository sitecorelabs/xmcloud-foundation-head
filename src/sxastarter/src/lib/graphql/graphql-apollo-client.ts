import { ApolloClient, InMemoryCache } from '@apollo/client';
export const apolloClient = new ApolloClient({
  uri: `https://edge.sitecorecloud.io/api/graphql/v1`,
  cache: new InMemoryCache({}),
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'dXBvekgxNmJPL1JsWGg2S2RkV1Z2bnA0MnZNcHR6QTlIZ09oa0g4cDlhUT18ZXNwaXJlaW5mb2wzOTkzLWVzcGlyZXN0YXJ0ZWYwNi1kZXYtNjJhYQ==',
    sc_apikey:
      'dXBvekgxNmJPL1JsWGg2S2RkV1Z2bnA0MnZNcHR6QTlIZ09oa0g4cDlhUT18ZXNwaXJlaW5mb2wzOTkzLWVzcGlyZXN0YXJ0ZWYwNi1kZXYtNjJhYQ==',
  },
});
