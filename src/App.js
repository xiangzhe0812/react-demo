import "./App.css";
import { gql, useQuery } from "@apollo/client";

const GET_POOLS = gql`
  query getPools {
    pools(
      first: 20
      skip: 0
      orderBy: totalValueLockedUSD
      orderDirection: desc
    ) {
      id
      feeTier
      liquidity
      sqrtPrice
      tick
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      token0Price
      token1Price
      volumeUSD
      txCount
      totalValueLockedToken0
      totalValueLockedToken1
      totalValueLockedUSD
    }
  }
`;

function App() {
  const { data } = useQuery(GET_POOLS);
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        {data &&
          data.pools.length > 0 &&
          data.pools.map((pool, index) => {
            return (
              <div key={index}>
                {pool.token0.symbol} - {pool.token1.symbol}
                <br /> Pool ID: {pool.id}
                <br />
                {pool.token0.symbol}: {pool.token0.id}
                <br />
                {pool.token1.symbol}: {pool.token1.id}
                <br />
              </div>
            );
          })}
      </header>
    </div>
  );
}

export default App;
