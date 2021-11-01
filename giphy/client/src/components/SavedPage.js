import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "./ProvideAuth";
import '../styles/GifViewer.css'

function SavedPage() {
    const auth = useAuth();
    
    const [gifs, setGifs] = useState([]);
    useEffect(() => {
            fetchGifs();
    }, [])

    const fetchGifs = () => {
        axios.get('gifs', {headers: auth.authHeader() }).then((res) => {
            setGifs(res.data)
        });
    }

    const handleRemove = (id) => {
            axios.delete(`gifs/${id}`, {headers: auth.authHeader()}).then((res) => {
               fetchGifs();
                      })
    }

return (
    <div>
      <div className='gifs-container'>
        {gifs.map((gif, index) => {
          return (
            <div key={index} className='gifs-container' style={{ display: 'grid', alignContent: 'center' }}>
              <img src={gif.url} />
              <button onClick={() => handleRemove(gif._id)}>remove</button>
            </div>
          );
        })} 
       </div>
    </div>
  );
}

export default SavedPage;
