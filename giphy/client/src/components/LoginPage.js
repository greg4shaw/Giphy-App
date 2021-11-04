import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './ProvideAuth';
import Card from "./Card";

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState("");

    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
      auth.signin(username, password).then(() => {
        history.replace(from);
      }).catch((err) => {
        setStatus(`Username or Password incorrect, please try again.`);
      })
    };
  
    return (
      <Card
        bgcolor="secondary"
        header="LOGIN"
        status={status}
        body={
            <>
              <div>
                Username
                <br />
                <input className="form-control" value={username} name="username" placeholder="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                Password
                <br />
                <input className="form-control" type="password" value={password} name="password" placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button
                  disabled={username === "" || password === "" ? true : false}
                  type="submit" className="btn btn-light  mx-auto d-block"
                  onClick={login}
                >
                  Log In{" "}
                </button>
              </div>
            </>
            }
        />
            )
        }

export default LoginPage;
  