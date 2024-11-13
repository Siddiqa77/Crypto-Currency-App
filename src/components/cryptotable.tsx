"use client";
import Image from "next/image";
import { useState, useEffect } from "react";



export default function CoinMarket() {
  const API_KEY = "ce4cc7a24da0177c2d62135cc2e8bd70";
  const [data, setData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://api.coinlayer.com/live?access_key=${API_KEY}`)
      .then((response) => response.json())
      .then((jsonConverted) => {
        console.log("JSON Converted Data : ", jsonConverted);
        setData(jsonConverted);
      });
  }, []);

  // Search functionality
  const filteredData = data?.rates
    ? Object.entries(data.rates).filter(([currency]) =>
        currency.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto mt-8 px-4 sm:px-8 lg:px-16">
      
      <div className="flex flex-col items-center justify-center mb-4 sm:flex-row sm:space-x-3">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <h1 className="text-2xl sm:text-3xl font-bold text-center font-mono mt-2 sm:mt-0">
          Crypto Currency Rates
        </h1>
      </div>

      
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by currency name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-lg text-gray-900 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-blue-950 text-white text-xs font-medium uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-2 bg-blue-950 text-white text-xs font-medium uppercase tracking-wider">
                Currency
              </th>
              <th className="px-4 py-2 bg-blue-950 text-white text-xs font-medium uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-2 bg-blue-950 text-white text-xs font-medium uppercase tracking-wider">
                Volume (24hr)
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map(([currency, price], index) => (
                <tr key={currency}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">
                    {currency.slice(0, 3).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">
                    ${parseFloat(price as string).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center">
                    {Math.floor(Math.random() * 1000000) + 1000}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
