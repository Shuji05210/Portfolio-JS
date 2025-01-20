import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserDelete } from './UserDelete'; // 削除コンポーネント
import { UserEdit } from './UserEdit'; //更新
import '../index.css';

export const ResistUserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);

    // ユーザー一覧を取得する
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('ユーザー一覧の取得に失敗しました', error);
            }
        };

        fetchUsers();
    }, []); // 初回レンダリング時に実行

    // ユーザー削除後にリストを更新
    const handleDelete = (deleteUserId) => {
        setUsers(users.filter(user => user.id !== deleteUserId));
    };

    const handleEdit = (userId) => {
        setEditingUserId(userId);
    };

    const handleSave = (updatedUser) => {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingUserId(null);
    };

    const handleCancelEdit = () => {
        setEditingUserId(null);
    };

    // 日付を日本フォーマットに
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('ja-JP'); // 日本のフォーマットに変換
    };

    return (
        <div className="w-1/2 mx-auto text-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">登録ユーザー一覧</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-2 py-2 text-left text-sm font-semibold
                        text-gray-600 border-b">UserID</th>

                        <th className="px-4 py-2 text-left text-sm font-semibold
                        text-gray-600 border-b">名前</th>

                        <th className="px-2 py-2 text-left text-sm font-semibold
                         text-gray-600 border-b">Email</th>

                        <th className="px-4 py-2 text-center text-sm font-semibold
                         text-gray-600 border-b">操作</th>

                        <th className="py-2 text-center text-sm font-semibold
                         text-gray-600 border-b">登録日</th>

                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-xl text-gray-800 border-b">
                                {user.id}</td>
                            <td className="px-4 py-2 text-xl text-gray-800 border-b">
                                {user.name}</td>
                            <td className="px-4 py-2 text-lg text-gray-800 border-b">
                                {user.email}</td>
                            <td className="px-3 py-2 text-center">
                                <button
                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                    onClick={() => handleEdit(user.id)}
                                >
                                    編集
                                </button>

                                <UserDelete userId={user.id} onDelete={handleDelete}/>

                            </td>
                            <td className="py-2 text-lg text-center text-gray-800 border-b">
                                {formatDate(user.created_at)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingUserId && (
                <UserEdit
                    userId={editingUserId}
                    onSave={handleSave}
                    onCancel={handleCancelEdit}
                />
            )}

        </div>
    );
};