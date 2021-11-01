import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth} from './ProvideAuth';

function CreateAccount() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    let { from } = location.state || { from: { pathname: "/" } };
    let create = () => {
      auth.signup(username, password).then(() => {
        history.replace(from);
      }).catch((err) => {
        console.log(err);
      })
    };
  
    return (
      <div>
        <input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder='password' value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={create}>Create Account</button>
      </div>
    );
  }

export default CreateAccount;
  