import gql from "graphql-tag";

const MENTIONS_QUERY = gql`
  query Mentionslegales {
    mentionslegale {
      paragraphedintro
    }
  }
`;

export default MENTIONS_QUERY;
