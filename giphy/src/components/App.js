import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios';
import GifViewer from "./GifViewer";
import Navi from "./Navi";

function App() {
    const [gifs, setGifs] = useState([]);
    const [savedGifs, setSavedGifs] = useState([]);
    const [gifInput, setGifInput] = useState('');

    useEffect(() => {
        const savedGifs = localStorage.getItem('savedGifs');
        // saved in local storage as a JSON string - so need to parse it
        if (savedGifs) setSavedGifs(JSON.parse(savedGifs));
    }, []); // run useEffect once only when page loads

    const handleInput = (event) => {
        setGifInput(event.target.value)
    };

    const handleRemoveGif = (gif) => {
        const newArray = savedGifs.filter((savedGif) => savedGif !== gif)
        setSavedGifs(newArray);
        localStorage.setItem('savedGifs', JSON.stringify(newArray))
    };

    const handleSavedGif = (gif) => {
        const newArray = [...savedGifs, gif]
        setSavedGifs(newArray)
        // save to local storage as a string
        localStorage.setItem('savedGifs', JSON.stringify(newArray))
    };

//Code will run as if it is asynchronous - no need for a .then()
    const handleSearchGifs = async () => {
        if(!gifInput) return;
        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=o5Njzr7fPXxqk7r11TGllOa0Cqj9vMgG&q=${gifInput}&limit=10`)
        setGifs(res.data.data);
    }

    return (
        <Router>
            <div>
                <Navi />

                <Switch>
                    <Route path='/saved'>              
                        <GifViewer 
                            gifs={savedGifs}
                            buttonAction={handleRemoveGif}
                            buttonText={'remove'}
                        />
                    </Route>
                    <Route path='/search'>
                        <input onChange={handleInput} value={gifInput}/>
                        <button onClick={handleSearchGifs}>search</button>
                        <GifViewer 
                            gifs={gifs}
                            buttonAction={handleSavedGif}
                            buttonText={'save'}
                        />
                    </Route>
                    <Route path='/'>
                        <h1>HomePage</h1>
                    </Route>
                </Switch>

            </div>
        </Router>
    )
};

export default App;
