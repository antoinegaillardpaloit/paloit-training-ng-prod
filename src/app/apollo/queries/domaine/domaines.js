import gql from "graphql-tag";

const DOMAINES_QUERY = gql`
  query Domaines {
    domaines {
      id
      intitule
      formations {
        id
        slug
        accroche
        intitule
        lieus {
          id
          nom
          adresse
        }
        prochainessessions {
          id
          datedebut
          datefin
        }
        infos {
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
