import gql from "graphql-tag";

const FORMATIONS_QUERY = gql`
  query Formations {
    formations {
      id
      intitule
    }
  }
`;

export default FORMATIONS_QUERY;