import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { APIGet } from '../misc/config';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { show: action.show, isLoading: false, error: null };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

const initailState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initailState
  );
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    let isMount = true;
    APIGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
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
  }, [id]);
  console.log(show);

  if (isLoading) {
    return <div>page is loading</div>;
  }
  if (error) {
    return <div>an error occured : {error}</div>;
  }
  return (
    
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <div>
        <h1>details</h1>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>
      <div>
        <h1>seasons</h1>
        <Seasons seasons={show._embedded.seasons} />
      </div>
      <div>
        <h1>Cast</h1>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
  );
};

export default Show;
