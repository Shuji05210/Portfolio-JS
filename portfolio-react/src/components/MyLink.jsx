import { Link, useLocation } from "react-router-dom";
import '../index.css';

export const MyLink = () => {
    const location = useLocation();  // 現在のURL情報を取得

    //共通項 CSS定義
    const commonCss = `hover:text-white hover:underline px-4 py-2 rounded-md transition duration-200`;
    const textCss = `text-center m-4 text-xl`;
    const urlCss = `text-orange-500`;

    //各ページ CSS定義
    const InputCss = location.pathname !== "/taskform" ? "text-green-600 hover:bg-green-600" : "text-white bg-blue-600";
    const ListCss = location.pathname !== "/list" ? "text-green-600 hover:bg-green-600" : "text-white bg-blue-600";
    const ListUserCss = location.pathname !== "/listuser" ? "text-green-600 hover:bg-green-600" : "text-white bg-blue-600";

    const HomeCss = location.pathname !== "/" ? "text-green-600 hover:bg-green-600" : "text-white bg-blue-600";
    const LoginCss = location.pathname !== "/login" ? "text-green-600 hover:bg-green-600" : "text-white bg-blue-600";
    const UserCreateCss = location.pathname !== "/usercreate" ? "text-green-600 hover:bg-green-600" : "text-white bg-blue-600";
    const UserDeleteCss = location.pathname !== "/userdelete" ? "text-green-600 hover:bg-green-600" : "text-white bg-blue-600";
    
    return (
        <div>
            <nav className="mt-4 mb-6 bg-green-100">
                <ul className="flex justify-center text-xl font-bold space-x-10">
                    
                    <li className={`${commonCss} ${HomeCss}`}>
                        <Link to="/">HOME</Link></li>
                    
                    <li className={`${commonCss} ${InputCss}`}>
                        <Link to="/taskform">入力フォーム</Link></li>

                    <li className={`${commonCss} ${ListCss}`}>
                        <Link to="/list">タスク一覧</Link></li>

                    <li className={`${commonCss} ${ListUserCss}`}>
                        <Link to="/listuser">ID個別表示</Link></li>

                    <li className={`${commonCss} ${LoginCss}`}>
                        <Link to="/login">ログイン</Link></li>

                    <li className={`${commonCss} ${UserCreateCss}`}>
                        <Link to="/usercreate">ユーザ登録</Link></li>

                    <li className={`${commonCss} ${UserDeleteCss}`}>
                        <Link to="/userlist">ユーザ一覧</Link></li>

                </ul>
            </nav>
            
            <p className={`${textCss}`}>
                現在のURLは&nbsp;&nbsp;
                <span className={`${urlCss}`}>{location.pathname}{location.search}{location.hash}</span>
            </p>

        </div>
    )
}