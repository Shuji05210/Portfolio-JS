
import React, { useState } from 'react';
import axios from 'axios';

export const Delete = ({ taskId, onDelete }) => {
    const [showConfirmation, setShowConfirmation] = useState(false); // 確認ボックスを表示するかどうか

    // 削除確認ボタンが押されたときの処理
    const handleDeleteClick = () => {
        setShowConfirmation(true); // 確認ボックスを表示
    };

    // 削除実行
    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/delete/${taskId}`);

            if (response.status === 200) {
                onDelete(taskId);  // 親コンポーネントのタスク更新
                console.log('タスクが削除されました');
            } else {
                console.log('削除に失敗しました');
            }
        } catch (error) {
            console.error(error);
            console.log('エラーが発生しました');
        }
        setShowConfirmation(false);  // 確認ボックスを非表示
    };

    // キャンセルボタンが押されたとき
    const handleCancel = () => {
        setShowConfirmation(false);  // 確認ボックスを非表示
    };

    return (
        <>
            {showConfirmation ? (
                <div className='w-1/2 ml-4 p-6 text-center text-lg bg-gray-500'>
                    <p className='text-xl text-white p-2'>
                        本当にデータを削除してもよろしいですか?</p>
                    <p className='text-red-700 bg-white bg-white font-bold'>
                        ※入力データは消去され 復元することができません</p>
                    <div className="mt-2">
                        <button
                            onClick={handleConfirmDelete}
                            className="mr-4 p-1 border-2 bg-red-200 hover:bg-rose-400
                            hover:font-bold rounded-md shadow-sm text-lg
                            border-gray-300 hover:border-gray-800">
                            削除を実行
                        </button>

                        <button
                            onClick={handleCancel}
                            className="ml-4 p-1 border-2 bg-white hover:bg-blue-300
                            hover:font-bold rounded-md shadow-sm text-lg
                             border-gray-300 hover:border-gray-800">
                            キャンセル
                        </button>
                    </div>
                </div>

            ) : (
                <button
                    className="w-24 h-10 ml-4 p-1 bg-white hover:bg-red-300 
                    rounded-md text-base border-2 border-gray-300 hover:border-gray-600 hover:font-bold"
                    onClick={handleDeleteClick}>
                    削除 (確認)</button>
            )}
        </>
    );
};