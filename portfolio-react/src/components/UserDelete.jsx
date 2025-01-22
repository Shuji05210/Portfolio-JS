import React, { useState } from 'react';
import axios from 'axios';

export const UserDelete = ({ userId, userName, onDelete }) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleDeleteClick = () => {
        setShowDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`);

            onDelete(userId); // 削除後、親コンポーネントに通知
            setShowDialog(false);
            alert(`${userId}を 削除しました`);

        } catch (error) {
            console.error("削除に失敗しました", error);
            setShowDialog(false);
        }
    };

    // トークンをヘッダーに設定


    const handleCancelDelete = () => {
        setShowDialog(false);
    };


    return (
        <div>
            <button
                className="mt-2 bg-red-400 text-white text-xl py-1 px-3
                 rounded hover:bg-red-600"
                onClick={handleDeleteClick}>
                削除
            </button>


            {/* 確認ダイアログ */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50
                 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">

                        <h3 className="text-lg text-left font-semibold mb-4">
                            ID: {userId} <br/> UserName: {userName} <br/> を削除します｡
                            本当に削除しますか？</h3>

                        <div className="flex justify-center space-x-20">

                            <button
                                onClick={handleConfirmDelete}
                                className="w-20 bg-red-400 text-white px-4 py-2 rounded
                        hover:bg-red-800 focus:outline-none">
                                はい
                            </button>

                            <button
                                onClick={handleCancelDelete}
                                className="w-20 bg-gray-300 text-gray-700 px-4 py-2 rounded
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