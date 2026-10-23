// 單元清單：導覽頁、課綱對照、地科索引共用。新增單元只改這個檔
// status：ready＝三種模式都有；plan＝只有教案；external＝外部模擬的整理頁
// codes：這個單元對應的課綱學習內容條目，課綱對照與地科索引用它標出「我的單元」
window.UNIT_GROUPS = ['高中物理', '國中理化', '國中地科']
window.UNITS = [
  {
    id: 'shm',
    group: '高中物理',
    title: '簡諧運動：等速圓周運動的投影與彈簧振子',
    meta: '高二選修物理．PEb-Va-4、PEb-Va-9',
    codes: ['PEb-Va-4', 'PEb-Va-9'],
    status: 'ready',
    href: 'units/shm.html'
  },
  {
    id: 'tir',
    group: '高中物理',
    title: '全反射的應用',
    meta: '高中物理．PKa-Va-11',
    codes: ['PKa-Va-11'],
    status: 'plan',
    doc: '全反射的應用_教案.docx'
  },
  {
    id: 'sound',
    group: '國中理化',
    title: '聲音的形成與應用',
    meta: '國中二年級．Ka-IV-3、Ka-IV-4',
    codes: ['Ka-IV-3', 'Ka-IV-4'],
    status: 'ready',
    href: 'units/sound.html'
  },
  {
    id: 'matter',
    group: '國中理化',
    title: '認識物質',
    meta: '國中二年級．Ab-IV-1、Ab-IV-3、Ab-IV-4、Ca-IV-1',
    codes: ['Ab-IV-1', 'Ab-IV-3', 'Ab-IV-4', 'Ca-IV-1'],
    status: 'ready',
    href: 'units/matter.html'
  },
  {
    id: 'es-index',
    group: '國中地科',
    title: '國中地科教學模擬索引',
    meta: '外部模擬的整理清單',
    codes: [],
    status: 'external',
    href: 'EarthScience/index.html'
  }
]
