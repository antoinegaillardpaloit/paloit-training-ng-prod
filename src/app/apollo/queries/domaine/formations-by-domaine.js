import gql from "graphql-tag";

const FORMATIONS_BY_DOMAINE_QUERY = gql`
  query Domaines($id: ID!) {
    domaine(id: $id) {
      formations {
        id
        intitule
      }
    }
  }
`;

export default FORMATIONS_BY_DOMAINE_QUERY;
