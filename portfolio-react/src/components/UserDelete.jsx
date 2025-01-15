import React, { useState } from 'react';
import axios from 'axios';

export const UserDelete = ({ userId, onDeleteSuccess }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // 確認ダイアログを開く
    const openDialog = () => setIsDialogOpen(true);

    // 確認ダイアログを閉じる
    const closeDialog = () => setIsDialogOpen(false);

    // ユーザーを削除する
    const userDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // トークンをヘッダーに設定
                },
            });

            if (response.status === 200) {
                alert('ユーザーが削除されました');
                onDeleteSuccess(); // 削除後のコールバック処理
            } else {
                alert('削除に失敗しました');
            }
        } catch (error) {
            console.error('削除エラー:', error);
            alert('削除に失敗しました');
        }
        closeDialog();
    };

    return (
        <div>
            {/* <button onClick={openDialog} className="btn btn-danger">ユーザー削除</button> */}
            {/* 確認ダイアログ */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50
                 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">

                <h3 className="text-lg font-semibold mb-4">本当に削除しますか？</h3>
                
                <div className="flex justify-between">
                
                    <button
                        onClick={userDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded
                        hover:bg-red-700 focus:outline-none">
                        はい
                    </button>
                
                    <button
                        onClick={closeDialog}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded
                        hover:bg-gray-400 focus:outline-none">
                        いいえ
                    </button>
                </div>
            </div>
        </div>
            )}
        </div>
    );
};