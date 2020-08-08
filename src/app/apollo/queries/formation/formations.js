import gql from "graphql-tag";

const FORMATIONS_QUERY = gql`
  query Formations {
    formations {
      id
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

export default FORMATIONS_QUERY;
