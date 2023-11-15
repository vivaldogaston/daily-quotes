import { useState } from "react";
import { toPng, toJpeg } from "html-to-image";
import "./App.css";
import download from "downloadjs";
import { BsChatSquareQuoteFill } from "react-icons/bs";
const Home = () => {
  const [quote, setQuote] = useState({
    content: "Click on 'New quote' to generate a random quote.",
    author: "Vivaldo Gaston",
  });
  const save = () => {
    toPng(document.getElementById("cardWrapper")).then(function (dataUrl) {
      download(dataUrl, "quote.png");
    });
  };
  const generateQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/quotes/random");
      const data = await response.json();
      console.log(data);
      setQuote(data[0]);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <header>
        <h1>Daily Quotes</h1>
        <BsChatSquareQuoteFill size={30} />
      </header>
      <div id="cardWrapper">
        <div id="quote">
          <p>{quote.content}</p>
        </div>
        <div itemID="author" id="author">
          <label>- {quote.author}</label>
        </div>
      </div>
      <div className="buttonsWrapper">
        <button className="button primary" onClick={() => generateQuote()}>
          New quote
        </button>
        <button className="button save" onClick={() => save()}>
          Save quote
        </button>
      </div>
      <footer>
        <p>
          <a target="_blank" href="https://github.com/vivaldogaston">
            Vivaldo Gaston © 2023
          </a>{" "}
        </p>
        <p>
          Powered by{" "}
          <a target="_blank" href="https://github.com/lukePeavey/quotable">
            Quotable API
          </a>
        </p>
      </footer>
    </div>
  );
};
export default Home;
