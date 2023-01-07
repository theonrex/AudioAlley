import React from 'react'
import CoinData from './CoinData';

const Table = () => {
  return (
		<div>
			<table>
				<thead>
					<th className="market_cap_rank">No</th>
					<th className="market_cap_rank">Coin</th>
					<th className="market_cap_rank">Price</th>
					<th className="market_cap_rank">1h</th>
					<th className="market_cap_rank">24h</th>
					<th className="market_cap_rank">7d</th>
					<th className="market_cap_rank">24 Volume</th>
					<th className="market_cap_rank">Mkt Cap</th>
					<th className="market_cap_rank">circulating_supply</th>
					<th className="market_cap_rank">Last 7 Days</th>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	);
}

export default Table