import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from 'temp/config';

export const apolloClient = new ApolloClient({
  uri: `${config.sitecoreApiHost}/sitecore/api/graph/edge`,
  cache: new InMemoryCache({}),
  headers: {
    'Content-Type': 'application/json',
    Authorization: config.sitecoreApiKey,
    sc_apikey: config.sitecoreApiKey,
  },
});
