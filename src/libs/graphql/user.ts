import gql from 'graphql-tag';

export type CurrentUser = {
  id: string;
  username: string;
  profile: {
    id: string;
    thumbnail: string | null;
    display_name: string;
  };
  email: string;
};

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    auth {
      id
      username
      email
      profile {
        id
        thumbnail
        display_name
      }
    }
  }
`;
