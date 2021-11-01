import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth} from './ProvideAuth';
import axios from "axios";

function WithdrawPage() {
    const [withdraw, setWithdraw] = useState([])
    const [trans, setTrans] = useState([])
    
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    let { from } = location.state || { from: { pathname: "/" } };
    
    const handleWithdraw = () => {
            axios.post('values', {value: withdraw}, {headers: auth.authHeader()}).then((res) => {
                console.log('withdraw post works')
              }).catch((err) => {
                console.log(err)
              });
      };

    // useEffect(() => {
    //     getBalance();
    // }, [])

    // const getBalance = () => {
    //     axios.get('values', {headers: auth.authHeader() }).then((res) => {
    //             setTrans(res.data)
    //             console.log('balance get works')
    //         }).catch((err) => {
    //         console.log(err)
    //       });
    // };
  
    return (
      <div>
        <input placeholder='withdraw' value={withdraw} onChange={(e) => setWithdraw(e.target.value)} />
        <button onClick={handleWithdraw}>Withdraw</button>
        <br/>
        {/* <div className='gifs-container'>
        {trans.map((tran, index) => {
        return (
                <div key={index} className='gifs-container' style={{ display: 'grid', alignContent: 'center' }}>
                    {tran.value}
                </div>
        );
        })} 
        </div>
        <button onClick={getBalance}>Balance</button> */}
    </div>

    );
  }

export default WithdrawPage;
  