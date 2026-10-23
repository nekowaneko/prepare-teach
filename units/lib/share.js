// 學生網址的題目：編碼與解碼。純函式，只依賴 lz-string，兩個單元共用
// 網址資料不受信任：解碼時逐欄位比對預設題目的型別，有任何一處不對就整包不用，並回報 error
(() => {
  const clone = (x) => JSON.parse(JSON.stringify(x))
  const kindOf = (v) => Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v

  // 欄位順序不同也算相同，避免讀回存檔後被誤判成「改過」
  const stable = (v) => kindOf(v) === 'array' ? `[${v.map(stable).join(',')}]`
    : kindOf(v) === 'object' ? `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}`
      : JSON.stringify(v)

  // 只把和預設不同的題目放進網址，網址才短、QR code 才掃得到
  const changedSteps = (steps, defaults) => steps.filter((s) => {
    const d = defaults.find((x) => x.id === s.id)
    return !d || stable(s) !== stable(d)
  })

  const studentUrl = (base, cls, steps, defaults) => {
    const changed = changedSteps(steps, defaults)
    let hash = ''
    if (changed.length) {
      if (typeof LZString === 'undefined') throw new Error('lz-string 未載入')
      hash = '#q=' + LZString.compressToEncodedURIComponent(JSON.stringify(changed))
    }
    return `${base}?mode=student&class=${cls}${hash}`
  }

  // value 的形狀要和預設 template 一樣：型別相同；物件只能有預設有的欄位；
  // 陣列的元素依預設第一個元素檢查，元素是物件時欄位要齊全（例如填空的 text、options、answer）
  function sameShape (template, value) {
    const t = kindOf(template)
    if (t !== kindOf(value)) return false
    if (t === 'array') {
      if (!template.length) return value.length === 0
      const first = template[0]
      return value.every((v) => sameShape(first, v) && (kindOf(first) !== 'object' || Object.keys(first).every((k) => k in v)))
    }
    if (t === 'object') return Object.keys(value).every((k) => k in template && sameShape(template[k], value[k]))
    return true
  }

  const decode = (hash, defaults) => {
    const bad = () => ({ steps: clone(defaults), loaded: 0, error: true })
    const m = String(hash || '').match(/[#&]q=([^&]*)/)
    if (!m) return { steps: clone(defaults), loaded: 0, error: false }
    if (typeof LZString === 'undefined') return bad()
    let data
    try {
      data = JSON.parse(LZString.decompressFromEncodedURIComponent(m[1]) || '')
    } catch (e) {
      return { steps: clone(defaults), loaded: 0, error: true }
    }
    if (kindOf(data) !== 'array' || !data.length) return bad()
    const steps = clone(defaults)
    const ids = new Set()
    for (const item of data) {
      if (kindOf(item) !== 'object') return bad()
      const i = defaults.findIndex((d) => d.id === item.id)
      if (i < 0 || item.kind !== defaults[i].kind) return bad()
      // 預設沒有的欄位直接丟掉；有的欄位型別要對
      const merged = clone(defaults[i])
      for (const k of Object.keys(item)) {
        if (!(k in defaults[i])) continue
        if (!sameShape(defaults[i][k], item[k])) return bad()
        merged[k] = clone(item[k])
      }
      steps[i] = merged
      ids.add(item.id)
    }
    return { steps, loaded: ids.size, error: false }
  }

  window.UnitShare = { changedSteps, studentUrl, decode }
})()
