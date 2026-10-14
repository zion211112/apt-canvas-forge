import { ArrowUpRight, Box, Check, CircleDot, FileText, GitBranch, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { moduleInfo, moduleRecords, type WorkspaceRecord } from '@/lib/module-records';
import type { ModuleName } from '@/lib/workspace-data';
import { Topology } from './topology';

export function ModuleSurface({ module, page, selected, onSelect }: { module: ModuleName; page: string; selected: string | null; onSelect: (record: WorkspaceRecord) => void }) {
  const [filter, setFilter] = useState('');
  const info = moduleInfo[module];
  const records = moduleRecords[module][page] ?? [];
  const filtered = records.filter(r => `${r.name} ${r.type} ${r.detail}`.toLowerCase().includes(filter.toLowerCase()));
  return <div className="module-detail-surface">
    <div className="module-summary-grid"><div><span>{info.metric}</span><strong>{info.count}<small>THIS EPOCH</small></strong><p><CircleDot size={11}/>All systems operational</p></div><div><span>ENVIRONMENT</span><strong className="summary-environment">Mainnet<ArrowUpRight size={16}/></strong><p>kemet-mainnet-01</p></div><div><span>INTEGRITY</span><strong className="summary-environment text-primary"><Check size={20}/>Verified</strong><p>Last checked 2 minutes ago</p></div></div>
    {module === 'Network' && page === 'Topology' && <section className="module-topology"><div className="section-heading"><h2>Peer topology</h2><span className="healthy-label"><span className="live-dot"/>12 peers online</span></div><Topology module="Network"/></section>}
    <div className="module-record-heading"><div><h2>{page}</h2><span>{records.length.toString().padStart(2,'0')} RECORDS</span></div><label><Search size={13}/><input aria-label={`Search ${page.toLowerCase()}`} placeholder={`Search ${page.toLowerCase()}…`} value={filter} onChange={e => setFilter(e.target.value)}/></label></div>
    <div className="module-record-columns"><span>OBJECT / DESCRIPTION</span><span>STATUS</span><span>DETAIL</span></div>
    <div className="module-record-list">{filtered.map(r => <Button variant="ghost" className={`module-record ${selected === r.id ? 'selected' : ''}`} key={r.id} onClick={() => onSelect(r)}><span className="record-icon">{module === 'Builds' ? <Box/> : module === 'Network' ? <GitBranch/> : <FileText/>}</span><span className="record-name">{r.name}<small>{r.detail}</small><em>{r.id} / {r.type}</em></span><span className={`record-status ${['Draft','Queued','Syncing','In review','Running'].includes(r.status) ? 'pending' : ''}`}><span className="live-dot"/>{r.status}</span><span className="record-value">{r.value}<ArrowUpRight size={12}/></span></Button>)}{!filtered.length && <div className="records-empty">No records match “{filter}”.<Button variant="ghost" size="sm" onClick={() => setFilter('')}>Clear search</Button></div>}</div>
    <div className="module-record-foot"><span>APT://{module.toLowerCase()}/{page.toLowerCase()}</span><span>{filtered.length} OF {records.length} RECORDS</span></div>
  </div>;
}