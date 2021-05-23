import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    APIGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(result => {
      setShow(result);
      
    });
  }, [id]);
  console.log(show);
  return <div>this is a show page</div>;
};

export default Show;
