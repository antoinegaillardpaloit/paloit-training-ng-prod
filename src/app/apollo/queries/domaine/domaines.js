import gql from "graphql-tag";

const DOMAINES_QUERY = gql`
  query Domaines {
    domaines {
      id
      intitule
    }
  }
`;

export default DOMAINES_QUERY;
