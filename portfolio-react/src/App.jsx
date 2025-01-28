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


const LiCss = "list-none mt-4 ml-4 pb-6";
const LiCss2 = "font-bold text-blue-500 hover:text-black hover:underline";


export const App = () => {
  return (
    <>
      <Router>
        <MyLink></MyLink>

        <Routes>

          <Route path="/taskform" element={<TaskForm></TaskForm>} />

          <Route path="/list" element={<List2></List2>} />

          <Route path="/taskuser" element={<TaskForUser></TaskForUser>} />

          <Route path="/login" element={<Login></Login>} />
          <Route path="/usercreate" element={<UserCreate></UserCreate>} />
          <Route path="/userlist" element={<ResistUserList></ResistUserList>} />


          {/* "/"にだけ表示したいコンテンツ */}
          <Route path="/" element={
            <>
              <div className="text-center text-lg">
                <p><span className="text-red-500">TOP</span> のページを表示しています</p>
              </div>

              <div className="w-1/2 mx-auto flex justify-center container
              mt-8 text-xl bg-blue-100 rounded-2xl">
                <div className="container">

                  <ul className={LiCss}>
                    <li><a href="/login" className={LiCss2}>
                      ログイン</a></li>

                    <li><a href="/usercreate" className={LiCss2}>
                      ユーザ登録</a></li>

                    <li><a href="/userlist" className={LiCss2}>
                      ユーザ一覧</a></li>
                  </ul>

                  <ul className={LiCss}>
                    <li><a href="list" className={LiCss2}>
                      タスク一覧</a></li>

                    <li><a href="/taskuser" className={LiCss2}>
                      ID個別表示</a></li>
                  </ul>

                </div>
                <div className="flex-col text-gray-700 mt-4 w-full">
                  <p>ログイン機能(仮)</p>
                  <p>ユーザの登録機能</p>
                  <p>登録ユーザ一覧表示</p>

                  <br />

                  <p>タスク一覧表示 + 編集機能</p>
                  <p>特定のユーザIDを指定してタスクを表示</p>
                  

                </div>

              </div>
            </>
          } />

        </Routes>
      </Router>

    </>
  );
}