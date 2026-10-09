import React from 'react';
import { useApp } from '../../context/AppContext';

export const PenggunaRbacView: React.FC = () => {
  const { users, currentUser, setCurrentUser } = useApp();

  const permissions = [
    { module: 'Data Santri (Anak Asuh)', roles: { 'Ketua Yayasan': 'Full', 'Bendahara': 'Full', 'Musyrif Senior': 'Edit/Lihat', 'Staf Admin': 'Input/Edit', 'Pembina Tahfidz': 'Input Tahfidz' } },
    { module: 'Donasi & Wakaf (Penerimaan)', roles: { 'Ketua Yayasan': 'Approval', 'Bendahara': 'Full & Kwitansi', 'Musyrif Senior': 'Lihat Saja', 'Staf Admin': 'Input Draf', 'Pembina Tahfidz': 'No Access' } },
    { module: 'Pengeluaran & Voucher Kas', roles: { 'Ketua Yayasan': 'Otorisasi Final', 'Bendahara': 'Full & VOID', 'Musyrif Senior': 'Pengajuan Saja', 'Staf Admin': 'Lihat Saja', 'Pembina Tahfidz': 'No Access' } },
    { module: 'Anggaran RAPB', roles: { 'Ketua Yayasan': 'Pleno/Persetujuan', 'Bendahara': 'Kelola Plafon', 'Musyrif Senior': 'Lihat Saja', 'Staf Admin': 'Lihat Saja', 'Pembina Tahfidz': 'No Access' } },
    { module: 'Audit Log & Ledger Kripto', roles: { 'Ketua Yayasan': 'Lihat & Ekspor', 'Bendahara': 'Lihat & Ekspor', 'Musyrif Senior': 'Lihat Saja', 'Staf Admin': 'No Access', 'Pembina Tahfidz': 'No Access' } }
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-1.5 text-on-surface-variant text-xs tracking-wide">
            <span className="hover:text-primary cursor-pointer transition-colors">Panel Pengurus</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Administrasi &amp; Sistem</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Pengguna &amp; RBAC</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold text-on-surface tracking-tight">
                  Manajemen Pengguna &amp; Otorisasi Hak Akses (RBAC)
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  Prinsip Pemisahan Tugas (Segregation of Duties)
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-4xl">
                Pembagian peran syariah untuk mencegah konflik kepentingan dalam pengelolaan dana ummat.
              </p>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-xs">
          <div className="p-4 border-b border-surface-container bg-surface-container-low flex items-center justify-between">
            <span className="font-bold text-sm text-on-surface">Daftar Akun Pengurus Aktif</span>
            <span className="text-xs text-outline font-mono">Terenkripsi Argon2id</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container text-on-surface-variant text-[11px] uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Nama &amp; Avatar</th>
                  <th className="py-3 px-4">Peran (Role)</th>
                  <th className="py-3 px-4">Email &amp; No. WA</th>
                  <th className="py-3 px-4">Status Sesi</th>
                  <th className="py-3 px-4 text-right">Ganti Akun Demo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/60 text-on-surface">
                {users.map((u) => {
                  const isCurrent = u.id === currentUser.id;
                  return (
                    <tr key={u.id} className={isCurrent ? 'bg-primary-container/10 font-medium' : 'hover:bg-surface-container-low/60'}>
                      <td className="py-3 px-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-xs">
                            {u.avatarText}
                          </div>
                          <div>
                            <span className="font-semibold text-on-surface">{u.name}</span>
                            {isCurrent && (
                              <span className="text-[10px] text-primary font-bold block">(Sedang Digunakan)</span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">
                          {u.role}
                        </span>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <div className="flex flex-col">
                          <span className="font-mono text-outline">{u.email}</span>
                          <span className="text-[11px] font-mono text-outline">{u.phone}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <span className="text-xs text-on-surface-variant">{u.lastActive}</span>
                      </td>

                      <td className="py-3 px-4 align-middle text-right">
                        {!isCurrent ? (
                          <button
                            onClick={() => setCurrentUser(u)}
                            className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Masuk Sebagai
                          </button>
                        ) : (
                          <span className="text-xs font-semibold text-primary">Aktif</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Matrix RBAC */}
        <div className="bg-surface-container-lowest rounded-2xl border border-surface-container p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-on-surface">Matriks Hak Akses Modul Sistem (RBAC)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container text-on-surface-variant text-[11px] uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Modul Sistem</th>
                  <th className="py-3 px-4 text-center">Ketua Yayasan</th>
                  <th className="py-3 px-4 text-center">Bendahara</th>
                  <th className="py-3 px-4 text-center">Musyrif Senior</th>
                  <th className="py-3 px-4 text-center">Staf Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/60 text-on-surface">
                {permissions.map((p, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/60">
                    <td className="py-3 px-4 font-semibold text-on-surface">{p.module}</td>
                    <td className="py-3 px-4 text-center font-medium text-primary">{p.roles['Ketua Yayasan']}</td>
                    <td className="py-3 px-4 text-center font-medium text-primary">{p.roles['Bendahara']}</td>
                    <td className="py-3 px-4 text-center font-medium text-on-surface-variant">{p.roles['Musyrif Senior']}</td>
                    <td className="py-3 px-4 text-center font-medium text-on-surface-variant">{p.roles['Staf Admin']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
