import React, { useState } from 'react';
import { useAdminApi } from '../hooks/useAdminApi';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Save, Eye, EyeOff, Shield, ExternalLink } from 'lucide-react';

export default function AdminSettings() {
  const { admin }         = useAdminAuth();
  const { request }       = useAdminApi();
  const [current, setCurrent] = useState('');
  const [newPw, setNewPw]     = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow]       = useState(false);
  const [msg, setMsg]         = useState('');
  const [err, setErr]         = useState('');

  const changePassword = async e => {
    e.preventDefault();
    setMsg(''); setErr('');
    if (newPw !== confirm) { setErr('Passwords do not match'); return; }
    if (newPw.length < 8)  { setErr('Minimum 8 characters required'); return; }
    try {
      await request('/auth/password', { method:'PUT', body:JSON.stringify({ currentPassword:current, newPassword:newPw }) });
      setMsg('Password updated successfully!');
      setCurrent(''); setNewPw(''); setConfirm('');
    } catch(er) { setErr(er.message); }
  };

  const row = (label, value) => (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.05)',fontSize:13}}>
      <span style={{color:'#64748b'}}>{label}</span>
      <strong style={{color:'#e2e8f0'}}>{value}</strong>
    </div>
  );

  return (
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div className="ap-header">
        <div><h1>Settings</h1><p>Manage your admin account.</p></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
        {/* Account Info */}
        <div className="ap-card">
          <h3><Shield size={13} style={{display:'inline',marginRight:6}}/>Account Information</h3>
          {row('Name', admin?.name||'Admin')}
          {row('Email', admin?.email||'—')}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',fontSize:13}}>
            <span style={{color:'#64748b'}}>Role</span>
            <span className="ap-badge ap-badge-approved">Administrator</span>
          </div>
        </div>

        {/* Change Password */}
        <div className="ap-card">
          <h3>Change Password</h3>
          {msg && <div className="ap-success" style={{marginBottom:12}}>{msg}</div>}
          {err && <div className="ap-error"  style={{marginBottom:12}}>{err}</div>}
          <form onSubmit={changePassword} style={{display:'flex',flexDirection:'column',gap:12}}>
            <div className="ap-fg">
              <label>Current Password</label>
              <div style={{position:'relative'}}>
                <input type={show?'text':'password'} value={current} className="ap-input"
                  onChange={e=>setCurrent(e.target.value)} required placeholder="Current password"
                  style={{paddingRight:40}}/>
                <button type="button" onClick={()=>setShow(s=>!s)}
                  style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'#64748b',cursor:'pointer',display:'flex'}}>
                  {show?<EyeOff size={15}/>:<Eye size={15}/>}
                </button>
              </div>
            </div>
            <div className="ap-fg">
              <label>New Password</label>
              <input type={show?'text':'password'} value={newPw} className="ap-input"
                onChange={e=>setNewPw(e.target.value)} required placeholder="Min 8 characters"/>
            </div>
            <div className="ap-fg">
              <label>Confirm New Password</label>
              <input type={show?'text':'password'} value={confirm} className="ap-input"
                onChange={e=>setConfirm(e.target.value)} required placeholder="Repeat new password"/>
            </div>
            <button type="submit" className="ap-btn ap-btn-primary"><Save size={14}/> Update Password</button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="ap-card">
          <h3>Quick Links</h3>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {[
              { label:'View Main Website', url:'/', desc:'Open the public-facing site' },
              { label:'Quote Requests', url:'/admin/quotes', desc:'View all quote enquiries' },
              { label:'Pending Reviews', url:'/admin/reviews', desc:'Approve customer reviews' },
            ].map((l,i)=>(
              <a key={i} href={l.url} target={l.url.startsWith('/')?'_self':'_blank'} rel="noopener noreferrer"
                style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:12,background:'#22263a',border:'1px solid rgba(255,255,255,0.07)',borderRadius:8,color:'#e2e8f0',transition:'.2s'}}>
                <div>
                  <strong style={{display:'block',fontSize:13}}>{l.label}</strong>
                  <span style={{fontSize:12,color:'#64748b'}}>{l.desc}</span>
                </div>
                <ExternalLink size={14} style={{color:'#c9a84c',flexShrink:0}}/>
              </a>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div className="ap-card">
          <h3>System Information</h3>
          {row('Version',  'MBPSS v2.0')}
          {row('Database', 'MongoDB')}
          {row('Backend',  'Node.js / Express')}
          {row('Domain',   'www.mbpss.co.uk')}
          {row('Admin URL','www.mbpss.co.uk/admin')}
        </div>
      </div>
    </div>
  );
}
