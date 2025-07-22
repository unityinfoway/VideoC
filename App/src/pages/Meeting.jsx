import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Video, Mic, MicOff, Rss, Radio, ChevronDown, User, Users, Clock, Hash,
    PlayCircle, StopCircle, Settings, LogOut, Bell, Search, LayoutDashboard,
    Calendar, UserCog, Shield, SlidersHorizontal, HardDrive, BellRing, BookText,
    CircleUserRound, Link, Mail, Share2, CalendarPlus, VideoIcon, Clock4
} from 'lucide-react';
import Sidebar from "../components/Sidebar.jsx";

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

// --- Toggle Switch Component ---
const ToggleSwitch = ({ label, enabled, setEnabled, icon: Icon }) => (
    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
        <div className="flex items-center gap-3">
            <Icon className="text-slate-400" size={18} />
            <span className="text-slate-300 text-sm font-medium">{label}</span>
        </div>
        <button 
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 ${enabled ? 'bg-blue-500' : 'bg-slate-600'}`}
        >
            <motion.span
                animate={{ x: enabled ? 22 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="inline-block h-5 w-5 transform rounded-full bg-white"
            />
        </button>
    </div>
);


// --- Create Meeting Component ---
const CreateMeeting = () => {
    const [scheduleOption, setScheduleOption] = useState('now');
    const [copied, setCopied] = useState(false);
    const [enableWaitingRoom, setEnableWaitingRoom] = useState(true);
    const [muteOnEntry, setMuteOnEntry] = useState(false);
    const [allowJoinAnytime, setAllowJoinAnytime] = useState(false);


    const handleCopy = () => {
        const meetingLink = "https://in8.video/join/project-kickoff-123";
        navigator.clipboard.writeText(meetingLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.07
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 h-full flex flex-col"
        >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white">Create a New Meeting</motion.h2>
            <motion.p variants={itemVariants} className="text-slate-400 mt-2 mb-8">Instantly start or schedule meetings for a future date.</motion.p>
            
            <div className="flex-grow flex flex-col space-y-6">
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Left Column: Form */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">1. Meeting Details</h3>
                        <div className="relative">
                            <VideoIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="text" placeholder="Meeting Name" className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input type="email" placeholder="Invite with email (comma separated)" className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </motion.div>

                    {/* Right Column: Options */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">2. Meeting Options</h3>
                        <div className="space-y-3">
                             <ToggleSwitch label="Enable waiting room" enabled={enableWaitingRoom} setEnabled={setEnableWaitingRoom} icon={Users} />
                             <ToggleSwitch label="Mute participants on entry" enabled={muteOnEntry} setEnabled={setMuteOnEntry} icon={MicOff} />
                             <ToggleSwitch label="Allow to join anytime" enabled={allowJoinAnytime} setEnabled={setAllowJoinAnytime} icon={Clock} />
                        </div>
                    </motion.div>
                </div>
                
                {/* Spanning Row: Schedule */}
                <motion.div variants={itemVariants} className="space-y-4">
                     <h3 className="text-lg font-semibold text-white">3. Schedule</h3>
                     <div className="flex bg-slate-700/50 border-2 border-slate-600 rounded-lg p-1">
                        <button onClick={() => setScheduleOption('now')} className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${scheduleOption === 'now' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-600/50'}`}>
                            Create Now
                        </button>
                        <button onClick={() => setScheduleOption('later')} className={`w-1/2 py-2 rounded-md text-sm font-semibold transition-colors ${scheduleOption === 'later' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-600/50'}`}>
                            Schedule for Later
                        </button>
                    </div>
                    <AnimatePresence>
                        {scheduleOption === 'later' && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="date" className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                     <div className="relative">
                                        <Clock4 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="time" className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                 {/* Spanning Row: Sharing */}
                <motion.div variants={itemVariants} className="p-4 bg-slate-900/50 rounded-lg border-2 border-slate-700">
                     <h4 className="font-semibold text-white mb-2">Share Invitation</h4>
                     <p className="text-sm text-slate-400 mb-4">A unique link will be generated after you create the meeting.</p>
                     <div className="flex gap-4">
                         <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-700/80 hover:bg-slate-700 transition-colors text-sm font-medium opacity-50 cursor-not-allowed">
                             <Share2 size={16} /> Share
                         </button>
                         <button onClick={handleCopy} className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-700/80 hover:bg-slate-700 transition-colors text-sm font-medium opacity-50 cursor-not-allowed">
                             <Link size={16} /> Copy Link
                         </button>
                     </div>
                 </motion.div>
            </div>
            
            {/* Main Action Button */}
            <div className="mt-8">
                <motion.button 
                    className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white transition-all hover:from-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]"
                    whileTap={{ scale: 0.98 }}
                >
                    {scheduleOption === 'now' ? 'Create & Start Meeting' : 'Schedule Meeting'}
                </motion.button>
            </div>
        </motion.div>
    );
};


// --- MEETING PAGE ---
const MeetingPage = () => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [isRecording, setIsRecording] = useState(true);

    return (
        <div className="flex h-screen relative z-10">
            <Sidebar/>
            
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
                    <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5, delay: 0.2}} className="lg:col-span-2">
                        <CreateMeeting />
                    </motion.div>

                    {/* Right Sidebar - MODIFIED */}
                    <motion.div 
                        initial={{opacity: 0, x: 20}} 
                        animate={{opacity: 1, x: 0}} 
                        transition={{duration: 0.5, delay: 0.4}} 
                        className="flex flex-col justify-around p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50"
                    >
                        <section>
                            <h3 className="flex items-center gap-3 text-xl font-semibold text-white mb-4"><Rss className="text-blue-400" /> Live Streaming</h3>
                            <div className="space-y-4">
                                <div className="relative">
                                    <select className="w-full appearance-none bg-slate-700/50 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Facebook Live</option>
                                        <option>YouTube Live</option>
                                        <option>Twitch</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                <div className="flex gap-4">
                                    <motion.button onClick={() => setIsStreaming(true)} disabled={isStreaming} className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-blue-600 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-blue-500" whileTap={{scale: 0.95}}><PlayCircle size={20}/> Start</motion.button>
                                    <motion.button onClick={() => setIsStreaming(false)} disabled={!isStreaming} className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-slate-700 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-slate-600" whileTap={{scale: 0.95}}><StopCircle size={20}/> Stop</motion.button>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm">
                                {isStreaming ? <motion.div initial={{scale:0}} animate={{scale:1}} className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]"></motion.div> : <div className="w-3 h-3 rounded-full bg-slate-600"></div>}
                                <span className={isStreaming ? "text-green-400" : "text-slate-400"}>{isStreaming ? "Stream is live" : "Stream is offline"}</span>
                            </div>
                        </section>

                        <section>
                            <h3 className="flex items-center gap-3 text-xl font-semibold text-white mb-4"><Radio className="text-red-400" /> Recording</h3>
                             <div className="space-y-4">
                                <div className="relative">
                                    <select className="w-full appearance-none bg-slate-700/50 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500">
                                        <option>Gallery View</option>
                                        <option>Speaker View</option>
                                        <option>Shared Screen</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                                <div className="flex gap-4">
                                    <motion.button onClick={() => setIsRecording(true)} disabled={isRecording} className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-red-600 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-red-500" whileTap={{scale: 0.95}}><PlayCircle size={20}/> Record</motion.button>
                                    <motion.button onClick={() => setIsRecording(false)} disabled={!isRecording} className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-slate-700 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-slate-600" whileTap={{scale: 0.95}}><StopCircle size={20}/> Stop</motion.button>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm">
                                {isRecording ? <motion.div initial={{scale:0}} animate={{scale:1}} className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"></motion.div> : <div className="w-3 h-3 rounded-full bg-slate-600"></div>}
                                <span className={isRecording ? "text-red-400" : "text-slate-400"}>{isRecording ? "Recording active: 00:15:32" : "Not recording"}</span>
                            </div>
                        </section>
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
