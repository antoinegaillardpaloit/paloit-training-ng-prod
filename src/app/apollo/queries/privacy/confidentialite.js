import gql from "graphql-tag";

const PRIVACY_QUERY = gql`
  query Confidentialite {
    confidentialite {
      paragraphedintro
      sections {
        soustitre
        paragraphe
      }
    }
  }
`;

export default PRIVACY_QUERY;
