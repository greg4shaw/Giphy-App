import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth} from './ProvideAuth';
import axios from "axios";

function DepositPage() {
    const [deposit, setDeposit] = useState([])
    const [trans, setTrans] = useState([])
    console.log('deposit 1 ' + deposit)

    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    let { from } = location.state || { from: { pathname: "/" } };
    
    const handleDeposit = () => {
            axios.post('values', {value: deposit}, {headers: auth.authHeader()}).then((res) => {
                console.log('value post works')
              }).catch((err) => {
                console.log(err)
              });
            console.log('deposit 2 ' + deposit)
      };

    useEffect(() => {
        getBalance();
    }, [])

    const getBalance = () => {
        axios.get('values', {headers: auth.authHeader() }).then((res) => {
                setTrans(res.data)
                console.log('balance get works')
            }).catch((err) => {
            console.log(err)
          });
    };
  
    return (
      <div>
        <input placeholder='deposit' value={deposit} onChange={(e) => setDeposit(e.target.value)} />
        <button onClick={handleDeposit}>Deposit</button>
        <br/>
        <div className='gifs-container'>
        {trans.map((tran, index) => {
        return (
                <div key={index} className='gifs-container' style={{ display: 'grid', alignContent: 'center' }}>
                    {tran.value}
                </div>
        );
        })} 
        </div>
        <button onClick={getBalance}>Balance</button>
    </div>

    );
  }

export default DepositPage;
  