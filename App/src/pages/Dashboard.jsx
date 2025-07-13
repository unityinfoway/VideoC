import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// --- Helper Data ---
const chartData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 5000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
];

const recentOrders = [
  { id: '#2024-01', user: 'Olivia Martin', date: 'July 12, 2025', status: 'Paid', amount: '$250.00' },
  { id: '#2024-02', user: 'Jackson Lee', date: 'July 12, 2025', status: 'Paid', amount: '$150.00' },
  { id: '#2024-03', user: 'Isabella Nguyen', date: 'July 11, 2025', status: 'Refunded', amount: '$350.00' },
  { id: '#2024-04', user: 'William Kim', date: 'July 10, 2025', status: 'Paid', amount: '$450.00' },
  { id: '#2024-05', user: 'Sophia Davis', date: 'July 10, 2025', status: 'Paid', amount: '$550.00' },
];

// --- SVG Icons (as components for reusability) ---
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const PackageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v2"></path><path d="M12 22V12"></path><path d="m3.5 11.5 8.5 5 8.5-5"></path><path d="M3.5 16.5 12 21.5l8.5-5"></path></svg>
);

const LineChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const DollarSignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);

const CreditCardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
);

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

// --- Reusable Components ---

function Sidebar() {
  const navItems = [
    { icon: <HomeIcon />, name: 'Dashboard' },
    { icon: <ShoppingCartIcon />, name: 'Orders' },
    { icon: <PackageIcon />, name: 'Products' },
    { icon: <UsersIcon />, name: 'Customers' },
    { icon: <LineChartIcon />, name: 'Analytics' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-gray-300 p-4">
      <div className="flex items-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M12 3L2 12h3v8h14v-8h3L12 3z"></path><path d="M9 21V12h6v9"></path></svg>
        <h1 className="ml-3 text-2xl font-bold text-white">Acme Inc.</h1>
      </div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                  item.name === 'Dashboard' 
                    ? 'bg-gray-800 text-white' 
                    : 'hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="ml-4">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="p-4 rounded-lg bg-gray-800">
            <h3 className="text-white font-semibold">Upgrade to Pro</h3>
            <p className="text-sm mt-1">Get more features and unlock new potentials.</p>
            <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Upgrade
            </button>
        </div>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800/80 backdrop-blur-sm border-b border-gray-700">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
          <BellIcon />
        </button>
        <div className="flex items-center">
            <img 
                src="https://placehold.co/40x40/7c3aed/ffffff?text=A" 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full border-2 border-indigo-500"
            />
             <div className="hidden lg:block ml-3">
                <p className="font-semibold text-white">Admin User</p>
                <p className="text-sm text-gray-400">admin@example.com</p>
            </div>
        </div>
      </div>
    </header>
  );
}

function MetricCard({ title, value, change, icon, changeType }) {
    const isPositive = changeType === 'positive';
    return (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{value}</p>
                </div>
                <div className="p-3 bg-gray-900 rounded-lg">
                    {icon}
                </div>
            </div>
            <div className="flex items-center mt-4">
                <span className={`text-xs font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {change}
                </span>
                <span className="text-xs text-gray-500 ml-2">from last month</span>
            </div>
        </div>
    );
}

function SalesChart() {
    return (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <h3 className="text-xl font-semibold text-white">Sales Overview</h3>
            <p className="text-sm text-gray-400 mb-6">A look at your sales performance over time.</p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                        <XAxis dataKey="name" stroke="#A0AEC0" />
                        <YAxis stroke="#A0AEC0" />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568', color: '#E2E8F0' }}
                            itemStyle={{ color: '#E2E8F0' }}
                        />
                        <Legend wrapperStyle={{ color: '#A0AEC0' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                        <Area type="monotone" dataKey="sales" stroke="#82ca9d" fillOpacity={0} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function RecentOrdersTable() {
    const getStatusChip = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return <span className="px-2 py-1 text-xs font-medium text-green-300 bg-green-900/50 rounded-full">Paid</span>;
            case 'refunded':
                return <span className="px-2 py-1 text-xs font-medium text-yellow-300 bg-yellow-900/50 rounded-full">Refunded</span>;
            default:
                return <span className="px-2 py-1 text-xs font-medium text-gray-300 bg-gray-700 rounded-full">Pending</span>;
        }
    };
    
    return (
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-3 px-4 font-semibold text-gray-400">Invoice</th>
                            <th className="py-3 px-4 font-semibold text-gray-400">Customer</th>
                            <th className="py-3 px-4 font-semibold text-gray-400">Date</th>
                            <th className="py-3 px-4 font-semibold text-gray-400">Status</th>
                            <th className="py-3 px-4 font-semibold text-gray-400 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map(order => (
                            <tr key={order.id} className="border-b border-gray-700/50 hover:bg-gray-800 transition-colors duration-200">
                                <td className="py-3 px-4 font-medium text-white">{order.id}</td>
                                <td className="py-3 px-4 text-gray-300">{order.user}</td>
                                <td className="py-3 px-4 text-gray-400">{order.date}</td>
                                <td className="py-3 px-4">{getStatusChip(order.status)}</td>
                                <td className="py-3 px-4 text-white text-right font-mono">{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Dashboard() {
    return (
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-900 text-gray-300 overflow-y-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
            
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard 
                    title="Total Revenue" 
                    value="$45,231.89" 
                    change="+20.1%" 
                    icon={<DollarSignIcon />}
                    changeType="positive"
                />
                <MetricCard 
                    title="Subscriptions" 
                    value="+2350" 
                    change="+180.1%" 
                    icon={<UsersIcon />}
                    changeType="positive"
                />
                <MetricCard 
                    title="Sales" 
                    value="+12,234" 
                    change="+19%" 
                    icon={<CreditCardIcon />}
                    changeType="positive"
                />
                <MetricCard 
                    title="Active Now" 
                    value="+573" 
                    change="-2.1%" 
                    icon={<ActivityIcon />}
                    changeType="negative"
                />
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SalesChart />
                </div>
                <div className="lg:col-span-1">
                   <RecentOrdersTable />
                </div>
            </div>
        </main>
    );
}


export default function App() {
  return (
    <div className="flex h-screen bg-gray-900 font-sans">
      <style>{`
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1a202c; 
        }
        ::-webkit-scrollbar-thumb {
          background: #4a5568; 
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #718096; 
        }
      `}</style>
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}
