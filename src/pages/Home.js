import React,{useState} from 'react'
import Mainpagelayout from '../components/Mainpagelayout'

const Home = () => {
    const [input,setInput]=useState('');

    const onInputChange=(ev)=>{
        setInput(ev.target.value)    
    }

    const onSearch=()=>{
        //https://api.tvmaze.com/search/shows?q=men
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r=>r.json()).then(result=>{
            console.log(result);
        })
    }
     
    const onKeyDown=(ev)=>{
        if(ev.keyCode===13){
            onSearch();
        }
    }
     

    return (
        <Mainpagelayout>
            <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input} />
            <button type="button" onClick={onSearch}>Search</button>
        </Mainpagelayout  >
    )
}

export default Home
