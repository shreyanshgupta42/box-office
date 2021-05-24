import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { APIGet } from '../misc/config';

const reducer=(prevState,action)=>{
  switch(action.type){
    case 'FETCH_SUCCESS':{
      return {show: action.show,isLoading: false,error: null}
    }
    case 'FETCH_FAILED':{
      return {...prevState,setIsLoading: false,error: action.error}
    }
    default: return prevState
  }
}

const initailState={
  show : null,
  setIsLoading : true,
  error : null
}

const Show = () => {
  const { id } = useParams();

  const [{show,isLoading,error},dispatch]=useReducer(reducer,initailState);
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
          dispatch({type:'FETCH_SUCCESS',show:result})
          //below for useState
          // setShow(result);
          // setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMount) {
          dispatch({type:'FETCH_FAILED',error:err.message})
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
  return <div>this is a show page</div>;
};

export default Show;
