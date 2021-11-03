import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth} from './ProvideAuth';
import Card from "./Card";
import axios from "axios";

function DepositPage() {
    const [deposit, setDeposit] = useState('')
    const [bal, setBal] = useState('')
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState("");

    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    let { from } = location.state || { from: { pathname: "/" } };
    
    function validateDeposit(deposit) {
      if (deposit <= 0) {
        setStatus(
          "Don't be so negative! Your deposit amount must be greater than 0. To withdraw money, please select the 'Withdraw' menu option"
        );
        setTimeout(() => setStatus(""), 3000);
        return false;
      } else if (deposit > 0) {
        return true;
      }
      setStatus(
        "Your deposit must be a number greater than 0. No letters please as they are really tough to add..."
      );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    const handleDeposit = () => {
      if (!validateDeposit(deposit, "deposit")) return;
      const newbal = Number(bal) + Number(deposit)
         axios.post('/values/update', {balance: newbal}, { headers: auth.authHeader() }).then((res) => {
              }).catch((err) => {
                console.log(err)
              });
              getBalance();
              setShow(false);
      };

      useEffect(() => {
        getBalance();
    }, [])

    const getBalance = () => {
        axios.get('values', {headers: auth.authHeader() }).then((res) => {
              setBal(res.data.balance)
            }).catch((err) => {
            console.log(err)
          });
    };
  
    
  function clearForm() {
    setDeposit("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="success"
      header="DEPOSIT"
      status={status}
      body={
        show ? (
          <>
            <h5>You account balance: $ {bal}</h5>
            <br />
            Deposit Amount
            <br />
            <br />
            <input type="input" className="form-control" id="deposit" placeholder="Deposit Amount"
              value={deposit} onChange={(e) => setDeposit(e.target.value)}
            />
            <br />
            <button type="submit" className="btn btn-light mx-auto d-block"
              disabled={deposit === "" ? true : false} onClick={handleDeposit}>
              Deposit
            </button>
            <br />
          </>
        ) : (
          <>
            <h5>Deposit Success</h5>
            <br />
            <h5>You new account balance: $ {bal}</h5>
            <br />
            <button type="submit" className="btn btn-light mx-auto d-block"
              onClick={clearForm}>
              New Deposit
            </button>
          </>
        )
      }
    />
  );
  }

export default DepositPage;
  