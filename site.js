// 全站共用：模式、班級、開啟單元。導覽頁、課綱對照、地科索引與單元頁都用它
(() => {
  const CLASSES = [{ code: '201', name: '忠班' }, { code: '202', name: '孝班' }, { code: '203', name: '仁班' }, { code: '204', name: '愛班' }]
  const MODES = { prep: '備課', project: '投影上課', student: '學生作答' }

  // 本機儲存：失敗時仍可正常使用，只是不保留
  const store = {
    get: (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch (e) { return fallback } },
    set: (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true } catch (e) { return false } }
  }

  const validMode = (m) => Object.prototype.hasOwnProperty.call(MODES, m) ? m : 'prep'
  const validClass = (c) => CLASSES.some((x) => x.code === c) ? c : '201'
  const param = (search, key) => new URLSearchParams(search || '').get(key)

  const modeOf = (search) => validMode(param(search, 'mode'))
  const classOf = (search) => validClass(param(search, 'class'))
  const classLabel = (code) => { const c = CLASSES.find((x) => x.code === code); return c ? `${c.code} ${c.name}` : code }

  // 網址只用 ASCII：班級用數字代碼，備課不帶班級
  const unitUrl = (unit, mode, cls, prefix = '') => `${prefix}${unit.href}?mode=${validMode(mode)}${validMode(mode) === 'prep' ? '' : `&class=${validClass(cls)}`}`

  const prefs = () => ({ mode: validMode(store.get('site.mode', 'prep')), cls: validClass(store.get('site.class', '201')) })
  const setPrefs = (mode, cls) => { store.set('site.mode', validMode(mode)); store.set('site.class', validClass(cls)) }

  // 「繼續上次」：只認得清單裡、而且三種模式都有的單元
  const last = () => {
    const l = store.get('site.last', null)
    const units = window.UNITS || []
    if (!l || !units.some((u) => u.id === l.id && u.status === 'ready')) return null
    return { id: l.id, mode: validMode(l.mode), cls: validClass(l.cls) }
  }

  const openUnit = (unit, mode, cls, prefix = '') => {
    store.set('site.last', { id: unit.id, mode: validMode(mode), cls: validClass(cls) })
    window.location.href = unitUrl(unit, mode, cls, prefix)
  }

  window.Site = { CLASSES, MODES, modeOf, classOf, classLabel, unitUrl, prefs, setPrefs, last, openUnit }
})()
