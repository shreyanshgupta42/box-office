import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { useShow } from '../misc/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

// the commented logic is brought to customhooks in custom-hooks.js

// const reducer = (prevState, action) => {
//   switch (action.type) {
//     case 'FETCH_SUCCESS': {
//       return { show: action.show, isLoading: false, error: null };
//     }
//     case 'FETCH_FAILED': {
//       return { ...prevState, isLoading: false, error: action.error };
//     }
//     default:
//       return prevState;
//   }
// };

// the commented logic is brought to customhooks in custom-hooks.js

// const initailState = {
//   show: null,
//   isLoading: true,
//   error: null,
// };

const Show = () => {
  const { id } = useParams();

  //below one line code is added inplace of the commented logic
  const [show,isLoading,error]=useShow(id);
  // the commented logic is brought to customhooks in custom-hooks.js

  // const [{ show, isLoading, error }, dispatch] = useReducer(
  //   reducer,
  //   initailState
  // );
  // // const [show, setShow] = useState(null);
  // // const [isLoading, setIsLoading] = useState(true);
  // // const [error, setError] = useState(null);

  // useEffect(() => {
  //   let isMount = true;
  //   APIGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
  //     .then(result => {
  //       // just a testing of page is loading condition
  //       // setTimeout(() => {
  //       //   if (isMount) {
  //       //     setShow(result);
  //       //     setIsLoading(false);
  //       //   }
  //       // }, 2000);
  //       if (isMount) {
  //         dispatch({ type: 'FETCH_SUCCESS', show: result });
  //         //below for useState
  //         // setShow(result);
  //         // setIsLoading(false);
  //       }
  //     })
  //     .catch(err => {
  //       if (isMount) {
  //         dispatch({ type: 'FETCH_FAILED', error: err.message });
  //         //below for useState
  //         // setError(err.message);
  //         // setIsLoading(false);
  //       }
  //     });

  //   return () => {
  //     isMount = false;
  //   };
  // }, [id]);
  // console.log(show);

  if (isLoading) {
    return <div>page is loading</div>;
  }
  if (error) {
    return <div>an error occured : {error}</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h1>Details</h1>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h1>Seasons</h1>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h1>Cast</h1>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
