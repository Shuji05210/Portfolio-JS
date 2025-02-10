import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UserEdit = ({ userId, userName, userMail, onSave, onCancel }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // パスワード更新のチェックボックス
    const [updatePassword, setUpdatePassword] = useState(false);


    // userNameまたはuserMailが変更されたときにuserステートを更新
    useEffect(() => {
        // 初期データをセット
        setUser({
            name: userName,
            email: userMail,
            password: '',
        });
    }, [userName, userMail]);


    // 入力値が変更されたときのハンドラー
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // パスワード確認用入力の変更
    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };

    const handleUpdatePasswordChange = () => {
        setUpdatePassword((prev) => !prev);
    };

    // フォーム送信時のハンドラー
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // パスワードと確認用パスワードが一致しているか確認
        if (user.password !== passwordConfirmation) {
            setError('パスワードと確認用パスワードが一致しません');
            setIsLoading(false);
            return;
        }
        if (!passwordConfirmation && updatePassword) {
            setError('確認用パスワードを入力してください');
            setIsLoading(false);
            return;
        }

        try {
            const updatedUser = { ...user };

            // パスワードが空でない場合のみ更新
            if (!updatePassword) {
                delete updatedUser.password;
            }

            // ユーザー情報を更新
            const response = await axios.put(`http://127.0.0.1:8000/api/users/${userId}`, user);
            onSave(); // 親コンポーネント内での動作処理
        } catch (error) {
            // サーバーから返されたエラーメッセージを表示
            if (error.response && error.response.data) {
                const errors = error.response.data.errors;
                setError(errors ? Object.values(errors).join(', ') : 'ユーザー情報の更新に失敗しました');
            } else {
                setError('ユーザー情報の更新に失敗しました');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const spanCss = `text-red-500 font-normal`;
    const inputCss = `w-full border border-gray-300 px-3 py-2 rounded`;

    const labelCss = `block mb-2 text-lg font-bold`;


    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-center text-2xl text-yellow-500 font-semibold mb-4">
                    ユーザー情報の編集</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className={`${labelCss}`} htmlFor="name">
                            名前 (User Name) <br /> <span className={`${spanCss}`}>現在の登録名</span> / {userName}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className={`${inputCss}`}
                            placeholder='変更後のユーザ名を入力'
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`${labelCss}`} htmlFor="email">
                            メールアドレス ( Email ) <br /> <span className={`${spanCss}`}>現在の登録アドレス</span> / {userMail}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className={`${inputCss}`}
                            placeholder='変更後のメールアドレスを入力'
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className={`${labelCss}`} htmlFor="pass">
                            パスワード (Password)
                        </label>
                        <input
                            id='password'
                            type="password"
                            name='password'
                            value={user.password}
                            onChange={handleChange}
                            disabled={!updatePassword} // パスワード更新のチェックがない場合は入力不可
                            className={`${inputCss}`}
                            placeholder='6文字以上の任意の英数字記号'
                            required
                        />
                    </div>


                    {updatePassword && (
                        <div className="mb-4">
                            <label className={`${labelCss}`} htmlFor="password_confirmation">
                                パスワード
                                <span className='text-red-800 text-lg ml-2'>(※再度確認)</span>
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={handlePasswordConfirmationChange}
                                required
                                placeholder='パスワードを再度入力'
                                className={`${inputCss}`}
                            />
                        </div>
                    )}

                    <div className='mb-5'>
                        <label>
                            <input
                                type="checkbox"
                                checked={updatePassword}
                                onChange={handleUpdatePasswordChange}
                                className=''
                            />
                            <span className='ml-2 text-red-800 underline underline-thickness-2 font-bold'>パスワードの更新する場合, チェック入れる</span>
                        </label>
                    </div>


                    {/* エラーメッセージ */}
                    {error && (
                        <div className="text-red-800 text-sm mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            disabled={isLoading}
                        >
                            {isLoading ? '更新中...' : '情報を更新'}
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