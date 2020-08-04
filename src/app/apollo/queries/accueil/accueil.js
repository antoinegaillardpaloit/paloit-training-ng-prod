import gql from "graphql-tag";

const ACCUEIL_QUERY = gql`
  query Accueil {
    accueil {
      accroche
    }
  }
`;

export default ACCUEIL_QUERY;