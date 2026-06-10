import React, { useEffect, useState } from 'react';
import { useAdminApi } from '../hooks/useAdminApi';
import { Check, Trash2, RefreshCw, Star, BarChart2 } from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid
} from 'recharts';

const SENT_COLORS = { positive:'#22c55e', neutral:'#94a3b8', negative:'#ef4444' };
const STAR_COLORS = ['#ef4444','#f97316','#eab308','#3b82f6','#22c55e'];
const TIP = { contentStyle:{background:'#1a1d27',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,color:'#e2e8f0'} };

export default function AdminReviews() {
  const { request, loading } = useAdminApi();
  const [reviews, setReviews]     = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [tab, setTab]             = useState('pending');
  const [view, setView]           = useState('list');

  const load = async () => {
    const approved = tab==='approved'?'true': tab==='pending'?'false': undefined;
    const p = new URLSearchParams({ limit:50 });
    if (approved !== undefined) p.set('approved', approved);
    const [r, a] = await Promise.all([
      request(`/reviews?${p}`).catch(()=>({ reviews:[] })),
      request('/reviews/analytics').catch(()=>null),
    ]);
    setReviews(r.reviews||[]);
    setAnalytics(a);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [tab]);

  const approve = async id => { await request(`/reviews/${id}/approve`,{method:'PUT'}); load(); };
  const del     = async id => { if(!window.confirm('Delete review?'))return; await request(`/reviews/${id}`,{method:'DELETE'}); load(); };

  const sentData  = analytics?.sentimentBreakdown?.map(d=>({ name:d._id, value:d.count, fill:SENT_COLORS[d._id]||'#94a3b8' }))||[];
  const ratingData = analytics?.ratingDist?.map(d=>({ name:`${d._id}★`, count:d.count, fill:STAR_COLORS[d._id-1] }))||[];

  return (
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div className="ap-header">
        <div><h1>Reviews</h1><p>Approve, manage and analyse customer reviews.</p></div>
        <div style={{display:'flex',gap:8}}>
          <button className={`ap-btn ${view==='list'?'ap-btn-primary':'ap-btn-ghost'}`} onClick={()=>setView('list')}>Reviews</button>
          <button className={`ap-btn ${view==='analytics'?'ap-btn-primary':'ap-btn-ghost'}`} onClick={()=>setView('analytics')}><BarChart2 size={14}/> Analytics</button>
          <button className="ap-btn ap-btn-ghost" onClick={load}><RefreshCw size={14}/></button>
        </div>
      </div>

      {/* ── ANALYTICS VIEW ── */}
      {view==='analytics' && analytics && (
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {/* KPIs */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
            {[
              { label:'Total Approved', val:analytics.total,      color:'#c9a84c' },
              { label:'Avg Rating',     val:analytics.avgRating>0?`${analytics.avgRating}★`:'N/A', color:'#22c55e' },
              { label:'Pending',        val:analytics.pending,     color:'#f97316' },
              { label:'Positive',       val:analytics.sentimentBreakdown?.find(s=>s._id==='positive')?.count||0, color:'#22c55e' },
            ].map((k,i)=>(
              <div key={i} className="ap-card" style={{textAlign:'center'}}>
                <div style={{fontSize:28,fontWeight:700,color:k.color}}>{k.val}</div>
                <div style={{fontSize:12,color:'#64748b',marginTop:4}}>{k.label}</div>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div className="ap-card">
              <h3>Sentiment Breakdown</h3>
              {!sentData.length ? <div className="ap-empty">No data yet</div> : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={sentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75}
                      label={({name,value})=>`${name}: ${value}`} labelLine={false}>
                      {sentData.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                    </Pie>
                    <Tooltip {...TIP}/>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="ap-card">
              <h3>Rating Distribution</h3>
              {!ratingData.length ? <div className="ap-empty">No data yet</div> : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={ratingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                    <XAxis dataKey="name" tick={{fill:'#64748b',fontSize:12}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false} allowDecimals={false}/>
                    <Tooltip {...TIP}/>
                    <Bar dataKey="count" radius={[4,4,0,0]}>
                      {ratingData.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            {analytics.recentTrend?.length>0 && (
              <div className="ap-card" style={{gridColumn:'1/-1'}}>
                <h3>Monthly Review Trend</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={analytics.recentTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                    <XAxis dataKey="_id" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false}/>
                    <YAxis tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false} allowDecimals={false}/>
                    <Tooltip {...TIP}/>
                    <Line type="monotone" dataKey="count" stroke="#c9a84c" strokeWidth={2} dot={false} name="Reviews"/>
                    <Line type="monotone" dataKey="avgRating" stroke="#3b82f6" strokeWidth={2} dot={false} name="Avg Rating"/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view==='list' && (
        <>
          <div className="ap-filters">
            {['pending','approved','all'].map(t=>(
              <button key={t} className={`ap-filter-btn ${tab===t?'active':''}`} onClick={()=>setTab(t)}>
                {t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {loading ? <div className="ap-loading">Loading…</div>
            : reviews.length===0 ? <div className="ap-empty">No reviews in this category.</div>
            : reviews.map(r=>(
              <div key={r._id} className="ap-card" style={{display:'flex',flexDirection:'column',gap:12}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:10}}>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <div style={{width:38,height:38,borderRadius:'50%',background:'#c9a84c',color:'#0f1117',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      {r.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong style={{color:'#e2e8f0',display:'block'}}>{r.name}</strong>
                      <span style={{fontSize:12,color:'#64748b'}}>{r.role||'Verified Customer'}</span>
                    </div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                    <div style={{display:'flex',gap:2}}>
                      {[...Array(5)].map((_,i)=><Star key={i} size={14} fill={i<r.rating?'#c9a84c':'none'} color="#c9a84c"/>)}
                    </div>
                    <span className={`ap-badge ap-badge-${r.sentiment}`}>{r.sentiment}</span>
                    <span style={{fontSize:11,color:'#64748b'}}>Score: {r.sentimentScore}</span>
                  </div>
                </div>
                <p style={{fontSize:14,color:'#94a3b8',lineHeight:1.7,fontStyle:'italic'}}>"{r.text}"</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                  <span style={{fontSize:12,color:'#64748b'}}>{new Date(r.createdAt).toLocaleDateString('en-GB')}</span>
                  <div style={{display:'flex',gap:8}}>
                    {!r.approved && (
                      <button className="ap-btn ap-btn-green ap-btn-sm" onClick={()=>approve(r._id)}>
                        <Check size={12}/> Approve & Publish
                      </button>
                    )}
                    {r.approved && <span className="ap-badge ap-badge-approved">Published</span>}
                    <button className="ap-btn ap-btn-danger ap-btn-sm" onClick={()=>del(r._id)}>
                      <Trash2 size={12}/> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
