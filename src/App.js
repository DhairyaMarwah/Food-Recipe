import React from 'react'
import Axios from 'axios'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'
import Recipe from './components/Recipe'
import Alert from './components/Alert'
const App = () => {
    const [query, setQuery] = useState("")
    const [recipes, setRecipes] = useState([])
    const [alert, setAlert] = useState("")
    const APP_ID="7e83d736"
    const APP_KEY="bf5bf9634fa4995a15f6501e4fe37a6c"
    const url=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
    const getData=async()=>{
        if(query!==""){
        const result=await Axios.get(url)
        if(!result.data.more)
            return setAlert("no food with such name") 
        setRecipes(result.data.hits)
        console.log(result)
        setAlert("")
        setQuery("")
        }
        else{
            setAlert("Please fill the box")
        }
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        getData()
    }
    const onChange=(e)=>{
        // e.preventDefault();
        // getData()
        setQuery(e.target.value)
    }
    return (
        <div className="App">
            <h1>Food Recipe </h1>
            <form action="" className="search-form"
             onSubmit={onSubmit}
              onChange={onChange}
               value={query}
               >
                { alert!=="" && <Alert alert={alert}/>}
                <input type="text" placeholder="Search" autoComplete="off" />
                <input type="submit" value="search" />
            </form>
            <div className="recipes">
                 {recipes!==[] && recipes.map(recipe=> 
                    <Recipe  recipe={recipe} key={uuidv4()} /> )}
            </div>
            
        </div>
    )
}

export default App
