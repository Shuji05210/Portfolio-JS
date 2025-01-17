import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UserEdit = ({ userId, onSave, onCancel }) => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // ユーザー情報を取得してフォームにセットする
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
                setUser(response.data); // 編集用にセットする
            } catch (error) {
                setError('ユーザー情報の取得に失敗しました');
            }
        };

        fetchUser();
    }, [userId]); // userIdが変わるたびに再度ユーザー情報を取得

    // 入力値が変更されたときのハンドラー
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // フォーム送信時のハンドラー
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // ユーザー情報を更新
            await axios.put(`http://127.0.0.1:8000/api/users/${userId}`, user);
            onSave(user); // 編集後のデータを親コンポーネントに通知
        } catch (error) {
            setError('ユーザー情報の更新に失敗しました');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">ユーザー情報の編集</h3>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="name">
                            名前
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">
                            メール
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            disabled={isLoading}
                        >
                            {isLoading ? '保存中...' : '保存'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            キャンセル
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};