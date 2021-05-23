import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setShow(result);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMount) {
          setError(err.message);
          setIsLoading(false);
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
  return <div>this is a show page</div>;
};

export default Show;
