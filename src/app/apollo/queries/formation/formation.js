import gql from "graphql-tag";

const FORMATION_QUERY = gql`
  query Formations($id: ID!) {
    formation(id: $id) {
      id
      intitule
      prochainessessions {
        id
        datedebut
        datefin
      }
    }
  }
`;

export default FORMATION_QUERY;