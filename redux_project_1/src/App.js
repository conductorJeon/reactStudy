import {Provider} from 'react-redux';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import store from './store/store';
import FoodList from './components/FoodList';
import foodDetail from "./components/FoodDetail";
import FoodDetail from "./components/FoodDetail";
import RecipeDetail from "./components/RecipeDetail";
import BoardList from "./components/BoardList";
import BoardInsert from "./components/BoardInsert";
import BoardDetail from "./components/BoardDetail";
import BoardUpdate from "./components/BoardUpdate";
import RecipeFind from "./components/RecipeFind";

/*
    npm start => 서버 동작 (nodejs 기반)
        |
      index.js
        |
      App 호출
        | = return HTML
      index.html
    public : image / css / javascript 라이브러리 / html
    src : js / ts / jsx / tsx
                    --------- xml 형식으로 html을 제작
          ------- 일반

    자바
      React : JSP
      Redux : MVC
      TanstackQuery : SpringFramework
      Next : SpringBoot

    Redux : 데이터 관리 + 화면 출력 =>
            단방향 통신
            --------- 보완

    store : 실제 React에서 출력할 데이터 저장
    reducer : React에서 전송된 데이터를 store에 보내주는 역할
    action : 사용자 요청한 이벤트
    dispatch : store를 데이터를 읽어서 => 화면 출력

    store ------ component(HTML) => JSP
                        |
                      Action
                        |
                     Dispatch
                        |
                      Reduce
                        |
                      store

                       axios => 서버 데이터 읽기
     사용자 (UI) ----- action 호출 ------------- reducer ------ store
                  |                    |          | 자동으로 store 저장
               dispatch()           dispatch()
         |                |                                     |
       return          controller --------------------          db
         |
      JSP 화면

      1. Action : reducer ==> store
        => 기능 수행 : foodListData()
              | dispatch
      2. Reducer : 결과값을 받아서 => store
              | dispatch
      3. store : 데이터 갱신 => 화면에 전송
 */

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path={"/"} element={<FoodList/>}></Route>
            <Route path={"/food/detail/:fno"} element={<FoodDetail/>}></Route>
              <Route path={"/recipe/detail/:no"} element={<RecipeDetail/>}></Route>
              <Route path={"/recipe/find"} element={<RecipeFind/>}></Route>
              <Route path={"/board/list"} element={<BoardList/>}></Route>
              <Route path={"/board/insert"} element={<BoardInsert/>}></Route>
              <Route path={"/board/detail/:no"} element={<BoardDetail/>}></Route>
              <Route path={"/board/update/:no"} element={<BoardUpdate/>}></Route>
          </Routes>
        </Router>
      </Provider>
  );
}

export default App;
