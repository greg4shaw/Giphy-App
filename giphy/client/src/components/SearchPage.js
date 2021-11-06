import { useState } from "react";
import axios from "axios";
import { useAuth } from "./ProvideAuth";
import Card from "./Card";
import '../styles/StockViewer.css'
import { Table } from 'reactstrap';

function SearchPage() {
  //const [input, setInput] = useState("");
  const [gifs, setGifs] = useState([]);

  const handleSearch = () => {
    //if (!input) return;
    // https://api.giphy.com/v1/gifs/search?api_key=o5Njzr7fPXxqk7r11TGllOa0Cqj9vMgG&q=${input}&limit=10
    //axios.get(`gifs/search?input=${input}`, {headers: auth.authHeader()}).then((res) => {
    axios.get('gifs/search', {headers: auth.authHeader()}).then((res) => {
        setGifs(res.data);
      }).catch((err) => {
        console.log(err)
      });
  };

  const auth = useAuth();

  // const handleSave = (url) => {
  //       axios.post('gifs', { url }, {headers: auth.authHeader()})
  // };

  return (
    <Card
    bgcolor="dark"
    header="Wall-Street-Bets"
    title="Get the top 50 stocks discussed on Reddit subreddit - Wallstreetbets"
    text="This data is updated every 15 minutes"
    body={
    <div>
      <button type="submit" className="btn btn-light mx-auto d-block" onClick={handleSearch}>Get Em!</button>
      <br/>
      {/* <div className='gifs-container'>
        {gifs.map((data, key) => {
          return (
            <div key={key}>
              {"Company Ticker: " + data.ticker + " | Comments: " + data.no_of_comments + " | Sentiment: " + data.sentiment}
              </div>)})}
      </div> */}
      <div className="table-responsive">
            <Table dark>
            {/* <table className="card-table table" variant="dark"> */}
              <thead className="table-info">
                <tr>
                  <th scope="col">Stock Ticker</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Sentiment</th>
                  <th scope="col">Sentiment Score</th>
                </tr>
              </thead>
              <tbody>
                {gifs.map((data, key) => {
                  return (
                    <tr key={key}>
                      <td>{data.ticker}</td>
                      <td>{data.no_of_comments}</td>
                      <td>{data.sentiment}</td>
                      <td>{data.sentiment_score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>      

    </div>
    }
    ></Card>
  );
}

export default SearchPage;
