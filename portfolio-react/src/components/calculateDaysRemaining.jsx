// 残り日数を計算する関数
export const calculateDaysRemaining = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDiff = dueDateObj - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); // ミリ秒を日数に変換
    
    //もし期限切れの場合 マイナス以下の値
    if (daysRemaining < 0) {
        return '期限切れ';
    }
    
    return daysRemaining; //日数に変換したものを返す
};
