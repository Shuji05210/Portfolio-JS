import React, { useEffect, useState } from "react";
import axios from "axios";

import { calculateDaysRemaining } from './calculateDaysRemaining';
import { Change } from "./Change";
import { Delete } from "./Delete";

export const TaskForUser = () => {
    const [users, setUsers] = useState([]); // ユーザーリスト
    const [userId, setUserId] = useState(''); // 選択されたユーザーID
    const [tasks, setTasks] = useState([]); // タスクリスト
    const [error, setError] = useState(null); // エラーメッセージ
    const [loading, setLoading] = useState(false); // ローディング状態

    const [editingTaskId, setEditingTaskId] = useState(null); // 編集するタスクのID


    // ユーザーIDリストを取得
    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('ユーザーIDの取得に失敗しました', error);
            });
    }, []);

    // タスクを取得する関数
    const fetchParentTasks = async () => {
        if (!userId) {
            setError("ユーザーIDを選択してください");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:8000/api/userview/${userId}`);
            setTasks(response.data);
        } catch (error) {
            setError("タスクの取得に失敗しました。");
        } finally {
            setLoading(false);
        }
    };

    // タスク削除後にタスク一覧を更新
    const handleDelete = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        alert("タスクは削除されました");
    };

    const textStyle = "text-gray-600 font-bold tracking-wide";

    // 日付を"YYYY-MM-DD"形式にフォーマットする関数
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('ja-JP'); // 日本のフォーマットに変換
    };

    //編集ボタン押したときの動作
    const handleEditClick = (taskId) => {
        setEditingTaskId(taskId); // 編集するタスクのIDをセット

        window.scrollTo({
            top: 0,
            behavior: "smooth", // スムーズスクロール 上にスクロールさせる
        });

        console.log("編集作業に入った");
    };


    return (
        <>
            <div className="w-1/2 text-center mx-auto bg-green-200 p-4 rounded-xl">
                <h1 className="text-blue-800 text-center text-xl font-bold mb-3">
                    指定したユーザーIDの タスクのみを表示</h1>

                <select
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="mx-auto w-full-1/2 text-center py-2 my-6 border-2 border-blue-300 
                    hover:border-blue-600 rounded-md flex">
                    <option value="" className="font-bold bg-gray-500 text-white">
                    ---User IDを選択---</option>
                    
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.id}
                        </option>
                    ))}
                </select>

                <button
                    onClick={fetchParentTasks}
                    className="border-red-200 bg-white
                    hover:bg-orange-200 hover:border-red-400 hover:font-bold
                     border-2 p-2 rounded-lg"
                    disabled={loading}
                >
                    {loading ? 'データを取得中...' : 'データを取得'}
                </button>


            </div>

            {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

            {editingTaskId && <Change taskId={editingTaskId}
                setEditingTaskId={setEditingTaskId} onSave={fetchParentTasks} />}

            {tasks.length > 0 ? (
                tasks.map(task => (
                    <div className="max-w-4xl mx-auto py-6" key={task.id}>
                        <div className="list-disc pl-6 shadow-lg rounded-xl 
                        space-y-6 pb-8 bg-indigo-100 pt-5 text-lg">

                            {/* 編集ボタン */}
                            <div className="flex justify-end mr-5">
                                <button
                                    className="w-20 h-10 bg-white text-base p-1 rounded-md
                                     border-2 border-gray-300 hover:bg-green-200 hover:border-gray-600
                                      hover:font-bold"
                                    onClick={() => handleEditClick(task.id)}
                                >編集</button>

                                {/* 削除ボタン */}
                                <Delete taskId={task.id} onDelete={handleDelete} />

                            </div>

                            <strong className="text-indigo-700 tracking-wide text-2xl">
                                <span className="text-lg">
                                    件名:</span> {task.title}
                            </strong>


                            <p className={textStyle} >
                                説明: {task.description}</p>

                            <div className={textStyle} >
                                期日: <span className="text-rose-500 text-2xl">
                                    {task.due_date} </span>
                                (残り日数 <span className='text-2xl text-rose-700'>
                                    {calculateDaysRemaining(task.due_date)}</span> 日)

                                / 作成日: <span className="text-green-600 text-2xl">
                                    {formatDate(task.created_at)}
                                </span></div>

                            <p className={textStyle} >最終更新日:
                                <span className='text-indigo-700 text-2xl'>
                                    {formatDate(task.updated_at)}</span></p>

                            <p className={textStyle} >
                                ユーザー情報 [ ID:<span className="text-green-600 text-2xl">
                                    {task.user_id} </span> / {task.user.name} / {task.user.email} ]
                            </p>

                            <p className={textStyle} >
                                カテゴリ: <span className="text-xl text-blue-500"
                                >{task.category.genre} </span>
                                /
                                <span className="ml-2">
                                    重要度: {task.priority}</span></p>

                            <p className="text-xl font-medium text-orange-600">
                                <span className="text-blue-700 text-lg font-medium">
                                    タスクの状態: </span>
                                {task.taskstate.state}
                            </p>

                            <div className='flex justify-center'>
                                <p className='bg-white w-1/2 text-center text-base'>
                                    タスク管理 ID : {task.id}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <>
                    <div className="w-1/2 text-center mx-auto bg-orange-200 p-4 mt-10 rounded-xl">
                        <p className="bg-white text-xl font-bold">
                            表示対象となるタスクがありません</p>
                    </div>
                </>)}

        </>
    );
};
