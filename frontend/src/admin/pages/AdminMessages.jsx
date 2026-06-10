import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAdminApi } from '../hooks/useAdminApi';
import { Search, Trash2, Eye, RefreshCw, ArrowLeft, Save, ChevronLeft, ChevronRight } from 'lucide-react';

export function AdminMessagesList() {
  const { request, loading } = useAdminApi();
  const [contacts, setContacts] = useState([]);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(1);
  const [pages, setPages]       = useState(1);
  const [status, setStatus]     = useState('all');
  const [search, setSearch]     = useState('');

  const load = async () => {
    const p = new URLSearchParams({ page, limit:15 });
    if (status !== 'all') p.set('status', status);
    const d = await request(`/contacts?${p}`).catch(()=>null);
    if (d) { setContacts(d.contacts||[]); setTotal(d.total||0); setPages(d.pages||1); }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [page, status]);

  const del = async id => {
    if (!window.confirm('Delete this message?')) return;
    await request(`/contacts/${id}`, { method:'DELETE' });
    load();
  };

  const filtered = search
    ? contacts.filter(c => `${c.name} ${c.email}`.toLowerCase().includes(search.toLowerCase()))
    : contacts;

  return (
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div className="ap-header">
        <div><h1>Contact Messages</h1><p>{total} total messages received</p></div>
        <button className="ap-btn ap-btn-ghost" onClick={load}><RefreshCw size={14}/> Refresh</button>
      </div>
      <div className="ap-toolbar">
        <div className="ap-search">
          <Search size={14} style={{color:'#64748b'}}/>
          <input placeholder="Search name or email…" value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <div className="ap-filters">
          {['all','new','read','responded'].map(s=>(
            <button key={s} className={`ap-filter-btn ${status===s?'active':''}`} onClick={()=>{setStatus(s);setPage(1);}}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="ap-table-wrap">
        <table className="ap-table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Message</th><th>Status</th><th>Date</th><th></th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={8} className="ap-loading">Loading…</td></tr>
            : filtered.length===0 ? <tr><td colSpan={8} className="ap-empty">No messages found.</td></tr>
            : filtered.map(c=>(
              <tr key={c._id}>
                <td><strong style={{color:'#e2e8f0'}}>{c.name}</strong></td>
                <td style={{fontSize:12,color:'#94a3b8'}}>{c.email}</td>
                <td style={{fontSize:12,color:'#94a3b8'}}>{c.phone||'—'}</td>
                <td style={{fontSize:12,color:'#94a3b8'}}>{c.service||'—'}</td>
                <td style={{fontSize:12,color:'#94a3b8',maxWidth:180,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                  {c.message?.slice(0,60)}{c.message?.length>60?'…':''}
                </td>
                <td><span className={`ap-badge ap-badge-${c.status}`}>{c.status}</span></td>
                <td style={{fontSize:12,color:'#64748b'}}>{new Date(c.createdAt).toLocaleDateString('en-GB')}</td>
                <td style={{display:'flex',gap:6}}>
                  <Link to={`/admin/messages/${c._id}`} className="ap-btn ap-btn-ghost ap-btn-sm"><Eye size={13}/></Link>
                  <button className="ap-btn ap-btn-danger ap-btn-sm" onClick={()=>del(c._id)}><Trash2 size={13}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pages>1 && (
        <div className="ap-pagination">
          <button className="ap-btn ap-btn-ghost ap-btn-sm" disabled={page<=1} onClick={()=>setPage(p=>p-1)}><ChevronLeft size={14}/></button>
          <span>Page {page} of {pages}</span>
          <button className="ap-btn ap-btn-ghost ap-btn-sm" disabled={page>=pages} onClick={()=>setPage(p=>p+1)}><ChevronRight size={14}/></button>
        </div>
      )}
    </div>
  );
}

export function AdminMessageDetail() {
  const { id }                = useParams();
  const { request }           = useAdminApi();
  const navigate              = useNavigate();
  const [contact, setContact] = useState(null);
  const [notes, setNotes]     = useState('');
  const [status, setStatus]   = useState('new');
  const [saved, setSaved]     = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    request(`/contacts/${id}`).then(d=>{ setContact(d); setNotes(d.adminNotes||''); setStatus(d.status); }).catch(()=>{});
  }, [id]);

  const save = async () => {
    await request(`/contacts/${id}`, { method:'PUT', body:JSON.stringify({ status, adminNotes:notes }) });
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const del = async () => {
    if (!window.confirm('Delete this message?')) return;
    await request(`/contacts/${id}`, { method:'DELETE' });
    navigate('/admin/messages');
  };

  if (!contact) return <div className="ap-loading">Loading…</div>;

  return (
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
        <Link to="/admin/messages" className="ap-btn ap-btn-ghost"><ArrowLeft size={14}/> Back</Link>
        <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="ap-select" style={{width:'auto'}}>
            {['new','read','responded'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
          </select>
          <button className="ap-btn ap-btn-primary" onClick={save}><Save size={13}/> {saved?'Saved!':'Save'}</button>
          <button className="ap-btn ap-btn-danger" onClick={del}><Trash2 size={13}/> Delete</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:20}}>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="ap-card">
            <h3>Contact Details</h3>
            {[['Name',contact.name],['Email',contact.email],['Phone',contact.phone||'—'],['Service Enquiry',contact.service||'—']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.05)',fontSize:13}}>
                <span style={{color:'#64748b'}}>{k}</span>
                <span style={{color:'#e2e8f0'}}>{v}</span>
              </div>
            ))}
          </div>
          <div className="ap-card">
            <h3>Message</h3>
            <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.8,whiteSpace:'pre-wrap'}}>{contact.message}</p>
            <a href={`mailto:${contact.email}?subject=Re: Your MBPSS Enquiry`}
              className="ap-btn ap-btn-primary"
              style={{marginTop:16,display:'inline-flex'}}>
              Reply by Email
            </a>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="ap-card">
            <h3>Admin Notes</h3>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={5} className="ap-textarea" placeholder="Internal notes…"/>
          </div>
          <div className="ap-card">
            <h3>Meta</h3>
            <div style={{fontSize:13}}>
              <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <span style={{color:'#64748b'}}>Received</span>
                <span style={{color:'#e2e8f0'}}>{new Date(contact.createdAt).toLocaleString('en-GB')}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0'}}>
                <span style={{color:'#64748b'}}>Status</span>
                <span className={`ap-badge ap-badge-${contact.status}`}>{contact.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
