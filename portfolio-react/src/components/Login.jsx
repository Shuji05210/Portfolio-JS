import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
            });

            // 成功した場合、トークンをローカルストレージに保存
            localStorage.setItem('authToken', response.data.token);
            alert("ログインに成功");
            navigate('/taskform'); // ログイン後にタスクフォームに遷移
        } catch (err) {
            setError('ログインに失敗しました');
        }
    };

    return (
        <div>
            <h2>ログイン</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">ログイン</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};
