import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminApi } from '../hooks/useAdminApi';
import { RefreshCw, ArrowRight, FileText, Mail, Star, Briefcase, TrendingUp, Clock } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#c9a84c','#3b82f6','#22c55e','#f97316','#a855f7','#06b6d4','#ef4444','#84cc16'];

function StatCard({ icon: Icon, label, value, sub, color, link }) {
  const inner = (
    <div className="ap-stat-card" style={{ borderTopColor: color }}>
      <div className="ap-stat-icon" style={{ background:`${color}20`, color }}><Icon size={20}/></div>
      <div>
        <div className="ap-stat-value">{value ?? '—'}</div>
        <div className="ap-stat-label">{label}</div>
        {sub && <div className="ap-stat-sub">{sub}</div>}
      </div>
    </div>
  );
  return link ? <Link to={link} style={{textDecoration:'none'}}>{inner}</Link> : inner;
}

export default function AdminDashboard() {
  const { request } = useAdminApi();
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setData(await request('/dashboard')); }
    catch {}
    finally { setLoading(false); }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  if (loading) return <div className="ap-loading"><RefreshCw size={28} style={{animation:'spin 1s linear infinite'}}/> Loading…</div>;
  if (!data) return <div className="ap-empty">Failed to load. <button className="ap-btn ap-btn-ghost" onClick={load}>Retry</button></div>;

  const { stats, charts, recent } = data;

  const fillDays = (arr) => {
    const map = {};
    (arr||[]).forEach(d => { map[d._id] = d.count; });
    return Array.from({length:14},(_,i)=>{
      const d = new Date(Date.now()-((13-i)*86400000));
      const k = d.toISOString().split('T')[0];
      return { date: k.slice(5), count: map[k]||0 };
    });
  };

  const tip = { contentStyle:{background:'#1a1d27',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,color:'#e2e8f0'} };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:24}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}.ap-stat-card{background:#1a1d27;border:1px solid rgba(255,255,255,0.07);border-top:3px solid;border-radius:12px;padding:18px;display:flex;gap:14px;align-items:flex-start;transition:.2s}.ap-stat-card:hover{background:#22263a}.ap-stat-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.ap-stat-value{font-size:24px;font-weight:700;color:#e2e8f0;line-height:1.2}.ap-stat-label{font-size:12px;color:#64748b;margin-top:2px}.ap-stat-sub{font-size:11px;color:#c9a84c;margin-top:3px}.ap-dash-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.ap-charts-row{display:grid;grid-template-columns:1.5fr 1fr;gap:16px}.ap-recent-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}@media(max-width:900px){.ap-dash-stats{grid-template-columns:1fr 1fr}.ap-charts-row,.ap-recent-row{grid-template-columns:1fr}}`}</style>

      <div className="ap-header">
        <div><h1>Dashboard</h1><p>Business overview for MBPSS Property Solutions.</p></div>
        <button className="ap-btn ap-btn-ghost" onClick={load}><RefreshCw size={14}/> Refresh</button>
      </div>

      <div className="ap-dash-stats">
        <StatCard icon={FileText}   label="Total Quotes"   value={stats.totalQuotes}   sub={`${stats.newQuotes} new`}         color="#c9a84c" link="/admin/quotes"/>
        <StatCard icon={Mail}       label="Messages"       value={stats.totalContacts} sub={`${stats.newContacts} unread`}    color="#3b82f6" link="/admin/messages"/>
        <StatCard icon={Star}       label="Reviews"        value={stats.totalReviews}  sub={`${stats.pendingReviews} pending`} color="#f97316" link="/admin/reviews"/>
        <StatCard icon={TrendingUp} label="Avg Rating"     value={stats.avgRating>0?`${stats.avgRating}★`:'N/A'} sub={`${stats.approvedReviews} approved`} color="#22c55e" link="/admin/reviews"/>
        <StatCard icon={Briefcase}  label="Services"       value={stats.totalServices} sub={`${stats.activeServices} active`} color="#a855f7" link="/admin/services"/>
        <StatCard icon={Clock}      label="This Week"      value={stats.weekQuotes}    sub="new quote requests"               color="#06b6d4"/>
      </div>

      <div className="ap-charts-row">
        <div className="ap-card">
          <h3>Quote Enquiries — Last 14 Days</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={fillDays(charts.quotesTrend)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
              <XAxis dataKey="date" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false} allowDecimals={false}/>
              <Tooltip {...tip}/>
              <Line type="monotone" dataKey="count" stroke="#c9a84c" strokeWidth={2} dot={false} name="Quotes"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="ap-card">
          <h3>Top Services</h3>
          {!charts.topServices?.length ? <div className="ap-empty">No data yet</div> : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={charts.topServices.slice(0,6)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                <XAxis type="number" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis type="category" dataKey="_id" width={130} tick={{fill:'#64748b',fontSize:10}} axisLine={false} tickLine={false}/>
                <Tooltip {...tip}/>
                <Bar dataKey="count" radius={[0,4,4,0]} name="Requests">
                  {charts.topServices.slice(0,6).map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="ap-recent-row">
        <div className="ap-card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
            <h3 style={{marginBottom:0}}>Recent Quotes</h3>
            <Link to="/admin/quotes" className="ap-btn ap-btn-ghost ap-btn-sm">All <ArrowRight size={12}/></Link>
          </div>
          {!recent.quotes?.length ? <p className="ap-empty">No quotes yet</p> : (
            <table className="ap-table">
              <thead><tr><th>Name</th><th>Services</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>{recent.quotes.map(q=>(
                <tr key={q._id}>
                  <td><Link to={`/admin/quotes/${q._id}`}>{q.name}</Link></td>
                  <td style={{maxWidth:160,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontSize:12,color:'#94a3b8'}}>{(q.selectedServices||[]).slice(0,2).join(', ')}</td>
                  <td><span className={`ap-badge ap-badge-${q.status}`}>{q.status}</span></td>
                  <td style={{fontSize:12,color:'#64748b'}}>{new Date(q.createdAt).toLocaleDateString('en-GB')}</td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
        <div className="ap-card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
            <h3 style={{marginBottom:0}}>Recent Messages</h3>
            <Link to="/admin/messages" className="ap-btn ap-btn-ghost ap-btn-sm">All <ArrowRight size={12}/></Link>
          </div>
          {!recent.contacts?.length ? <p className="ap-empty">No messages yet</p> : (
            <table className="ap-table">
              <thead><tr><th>Name</th><th>Service</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>{recent.contacts.map(c=>(
                <tr key={c._id}>
                  <td><Link to={`/admin/messages/${c._id}`}>{c.name}</Link></td>
                  <td style={{fontSize:12,color:'#94a3b8'}}>{c.service||'—'}</td>
                  <td><span className={`ap-badge ap-badge-${c.status}`}>{c.status}</span></td>
                  <td style={{fontSize:12,color:'#64748b'}}>{new Date(c.createdAt).toLocaleDateString('en-GB')}</td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
