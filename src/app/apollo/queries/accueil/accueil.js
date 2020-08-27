import gql from "graphql-tag";

const ACCUEIL_QUERY = gql`
  query Accueil {
    accueil {
      accroche
      chapeau
      paragrapheaccueil {
        paragraphe
      }
      conclusion
    }
  }
`;

export default ACCUEIL_QUERY;