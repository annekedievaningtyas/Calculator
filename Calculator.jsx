
import { useState, useEffect } from 'react'
import './Calculator.css'

function Calculator() {
  const [angka1, setAngka1] = useState('')
  const [angka2, setAngka2] = useState('')
  const [operator, setOperator] = useState('+')
  const [hasil, setHasil] = useState('')
  const [riwayat, setRiwayat] = useState(() => {
    const data = localStorage.getItem('riwayatKalkulator')
    return data ? JSON.parse(data) : []
  })
  const [pesan, setPesan] = useState('')

  useEffect(() => {
    localStorage.setItem(
      'riwayatKalkulator',
      JSON.stringify(riwayat)
    )
  }, [riwayat])

  function hitung() {
    if (angka1 === '' || angka2 === '') {
      setPesan('Yuk, isi kedua angka dulu ♡')
      setHasil('')
      return
    }

    const a = Number(angka1)
    const b = Number(angka2)
    let hasilHitung

    if (operator === '+') {
      hasilHitung = a + b
    } else if (operator === '-') {
      hasilHitung = a - b
    } else if (operator === '×') {
      hasilHitung = a * b
    } else {
      if (b === 0) {
        setPesan('Angka tidak bisa dibagi nol ♡')
        setHasil('')
        return
      }
      hasilHitung = a / b
    }

    const perhitungan = `${a} ${operator} ${b} = ${hasilHitung}`

    setHasil(hasilHitung)
    setPesan('')
    setRiwayat((sebelumnya) =>
      [perhitungan, ...sebelumnya].slice(0, 5)
    )
  }

  function hapusRiwayat() {
    setRiwayat([])
  }

  return (
    <main className="calculator-container">
      <header className="calculator-header">
        <h1>♡ Pink Calculator</h1>
        <p>little calculations, big love</p>
      </header>

      <section className="calculator-card">
        <label>Angka pertama</label>
        <input
          type="number"
          value={angka1}
          onChange={(e) => setAngka1(e.target.value)}
          placeholder="Masukkan angka..."
        />

        <label>Operator</label>
        <div className="operator-list">
          {['+', '-', '×', '÷'].map((item) => (
            <button
              key={item}
              className={operator === item ? 'operator active' : 'operator'}
              onClick={() => setOperator(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <label>Angka kedua</label>
        <input
          type="number"
          value={angka2}
          onChange={(e) => setAngka2(e.target.value)}
          placeholder="Masukkan angka..."
        />

        <button className="calculate-button" onClick={hitung}>
          Hitung ♡
        </button>

        {pesan && <p className="calculator-message">{pesan}</p>}

        <div className="result-box">
          <p>Hasil perhitungan</p>
          <h2>{hasil === '' ? '♡' : hasil}</h2>
        </div>
      </section>

      <section className="history-card">
        <h3>♡ Riwayat Perhitungan</h3>

        {riwayat.length === 0 ? (
          <p className="empty-history">Belum ada perhitungan</p>
        ) : (
          riwayat.map((item, index) => (
            <p className="history-item" key={index}>
              {item}
            </p>
          ))
        )}

        {riwayat.length > 0 && (
          <button className="clear-button" onClick={hapusRiwayat}>
            Hapus Riwayat
          </button>
        )}
      </section>
    </main>
  )
}

export default Calculator
