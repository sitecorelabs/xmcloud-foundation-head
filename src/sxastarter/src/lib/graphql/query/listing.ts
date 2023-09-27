import { gql } from '@apollo/client';
export const Listing_Query = gql`
  query Listing($contextItem: String!, $language: String!, $first: Int!, $after: String!) {
    ListingData: item(path: $contextItem, language: $language) {
      children(first: $first, after: $after) {
        results {
          url {
            path
            siteName
            url
          }
          fields {
            name
            jsonValue
          }
        }
        pageInfo {
          endCursor
          hasNext
        }
      }
    }
  }
`;
