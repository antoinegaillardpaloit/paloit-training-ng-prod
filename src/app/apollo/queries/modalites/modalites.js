import gql from "graphql-tag";

const MODALITES_QUERY = gql`
  query Modalites {
    modalitespratique {
      paragraphedintro
      sections {
        soustitre
        paragraphe
      }
    }
  }
`;

export default MODALITES_QUERY;
