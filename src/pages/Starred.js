import { React, useState, useEffect } from 'react';
import Mainpagelayout from '../components/Mainpagelayout';
import Showgrid from '../components/show/Showgrid';
import { APIGet } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

const Starred = () => {
  const [starred] = useShows(); // we will not use dispatch therefore we have not distrachured it here

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      // we want to get multiple shows json object for that we have to call api multiple time and thus multiple promise is needed, therefore we use array of promise to do them all.
      const promises = starred.map(showId => APIGet(`/shows/${showId}`));
      // resolving all promises at once
      Promise.all(promises)
        .then(APIdata=> APIdata.map((show)=>({show})))             //we put here extra then at last to match the arguments data required format need in showgrid( the required argument was show here )
        .then(result => {
          console.log(result);
          setShows(result);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);
  return (
    <Mainpagelayout>
      {isLoading && <div>Page is Loading</div>}
      {error && <div> An error Occured: {error}</div>}
    {!isLoading && !shows && <div>No show Added.</div>}
    {!isLoading && !error && shows && <Showgrid data={shows} />}
    </Mainpagelayout>
  );
};

export default Starred;
