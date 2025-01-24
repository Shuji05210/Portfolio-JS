import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password,
            });

            // 成功した場合、トークンをローカルストレージに保存
            localStorage.setItem('authToken', response.data.token);
            alert("ログインに成功");
            // navigate('/taskform'); // ログイン後にタスクフォームに遷移
        } catch (err) {
            setError('ログインに失敗しました');
        }
    };

    return (
        <div className='max-w-2xl text-center mx-auto bg-green-200
         p-4 mt-10 rounded-xl text-center'>

            <h2 className='text-xl font-semibold mb-5'>ログイン画面</h2>

            <form onSubmit={handleLogin}>

                <div className='mb-5 flex justify-center items-center space-x-4 mr-20'>
                    <label htmlFor="email"
                        className="text-sm font-medium text-gray-700 w-28">
                        メールアドレス(email)</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='メールアドレス を入力'
                        className='w-1/2 p-1 mt-1 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-orange-500'
                    />
                </div>

                <div className='mb-10 flex justify-center items-center space-x-4 mr-20'>
                    <label htmlFor="password"
                        className="text-sm font-medium text-gray-700 w-28">
                        パスワード(Password)</label>
                    <input
                        id='password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='パスワード を入力'
                        className='w-1/2 p-1 mt-1 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-orange-500'
                    />
                </div>

                <button
                    type="submit"
                    className="w-1/3 p-2 bg-orange-400 text-white rounded-md
                     hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    ログイン
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};
