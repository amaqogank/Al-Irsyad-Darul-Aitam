import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { setMobileMenuOpen, currentUser, setCurrentUser, users, auditLogs, setActivePath } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-20 bg-surface/90 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Mobile hamburger & Verification Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg"
            aria-label="Buka menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="flex items-center gap-2 bg-surface-container-lowest px-3.5 py-1.5 rounded-full shadow-[0_1px_3px_rgba(31,41,55,0.04)] border border-surface-container">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Amanah Terverifikasi
            </span>
          </div>

          <span className="text-xs text-on-surface-variant hidden xl:inline font-normal">
            No. Registrasi Kemenag: YYS/ZAK-0921/2024
          </span>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationMenu(!showNotificationMenu);
                setShowUserMenu(false);
              }}
              className="relative p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-all"
              type="button"
              aria-label="Pemberitahuan"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-surface"></span>
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
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Buka Seluruh Audit Trail
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile / Switch Role */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotificationMenu(false);
              }}
              className="flex items-center gap-3 p-1 rounded-xl hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-sm text-on-surface font-semibold leading-snug">
                  {currentUser.name}
                </span>
                <span className="text-[11px] text-secondary font-medium">{currentUser.role} &amp; Admin</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs shadow-sm">
                {currentUser.avatarText}
              </div>
              <span className="material-symbols-outlined text-[18px] text-outline hidden sm:inline">
                expand_more
              </span>
            </button>

            {/* Profile Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container p-3 z-50">
                <div className="px-3 py-2 border-b border-surface-container mb-2">
                  <div className="font-semibold text-sm text-on-surface">{currentUser.name}</div>
                  <div className="text-xs text-outline font-mono">{currentUser.email}</div>
                  <div className="mt-1 text-[11px] text-primary font-medium">Hak Akses: {currentUser.role}</div>
                </div>

                <div className="text-[11px] font-semibold text-outline uppercase tracking-wider px-3 mb-1">
                  Ganti Akun Demo (RBAC)
                </div>

                <div className="space-y-1 mb-2">
                  {users.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        setCurrentUser(u);
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                        u.id === currentUser.id
                          ? 'bg-primary-container text-on-primary-container font-semibold'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <span>{u.name}</span>
                      <span className="text-[10px] text-outline">{u.role}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-surface-container px-2">
                  <div className="text-[11px] text-outline flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">security</span>
                    <span>Sesi Terenkripsi TLS 1.3</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
