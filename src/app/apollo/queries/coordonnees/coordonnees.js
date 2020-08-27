import gql from "graphql-tag";

const CONTACT_QUERY = gql`
  query Coordonnees {
    coordonnee {
      telephone
      email
      adresse
    }
  }
`;

export default CONTACT_QUERY;
