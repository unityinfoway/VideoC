import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Video, Calendar, UserCog, Shield, 
    SlidersHorizontal, HardDrive, BellRing, BookText, 
    ChevronDown, LogOut, CircleUserRound 
} from 'lucide-react';
import MyLogo from '../assets/logo.png'; 

// SidebarLink has reduced padding, gap, and icon size for a more compact look.
const SidebarLink = ({ icon: Icon, text, active, onClick, to }) => (
    <Link 
        to={to}
        onClick={onClick} 
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors relative text-sm ${ active ? 'bg-blue-600/30 text-white font-medium' : 'text-slate-300 hover:bg-white/10 hover:text-white' }`}
    >
        {active && <motion.div layoutId="active-pill" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />}
        <Icon size={16} />
        <span>{text}</span>
    </Link>
);

const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            {/* Reduced padding to match the new compact style. */}
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold tracking-wider text-slate-500 uppercase">
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

export default function Sidebar({ activeLink, setActiveLink, user, onLogout }) {
    const Logo = MyLogo; 

    return (
        <aside className="w-64 min-h-screen hidden lg:flex flex-col bg-black/20 backdrop-blur-lg p-4 border-r border-slate-800">
            <div className="flex items-center gap-3 p-4">
                <img src={Logo} alt="IN8 Logo" className="w-16 h-16 object-contain" />
                <h1 className="text-2xl font-bold text-white">IN8</h1>
            </div>
            {/* Reduced spacing and top margin for a tighter layout */}
            <nav className="flex-1 space-y-2 mt-4">
                <div className="px-2">
                    <SidebarLink 
                        to="/dashboard" 
                        icon={LayoutDashboard} 
                        text="Dashboard" 
                        active={activeLink === 'Dashboard'} 
                        onClick={() => setActiveLink('Dashboard')} 
                    />
                </div>
                <CollapsibleSection title="Workspace">
                    <SidebarLink 
                        to="/meeting" 
                        icon={Video} 
                        text="Meetings" 
                        active={activeLink === 'Meetings'} 
                        onClick={() => setActiveLink('Meetings')} 
                    />
                    <SidebarLink 
                        to="/calendar" 
                        icon={Calendar} 
                        text="Calendar" 
                        active={activeLink === 'Calendar'} 
                        onClick={() => setActiveLink('Calendar')} 
                    />
                </CollapsibleSection>
                <CollapsibleSection title="Admin Tools">
                    <SidebarLink 
                        to="/admin/users" 
                        icon={UserCog} 
                        text="User Management" 
                        active={activeLink === 'User Management'} 
                        onClick={() => setActiveLink('User Management')} 
                    />
                    <SidebarLink 
                        to="/admin/security" 
                        icon={Shield} 
                        text="Security" 
                        active={activeLink === 'Security'} 
                        onClick={() => setActiveLink('Security')} 
                    />
                    <SidebarLink 
                        to="/admin/customization" 
                        icon={SlidersHorizontal} 
                        text="Customization" 
                        active={activeLink === 'Customization'} 
                        onClick={() => setActiveLink('Customization')} 
                    />
                    <SidebarLink 
                        to="/admin/status" 
                        icon={HardDrive} 
                        text="System Status" 
                        active={activeLink === 'System Status'} 
                        onClick={() => setActiveLink('System Status')} 
                    />
                </CollapsibleSection>
                <CollapsibleSection title="Resources">
                    <SidebarLink 
                        to="/notifications" 
                        icon={BellRing} 
                        text="Notifications" 
                        active={activeLink === 'Notifications'} 
                        onClick={() => setActiveLink('Notifications')} 
                    />
                    <SidebarLink 
                        to="/docs" 
                        icon={BookText} 
                        text="Documentation" 
                        active={activeLink === 'Documentation'} 
                        onClick={() => setActiveLink('Documentation')} 
                    />
                </CollapsibleSection>
            </nav>
            <div className="mt-auto p-2 border-t border-slate-700/50">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10">
                    <CircleUserRound size={36} className="text-slate-400" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">{user?.firstName || 'User'}</p>
                        <p className="text-xs text-slate-400">{user?.email}</p>
                    </div>
                    <LogOut size={18} className="text-slate-500 hover:text-red-400 cursor-pointer" onClick={onLogout} />
                </div>
            </div>
        </aside>
    );
};
