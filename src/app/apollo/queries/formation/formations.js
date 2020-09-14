import gql from "graphql-tag";

const FORMATIONS_QUERY = gql`
  query Formations {
    formations {
      id
      slug
      intitule
      lieus {
        id
        nom
        adresse
      }
      accroche
      presentation {
        soustitre
        paragraphe
      }
      infos {
        soustitre
        info
      }
      prochainessessions {
        datedebut
        datefin
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
