import React from 'react';

export const UserContext = React.createContext({ user: {} });

export default class UserContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  login = ({ token, userId, userName }) => {
    console.log({ token, userId, userName })
    localStorage.setItem("token", token)
    localStorage.setItem("userId", userId)
    localStorage.setItem("userName", userName)
    this.setState({ user: { token, userId, userName, isLoggedIn: true } });
  }

  logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    this.setState({ user: { isLoggedIn: false } });
  }

  componentDidMount() {
    // persist user data on page reload
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const userName = localStorage.getItem("userName")
    this.setState({ user: { token, userId, userName, isLoggedIn: token ? true : false } });
  }

  render() {

    const contextValue = {
      ...this.state.user,
      logoutUser: this.logout,
      loginUser: this.login
    }

    return (
      <UserContext.Provider value={contextValue}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
