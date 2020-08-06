import gql from "graphql-tag";

const CARD_QUERY = gql`
  query Formations($id: ID!) {
    formation(id: $id) {
      intitule
      prochainessessions {
        id
        datedebut
        datefin
      }
      infospratiques {
        soustitre
        info
      }
      domaines {
        id
        intitule
      }
      formateurs {
        id
        nom
        photo {
          formats
        }
      }
    }
  }
`;

export default CARD_QUERY;
