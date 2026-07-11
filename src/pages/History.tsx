import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Apple, Image as ImageIcon } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useFruitHistory } from '@/hooks';
import { RESULT_CONFIG, FRUIT_COLORS } from '@/constants';
import type { HistoryEntry } from '@/types';

const PAGE_SIZE = 15;

const History: React.FC = () => {
  const { history, loading } = useFruitHistory(500); // fetch up to 500 records
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState<'All' | 'Accepted' | 'Rejected'>('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and Search logic
  const filteredData = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterResult === 'All' || item.result === filterResult;
      return matchesSearch && matchesFilter;
    });
  }, [history, searchTerm, filterResult]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const currentData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Reset page on filter/search change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterResult]);

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', paddingBottom: 40 }}>
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-6">
        <h1 className="text-white font-bold text-2xl mb-1">Sorting History</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          Log of all scanned and sorted fruits
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <GlassCard padding="lg">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search by ID or fruit name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Filter className="text-slate-400" size={16} />
              <select
                value={filterResult}
                onChange={(e) => setFilterResult(e.target.value as any)}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white px-3 py-2 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="All">All Results</option>
                <option value="Accepted">Accepted Only</option>
                <option value="Rejected">Rejected Only</option>
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-700/30 bg-slate-900/20">
            {loading ? (
              <div className="py-20 flex justify-center">
                <LoadingSpinner label="Loading history data..." />
              </div>
            ) : filteredData.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                <Apple size={32} className="mb-3 opacity-20" />
                <p>No records found matching your criteria.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/30 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">ID / Time</th>
                    <th className="px-4 py-3">Fruit</th>
                    <th className="px-4 py-3">Color</th>
                    <th className="px-4 py-3">Weight</th>
                    <th className="px-4 py-3">Grade</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {currentData.map((item: HistoryEntry) => {
                    const date = new Date(item.timestamp);
                    const timeString = date.toLocaleTimeString('en-US', { hour12: false });
                    const dateString = date.toLocaleDateString('en-US');
                    const rCfg = RESULT_CONFIG[item.result];
                    const colorHex = FRUIT_COLORS[item.color] || FRUIT_COLORS.Unknown;

                    return (
                      <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-4 py-3">
                          <div className="w-10 h-10 rounded-md bg-slate-800 flex items-center justify-center border border-slate-700/50 overflow-hidden">
                            {item.imageUrl ? (
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={16} className="text-slate-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-mono text-xs text-slate-300 mb-0.5">#{item.id.slice(-6)}</div>
                          <div className="text-[11px] text-slate-500">{dateString} {timeString}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-200">{item.name}</div>
                          <div className="text-xs text-slate-400 font-mono">{item.confidence.toFixed(1)}% conf</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block shadow-sm"
                              style={{ background: colorHex }}
                            />
                            <span className="text-sm text-slate-300">{item.color}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm text-slate-300">{item.weight}g</span>
                        </td>
                        <td className="px-4 py-3">
                           <span className="text-sm text-slate-300">{item.grade}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`badge ${rCfg.bgClass}`}>
                            {item.result}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!loading && filteredData.length > 0 && (
            <div className="flex items-center justify-between mt-6 px-2">
              <div className="text-sm text-slate-400">
                Showing <span className="font-medium text-slate-200">{(currentPage - 1) * PAGE_SIZE + 1}</span> to <span className="font-medium text-slate-200">{Math.min(currentPage * PAGE_SIZE, filteredData.length)}</span> of <span className="font-medium text-slate-200">{filteredData.length}</span> results
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-slate-300 font-medium px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

        </GlassCard>
      </div>
    </div>
  );
};

export default History;
