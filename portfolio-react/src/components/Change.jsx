import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Change = ({ taskId, setEditingTaskId, onSave }) => {
    const [editData, setTaskData] = useState({
        title: '',
        description: '',
        priority: '',
        due_date: '',
        category_id: '',
        taskstate_id: ''
    });

    // 編集するタスクの詳細を取得
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/tasks/${taskId}`);
                setTaskData(response.data);
            } catch (error) {
                console.error('タスクの取得に失敗しました:', error);
            }
        };

        fetchTask(); // 編集するタスクのデータを取得
    }, [taskId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        try {
            await axios.put(`http://localhost:8000/api/tasks/${taskId}`, editData);
            console.log('タスクが更新されました:', editData);

            setEditingTaskId(null); // 編集モードを終了

            //更新後に再度タスクデータ取得 useEffectとfetchTasks
            onSave();


        } catch (error) {
            console.error('タスクの更新に失敗しました:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingTaskId(null); // 編集をキャンセル
        console.log("編集作業をキャンセル");
    };


    const borderstyle = "border border-gray-300 rounded-md shadow-sm text-lg";

    return (
        <div className=" max-w-4xl mx-auto py-4 text-center
                 space-y-2 p-4 mb-4 mt-4 border border-gray-300 rounded-lg shadow-lg bg-rose-200">
            <div>
                <div className='bg-rose-600  mx-auto py-1 mb-4 px-4 rounded-lg shadow-md w-1/2'>
                    <p className='text-2xl font-bold mb-2 text-white'>編集中 ( ID: {editData.id} )</p>
                </div>

                <label htmlFor="title" className="block text-lg font-medium text-gray-600">件名:</label>
                <input
                    type="text"
                    required
                    id='title'
                    name="title"
                    className="w-3/4 p-2 border border-gray-300 rounded
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="タスク名"
                    value={editData.title}
                    onChange={handleInputChange}
                />
            </div>


            {/* 説明 */}
            <div className="mb-3">
                <label htmlFor="description" className="block text-lg font-medium text-gray-600">
                    説明 <span className="text-sm">(任意 500文字以内)</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={editData.description}
                    onChange={handleInputChange}
                    placeholder="ここに説明を書く (未入力可)"
                    className="mt-1 w-3/4 p-2 border border-gray-300 rounded-md
                         shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 h-[250px] resize-none"
                />
            </div>

            <div className='flex justify-center space-x-6 pb-6'>
                <div>
                    <label htmlFor='priority' className='block text-lg font-medium text-blue-700'>
                        優先度</label>
                    <select
                        id="priority"
                        name="priority"
                        className={borderstyle}
                        value={editData.priority}
                        onChange={handleInputChange}
                    >
                        <option value="未指定" className="text-center bg-gray-300">未指定</option>
                        <option value="低" className="text-center">低</option>
                        <option value="中" className="text-center">中</option>
                        <option value="高" className="text-center">高</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="category_id" className="block text-lg font-medium text-blue-700">
                        ジャンル</label>
                    <select id="category_id"
                        name="category_id"
                        value={editData.category_id}
                        onChange={handleInputChange}
                        className={borderstyle}>

                        <option value="1">1: 個人的</option>
                        <option value="2">2: 仕事</option>
                        <option value="3">3: 娯楽</option>
                        <option value="4">4: 勉強</option>
                        <option value="5">5: 買い物</option>
                        <option value="6">6: 家事</option>
                        <option value="7">7: 旅行</option>
                        <option value="8">8: その他</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="taskstate_id" className="block text-lg font-medium text-blue-700">
                        現在の状態
                    </label>
                    <select id="taskstate_id"
                        name="taskstate_id"
                        value={editData.taskstate_id}
                        onChange={handleInputChange}
                        className={borderstyle}>

                        <option value="1" className="text-center">未着手</option>
                        <option value="2" className="text-center">進行中</option>
                        <option value="3" className="text-center">完了</option>
                        <option value="4" className="text-center">保留中</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="due_date"
                        className="block text-lg font-medium text-blue-700">期限:</label>
                    <input
                        type="date"
                        id="due_date"
                        name="due_date"
                        className=""
                        value={editData.due_date}
                        onChange={handleInputChange}
                    />
                </div>
            </div>


            <div className='flex justify-center space-x-4 mt-4'>
                <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-indigo-800"
                    onClick={handleSaveClick}>
                    データを更新する</button>

                <button
                    className="bg-rose-600 text-white p-2 rounded hover:bg-rose-800"
                    onClick={handleCancelClick}>
                    キャンセル</button>
            </div>

        </div>
    );
};
