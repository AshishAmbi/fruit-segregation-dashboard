import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Activity, Menu, X, Cpu } from 'lucide-react';
import { NAV_LINKS } from '@/constants';
import { useFirebaseStatus } from '@/hooks';

const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const location         = useLocation();
  const { configured }   = useFirebaseStatus();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(15,23,42,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,139,199,0.12)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 no-underline group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
          >
            <Cpu size={18} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-[13px] tracking-wider uppercase">FSMS</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '10px', letterSpacing: '0.05em' }}>
              Fruit Segregation Monitor
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 no-underline ${
                  isActive
                    ? 'text-white bg-blue-500/15 border border-blue-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Status Pill */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: configured ? 'var(--accent-green-dim)' : 'rgba(71,85,105,0.2)',
              border: `1px solid ${configured ? 'rgba(34,197,94,0.25)' : 'rgba(71,85,105,0.3)'}`,
              color: configured ? 'var(--accent-green)' : 'var(--text-muted)',
            }}
          >
            <Activity size={12} />
            {configured ? 'Live' : 'Demo Mode'}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ borderColor: 'rgba(99,139,199,0.12)', background: 'rgba(15,23,42,0.97)' }}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium no-underline ${
                  isActive
                    ? 'text-white bg-blue-500/15'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
