import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Change } from './Change';
import { Delete } from './Delete';
import { calculateDaysRemaining } from './calculateDaysRemaining';

export const List2 = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null); // 編集するタスクのID

    const taskRefs = useRef([]);

    useEffect(() => {
        // タスクリストをAPIから取得
        axios.get('http://localhost:8000/api/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('タスクの取得に失敗しました:', error);
            });
    }, []);

    const handleEditClick = (taskId) => {
        setEditingTaskId(taskId); // 編集するタスクのIDをセット

        window.scrollTo({
            top: 0,
            behavior: "smooth", // スムーズスクロール 上にスクロールさせる
        });

        console.log("編集作業に入った");
    };

    // タスク削除後にタスク一覧を更新
    const handleDelete = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    //onSave用 再読み込み
    const Reload = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/tasks');
            setTasks(response.data);

            //スクロールして編集元のタスクの位置へ
            if (editingTaskId) {
                const taskElement = taskRefs.current[editingTaskId];
                if (taskElement) {
                    taskElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
            }

        } catch (error) {
            console.log('タスクの取得に失敗しました:', error);
        }
    }

    const textStyle = "text-gray-600 font-bold tracking-wide";


    // 日付を"YYYY-MM-DD"形式にフォーマットする関数
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('ja-JP'); // 日本のフォーマットに変換
    };

    return (
        <>
            {/* データをリスト表示 */}
            < div className="p-4 max-w-4xl mx-auto bg-white" >
                <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center tracking-wide">
                    List2</h1>
                <p className='text-center mb-6'>タスクリスト 機能(リスト表示, 編集, 削除)</p>


                {editingTaskId && <Change taskId={editingTaskId}
                    setEditingTaskId={setEditingTaskId}
                    onSave={Reload} />}

                {tasks.map((task) => (
                    <div className="max-w-4xl mx-auto py-6" key={task.id} >

                        <div className="list-disc pl-6 shadow-lg rounded-lg space-y-6
                         pb-8 bg-indigo-100 pt-5 text-lg" ref={(el) => (taskRefs.current[task.id] = el)}>

                            {/* 編集ボタン */}
                            <div className="flex justify-end mr-5">
                                <button
                                    className="w-20 h-10 bg-white text-base p-1
                                rounded-md border-2 border-gray-300 hover:bg-green-200 hover:border-gray-600 hover:font-bold"
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
                                (残り日数 <span className='text-2xl text-rose-700'>{calculateDaysRemaining(task.due_date)}</span> 日)

                                / 作成日: <span className="text-green-600 text-2xl">
                                    {formatDate(task.created_at)}
                                </span></div>

                            <p className={textStyle} >最終更新日: <span className='text-indigo-700 text-2xl'>{formatDate(task.updated_at)}</span></p>

                            <p className={textStyle} >
                                ユーザー情報 [ ID:<span className="text-green-600 text-2xl">
                                    {task.user_id} </span> / {task.user.name} / {task.user.email} ]
                            </p>

                            <p className={textStyle} >
                                カテゴリ: {task.category.genre} /
                                <span className="ml-2">
                                    重要度: {task.priority}</span></p>

                            <p className="text-xl font-medium text-orange-600">
                                <span className="text-blue-500 text-lg font-medium">
                                    タスクの状態: </span>
                                {task.taskstate.state}
                            </p>

                            <div className='flex justify-center'>
                                <p className='bg-white w-1/2 text-center text-base'>
                                    タスク管理 ID : {task.id}</p>
                            </div>
                        </div>

                    </div >
                ))}

            </div >
        </>
    );
};
