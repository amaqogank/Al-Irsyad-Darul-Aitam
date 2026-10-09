import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { AuditTable, ActionType } from '../../types';

export const AuditLogView: React.FC = () => {
  const { auditLogs, selectedAuditId, setSelectedAuditId, selectedAuditItem } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState<string>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [isDiffOpen, setIsDiffOpen] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  // Filter logs
  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchSearch =
        searchQuery === '' ||
        log.recordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.executorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.targetEntityName && log.targetEntityName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchTable = selectedTable === 'all' || log.table === selectedTable;
      const matchAction = selectedAction === 'all' || log.action === selectedAction;

      return matchSearch && matchTable && matchAction;
    });
  }, [auditLogs, searchQuery, selectedTable, selectedAction]);

  const handleRowClick = (id: string) => {
    setSelectedAuditId(id);
    setIsDiffOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTable('all');
    setSelectedAction('all');
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Waktu', 'Eksekutor', 'Role', 'IP', 'Aksi', 'Tabel', 'Record_ID', 'Ringkasan', 'Prev_Hash', 'Curr_Hash'];
    const rows = filteredLogs.map((log) => [
      log.id,
      log.timestamp,
      `"${log.executorName}"`,
      `"${log.executorRole}"`,
      log.executorIp,
      log.action,
      log.table,
      log.recordId,
      `"${log.summary.replace(/"/g, '""')}"`,
      log.prevHash,
      log.currHash
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Audit_Log_Al_Irsyad_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPdf = () => {
    window.print();
  };

  const handleCopyJson = () => {
    if (!selectedAuditItem) return;
    const jsonStr = JSON.stringify(
      {
        audit_id: selectedAuditItem.id,
        record_id: selectedAuditItem.recordId,
        table: selectedAuditItem.table,
        action: selectedAuditItem.action,
        executor: selectedAuditItem.executorName,
        executor_role: selectedAuditItem.executorRole,
        ip_address: selectedAuditItem.executorIp,
        timestamp: selectedAuditItem.timestamp,
        rationale: selectedAuditItem.rationale,
        cryptographic_hash: {
          prev_hash: selectedAuditItem.prevHash,
          curr_hash: selectedAuditItem.currHash
        },
        changes: selectedAuditItem.changes
      },
      null,
      2
    );

    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2200);
    });
  };

  const getActionBadgeClass = (action: ActionType) => {
    switch (action) {
      case 'CREATE':
        return 'bg-surface-container text-primary';
      case 'UPDATE':
        return 'bg-surface-container-highest text-primary';
      case 'VERIFY':
        return 'bg-primary-container text-on-primary-container';
      case 'VOID':
        return 'bg-error-container text-error';
      case 'DELETE':
        return 'bg-error-container text-error';
      default:
        return 'bg-surface-container text-on-surface-variant';
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-1.5 text-on-surface-variant text-xs tracking-wide">
            <span className="hover:text-primary cursor-pointer transition-colors">Panel Pengurus</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Administrasi &amp; Sistem</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Audit Log</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-[28px] font-bold text-on-surface tracking-tight">
                  Audit Log &amp; Riwayat Perubahan Data
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Enkripsi SHA-256 Ledger Terkunci
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                  Audit Trail Aktif 24/7
                </span>
              </div>
              <p className="text-sm text-on-surface-variant max-w-4xl">
                Rekam jejak digital kepatuhan PSAK 109 dan UU Perlindungan Data Pribadi yang bersifat immutable (hanya-baca / append-only).
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0 no-print">
              <button
                onClick={handleExportCsv}
                className="h-11 px-4 bg-surface-container-lowest hover:bg-surface-container text-on-surface text-sm font-medium rounded-lg shadow-xs border border-surface-container flex items-center gap-2 transition-all cursor-pointer"
                type="button"
                id="btnExportCsv"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">sim_card_download</span>
                <span>Ekspor CSV</span>
              </button>
              <button
                onClick={handleExportPdf}
                className="h-11 px-4 bg-primary hover:bg-primary/90 text-on-primary text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                type="button"
                id="btnExportPdf"
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Sertifikat Audit (PDF)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-surface-container-high/40 rounded-full blur-xl group-hover:scale-125 transition-transform pointer-events-none"></div>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Total Aktivitas Terdata
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold text-on-surface">1.482</span>
                  <span className="text-xs text-on-surface-variant">Log</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">history_toggle_off</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 flex items-center gap-1.5 text-on-surface-variant text-xs">
              <span className="text-primary font-medium flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span> 30 hari terakhir
              </span>
              <span>• Rata-rata 49 aksi / hari</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-surface-container-high/40 rounded-full blur-xl group-hover:scale-125 transition-transform pointer-events-none"></div>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Transaksi Diverifikasi
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold text-primary">218</span>
                  <span className="text-xs text-on-surface-variant">Mutasi Kas</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center gap-1 text-primary font-semibold">
                <span className="material-symbols-outlined text-[14px]">check_circle</span> Kepatuhan PSAK 109
              </span>
              <span className="text-on-surface-variant">• 0 anomali</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-surface-container-high/40 rounded-full blur-xl group-hover:scale-125 transition-transform pointer-events-none"></div>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Data Santri (Sensitif)
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold text-secondary">14</span>
                  <span className="text-xs text-on-surface-variant">Modifikasi</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">shield_person</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 flex items-center gap-1.5 text-xs text-on-surface-variant">
              <span className="text-secondary font-semibold">100% Otorisasi Supervisor</span>
              <span>• PDP Sesuai UU</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-surface-container-high/40 rounded-full blur-xl group-hover:scale-125 transition-transform pointer-events-none"></div>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-outline font-semibold block">
                  Integritas Ledger
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold text-primary">100%</span>
                  <span className="text-xs text-on-surface-variant">Valid</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">fingerprint</span>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-surface-container/60 flex items-center gap-1.5 text-xs text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
              <span className="font-mono text-xs truncate">Block #1482-99F7 OK</span>
            </div>
          </div>
        </div>

        {/* Main Workspace: Table + Open Comparison Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Table & Filters */}
          <div
            className={`flex flex-col gap-4 transition-all duration-300 ${
              isDiffOpen ? 'lg:col-span-7' : 'lg:col-span-12'
            }`}
            id="tableContainer"
          >
            {/* Filter Controls Bar */}
            <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container flex flex-col gap-3">
              <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                    search
                  </span>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-surface-container-low focus:bg-surface-container-lowest text-on-surface text-sm rounded-xl border border-transparent focus:border-primary/30 outline-none transition-colors placeholder:text-outline"
                    id="searchAudit"
                    placeholder="Cari pengguna, deskripsi aksi, atau record ID..."
                    type="text"
                  />
                </div>

                {/* Date Range Selector */}
                <div className="h-11 px-4 bg-surface-container-low rounded-xl flex items-center gap-2 text-on-surface shrink-0 cursor-pointer hover:bg-surface-container transition-colors border border-transparent">
                  <span className="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
                  <span className="text-xs font-medium">1 Okt - 14 Okt 2026</span>
                  <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
                </div>
              </div>

              {/* Dropdowns & Fast Filters */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {/* Table Name Filter */}
                <div className="relative">
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="h-9 pl-3.5 pr-8 bg-surface-container-low text-on-surface text-xs font-medium rounded-lg appearance-none cursor-pointer outline-none border border-transparent"
                    id="filterTable"
                  >
                    <option value="all">Semua Tabel Sistem</option>
                    <option value="children">children (Anak Asuh)</option>
                    <option value="donations">donations (Donasi &amp; Wakaf)</option>
                    <option value="expenses">expenses (Pengeluaran Kas)</option>
                    <option value="financial_reports">financial_reports (Laporan Keuangan)</option>
                    <option value="activities">activities (Kegiatan Santri)</option>
                    <option value="budgets">budgets (Anggaran RAPB)</option>
                    <option value="users">users (Pengguna Sistem)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] pointer-events-none text-outline">
                    arrow_drop_down
                  </span>
                </div>

                {/* Action Type Filter */}
                <div className="relative">
                  <select
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="h-9 pl-3.5 pr-8 bg-surface-container-low text-on-surface text-xs font-medium rounded-lg appearance-none cursor-pointer outline-none border border-transparent"
                    id="filterAction"
                  >
                    <option value="all">Semua Aksi</option>
                    <option value="CREATE">CREATE / Penambahan</option>
                    <option value="UPDATE">UPDATE / Perubahan</option>
                    <option value="VERIFY">VERIFY / Validasi</option>
                    <option value="VOID">VOID / Pembatalan</option>
                    <option value="DELETE">DELETE / Penghapusan</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] pointer-events-none text-outline">
                    arrow_drop_down
                  </span>
                </div>

                <div className="ml-auto flex items-center gap-2 text-xs text-on-surface-variant">
                  <span>
                    Menampilkan: <strong>{filteredLogs.length}</strong> dari <strong>{auditLogs.length}</strong> rekaman
                  </span>
                  {(searchQuery || selectedTable !== 'all' || selectedAction !== 'all') && (
                    <button
                      onClick={handleResetFilters}
                      className="text-primary hover:underline font-semibold ml-2 cursor-pointer"
                      type="button"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Audit Table Container */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container text-on-surface-variant text-[11px] uppercase tracking-wider font-semibold select-none">
                    <tr>
                      <th className="py-3 px-4">Waktu &amp; Stempel</th>
                      <th className="py-3 px-4">Eksekutor / User</th>
                      <th className="py-3 px-4">Aksi</th>
                      <th className="py-3 px-4">Tabel &amp; ID</th>
                      <th className="py-3 px-4">Ringkasan Aksi</th>
                      <th className="py-3 px-4 text-right">Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container/60 text-on-surface">
                    {filteredLogs.map((log) => {
                      const isSelected = selectedAuditItem?.id === log.id;
                      return (
                        <tr
                          key={log.id}
                          onClick={() => handleRowClick(log.id)}
                          className={`transition-colors cursor-pointer group ${
                            isSelected
                              ? 'bg-surface-container-high/60 hover:bg-surface-container-high'
                              : 'hover:bg-surface-container-low'
                          }`}
                        >
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col">
                              <span className="font-mono text-xs font-semibold text-on-surface">
                                {log.timestamp.split(' ')[0]} {log.timestamp.split(' ')[1]} {log.timestamp.split(' ')[2]}
                              </span>
                              <span className="font-mono text-[11px] text-on-surface-variant">
                                {log.timestamp.split(' ')[3] || 'WIB'}
                              </span>
                              <span className="text-[10px] text-primary font-medium mt-0.5">
                                {log.relativeTime}
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-on-surface leading-tight">
                                {log.executorName}
                              </span>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold tracking-wide">
                                  {log.executorRole}
                                </span>
                                <span className="font-mono text-[10px] text-outline">{log.executorIp}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 align-top">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold text-[10px] ${getActionBadgeClass(
                                log.action
                              )}`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              {log.action}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col">
                              <span className="font-mono text-xs font-bold text-primary">{log.recordId}</span>
                              <span className="text-[11px] text-outline">{log.table}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 align-top">
                            <p className="text-xs text-on-surface leading-snug max-w-xs">
                              {log.summary}
                            </p>
                          </td>

                          <td className="py-3.5 px-4 align-top text-right shrink-0">
                            {isSelected && isDiffOpen ? (
                              <button
                                className="px-2.5 py-1 rounded bg-primary text-on-primary text-[11px] font-semibold flex items-center gap-1 ml-auto shadow-xs"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[14px]">difference</span>
                                <span>Melihat Diff</span>
                              </button>
                            ) : (
                              <button
                                className="px-2.5 py-1 rounded hover:bg-surface-container text-on-surface-variant text-[11px] font-medium flex items-center gap-1 ml-auto"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[14px]">history</span>
                                <span>Lihat Perubahan</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Bar */}
              <div className="p-4 bg-surface-container-low border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-on-surface-variant">
                  Halaman <strong>1</strong> dari <strong>1</strong> • Total {filteredLogs.length} Baris Data
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="w-8 h-8 rounded-lg bg-surface-container-lowest text-outline hover:text-on-surface flex items-center justify-center transition-colors shadow-2xs disabled:opacity-40"
                    disabled
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg bg-primary text-on-primary font-mono text-xs font-bold flex items-center justify-center shadow-xs"
                    type="button"
                  >
                    1
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg bg-surface-container-lowest text-outline hover:text-on-surface flex items-center justify-center transition-colors shadow-2xs disabled:opacity-40"
                    disabled
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Diff Viewer / Inspection Flyout Panel */}
          {isDiffOpen && selectedAuditItem && (
            <div
              className="lg:col-span-5 bg-surface-container-lowest rounded-2xl shadow-md border border-surface-container overflow-hidden flex flex-col sticky top-24"
              id="diffPanel"
            >
              {/* Diff Header */}
              <div className="p-5 bg-surface-container-low border-b border-surface-container flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">compare_arrows</span>
                    <span className="text-base font-bold text-on-surface">Diff Viewer: Perubahan Data</span>
                  </div>
                  <button
                    onClick={() => setIsDiffOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-outline hover:text-on-surface transition-colors cursor-pointer"
                    id="btnCloseDiff"
                    title="Tutup Panel"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                {/* Record Info Pill */}
                <div className="mt-1 p-3 bg-surface-container-lowest rounded-xl border border-surface-container flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      {selectedAuditItem.table} {selectedAuditItem.recordId}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${getActionBadgeClass(
                        selectedAuditItem.action
                      )}`}
                    >
                      {selectedAuditItem.action}
                    </span>
                  </div>
                  {selectedAuditItem.targetEntityName && (
                    <span className="text-xs font-semibold text-on-surface">
                      {selectedAuditItem.targetEntityName}
                    </span>
                  )}
                </div>

                <div className="text-on-surface-variant text-[11px] flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
                  <span>
                    Eksekutor: <strong className="text-on-surface">{selectedAuditItem.executorName}</strong>
                  </span>
                  <span>•</span>
                  <span className="font-mono">{selectedAuditItem.timestamp}</span>
                </div>

                {selectedAuditItem.rationale && (
                  <p className="text-xs text-on-surface-variant italic mt-1 bg-surface-container-high/40 p-2.5 rounded-lg border border-surface-container">
                    “{selectedAuditItem.rationale}”
                  </p>
                )}
              </div>

              {/* Diff Body: 2 Columns Side-by-Side */}
              <div className="p-5 flex flex-col gap-4 max-h-[520px] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Column Old Data */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-error-container/40 rounded-lg text-error text-[11px] font-semibold border border-error/20">
                      <span className="material-symbols-outlined text-[14px]">remove_circle_outline</span>
                      <span>Data Sebelumnya (old_data)</span>
                    </div>

                    {selectedAuditItem.changes.map((field, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg space-y-0.5 text-xs ${
                          field.oldValue !== field.newValue
                            ? 'bg-error-container/20 border border-error/20'
                            : 'bg-surface-container-low border border-surface-container'
                        }`}
                      >
                        <span className="text-[10px] text-outline font-semibold uppercase tracking-wider block">
                          {field.fieldName}
                        </span>
                        <span
                          className={`font-mono text-xs block ${
                            field.oldValue !== field.newValue ? 'text-error line-through font-medium' : 'text-on-surface'
                          }`}
                        >
                          {typeof field.oldValue === 'boolean'
                            ? String(field.oldValue)
                            : String(field.oldValue || 'null')}
                        </span>
                        {field.description && field.oldValue !== field.newValue && (
                          <span className="text-[10px] text-error/80 block">{field.description}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Column New Data */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface-container-highest rounded-lg text-primary text-[11px] font-semibold border border-primary/20">
                      <span className="material-symbols-outlined text-[14px]">add_circle_outline</span>
                      <span>Data Baru (new_data)</span>
                    </div>

                    {selectedAuditItem.changes.map((field, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg space-y-0.5 text-xs ${
                          field.oldValue !== field.newValue
                            ? 'bg-surface-container-highest/60 border border-primary/20'
                            : 'bg-surface-container-low border border-surface-container'
                        }`}
                      >
                        <span className="text-[10px] text-outline font-semibold uppercase tracking-wider block">
                          {field.fieldName}
                        </span>
                        <span
                          className={`font-mono text-xs block ${
                            field.oldValue !== field.newValue ? 'text-primary font-bold' : 'text-on-surface'
                          }`}
                        >
                          {typeof field.newValue === 'boolean'
                            ? String(field.newValue)
                            : String(field.newValue || 'null')}
                        </span>
                        {field.description && field.oldValue !== field.newValue && (
                          <span className="text-[10px] text-primary/80 block">{field.description}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cryptographic Integrity & Hash Block */}
                <div className="p-3.5 bg-surface-container-low rounded-xl border border-surface-container space-y-2">
                  <div className="flex items-center justify-between text-xs text-outline">
                    <span className="font-semibold uppercase tracking-wider flex items-center gap-1 text-[11px]">
                      <span className="material-symbols-outlined text-[14px] text-primary">enhanced_encryption</span>
                      Integritas Hash Kriptografi
                    </span>
                    <span className="text-primary font-semibold text-[11px]">Valid &amp; Chained</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-outline">Prev Hash:</span>
                      <span className="text-on-surface-variant font-mono">
                        {selectedAuditItem.prevHash.slice(0, 16)}...{selectedAuditItem.prevHash.slice(-6)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-primary font-semibold">Curr Hash:</span>
                      <span className="text-primary font-mono font-bold">
                        {selectedAuditItem.currHash.slice(0, 16)}...{selectedAuditItem.currHash.slice(-6)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diff Footer Actions */}
              <div className="p-4 bg-surface-container-low border-t border-surface-container flex flex-wrap items-center justify-between gap-2.5">
                <button
                  onClick={handleCopyJson}
                  className="h-10 px-4 bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs border border-surface-container cursor-pointer"
                  id="btnCopyJson"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    {copySuccess ? 'check' : 'content_copy'}
                  </span>
                  <span>{copySuccess ? 'Tersalin ke Clipboard!' : 'Salin JSON Diff'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="h-10 px-4 bg-primary hover:bg-primary/90 text-on-primary text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    id="btnPrintBeritaAcara"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span>Cetak Berita Acara</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security & Compliance Disclaimer Card */}
        <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[24px]">policy</span>
            </div>
            <div className="space-y-0.5">
              <h2 className="text-base font-bold text-on-surface">Klausul Perlindungan &amp; Pertanggungjawaban Syariah</h2>
              <p className="text-xs text-on-surface-variant max-w-3xl leading-relaxed">
                Seluruh rekam jejak sistem disimpan dalam tabel basis data terenkripsi WORM (Write Once, Read Many). Modifikasi data santri anak asuh diaudit berkala sesuai regulasi UU PDP No. 27/2022 dan prinsip <em>Amanah Syariah Wal Jamaah</em>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            <span>Sistem Diaudit oleh KAP &amp; BAZNAS 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
