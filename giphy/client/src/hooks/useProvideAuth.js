import { useState } from 'react';
import axios from 'axios';

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [displayName, setDisplayName] = useState(null);

    const signin = (username, password) => {
      return axios.post('auth/login', { username, password }).then((res) => {
        setUser(res.data.accessToken);
        setDisplayName(username)
        console.log(username)
      })
    };
  
    const signout = () => {
      return axios.post('auth/logout', {token: user }).then(() => {
        setUser(null);
        setDisplayName(null)
      })
    };

    const authHeader = () => {
      return { Authorization: `Bearer ${user}`}
    }
  
    const signup = (username, password) => {
      return axios.post('auth/signup', { username, password }).then((res) => {
        setUser(res.data.accessToken);
      })
    };

    return {
      user,
      signin,
      signout,
      authHeader,
      signup,
      displayName
    };
  }

  export default useProvideAuth;
