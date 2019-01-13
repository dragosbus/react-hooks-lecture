import React, { useEffect, useState, useRef } from "react";

const styles = () => {
  const btn = {
    background: "none",
    border: "none",
    color: "#fff",
    borderRadius: 4,
    padding: '10px 15px',
    fontSize: 15,
    margin: 10,
    cursor: 'pointer',
  };

  return {
    title: {
      color: "#353561",
      fontSize: 25,
      textAlign: "center"
    },
    form: {
      width: "90%",
      margin: "1rem auto",
      padding: 10
    },
    input: {
      width: "100%",
      border: "1px solid rgba(2,2,2,0.2)",
      borderRadius: 4,
      height: 30
    },
    btnSuccess: {
      ...btn,
      background: "#02b150"
    },
    btnPrimary: {
      ...btn,
      background: "#3b67cc"
    },
    list: {
      listStyleType: 'none',
    },
    listItem: {
      width: '90%',
      margin: '1rem auto',
    }
  };
};

export default function App() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const searchInputRef = useRef();
  //update just when the query is updated
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      const articles = await response.json();
      setNews(articles.hits);
    } catch (err) {
      setError("There is an error");
    }
  };

  const handleSearchForm = event => {
    event.preventDefault();
    getData();
  };

  const clearSearchHandler = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  if (error) return <div>{error}</div>;
  if (!news.length) return <div>Loading</div>;

  const style = styles();

  return (
    <React.Fragment>
      <h1 style={style.title}>Hooks news</h1>
      <form onSubmit={handleSearchForm} style={style.form}>
        <input
          style={style.input}
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={searchInputRef}
        />
        <button style={style.btnSuccess} type="submit">
          Search
        </button>
        <button
          style={style.btnPrimary}
          type="button"
          onClick={clearSearchHandler}
        >
          Clear
        </button>
      </form>
      <ul style={style.list}>
        {news.map(value => (
          <li style={style.listItem} key={value.objectID}>
            <a href={`${value.url}`}>{value.title}</a>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}
