import React, { useEffect, useState, useRef } from "react";

export default function App() {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef();
  //update just when the query is updated
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    const articles = await response.json();
    setNews(articles.hits);
  };

  const handleSearchForm = event => {
    event.preventDefault();
    getData();
  };

  const clearSearchHandler = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  if (!news.length) return <div>Loading</div>;

  return (
    <React.Fragment>
      <form onSubmit={handleSearchForm}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={searchInputRef}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={clearSearchHandler}>
          Clear
        </button>
      </form>
      {news.map(value => (
        <li key={value.objectID}>
          <a href={`${value.url}`}>{value.title}</a>
        </li>
      ))}
    </React.Fragment>
  );
}
