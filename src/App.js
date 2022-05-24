import React, { useState, useEffect } from "react"

// https://api.coincap.io/assets
// icons - https://assets.coincap.io/assets/icons/usdc@2x.png

function App() {
  const [coins, setCoins] = useState([])
  const [page, setPage] = useState(20)

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(`https://api.coincap.io/v2/assets?limit=${page}`)
      const data = await res.json()
      setCoins(data.data)
    }

    fetchCoins()
  }, [page])

  return (
    <>
      {!coins ? (
        <h1>Loading...</h1>
      ) : (
        <section>
          <article className="coins">
            <h2>Showing {coins.length} coins</h2>
          </article>

          <h1 style={{ textAlign: "center" }}>
            This app uses the <a href="https://coincap.io">CoinCap API</a>
          </h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Price(USD)</th>
              </tr>
            </thead>
            {coins.map(({ id, rank, symbol, name, priceUsd }) => (
              <React.Fragment key={id}>
                <tbody>
                  <tr>
                    <td>{rank}</td>
                    <td>
                      {name}, <small>{symbol}</small>
                    </td>
                    <td>$ {parseFloat(priceUsd).toFixed(2)}</td>
                  </tr>
                </tbody>
              </React.Fragment>
            ))}
          </table>

          <div className="buttons">
            <button className="btn-next" onClick={() => setPage(page + 20)}>
              Next
            </button>
            <button
              className="btn-next"
              onClick={() => {
                setPage(20)
                window.scrollTo(0, 0)
              }}
            >
              Refresh
            </button>
          </div>
        </section>
      )}
    </>
  )
}

export default App
