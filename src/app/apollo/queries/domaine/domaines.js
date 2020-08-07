import gql from "graphql-tag";

const DOMAINES_QUERY = gql`
  query Domaines {
    domaines {
      id
      intitule
      formations {
        id
      }
    }
  }
`;

export default DOMAINES_QUERY;
