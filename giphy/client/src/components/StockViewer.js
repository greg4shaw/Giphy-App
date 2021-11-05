import '../styles/StockViewer.css';

const GifViewer = (props) => (
  <div className='gifs-container'>
    {props.gifs.map((gif, index) => {
      return (
        <div key={index} className='gif-container'>
          <img src={gif.images.fixed_width.url} />
          <button onClick={() => props.buttonAction(gif)}>{props.buttonText}</button>
        </div>
      );
    })}
  </div>
);

export default GifViewer;
