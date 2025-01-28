import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../index.css';

// サンプルのユーザーデータ (仮)

export const TaskForm = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [taskstateId, setTaskstateId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [priority, setPriority] = useState("");

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");

    // const [color, setColor] = useState("");

    //期日 年,月,日の値を合わせる
    const getDueDate = () => {
        if (year && month && day) {
            return `${year}-${month}-${day}`;
        }
        return '';  // 全ての値が選択されていない場合は空文字
    };


    // ユーザー情報を取得する処理（ログインチェック）
    const getUserInfo = () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login'); // トークンがなければログインページへ遷移
            return;
        }

        axios
            .get('http://127.0.0.1:8000/api/userinfo', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUser(response.data); // ログインユーザー情報の取得
            })
            .catch(() => {
                navigate('/login'); // ユーザー情報取得に失敗した場合、ログインページに遷移
            });
    };


    // //コンポーネントの初回レンダリング時にユーザー情報を取得
    useEffect(() => {
        getUserInfo();
    }, []);

    // フォーム送信時の処理
    const handleSubmit = async (e) => {
        e.preventDefault(); //ページのリロードを防ぐ

        if (!user) {
            setError('ユーザー情報がありません');
            return;
        }

        const token = localStorage.getItem('authToken');

        // フォームデータ データベーステーブルに送られるもの
        // taskDataという配列の中に各項目のデータが入る
        const taskData = {
            title,
            description,
            priority,
            due_date: getDueDate(),
            user_id: user.id,
            taskstate_id: taskstateId,
            category_id: categoryId,
        };
        


        // LaravelのAPIにデータを送信
        axios.post('http://127.0.0.1:8000/api/tasks', taskData,
            { headers: { Authorization: `Bearer ${token}`, }, }) // Laravel APIのURL を記述

            .then((response) => {
                // 送信成功のコンソール表示を行う
                console.log('タスクが作成されました:', response.data);

                // 送信に成功した場合 入力フォームをリセット
                setTitle('');
                setDescription('');
                setTaskstateId('');
                setCategoryId('');
                setPriority('');
                setYear('');
                setMonth('');
                setDay('');
            })

            .catch((error) => {
                setError('タスクの作成に失敗しました');
                console.log('エラーが発生しました:', error);
            });
    };

    // 日付のoption 簡略化
    const years = Array.from({ length: 11 }, (_, index) => 2024 + index);  // 2024年から2034年までを指定
    const months = Array.from({ length: 12 }, (_, index) => index + 1);     // 1月から12月
    const days = Array.from({ length: 31 }, (_, index) => index + 1);     // 1日から31日

    // CSS短縮宣言
    const borderstyle = "border border-gray-300 rounded-md shadow-sm text-lg";
    const selectStyle = "text-center bg-gray-400 text-white";

    const markStyle = "text-black text-xl text-red-800";



    return (
        <>
            <p className="text-center text-lg">
                TaskForm 予定の新規作成が行えます</p>

            <div className="max-w-4xl mx-auto mt-10
         p-4 bg-indigo-100 shadow-lg rounded-lg flex flex-col">


                <div className='bg-indigo-600 mx-auto py-1 mb-4
             w-1/2 rounded-lg'>
                    <h2 className="text-2xl font-semibold text-center
             mb-2 text-white">予定の新規作成</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* タスク名 */}
                    <div className="mb-4 flex flex-col items-center">
                        <label htmlFor="title" className="block text-lg font-medium text-gray-600 w-4/5">
                            タスク名 <span className={markStyle}>※</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="件名を入力"
                            className="mt-1 block w-4/5 px-3 py-2 border border-gray-300 rounded-md
                         shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* 説明 */}
                    <div className="mb-4 flex flex-col items-center">
                        <label htmlFor="description" className="block text-lg font-medium text-gray-600 w-4/5">
                            説明 <span className="text-sm">(任意 500文字以内)</span>
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="ここに説明を書く (未入力可)"
                            className="mt-1 block w-4/5 px-3 py-2 border border-gray-300 rounded-md
                         shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 h-[200px] resize-none"
                        />
                    </div>

                    <div className="mb-2 flex flex-col items-center">
                        {/* 3つ横に並べてる部分 1段目 */}
                        <div className="flex space-x-8 w-4/5 max-w-4/5">
                            {/* ジャンル */}
                            <div className="">
                                <label htmlFor="options1" className="block text-lg font-medium text-blue-700">
                                    ジャンル <span className={markStyle}>※</span>
                                </label>
                                <select id="options1"
                                    name="options1"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className={borderstyle}>
                                    <option value="" className={selectStyle}>---選択---</option>
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

                            {/* 現在の状態  */}
                            <div className="">
                                <label htmlFor="options2" className="block text-lg font-medium text-blue-700">
                                    現在の状態 <span className={markStyle}>※</span>
                                </label>
                                <select id="options2"
                                    name="options2"
                                    value={taskstateId}
                                    onChange={(e) => setTaskstateId(e.target.value)}
                                    className={borderstyle}>
                                    <option value="" className={selectStyle}>---選択---</option>
                                    <option value="1" className="text-center">未着手</option>
                                    <option value="2" className="text-center">進行中</option>
                                    <option value="3" className="text-center">完了</option>
                                    <option value="4" className="text-center">保留中</option>
                                </select>
                            </div>

                            {/* 優先度 */}
                            <div className="mb-4">
                                <label htmlFor="options3" className="block text-lg font-medium text-red-700">
                                    優先度 <span className={markStyle}>※</span>
                                </label>
                                <select id="options3"
                                    name="option3"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className={borderstyle}>
                                    <option value="" className={selectStyle}>---選択---</option>
                                    <option value="未指定" className="text-center">未指定</option>
                                    <option value="低" className="text-center">低</option>
                                    <option value="中" className="text-center">中</option>
                                    <option value="高" className="text-center">高</option>

                                </select>
                            </div>

                            {/* 仮 カラー機能 */}
                            {/* <div className="mb-4">
                        <label htmlFor="options4" className="block text-lg font-medium text-gray-800">
                            カラー設定
                        </label>
                        <select id="options4"
                            name="options4"
                         value={color}
                         onChange={(e) => setColor(e.target.value)}
                         className={borderstyle}>
                        >
                            <option value="" className="text-center bg-gray-300">---選択---</option>
                            <option value="1" className="bg-indigo-400"> </option>
                            <option value="2" className="bg-green-400"> </option>
                            <option value="3" className="bg-purple-400"></option>
                            <option value="4" className="bg-orange-400"> </option>
                            <option value="5" className="bg-amber-400"> </option>
                            <option value="6" className="bg-red-400"> </option>
                            <option value="7" className="bg-sky-400"> </option>
                            <option value="8" className="bg-gray-400"> </option>
                            <option value="9" className="bg-white"> </option>
                            <option value="10" className="bg-pink-400"> </option>

                        </select>
                    </div> */}

                        </div>
                    </div>


                    {/* 日付 年月日をセレクトボックスにてそれぞれ選ぶ */}
                    <div className="mb-2 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-start w-4/5 mb-4 max-w-4/5">
                            {/* 3つ横に並べてる部分 2段目 */}

                            <label htmlFor="year" className="block text-lg font-medium text-red-700 text-left">
                                期日を設定 <span className={markStyle}>※</span>
                            </label>
                            <div className="flex space-x-6 w-4/5">

                                <div className="text-lg">
                                    <label htmlFor="year" className="w-4/5"></label>
                                    <select id="year" value={year} onChange={(e) => setYear(e.target.value)}
                                        className={borderstyle}>
                                        <option value="" className="text-center bg-gray-300">--選択--</option>
                                        {years.map((yearOption) => (
                                            <option className="text-center" key={yearOption} value={yearOption}>
                                                {yearOption}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-xl font-bold">年</span>
                                </div>

                                <div className="text-center">
                                    <select id="month" value={month} onChange={(e) => setMonth(e.target.value)}
                                        className={borderstyle}>
                                        <option className="text-center bg-gray-300" value="">--選択--</option>
                                        {months.map((monthOption) => (
                                            <option className="text-xl text-center" key={monthOption} value={monthOption}>
                                                {monthOption}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="month"><span className="text-xl font-bold">月</span></label>
                                </div>

                                <div className="text-center">
                                    <select id="day" value={day} onChange={(e) => setDay(e.target.value)}
                                        className={borderstyle}>
                                        <option className="text-center bg-gray-300" value="">--選択--</option>
                                        {days.map((dayOption) => (
                                            <option className="text-xl text-center" key={dayOption} value={dayOption}>
                                                {dayOption}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="day"><span className="text-xl font-bold">日</span></label>
                                </div>
                            </div>
                        </div>
                    </div>


                    <p className="text-right"><span className={markStyle}>※</span>は選択必須項目</p>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`w-1/4 bg-blue-400 text-white text-center py-2 px-4
                        font-semibold rounded-md shadow-md hover:bg-sky-700`}>
                            予定を作成</button>
                    </div>
                </form>
            </div>
        </>
    );
};
