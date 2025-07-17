import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend, RadialBarChart, RadialBar, PolarAngleAxis
} from 'recharts';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import { 
    Bell, Calendar, CircleUserRound, LayoutDashboard, User, CheckCircle, 
    AlertCircle, Video, UserCog, Shield, SlidersHorizontal, HardDrive, 
    BellRing, BookText, ChevronDown, LogOut, MessageSquare, UserPlus, FileText,
    ChevronLeft, ChevronRight, Search, ArrowRight, Clock, PlusCircle, Send
} from 'lucide-react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import MyLogo from '../assets/logo.png';

// GSAP Plugin Registration
gsap.registerPlugin(DrawSVGPlugin);

// --- MOCK DATA ---
const barData = [
  { name: 'Wk 1', meetings: 20 }, { name: 'Wk 2', meetings: 60 },
  { name: 'Wk 3', meetings: 15 }, { name: 'Wk 4', meetings: 40 },
];

const lineData = [
  { name: 'Wk 1', duration: 20 }, { name: 'Wk 2', duration: 35 },
  { name: 'Wk 3', duration: 30 }, { name: 'Wk 4', duration: 45 },
];

const participants = [
  { name: 'Olivia Rhye', percent: 90 }, { name: 'Phoenix Baker', percent: 78 },
  { name: 'Lana Steiner', percent: 72 }, { name: 'Demi Wilkins', percent: 65 },
  { name: 'Candice Wu', percent: 51 },
];

const donutData = [
    { name: 'Sales Calls', value: 400 },
    { name: 'Dev Syncs', value: 300 },
    { name: 'Marketing', value: 300 },
    { name: '1-on-1s', value: 200 },
];
const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f97316'];

const upcomingMeetingsData = [
    { time: '10:00 AM', title: 'Q3 Strategy Review', attendees: 8 },
    { time: '1:00 PM', title: 'Project Phoenix Kick-off', attendees: 12 },
    { time: '3:30 PM', title: '1-on-1 with Alex', attendees: 2 },
];

const recentActivityData = [
    { icon: UserPlus, text: "New user 'Alex Doe' signed up.", time: "2m ago", color: "text-blue-400" },
    { icon: FileText, text: "Report 'Q2 Performance' was generated.", time: "1h ago", color: "text-purple-400" },
    { icon: MessageSquare, text: "New feedback received for 'Project Phoenix'.", time: "3h ago", color: "text-green-400" },
    { icon: Video, text: "Meeting 'Sales Weekly' was completed.", time: "Yesterday", color: "text-orange-400" },
];

const storageData = [{ name: 'Storage', value: 75, fill: '#3b82f6' }];


// --- REUSABLE COMPONENTS ---

function Counter({ from, to, label }) {
    const nodeRef = useRef();
    useEffect(() => {
        const node = nodeRef.current;
        const controls = animate(from, to, {
            duration: 1.5,
            onUpdate(value) { node.textContent = value.toFixed(0) + label; }
        });
        return () => controls.stop();
    }, [from, to, label]);
    return <h3 ref={nodeRef} className="text-3xl font-semibold text-white" />;
}

// UPDATED: Removed motion from MetricCard to allow parent to control animation
const MetricCard = ({ title, value, change, isPositive, label = "" }) => (
    <div className="bg-slate-800/70 p-6 rounded-xl backdrop-blur-sm border border-slate-700/80 h-full">
        <p className="text-sm text-slate-400 mb-2">{title}</p>
        <div className="flex items-baseline gap-2">
            {typeof value === 'number' ? <Counter from={0} to={value} label={label} /> : <h3 className="text-3xl font-semibold text-white">{value}</h3>}
        </div>
        <span className={`text-sm mt-2 inline-block ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{change}</span>
    </div>
);

const InfoCard = ({ title, description, children, className }) => (
     <div className={`bg-slate-800/70 p-6 rounded-xl backdrop-blur-sm border border-slate-700/80 flex flex-col ${className}`}>
        <h4 className="font-semibold text-slate-200">{title}</h4>
        {description && <p className="text-sm text-slate-400 mt-1 mb-4">{description}</p>}
        <div className="flex-grow flex flex-col">
            {children}
        </div>
    </div>
);

const SidebarLink = ({ icon: Icon, text, active, onClick }) => (
    <a href="#" onClick={onClick} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors relative ${ active ? 'bg-blue-600/30 text-white font-medium' : 'text-slate-300 hover:bg-white/10 hover:text-white' }`}>
        {active && <motion.div layoutId="active-pill" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />}
        <Icon size={18} />
        <span>{text}</span>
    </a>
);

const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {title}
                <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="pl-4 pr-2 pt-1 space-y-1 overflow-hidden">
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CalendarView = () => {
    const [date, setDate] = useState(new Date(2025, 6, 17)); // Set to July 2025
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const changeMonth = (offset) => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1));
    };

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-slate-700"><ChevronLeft size={20} /></button>
                <h5 className="font-bold text-lg">{monthNames[date.getMonth()]} {date.getFullYear()}</h5>
                <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-slate-700"><ChevronRight size={20} /></button>
            </div>
            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-xs text-slate-400 flex-grow">
                {daysOfWeek.map(day => <div key={day} className="font-semibold">{day}</div>)}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                {Array.from({ length: daysInMonth }).map((_, day) => {
                    const dayNumber = day + 1;
                    const isToday = dayNumber === 17; // Hardcoded for July 17
                    return (
                        <div key={dayNumber} className={`w-full aspect-square flex items-center justify-center rounded-full cursor-pointer text-sm ${isToday ? 'bg-blue-500 text-white font-bold' : 'hover:bg-slate-700'}`}>
                            {dayNumber}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ResourceStatCard = ({ title, value, color, data }) => {
    return (
        <InfoCard title={title} description="Live system resource monitoring." className="h-full">
            <div className="flex-grow flex flex-col justify-between">
                <p className="text-3xl font-bold" style={{ color }}>{value.toFixed(3)}%</p>
                <ResponsiveContainer width="100%" height={60}>
                    <BarChart data={data}>
                        <Bar dataKey="v" fill={color} radius={2}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </InfoCard>
    );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function App() {
  const lineChartRef = useRef(null);
  const isInView = useInView(lineChartRef, { once: true, margin: "-100px" });
  const [activeLink, setActiveLink] = useState('Dashboard');
  const [greeting, setGreeting] = useState('');
  const userName = "Joe Doe";
  const totalMeetings = donutData.reduce((acc, entry) => acc + entry.value, 0);

  // State for live resource data
  const generateResourceData = () => Array.from({ length: 20 }, () => ({ v: Math.random() * 100 }));
  const [cpuData, setCpuData] = useState(generateResourceData());
  const [memoryData, setMemoryData] = useState(generateResourceData());
  const [diskData, setDiskData] = useState(generateResourceData());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Interval to update resource data for live effect
    const interval = setInterval(() => {
        setCpuData(generateResourceData());
        setMemoryData(generateResourceData());
        setDiskData(generateResourceData());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isInView && lineChartRef.current) {
        const linePath = lineChartRef.current.querySelector('.recharts-line-path');
        if (linePath) {
            gsap.fromTo(linePath, { drawSVG: 0 }, { drawSVG: "100%", duration: 2, ease: "power2.inOut" });
        }
    }
  }, [isInView]);

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  
  // Animation props for cards
  const cardAnimation = {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.3 },
      transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.5 },
      whileHover: { scale: 1.03, transition: { type: 'spring', stiffness: 300 } }
  };

  const Logo = MyLogo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-gray-900 text-white font-sans">
      <div className="flex h-screen">
        {/* SIDEBAR */}
        <aside className="w-64 min-h-screen hidden lg:flex flex-col bg-black/20 backdrop-blur-lg p-4 border-r border-slate-800">
             <div className="flex items-center gap-3 p-4">
                <img src={Logo} alt="IN8 Logo" className="w-16 h-16 object-contain" />
                <h1 className="text-2xl font-bold text-white">IN8</h1>
            </div>
            <nav className="flex-1 space-y-4 mt-6">
                <div className="px-2">
                    <SidebarLink icon={LayoutDashboard} text="Dashboard" active={activeLink === 'Dashboard'} onClick={() => setActiveLink('Dashboard')} />
                </div>
                <CollapsibleSection title="Workspace">
                    <SidebarLink icon={Video} text="Meetings" active={activeLink === 'Meetings'} onClick={() => setActiveLink('Meetings')} />
                    <SidebarLink icon={Calendar} text="Calendar" active={activeLink === 'Calendar'} onClick={() => setActiveLink('Calendar')} />
                </CollapsibleSection>
                <CollapsibleSection title="Admin Tools">
                    <SidebarLink icon={UserCog} text="User Management" active={activeLink === 'User Management'} onClick={() => setActiveLink('User Management')} />
                    <SidebarLink icon={Shield} text="Security" active={activeLink === 'Security'} onClick={() => setActiveLink('Security')} />
                    <SidebarLink icon={SlidersHorizontal} text="Customization" active={activeLink === 'Customization'} onClick={() => setActiveLink('Customization')} />
                    <SidebarLink icon={HardDrive} text="System Status" active={activeLink === 'System Status'} onClick={() => setActiveLink('System Status')} />
                </CollapsibleSection>
                <CollapsibleSection title="Resources">
                    <SidebarLink icon={BellRing} text="Notifications" active={activeLink === 'Notifications'} onClick={() => setActiveLink('Notifications')} />
                    <SidebarLink icon={BookText} text="Documentation" active={activeLink === 'Documentation'} onClick={() => setActiveLink('Documentation')} />
                </CollapsibleSection>
            </nav>
            <div className="mt-auto p-2 border-t border-slate-700/50">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10">
                    <CircleUserRound size={36} className="text-slate-400" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">Olivia Rhye</p>
                        <p className="text-xs text-slate-400">olivia@in8.com</p>
                    </div>
                    <LogOut size={18} className="text-slate-500 hover:text-red-400 cursor-pointer" />
                </div>
            </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col h-screen">
            {/* HEADER */}
            <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex justify-between items-center w-full h-24 px-8 border-b border-slate-800 bg-black/10 backdrop-blur-lg flex-shrink-0">
                <div>
                    <h2 className="text-2xl font-bold">{greeting}, {userName}!</h2>
                    <p className="text-slate-400">Welcome to IN8. Here's your analytics overview.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input type="text" placeholder="Search..." className="bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                    <button className="p-2 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700">
                        <Bell size={20} className="text-slate-300" />
                    </button>
                    <img src={`https://i.pravatar.cc/150?u=${userName.replace(' ', '')}`} alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-700" />
                </div>
            </motion.header>

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="space-y-8">
                    
                    {/* TOP METRIC CARDS */}
                    <motion.section variants={listContainerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                        <motion.div variants={listItemVariants} whileHover={cardAnimation.whileHover}><MetricCard title="Total Meetings" value={135} change="+10% vs last month" isPositive={true} /></motion.div>
                        <motion.div variants={listItemVariants} whileHover={cardAnimation.whileHover}><MetricCard title="Avg. Duration" value={42} change="-5% vs last month" isPositive={false} label="m" /></motion.div>
                        <motion.div variants={listItemVariants} whileHover={cardAnimation.whileHover}><MetricCard title="Engagement Score" value={82} change="+15% vs last month" isPositive={true} label="%" /></motion.div>
                        <motion.div variants={listItemVariants} whileHover={cardAnimation.whileHover}><MetricCard title="Feedback Score" value="4.6/5" change="+8% vs last month" isPositive={true} /></motion.div>
                    </motion.section>
                    
                    {/* SYSTEM USAGE CARDS */}
                    <section className="grid md:grid-cols-3 gap-8">
                        <motion.div {...cardAnimation}><ResourceStatCard title="CPU" value={cpuData[cpuData.length - 1]?.v || 0} color="#3b82f6" data={cpuData} /></motion.div>
                        <motion.div {...cardAnimation}><ResourceStatCard title="Memory" value={memoryData[memoryData.length - 1]?.v || 0} color="#22c55e" data={memoryData} /></motion.div>
                        <motion.div {...cardAnimation}><ResourceStatCard title="Disk Usage" value={diskData[diskData.length - 1]?.v || 0} color="#f97316" data={diskData} /></motion.div>
                    </section>

                    {/* MAIN 4-COLUMN LAYOUT */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <motion.div {...cardAnimation} className="h-full"><InfoCard title="Calendar" description="Navigate your monthly schedule." className="h-full"><CalendarView /></InfoCard></motion.div>
                        <motion.div {...cardAnimation} className="h-full"><InfoCard title="Meeting Breakdown" description="Distribution of different meeting types." className="h-full">
                           <div className="relative w-full h-full flex items-center justify-center">
                              <ResponsiveContainer width="100%" height={250}>
                                 <PieChart>
                                    <Pie data={donutData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={110} fill="#8884d8" paddingAngle={5}>{donutData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie>
                                    <Tooltip contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem'}}/>
                                 </PieChart>
                              </ResponsiveContainer>
                              <div className="absolute text-center">
                                 <p className="text-4xl font-bold">{totalMeetings}</p>
                                 <p className="text-sm text-slate-400">Total Meetings</p>
                              </div>
                           </div>
                           <Legend iconType="circle" wrapperStyle={{fontSize: "12px", color: '#94a3b8', paddingTop: '1rem'}}/>
                        </InfoCard></motion.div>
                        
                        <motion.div {...cardAnimation} className="h-full"><InfoCard title="Storage Status" description="Available cloud storage overview." className="h-full">
                            <div className="flex-grow flex items-center justify-center">
                                <ResponsiveContainer width="100%" height={200}>
                                    <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={20} data={storageData} startAngle={90} endAngle={-270}>
                                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                        <RadialBar background clockWise dataKey='value' cornerRadius={10} fill="#3b82f6" />
                                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-4xl font-bold fill-white">{storageData[0].value}%</text>
                                        <text x="50%" y="50%" dy="25" textAnchor="middle" className="text-sm fill-slate-400">Used</text>
                                    </RadialBarChart>
                                </ResponsiveContainer>
                            </div>
                        </InfoCard></motion.div>

                        <motion.div {...cardAnimation} className="h-full"><InfoCard title="Top Participants" description="Users with the highest engagement." className="h-full">
                           <motion.div variants={listContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 flex flex-col h-full">
                                {participants.map((p) => (
                                    <motion.div key={p.name} variants={listItemVariants}>
                                        <div className="flex justify-between text-sm text-slate-300 mb-1">
                                            <span>{p.name}</span>
                                            <span>{p.percent}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-600 rounded-full">
                                            <motion.div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" initial={{ width: 0 }} whileInView={{ width: `${p.percent}%` }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
                                        </div>
                                    </motion.div>
                                ))}
                           </motion.div>
                        </InfoCard></motion.div>
                    </section>
                    
                    {/* UNIFIED LOWER SECTION */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div {...cardAnimation} className="lg:col-span-2 h-full">
                            <InfoCard title="Recent Activity" description="A log of the latest events in your workspace." className="h-full">
                                <motion.div variants={listContainerVariants} initial="hidden" animate="visible" className="space-y-4">
                                    {recentActivityData.map((item, index) => (
                                        <motion.div key={index} variants={listItemVariants} className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full bg-slate-700/50 ${item.color}`}><item.icon size={18} /></div>
                                            <div className="flex-1"><p className="text-sm text-slate-200">{item.text}</p></div>
                                            <p className="text-xs text-slate-500">{item.time}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </InfoCard>
                        </motion.div>
                        <motion.div {...cardAnimation} ref={lineChartRef} className="h-full">
                            <InfoCard title="Avg. Duration Trend" description="Track the average meeting duration over time." className="h-full">
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={lineData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                                        <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem'}}/>
                                        <Line type="monotone" dataKey="duration" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5, fill: '#8b5cf6' }} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </InfoCard>
                        </motion.div>
                        <motion.div {...cardAnimation}>
                            <InfoCard title="Meetings Over Time" description="Weekly overview of all scheduled meetings.">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={barData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip cursor={{fill: 'rgba(148, 163, 184, 0.1)'}} contentStyle={{backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', borderRadius: '0.75rem'}}/>
                                        <Bar dataKey="meetings" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </InfoCard>
                        </motion.div>
                        <motion.div {...cardAnimation}>
                            <InfoCard title="Today's Upcoming Meetings" description="Your schedule for the rest of the day.">
                               <motion.div variants={listContainerVariants} initial="hidden" animate="visible" className="flex flex-col h-full">
                                    {upcomingMeetingsData.map((meeting) => (
                                        <motion.div key={meeting.title} variants={listItemVariants} className="flex items-center gap-4 py-3 border-b border-slate-700/80 last:border-none">
                                            <div className="text-sm font-bold text-blue-400 w-20">{meeting.time}</div>
                                            <div>
                                                <p className="font-medium text-slate-200">{meeting.title}</p>
                                                <p className="text-xs text-slate-400">{meeting.attendees} attendees</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    <button className="text-sm text-blue-400 hover:text-blue-300 mt-auto pt-4 flex items-center justify-center gap-2 w-full">View all meetings <ArrowRight size={16} /></button>
                               </motion.div>
                            </InfoCard>
                        </motion.div>
                        <motion.div {...cardAnimation}>
                            <InfoCard title="Quick Actions" description="Shortcuts for common tasks.">
                                <div className="space-y-3">
                                    <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"><PlusCircle size={18} className="text-blue-400" /> New Meeting</button>
                                    <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"><UserPlus size={18} className="text-purple-400" /> Add User</button>
                                    <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"><Send size={18} className="text-green-400" /> Send Invite</button>
                                </div>
                            </InfoCard>
                        </motion.div>
                    </section>
                </div>
            </main>
        </div>
      </div>
    </div>
  );
}
