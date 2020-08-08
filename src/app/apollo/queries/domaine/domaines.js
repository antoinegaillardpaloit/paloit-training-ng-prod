import gql from "graphql-tag";

const DOMAINES_QUERY = gql`
  query Domaines {
    domaines {
      id
      intitule
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
  }
`;

export default DOMAINES_QUERY;
