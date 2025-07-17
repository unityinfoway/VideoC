import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Video, Mic, MicOff, Rss, Radio, ChevronDown, User, Users, Clock, Hash,
    PlayCircle, StopCircle, Settings, LogOut, Bell, Search, LayoutDashboard,
    Calendar, UserCog, Shield, SlidersHorizontal, HardDrive, BellRing, BookText,
    CircleUserRound
} from 'lucide-react';
import MyLogo from '../assets/logo.png';

// --- Animated Background Component ---
const AnimatedBackground = () => {
    const numLines = 25;
    const lines = Array.from({ length: numLines });

    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => ({
            pathLength: 1,
            opacity: 0.7,
            transition: {
                pathLength: { delay: i * 0.1, type: "spring", duration: 2, bounce: 0 },
                opacity: { delay: i * 0.1, duration: 0.1 },
            }
        })
    };
    
    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
             <svg width="100%" height="100%" className="absolute top-0 left-0" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                        <stop offset="100%" stopColor="rgba(139, 92, 246, 0.2)" />
                    </linearGradient>
                </defs>
                {lines.map((_, i) => (
                    <React.Fragment key={i}>
                        <motion.line x1="-5%" y1={`${(i / (numLines - 1)) * 100}%`} x2="105%" y2={`${(i / (numLines - 1)) * 100}%`} stroke="url(#line-gradient)" strokeWidth="0.3" variants={lineVariants} initial="hidden" animate="visible" custom={i} />
                        <motion.line x1={`${(i / (numLines - 1)) * 100}%`} y1="-5%" x2={`${(i / (numLines - 1)) * 100}%`} y2="105%" stroke="url(#line-gradient)" strokeWidth="0.3" variants={lineVariants} initial="hidden" animate="visible" custom={i + 5} />
                    </React.Fragment>
                ))}
            </svg>
            <motion.div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/40 to-purple-600/40 rounded-full filter blur-3xl opacity-40" animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 1, 1.05, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
            <motion.div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-gradient-to-tl from-purple-600/30 to-blue-600/30 rounded-full filter blur-3xl opacity-40" animate={{ x: [0, -30, 10, 0], y: [0, 20, -40, 0], scale: [1, 1.05, 1, 0.95, 1], rotate: [0, -15, 15, 0] }} transition={{ duration: 35, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 5 }} />
        </div>
    );
};

// --- Sidebar Component (Conceptually, this would be in its own file e.g., components/Sidebar.js) ---

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
                <span>{title}</span>
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

const Sidebar = ({ activeLink, setActiveLink }) => {
    const Logo = MyLogo; // Replace with your actual logo path
    return (
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
    );
};


// --- MEETING PAGE ---
const MeetingPage = () => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [isRecording, setIsRecording] = useState(true);
    const [activeLink, setActiveLink] = useState('Meetings');

    const participants = [
        { name: 'Ethan Harper', role: 'Host', avatar: 'https://i.pravatar.cc/150?u=ethan', micOn: true },
        { name: 'Sophia Clark', role: 'Participant', avatar: 'https://i.pravatar.cc/150?u=sophia', micOn: false },
        { name: 'Liam Bennett', role: 'Participant', avatar: 'https://i.pravatar.cc/150?u=liam', micOn: true },
    ];

    return (
        <div className="flex h-screen relative z-10">
            <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
            
            <div className="flex-1 flex flex-col h-screen">
                {/* Header */}
                <header className="flex-shrink-0 bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50">
                    <div className="flex items-center justify-between h-20 px-8">
                        <div>
                             <h1 className="text-2xl font-bold text-white">Meetings</h1>
                             <p className="text-slate-400 text-sm">Control your live meeting settings</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-full hover:bg-slate-700/50"><Search size={20} /></button>
                            <button className="p-2 rounded-full hover:bg-slate-700/50"><Bell size={20} /></button>
                            <button className="p-2 rounded-full hover:bg-slate-700/50"><Settings size={20} /></button>
                            <img src="https://i.pravatar.cc/150?u=liam" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-slate-600"/>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-8 grid lg:grid-cols-3 gap-8 overflow-y-auto">
                    {/* Left Panel */}
                    <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5, delay: 0.2}} className="lg:col-span-2 p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                        <h2 className="text-3xl font-bold text-white">Live Streaming & Recording</h2>
                        <p className="text-slate-400 mt-2">Manage your live streams and recordings for the meeting "Project Kickoff".</p>

                        <div className="mt-8 space-y-10">
                            {/* Live Streaming Section */}
                            <section>
                                <h3 className="flex items-center gap-3 text-xl font-semibold text-white mb-4"><Rss className="text-blue-400" /> Live Streaming</h3>
                                <div className="grid md:grid-cols-3 gap-4 items-center">
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-slate-700/50 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Facebook Live</option>
                                            <option>YouTube Live</option>
                                            <option>Twitch</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <motion.button onClick={() => setIsStreaming(true)} disabled={isStreaming} className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-blue-600 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-blue-500" whileTap={{scale: 0.95}}><PlayCircle size={20}/> Start Streaming</motion.button>
                                    <motion.button onClick={() => setIsStreaming(false)} disabled={!isStreaming} className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-slate-700 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-slate-600" whileTap={{scale: 0.95}}><StopCircle size={20}/> Stop</motion.button>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-sm">
                                    {isStreaming ? <motion.div initial={{scale:0}} animate={{scale:1}} className="w-3 h-3 rounded-full bg-green-500"></motion.div> : <div className="w-3 h-3 rounded-full bg-slate-600"></div>}
                                    <span className={isStreaming ? "text-green-400" : "text-slate-400"}>{isStreaming ? "Stream is live" : "Stream is offline"}</span>
                                </div>
                            </section>

                            {/* Recording Section */}
                            <section>
                                <h3 className="flex items-center gap-3 text-xl font-semibold text-white mb-4"><Radio className="text-red-400" /> Recording</h3>
                                <div className="grid md:grid-cols-3 gap-4 items-center">
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-slate-700/50 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500">
                                            <option>Gallery View</option>
                                            <option>Speaker View</option>
                                            <option>Shared Screen</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <motion.button onClick={() => setIsRecording(true)} disabled={isRecording} className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-red-600 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-red-500" whileTap={{scale: 0.95}}><PlayCircle size={20}/> Start Recording</motion.button>
                                    <motion.button onClick={() => setIsRecording(false)} disabled={!isRecording} className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-slate-700 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-slate-600" whileTap={{scale: 0.95}}><StopCircle size={20}/> Stop</motion.button>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-sm">
                                    {isRecording ? <motion.div initial={{scale:0}} animate={{scale:1}} className="w-3 h-3 rounded-full bg-red-500"></motion.div> : <div className="w-3 h-3 rounded-full bg-slate-600"></div>}
                                    <span className={isRecording ? "text-red-400" : "text-slate-400"}>{isRecording ? "Recording active: 00:15:32" : "Not recording"}</span>
                                </div>
                            </section>
                        </div>
                    </motion.div>

                    {/* Right Sidebar */}
                    <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5, delay: 0.4}} className="space-y-8">
                        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                            <h3 className="text-xl font-semibold text-white mb-4">Meeting Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-slate-400">Meeting Name</span><span className="font-medium text-white">Project Kickoff</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Meeting ID</span><span className="font-medium text-white">123-456-789</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Start Time</span><span className="font-medium text-white">10:00 AM</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Duration</span><span className="font-medium text-white">1 hour</span></div>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                            <h3 className="text-xl font-semibold text-white mb-4">Participants ({participants.length})</h3>
                            <div className="space-y-4">
                                {participants.map(p => (
                                    <div key={p.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full"/>
                                            <div>
                                                <p className="font-medium text-white">{p.name}</p>
                                                <p className="text-xs text-slate-400">{p.role}</p>
                                            </div>
                                        </div>
                                        {p.micOn ? <Mic size={20} className="text-green-400"/> : <MicOff size={20} className="text-red-400"/>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};


// --- Main App Component ---
export default function App() {
    return (
        <div className="relative min-h-screen bg-slate-900 text-white font-sans overflow-hidden">
            <AnimatedBackground />
            <MeetingPage />
        </div>
    );
}
