import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth} from './ProvideAuth';
import Card from "./Card";
import axios from "axios";

function DeleteAccount() {
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [reason, setReason] = useState('');

    let history = useHistory();
    let auth = useAuth();
    
    const handleDelete = () => {
        axios.delete('/values/delete', { headers: auth.authHeader() }).then((res) => {
              setShow(false)
              }).catch((err) => {
                setStatus("This is not a valid account so it cannot be deleted.")
              });
      };

  return (
    <Card
      bgcolor="danger"
      header="DELETE ACCOUNT"
      status={status}
      body={
        show ? (
          <>
            Would you like to delete your account? This action is cannot be reversed.
            <br />
            <br />
            <input type="input" className="form-control" id="reason" placeholder="Please provide a reason for deletion."
              value={reason} onChange={(e) => setReason(e.target.value)}
            />
            <br />
            <button type="submit" className="btn btn-light mx-auto d-block"
              disabled={reason === "" ? true : false} onClick={handleDelete}>
              Delete Me!
            </button>
            <br />
          </>
        ) : (
          <>
            <h5>Delete Success</h5>
            <br />
            <h5>Your account has been deleted, we are sad to see you go :(</h5>
            <br />
            <button type="submit" className="btn btn-light mx-auto d-block"
              onClick={() => {auth.signout(() => history.push('/'))}}>
              Create a new account
            </button>
          </>
        )
      }
    />
  );
}

export default DeleteAccount;
  