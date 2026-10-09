import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { setMobileMenuOpen, currentUser, setCurrentUser, users, auditLogs, setActivePath } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 sm:px-8 border-b border-surface-container/60">
      {/* Left: Mobile hamburger & SSL Verification Badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg"
          aria-label="Buka menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-surface-container/60">
          <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse"></span>
          <span className="text-[11px] font-semibold tracking-wide uppercase">
            Enkripsi Terverifikasi SSL
          </span>
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotificationMenu(!showNotificationMenu);
              setShowUserMenu(false);
            }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all relative cursor-pointer"
            type="button"
            aria-label="Pemberitahuan"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary"></span>
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <span className="text-sm font-bold text-on-surface">Pemberitahuan Sistem</span>
                <span className="text-[11px] text-primary font-semibold">Terkini</span>
              </div>
              <div className="divide-y divide-surface-container max-h-72 overflow-y-auto">
                {auditLogs.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setShowNotificationMenu(false);
                      setActivePath('audit-log');
                    }}
                    className="py-2.5 hover:bg-surface-container-low px-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] text-outline mb-1">
                      <span className="font-semibold text-primary">{item.recordId}</span>
                      <span>{item.relativeTime}</span>
                    </div>
                    <p className="text-xs text-on-surface font-medium line-clamp-2">{item.summary}</p>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-center border-t border-surface-container">
                <button
                  onClick={() => {
                    setShowNotificationMenu(false);
                    setActivePath('audit-log');
                  }}
                  className="text-xs text-primary font-semibold hover:underline cursor-pointer"
                >
                  Buka Seluruh Audit Trail
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-outline-variant/40"></div>

        {/* User Profile / Switch Role */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotificationMenu(false);
            }}
            className="flex items-center gap-3 pl-2 py-1 rounded-xl hover:bg-surface-container-low transition-colors text-left cursor-pointer"
          >
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-sm font-semibold text-on-surface leading-tight">
                {currentUser.name} {currentUser.title ? `, ${currentUser.title}` : ''}
              </span>
              <span className="text-[11px] text-secondary uppercase font-semibold">
                {currentUser.roleLabel || currentUser.role}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-3 z-50">
              <div className="px-3 py-2 border-b border-surface-container mb-2">
                <div className="font-semibold text-sm text-on-surface">
                  {currentUser.name} {currentUser.title ? `, ${currentUser.title}` : ''}
                </div>
                <div className="text-xs text-outline font-mono">{currentUser.email}</div>
                <div className="mt-1 text-[11px] text-primary font-medium">
                  {currentUser.roleLabel} • NIP: {currentUser.nip}
                </div>
              </div>

              <div className="text-[11px] font-semibold text-outline uppercase tracking-wider px-3 mb-1">
                Ganti Akun Demo (RBAC)
              </div>

              <div className="space-y-1 mb-2 max-h-60 overflow-y-auto">
                {users.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setCurrentUser(u);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                      u.id === currentUser.id
                        ? 'bg-primary-container text-on-primary font-semibold'
                        : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="truncate">{u.name}</span>
                    <span className="text-[10px] text-outline shrink-0 ml-2">{u.role}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-surface-container px-2">
                <div className="text-[11px] text-outline flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-primary">security</span>
                  <span>Sesi Terenkripsi TLS 1.3 / SSL</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
