import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AuditLogView } from './components/views/AuditLogView';
import { AnakAsuhView } from './components/views/AnakAsuhView';
import { DashboardView } from './components/views/DashboardView';
import { DonasiWakafView } from './components/views/DonasiWakafView';
import { PengeluaranView } from './components/views/PengeluaranView';
import { AnggaranView } from './components/views/AnggaranView';
import { LaporanKeuanganView } from './components/views/LaporanKeuanganView';
import { KegiatanYayasanView } from './components/views/KegiatanYayasanView';
import { MasterDataView } from './components/views/MasterDataView';
import { PenggunaRbacView } from './components/views/PenggunaRbacView';

const MainLayout: React.FC = () => {
  const { activePath } = useApp();

  const renderActiveView = () => {
    switch (activePath) {
      case 'dashboard':
        return <DashboardView />;
      case 'donasi-dan-wakaf':
        return <DonasiWakafView />;
      case 'pengeluaran':
        return <PengeluaranView />;
      case 'anggaran':
        return <AnggaranView />;
      case 'laporan-keuangan':
        return <LaporanKeuanganView />;
      case 'anak-asuh':
        return <AnakAsuhView />;
      case 'kegiatan-yayasan':
        return <KegiatanYayasanView />;
      case 'master-data':
        return <MasterDataView />;
      case 'pengguna-dan-rbac':
        return <PenggunaRbacView />;
      case 'audit-log':
      default:
        return <AuditLogView />;
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface">
      <Sidebar />
      <div className="pl-0 lg:pl-72 flex flex-col min-h-screen">
        <Header />
        <main className="w-full pt-20 pb-16 bg-surface flex-1">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
