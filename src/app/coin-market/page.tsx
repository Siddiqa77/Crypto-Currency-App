 "use client";

import { useState, useEffect } from "react";

export default function CoinMarket() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState([]);
  const API_KEY = "X-API-KEY: 9bKQyGNDkl3C8FT7r1XIm+fJ3uSiWt957CJnxhWkoW0=";

  useEffect(() => {
    fetch(`https://api.coinstats.app/public/v1/coins?access_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.rates) {
          const currencyData = Object.entries(data.rates).map(([name, price]) => ({ name, price }));
          setCurrency(currencyData);
        }
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Top Cryptocurrencies</h1>
      <input
        type="text"
        placeholder="Search by symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <table className="min-w-full bg-[#333] border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left bg-gray-200 text-gray-600 font-semibold">Name</th>
            <th className="py-2 px-4 border-b text-left bg-gray-200 text-gray-600 font-semibold">Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {currency
            .filter((val) => val.name.toLowerCase().includes(search.toLowerCase()))
            .map((val, index) => (
              <tr key={index} className="hover:bg-gray-50">
            
                <td className="py-2 px-4 border-b">${val.price.toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

