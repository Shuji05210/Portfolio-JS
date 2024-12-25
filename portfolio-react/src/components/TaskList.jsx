
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

export const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/tasks') // LaravelのAPIからデータを取得する
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // console.log(tasks); //taskテーブルのデータ取得

    //ボタン押したテスト
    const onClickButton = ()=>{
        console.log('ボタンを押した');
    };


    // 日付を"YYYY-MM-DD"形式にフォーマットする関数 12/2実装 日付のみを取り出せる
    // {formatDate(~.updated_at)} のように書く
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('ja-JP'); // 日本のフォーマットに変換
    };

    const textStyle = "text-gray-600 font-bold tracking-wide";

    //タスク一覧表示
    return (
        <>
            <div className="p-4 max-w-4xl mx-auto bg-white">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
                    タスク一覧 TaskList</h1>
                    <p className='pt-4 text-xl text-center'>編集機能なし</p>
            </div>

            {tasks.map(task =>
                <div className=" max-w-4xl mx-auto py-6" key ={task.id}>
                    <div className="list-disc pl-6 shadow-lg rounded-lg space-y-6
                pb-8 bg-indigo-100 pt-5 text-lg">
                        <strong className="text-indigo-700 tracking-wide text-2xl">
                           <span className="text-lg">件名:</span> 
                           {task.title}</strong>
                        
                        <p className={textStyle} >
                            説明: {task.description}</p>

                        <p className={textStyle} >
                            期日: <span className="text-red-400 text-2xl">
                                {task.due_date} </span>
                            / 作成日: <span className='text-green-600 text-2xl'>{formatDate(task.created_at)}
                                </span></p>

                        <p className={textStyle} >
                            ユーザーID: <span className="text-green-600 text-2xl">
                                {task.user_id} </span>
                        </p>

                        <p className = {textStyle} >
                            カテゴリ: { task.category.genre} /
                            <span className="ml-2">
                                重要度:{task.priority}</span></p>

                        <p className="text-xl font-medium text-gray-600">
                            <span className="text-blue-500 text-lg font-medium">
                                タスクの状態: </span>
                            {task.taskstate.state}
                        </p>

                        {/* <p>{task.taskstate.message}</p> */}

                        {/* タスク編集機能用のボタン */}
                        {/* <button
                            type="button"
                            className="w-1/6 bg-gray-400 text-white text-center py-1                        font-semibold rounded-md shadow-md hover:bg-sky-700"
                            onClick={onClickButton}>
                            予定編集</button> */}

                    </div>
                    
                    <div className="pb-6"></div>
                </div>
            )}
        </>
    );

}