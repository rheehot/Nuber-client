import gql from 'graphql-tag';

export type CurrentUser = {
  id: string;
  email: string;
  phone: string;
  country_code: string;
  profile: {
    id: string;
    thumbnail: string | null;
    birth: string;
    first_name: string;
    last_name: string;
    gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  };
};

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    auth {
      id
      phone
      email
      country_code
      profile {
        id
        thumbnail
        first_name
        last_name
        birth
        gender
      }
    }
  }
`;
