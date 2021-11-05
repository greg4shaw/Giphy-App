import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth} from './ProvideAuth';
import Card from "./Card";
import axios from "axios";

function WithdrawPage() {
    const [withdraw, setWithdraw] = useState('')
    const [bal, setBal] = useState('')
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState("");

    let auth = useAuth();
    
    function validateWithdraw(withdraw) {
      if (withdraw < 0) {
        setStatus(
          "Negativity not needed! Withdraw amount must be a number greater than 0 and we will do the subtracting."
        );
        setTimeout(() => setStatus(""), 3000);
        return false;
      } else if (bal - withdraw < 0) {
        setStatus(
          "Wait a second... We can't give you that much! Withdraw amount must be less than or equal to Balance."
        );
        setTimeout(() => setStatus(""), 3000);
        return false;
      } else if (bal - withdraw >= 0) {
        return true;
      } else
        setStatus(
          "If you want letters, head to your Post Office! Withdraw must be a number greater than 0."
        );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    
    function clearForm() {
      setWithdraw("");
      setShow(true);
    }

    const handleWithdraw = () => {
      if (!validateWithdraw(withdraw, "withdraw")) return;
      const newbal = Number(bal) - Number(withdraw)
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
            setBal(parseFloat(res.data.balance).toFixed(2))
            }).catch((err) => {
            console.log(err)
          });
    };
  
    return (
      <Card
        bgcolor="info"
        header="WITHDRAW"
        status={status}
        body={
          show ? (
            <>
              <br />
              <h5>You account balance: $ {bal}</h5>
              <br />
              Withdraw Amount:
              <br />
              <br />
              <input type="input" className="form-control" id="deposit" placeholder="Give me money!"
                value={withdraw} onChange={(e) => setWithdraw(e.target.value)}
              />
              <br />
              <button type="submit" className="btn btn-light mx-auto d-block"
                disabled={withdraw === "" ? true : false} onClick={handleWithdraw}>
                Withdraw
              </button>
              <br />
            </>
          ) : (
            <>
              <h5>Withdrawal Success</h5>
              <br />
              <h5>You new account balance: $ {bal}</h5>
              <br />
              <button type="submit" className="btn btn-light mx-auto d-block"
                onClick={clearForm}>
                Withdraw More Money
              </button>
            </>
          )
        }
      />
    );
  }

export default WithdrawPage;
  