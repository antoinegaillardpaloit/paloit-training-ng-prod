import gql from "graphql-tag";

const ACCUEIL_QUERY = gql`
  query Accueil {
    accueil {
      chapeau
      premierparagraphe
      secondparagraphe
      conclusion
    }
  }
`;

export default ACCUEIL_QUERY;
