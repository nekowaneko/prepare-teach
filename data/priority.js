// 備課優先順序：康軒國中理化與地科各章的分數（沿用「備課優先順序評分表」）
// 課綱對照與地科索引的「依康軒章節」用它在同一學期內由高分到低分排列
// time、lack、vary 是人工判斷，老師可以在頁面上點選修改；sim、cov 由頁面依外部模擬自動算出
(() => {
  const judge = {
    '8a1': { time: 0, lack: 0, vary: 0, why: '測量工具校內都有，動手量比看模擬好。' },
    '8a2': { time: 0, lack: 0, vary: 1, why: '溶解度可調溫度找規律；溶液、空氣實驗器材常見。' },
    '8a3': { time: 1, lack: 0, vary: 1, why: '波的傳播是隨時間前進的過程；彈簧、音叉校內有。' },
    '8a4': { time: 0, lack: 0, vary: 1, why: '成像可調物距找規律；光學組多數學校有。' },
    '8a5': { time: 1, lack: 0, vary: 1, why: '熱平衡、熱傳播要等時間才看得出；溫度計、加熱器材常見。' },
    '8a6': { time: 0, lack: 1, vary: 0, why: '原子、分子看不到，只能靠模型。' },
    '8b1': { time: 1, lack: 1, vary: 0, why: '反應中粒子重新排列的過程看不到。' },
    '8b2': { time: 0, lack: 0, vary: 0, why: '燃燒、氧化還原實驗校內做得到。' },
    '8b3': { time: 1, lack: 0, vary: 1, why: '中和時 pH 隨滴入量變化；可調濃度；酸鹼藥品常見。' },
    '8b4': { time: 1, lack: 1, vary: 1, why: '速率、平衡是隨時間的動態；平衡時微觀仍在反應，看不到。' },
    '8b5': { time: 0, lack: 0, vary: 0, why: '以認識物質為主，較少隨時間的現象。' },
    '8b6': { time: 0, lack: 0, vary: 1, why: '多為靜態平衡；彈簧秤、浮力器材常見；可調變因找規律。' },
    '9a1': { time: 1, lack: 0, vary: 1, why: '位置、速度隨時間變化，口說最難具體化；打點計時器部分學校有。' },
    '9a2': { time: 1, lack: 1, vary: 1, why: '沒有摩擦的理想運動與萬有引力都做不出實體。' },
    '9a3': { time: 1, lack: 0, vary: 1, why: '動能、位能隨運動轉換；槓桿器材常見。' },
    '9a4': { time: 0, lack: 0, vary: 1, why: '電路器材常見；可調電壓、電阻找歐姆定律。' },
    '9b1': { time: 0, lack: 0, vary: 0, why: '電池、電解實驗校內做得到。' },
    '9b2': { time: 1, lack: 0, vary: 1, why: '感應電流要靠相對運動才出現；磁鐵、線圈常見。' },
    '9a5': { time: 1, lack: 1, vary: 0, why: '風化、侵蝕、岩石循環要以萬年計，無法現場觀察。' },
    '9a6': { time: 1, lack: 1, vary: 1, why: '板塊運動以百萬年計；可設定板塊方向觀察結果。' },
    '9a7': { time: 1, lack: 1, vary: 1, why: '公轉、月相、四季都是長時間的週期；天體無法搬進教室。' },
    '9b3': { time: 1, lack: 1, vary: 0, why: '鋒面、氣團移動以天計，校內看不到。' },
    '9b4': { time: 1, lack: 1, vary: 1, why: '海流、暖化是長期變化；可調溫室氣體濃度看溫度。' }
  }

  const criteria = [
    { key: 'sim', label: '有現成模擬', pts: 5, auto: true, tag: '自動：有主要對應的模擬' },
    { key: 'time', label: '現象隨時間改變', pts: 3, tag: '我的判斷，可改' },
    { key: 'lack', label: '校內缺乏實體', pts: 2, tag: '我的判斷，可改' },
    { key: 'vary', label: '可調變因找規律', pts: 2, tag: '新增：符合「觀察與歸納」主軸' },
    { key: 'cov', label: '課綱覆蓋過半', pts: 2, auto: true, tag: '新增，自動：模擬涵蓋該章一半以上條目' }
  ]
  const maxScore = criteria.reduce((a, x) => a + x.pts, 0)

  window.PRIORITY = { judge, criteria, maxScore }
})()
