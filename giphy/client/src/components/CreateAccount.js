import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './ProvideAuth';
import Card from "./Card";

function CreateAccount() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');

    let history = useHistory();
    let auth = useAuth();
    
    function validate(field, label) {
      if (!field) {
        setStatus(
          "Just a second... " + label + " must be completed please"
        );
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      return true;
    }
  
    function validatePassword(password) {
      if (password.length < 7) {
        setStatus(
          "We want your money to be as secure as possible, so your Password must be 7 or more characters please"
        );
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      return true;
    }
    
    let create = () => {
      if (!validate(username, "username")) return;
      if (!validate(email, "email")) return;
      if (!validatePassword(password, "password")) return;

      auth.signup(username, password).then(() => {
        setStatus("")
        setShow(false);
      }).catch((err) => {
        setStatus(`This user already exists, please Log In to access your account`);
      })
    }
    
    return (
      <Card
        bgcolor="primary"
        header="CREATE ACCOUNT"
        status={status}
        body={
          show ? (
            <> Username <br />
              <input type="input" className="form-control" id="name" placeholder="Enter name"
                value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
              <br />
              Email Address
              <br />
              <input type="input" className="form-control"id="email" placeholder="Enter email"
                value={email} onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <br />
              Password
              <br />
              <input type="password" className="form-control" id="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <br />
              <button
                disabled={
                  username === "" && email === "" && password === "" ? true : false
                } type="submit" className="btn btn-light  mx-auto d-block" onClick={create}>
                Create Account
              </button>
              <br />
            </>
          ) : (
            <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light  mx-auto d-block"
                onClick={()=> history.push("/login")} >
                Log in & get banking!
              </button>
            </>
          )
        }
      />
    );
  }
    
export default CreateAccount;


