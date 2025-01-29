import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();  //useNavigate を使用

    const handleLogout = async () => {
        // トークンがlocalStorageから取得されるタイミングを確認
        const token = localStorage.getItem('authToken');  // authTokenを取得 (ユーザーを認証する情報)
        console.log("取得トークン: ", token);  // コンソールにログを出力

        if (!token) {
            console.error("トークンが存在しません");  // トークンが存在しない場合のエラーログ
            return;
        }

        try {
            // ログアウトのリクエストを送信
            const response = await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},  // 空のリクエストボディ
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("ログアウト成功: ", response.data);  // レスポンスデータのログ
            alert('ログアウトしました'); //ログアウトメッセ―ジ

            // トークンをlocalStorageから削除
            localStorage.removeItem('authToken');
            console.log("トークンを削除しました");

            // ログインページにリダイレクト
            navigate("/login");
        } catch (err) {
            console.error("ログアウトに失敗しました: ", err);  // エラーログ
            alert("ログアウトに失敗しました。もう一度試してください。");
        }
    }

    return <button onClick={handleLogout}>ログアウト</button>;
};