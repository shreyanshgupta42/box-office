import React, { useState,useCallback } from 'react';
import Actorgrid from '../components/actor/Actorgrid';
import CustomRadio from '../components/CustomRadio';
import Mainpagelayout from '../components/Mainpagelayout';
import Showgrid from '../components/show/Showgrid';
import { APIGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

 
const renderResults = (results) => {
  if (results && results.length === 0) {
    return <div>no results</div>;
  }
  if (results && results.length > 0) {
    console.log('on showgird');
    return results[0].show ? (
      <Showgrid data={results} />
    ) : (
      <Actorgrid data={results} />
    );
    // ? results.map(item => <div key={item.show.id}>{item.show.name}</div>)
    // : results.map(item => (
    //     <div key={item.person.id}>{item.person.name}</div>
    //   ));
  }
  return null;
};

const Home = () => {
  //const [input, setInput] = useState('');        // we changed to the below one later
  const [input, setInput] = useLastQuery();
  const [results, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowSearch = searchOption === 'shows';

  const onInputChange = useCallback(ev => {
    setInput(ev.target.value);
  },[setInput]);

  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
  },[]);

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

  //below was created only to check how many times the onInputChange and onKeyDown are rendered otherwise it donot have any other need and can be removed
  //useWhyDidYouUpdate('Home',{onInputChange,onKeyDown})


  return (
    <Mainpagelayout>
      <SearchInput
        type="text"
        placeholder="Search Something Here"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            value="shows"
            checked={isShowSearch}
            onChange={onRadioChange}
          />
          {/* below is old label element whose replacement is provided above */}
          {/* <label htmlFor="shows-search">
            shows
            <input
              id="shows-search"
              type="radio" 
              value="shows"
              checked={isShowSearch}
              onChange={onRadioChange}
            />
          </label> */}
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowSearch}
            onChange={onRadioChange}
          />
          {/* below is old label element whose replacement is provided above */}
          {/* <label htmlFor="actors-search">
            Actors
            <input
              id="actors-search"
              type="radio"
              value="people"
              checked={!isShowSearch}
              onChange={onRadioChange}
            />
          </label> */}
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults(results)}
    </Mainpagelayout>
  );
};

export default Home;
