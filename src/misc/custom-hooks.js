import { useReducer, useEffect, useState } from 'react';
import { APIGet } from './config';

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }
    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }
    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  //here the key is also passed because it is a dependency but it will not change, so we are ok
  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : '';
  });
  const setPersistedInput = newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };

  return [input, setPersistedInput];
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, error: null,show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    let isMount = true;
    APIGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        // just a testing of page is loading condition
        // setTimeout(() => {
        //   if (isMount) {
        //     setShow(result);
        //     setIsLoading(false);
        //   }
        // }, 2000);
        if (isMount) {
          dispatch({ type: 'FETCH_SUCCESS', show: result });
          //below for useState
          // setShow(result);
          // setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMount) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
          //below for useState
          // setError(err.message);
          // setIsLoading(false);
        }
      });

    return () => {
      isMount = false;
    };
  }, [showId]);
  return state;
}
