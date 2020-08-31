import gql from "graphql-tag";

const FORMATION_QUERY = gql`
  query Formations($id: ID!) {
    formation(id: $id) {
      id
      intitule
      domaines {
        intitule
      }
      presentation {
        soustitre
        paragraphe
      }
      infos {
        soustitre
        info
      }
      lieus {
        nom
        adresse
      }
      prochainessessions {
        id
        datedebut
        datefin
      }
      formateurs {
        nom
        bio
        linkedin
        github
        twitter
        photo {
          url
        }
      }
      imagedefond {
        url
      }
    }
  }
`;

export default FORMATION_QUERY;
