import React from "react";

//ルーティング reacr-router-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { MyLink } from "./components/MyLink";


import { TaskForm } from './components/TaskForm';

import { TaskForUser } from "./components/TaskForUser";

import { List2 } from "./components/List2";

import { UserCreate } from "./components/UserCreate";
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
 
          <Route path="/login" element= {<Login></Login>}/>


          {/* リスト2 全体のタスク表示と編集更新 */}
          {/* <List2></List2> */}


          {/* ユーザー個別表示 + 編集機能 */}
          {/* <TaskForUser></TaskForUser> */}

          {/* 新規作成 入力フォーム */}
          {/* <TaskForm></TaskForm> */}
        </Routes >
      </Router>
      説明を書いていく
    </>
  );
}