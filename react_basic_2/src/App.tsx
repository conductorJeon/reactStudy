import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/main/Home";
import Header from "./components/main/Header";
import FoodDetail from "./components/food/FoodDetail";
import RecipeList from "./components/recipe/RecipeList";
import RecipeDetail from "./components/recipe/RecipeDetail";
import FoodFind from "./components/food/FoodFind";

/*
    관리 = 출력 화면을 찾는다
          Router
            |
          화면 모음 : Routes => Switch
            |
          화면 한개 : Route
 */

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/food/detail/:fno" element={<FoodDetail/>}/>
                <Route path="/food/find" element={<FoodFind/>}/>
                <Route path="/recipe/list" element={<RecipeList />}/>
                <Route path="/recipe/detail/:no" element={<RecipeDetail/>} />
            </Routes>
        </Router>
    );
}

export default App;
