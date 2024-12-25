import React, { useState } from 'react';

//トグルスイッチによる入力フォームの表示非表示のサンプル
export const ToggleForm = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleToggleChange = (event) => {
        setIsFormVisible(event.target.checked);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>トグルスイッチでフォームを表示/非表示</h1>

            {/* トグルスイッチ */}
            <label style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span>フォームを表示する</span>
                <input
                    type="checkbox"
                    checked={isFormVisible}
                    onChange={handleToggleChange}
                    style={{
                        marginLeft: '10px',
                        width: '40px',
                        height: '20px',
                        borderRadius: '20px',
                        backgroundColor: isFormVisible ? '#4caf50' : '#ccc',
                        appearance: 'none',
                        position: 'relative',
                        cursor: 'pointer',
                    }}
                />
                <span
                    style={{
                        position: 'absolute',
                        top: '2px',
                        left: isFormVisible ? '18px' : '2px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        transition: 'left 0.2s',
                    }}
                />
            </label>

            {/* フォームの表示・非表示 */}
            {isFormVisible && (
                <form
                    style={{
                        position: 'fixed',  // 画面上部に固定
                        top: '20px',        // 画面の上部からの余白
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '20px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        width: '300px',
                    }}
                >
                    <div>
                        <label htmlFor="name">名前:</label>
                        <input type="text" id="name" name="name" placeholder="名前を入力" />
                    </div>
                    <div>
                        <label htmlFor="email">メール:</label>
                        <input type="email" id="email" name="email" placeholder="メールを入力" />
                    </div>
                    <div>
                        <button type="submit">送信</button>
                    </div>
                </form>
            )}
        </div>
    );
};