import React, { useState } from 'react';
import Mainpagelayout from '../components/Mainpagelayout';
import { APIGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowSearch = searchOption === 'shows';

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSearch = () => {
    //https://api.tvmaze.com/search/shows?q=men
    APIGet(`/search/${searchOption}?q=${input}`).then(results => {
      setResult(results);
      console.log(results);
    });
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>no results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show
        ? results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        : results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ));
    }
    return null;
  };

  return (
    <Mainpagelayout>
      <input
        type="text"
        placeholder="Search Something Here"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="shows-search">
          shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isShowSearch}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            checked={!isShowSearch}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </Mainpagelayout>
  );
};

export default Home;
