import React ,{useState}from 'react'
import "./Search.css"
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [keyword,setKeyword] = useState("")
    const navigate=useNavigate();
    const searchSubmitHandler =(e)=>{
         e.preventDefault();
         if(keyword.trim())
         {
            navigate(`/products/${keyword}`)
         }
         else{
            navigate('/products')
         }

    }
  return (
   <>
   <form className='searchBox'onSubmit={searchSubmitHandler}>
   <input 
   type="text" 
   placeholder='Search Your Products'
   onChange={(event)=>setKeyword(event.target.value)}
   />
   <input type="submit" value="Search" />
   </form>
   </>
  )
}

export default Search