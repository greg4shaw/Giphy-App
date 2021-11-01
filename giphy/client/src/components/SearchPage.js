import { useState } from "react";
import axios from "axios";

import { useAuth } from "./ProvideAuth";

import '../styles/GifViewer.css'

function SearchPage() {
  const [input, setInput] = useState("");
  const [gifs, setGifs] = useState([]);

  const handleSearch = () => {
    console.log(input);
    if (!input) return;

    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=o5Njzr7fPXxqk7r11TGllOa0Cqj9vMgG&q=${input}&limit=10`).then((res) => {
        setGifs(res.data.data);
      });
  };

  const auth = useAuth();

  const handleSave = (url) => {
        axios.post('gifs', { url }, {headers: auth.authHeader()})
        console.log(auth.authHeader())
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSearch}>search</button>
      <div className='gifs-container'>
        {gifs.map((gif, index) => {
          return (
            <div key={index} className='gifs-container' style={{ display: 'grid', alignContent: 'center' }}>
              <img src={gif.images.fixed_width.url} />
              <button onClick={() => handleSave(gif.images.fixed_width.url)}>save</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchPage;
