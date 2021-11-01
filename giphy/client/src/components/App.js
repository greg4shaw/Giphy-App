//import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
//import axios from 'axios';

import { ProvideAuth } from "./ProvideAuth";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import LoginPage from "./LoginPage";
import SearchPage from "./SearchPage";
import SavedPage from "./SavedPage";
import CreateAccount from "./CreateAccount";
import DepositPage from "./DepositPage";
import WithdrawPage from "./WithdrawPage";
import Navi from "./Navi";

function App() {


    return (
        <ProvideAuth>
            <Router>
                <div>
                    <Navi />

                    <Switch>
                      
                        <PrivateRoute path='/saved'>              
                            <SavedPage />
                        </PrivateRoute>

                        <PrivateRoute path='/search'>
                            <SearchPage />
                        </PrivateRoute>

                        <PrivateRoute path='/deposit'>
                            <DepositPage />
                        </PrivateRoute>

                        <PrivateRoute path='/withdraw'>
                            <WithdrawPage />
                        </PrivateRoute>

                        <Route path='/login' exact>
                            <LoginPage />
                        </Route>

                        <Route path='/signup' exact>
                            <CreateAccount />
                        </Route>

                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>

                </div>
            </Router>
        </ProvideAuth>
    )
};

export default App;


// under original function

//     const [gifs, setGifs] = useState([]);
//     const [savedGifs, setSavedGifs] = useState([]);
//     const [gifInput, setGifInput] = useState('');

//     useEffect(() => {
//         const savedGifs = localStorage.getItem('savedGifs');
//         // saved in local storage as a JSON string - so need to parse it
//         if (savedGifs) setSavedGifs(JSON.parse(savedGifs));
//         // get data being sent from server
//         // axios.get('/get').then((res) => {
//         //     console.log(res);
//         // })

//     }, []); // run useEffect once only when page loads

//     const handleInput = (event) => {
//         setGifInput(event.target.value)
//     };

//     const handleRemoveGif = (gif) => {
//         const newArray = savedGifs.filter((savedGif) => savedGif !== gif)
//         setSavedGifs(newArray);
//         localStorage.setItem('savedGifs', JSON.stringify(newArray))
//     };

//     const handleSavedGif = (gif) => {
//         const newArray = [...savedGifs, gif]
//         setSavedGifs(newArray)
//         // save to local storage as a string
//         localStorage.setItem('savedGifs', JSON.stringify(newArray))
//     };

// //Code will run as if it is asynchronous - no need for a .then()
//     const handleSearchGifs = async () => {
//         if(!gifInput) return;
//         const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=o5Njzr7fPXxqk7r11TGllOa0Cqj9vMgG&q=${gifInput}&limit=10`)
//         setGifs(res.data.data);
//     }