import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserCreate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setErrorMessage('Password が確認用と一致していません');
            return;
        }

        try {
            const userdata = {
                name,
                email,
                password,
            }

            await axios.post('http://127.0.0.1:8000/api/users', userdata);

            console.log('ユーザー作成に成功', userdata);
            alert("どう゛ろ゛ぐに゛ぜい゛ごう゛した");

            //入力フォーム初期化
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');

        } catch (err) {
            setError('登録に失敗');
        }
    };

    return (
        <>
            <div className='max-w-2xl text-center mx-auto bg-orange-200 p-4 mt-10 rounded-xl text-center'>

                <h2 className='text-xl font-semibold mb-5 text-orange-800'>新規ユーザー登録</h2>

                <form onSubmit={handleRegister}>
                    <div className='mb-5 flex justify-center items-center space-x-4 mr-20'>
                        <label htmlFor="name" className="text-sm font-medium text-gray-700 w-28">
                            ユーザー名(UserName)</label>
                        <input
                            id='name'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='登録するユーザー名を入力'
                            className='w-1/2 p-1 mt-1 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-orange-500'
                        />
                    </div>

                    <div className='mb-5 flex justify-center items-center space-x-4 mr-20'>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 w-28">
                            メールアドレス(Email)</label>
                        <input
                            id='email'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='登録するメールアドレスを入力'
                            className='w-1/2 p-1 mt-1 border border-gray-300 rounded-md
                             focus:outline-none focus:ring-2 focus:ring-orange-500'
                        />
                    </div>

                    <div className='mb-5 flex justify-center items-center space-x-4 mr-20'>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 w-28">
                            登録パスワード(Password)</label>
                        <input
                            id='password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='6文字以上のパスワードを入力'
                            className='w-1/2 p-1 mt-1 border border-gray-300 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-orange-500'
                        />
                    </div>

                    <div className='mb-12 flex justify-center items-center space-x-4 mr-20'>
                        <label htmlFor="pconfir" className="text-sm font-medium text-gray-700 w-28">
                            <span className='text-red-800 text-lg'>※再度確認</span>
                            </label>
                        <input
                            id='pconfir'
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            placeholder='パスワードを再度入力'
                            className='w-1/2 p-1 mt-1 border border-gray-300 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-orange-500'
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-1/3 p-2 bg-orange-400 text-white rounded-md
                         hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                            登録する
                    </button>
                    
                </form>
                {error && <p>{error}</p>}
            </div>
            <p className='text-gray-500 text-center mt-7'>
                ※パスワードは6文字以上の任意の文字列<br/>
            メールアドレスは ~ @ ~ の形式のみ登録可</p>


        </>
    );
};