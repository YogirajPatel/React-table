import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  {
    continents {
      name
      code
      countries {
        awsRegion
        currencies
        emojiU
        languages {
          native
        }
      }
    }
  }
`;