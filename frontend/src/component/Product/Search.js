import React, { useState } from 'react'
import "./search.css"
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Search = () => {
    const [keyword,setKeyword] = useState("");
    const history = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            history(`/products/${keyword}`);
        } else {
            history("/products");
        }
    };
  return <>
  <MetaData title={`SEARCH--ECOMMERCE`}/>
  <form className='searchBox'  onSubmit={searchSubmitHandler}>
    <input type="text"
     placeholder="search a Product ..."
     onChange={(e)=>setKeyword(e.target.value)} />
     <input type="submit"
     value="search" />
  </form>
  </>
}

export default Search