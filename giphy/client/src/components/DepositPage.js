import { useState } from 'react';
import { useAuth } from './ProvideAuth';
import Card from "./Card";
import axios from "axios";

function DepositPage() {
    const [deposit, setDeposit] = useState('')
    const [bonus, setBonus] = useState(0)
    const [bal, setBal] = useState('')
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState("");

    let auth = useAuth();
    
    const getBalance = () => {
      axios.get('values', {headers: auth.authHeader() }).then((res) => {
          setBal(parseFloat(res.data.balance).toFixed(2))
          }).catch((err) => {
          console.log(err)
        });
    };

    getBalance();

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
      if(deposit >= 1000) {
        let bonus = (Number(deposit)*0.1)
        setBonus(parseFloat(bonus).toFixed(2))

        let newbal = Number(bal) + Number(deposit) + Number(bonus)
          axios.post('/values/update', {balance: newbal}, { headers: auth.authHeader() }).then((res) => {
                }).catch((err) => {
                  console.log(err)
                });
                getBalance();
                setShow(false);
        }else if(deposit >= 100){
          let bonus = (Number(deposit)*0.05)
          setBonus(parseFloat(bonus).toFixed(2))
  
          let newbal = Number(bal) + Number(deposit) + Number(bonus)
            axios.post('/values/update', {balance: newbal}, { headers: auth.authHeader() }).then((res) => {
                  }).catch((err) => {
                    console.log(err)
                  });
                  getBalance();
                  setShow(false);
        }else{
          let newbal = Number(bal) + Number(deposit) + Number(bonus)
          axios.post('/values/update', {balance: newbal}, { headers: auth.authHeader() }).then((res) => {
                }).catch((err) => {
                  console.log(err)
                });
                getBalance();
                setShow(false);
        };
    }

    
  function clearForm() {
    setDeposit('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="success"
      header="DEPOSIT & EARN A BONUS"
      status={status}
      title="$100 or more gets you 5%. $1000 or more gets you 10%."
      body={
        show ? (
          <>
            <br />
            <h5>You account balance: $ {bal}</h5>
            <br />
            Deposit Amount:
            <br />
            <br />
            <input type="input" className="form-control" id="deposit" placeholder="Take my money!"
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
            <br />
            <h5>Deposit Success</h5>
            <br />
            <h6>Bonus earned for this deposit: $ {bonus}</h6>
            <br />
            <h5>You new account balance: $ {bal}</h5>
            <br />
            <button type="submit" className="btn btn-light mx-auto d-block"
              onClick={clearForm}>
              New Deposit
            </button>
            <br />
          </>
        )
      }
    />
  );
  }

export default DepositPage;
  