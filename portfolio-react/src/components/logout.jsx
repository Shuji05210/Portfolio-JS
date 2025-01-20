import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Logout = () => {
    const history = useHistory();

    const handleLogout = async () => {
        try {
            // ローカルストレージからトークンを削除
            const token = localStorage.getItem("token");

            await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // ローカルストレージからトークンを削除
            localStorage.removeItem("token");

            // ログアウト後にログインページへリダイレクト
            history.push("/login");
        } catch (err) {
            console.error("ログアウトに失敗しました", err);
        }
    };

    return <button onClick={handleLogout}>ログアウト</button>;
};
