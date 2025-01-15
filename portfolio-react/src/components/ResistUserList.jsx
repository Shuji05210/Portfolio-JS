import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserDelete } from './UserDelete'; // 削除コンポーネント
import '../index.css';

export const ResistUserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    // ユーザー一覧を取得する
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('ユーザー一覧の取得に失敗しました', error);
            }
        };

        fetchUsers();
    }, []); // 初回レンダリング時に実行

    // ユーザー削除後にリストを更新
    const handleDeleteSuccess = () => {
        setUsers(users.filter(user => user.id !== selectedUserId));
        setSelectedUserId(null); // 選択されたユーザーをクリア
    };

    return (
        <div className="w-1/2 mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">登録ユーザー一覧</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-semibold
                         text-gray-600 border-b">名前</th>

                        <th className="px-4 py-2 text-left text-sm font-semibold
                         text-gray-600 border-b">Email</th>

                        <th className="px-4 py-2 text-center text-sm font-semibold
                         text-gray-600 border-b">削除</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-800 border-b">
                                {user.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-800 border-b">
                                {user.email}</td>
                            <td className="px-4 py-2 text-center">
                                {/* 削除ボタン */}
                                
                                <button
                                    onClick={() => setSelectedUserId(user.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded
                                    hover:bg-red-700 focus:outline-none">
                                    削除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 削除コンポーネント */}
            {selectedUserId && (
                <UserDelete userId={selectedUserId} onDeleteSuccess={handleDeleteSuccess} />
            )}
        </div>
    );
};