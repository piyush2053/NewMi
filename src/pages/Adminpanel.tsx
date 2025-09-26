import React, { useState, useEffect } from "react";
// import { core_services } from "../utils/api.ts";

// const res1 = await core_services.getBets();

// console.log(res1);



type Bid = {
  id: string;
  userId: string;
  gameId: string;
  amount: number;
  odds: number;
  status: string;
  winAmount: number;
  createdAt: string;
  updatedAt: string;
};

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "users" | "transactions" | "bids">("dashboard");
  const [bids, setBids] = useState<Bid[]>([]);
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "users", label: "Users" },
    { id: "transactions", label: "Transactions" },
    { id: "bids", label: "Bids" },
  ];
 
  



  useEffect(async () =>{
    
    // const res = await core_services.getBets();

    // console.log(res);
    console.log("asdasdasd");
      
        // If API sends { data: [...] }, extract array
        // if (Array.isArray(res)) {
        //   setBids(res);
        //   console.log()
        // } else if (Array.isArray(res.data)) {
        //   setBids(res.data);
        // } else if (res && typeof res === "object") {
        //   setBids([res]); // wrap single object into array
        // }
      }
  , []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Predict Plus
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`flex items-center w-full px-4 py-2 rounded-lg ${
                activeTab === id ? "bg-blue-500" : "hover:bg-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-600">Total Users</h2>
                <p className="text-2xl font-bold">1,245</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-600">Total Coins Used</h2>
                <p className="text-2xl font-bold">56,000</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-600">Total Matches</h2>
                <p className="text-2xl font-bold">120</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-gray-600">Total Bids</h2>
                <p className="text-2xl font-bold">3,450</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Username</th>
                  <th className="p-3 text-left">Coins</th>
                  <th className="p-3 text-left">Joined</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3">player123</td>
                  <td className="p-3">1500</td>
                  <td className="p-3">2025-08-01</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "transactions" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3">player123</td>
                  <td className="p-3">500</td>
                  <td className="p-3">Deposit</td>
                  <td className="p-3">2025-08-07</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "bids" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Bids</h1>
             <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Game ID</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Odds</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Win Amount</th>
                  <th className="px-4 py-2 border">Created At</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <tr key={bid.id}>
                    <td className="px-4 py-2 border">{bid.userId}</td>
                    <td className="px-4 py-2 border">{bid.gameId}</td>
                    <td className="px-4 py-2 border">{bid.amount}</td>
                    <td className="px-4 py-2 border">{bid.odds}</td>
                    <td className="px-4 py-2 border">{bid.status}</td>
                    <td className="px-4 py-2 border">{bid.winAmount}</td>
                    <td className="px-4 py-2 border">
                      {new Date(bid.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
