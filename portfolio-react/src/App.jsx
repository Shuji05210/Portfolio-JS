import React from "react";

//ルーティング reacr-router-dom
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"

import { MyLink } from "./components/MyLink";


import { TaskForm } from './components/TaskForm';

import { TaskForUser } from "./components/TaskForUser";

import { List2 } from "./components/List2";

import { UserCreate } from "./components/UserCreate";
import { ResistUserList } from "./components/ResistUserList"; 
import { Login } from "./components/Login";



export const App = () => {
  return (
    <>
      <Router>
        <MyLink></MyLink>

        <Routes>

          <Route path="/taskform" element={<TaskForm></TaskForm>} />

          <Route path="/list" element={<List2></List2>} />

          <Route path="/listuser" element={<TaskForUser></TaskForUser>} />

          <Route path="/usercreate" element={<UserCreate></UserCreate>} />

          <Route path="/login" element={<Login></Login>} />
          <Route path="/userdelete" element={<ResistUserList></ResistUserList>} />


          {/* "/"にだけ表示したいコンテンツ */}
          <Route path="/" element={
            <div className="text-center">
              
              <p>トップページを表示しています</p>
            </div>
          } />

        </Routes>
      </Router>

    </>
  );
}