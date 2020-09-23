import { gql } from "@apollo/client";
import { cache } from 'index'

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    # isLoggedIn @client
    userId @client
    # userName @client
  }
`;

export const loginUser = ({ token, userId, userName }) => {
  localStorage.setItem("token", token)
  cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: !!localStorage.getItem("token"),
      userId,
      userName,
    },
  });  
}


export const logoutUser = () => {
  localStorage.removeItem("token")
  cache.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: !!localStorage.Item("token"),
      userId: null,
      userName: null,
    },
  });  
}
