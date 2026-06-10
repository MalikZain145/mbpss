import React, { useEffect, useState } from 'react';
import { useAdminApi } from '../hooks/useAdminApi';
import { Plus, Edit2, Trash2, X, Save, ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react';

const CATS  = ['residential','commercial','new-build'];
const ICONS = ['Zap','Shield','Map','FileText','Droplets','Flame','Key','AlertTriangle','Home','Building2','HardHat'];
const EMPTY = { title:'', slug:'', category:'residential', description:'', duration:'', validity:'', icon:'FileText', color:'#f59e0b', features:[], active:true, order:0 };

export default function AdminServices() {
  const { request, loading } = useAdminApi();
  const [services, setServices]   = useState([]);
  const [modal, setModal]         = useState(null);
  const [form, setForm]           = useState(EMPTY);
  const [featInput, setFeatInput] = useState('');
  const [error, setError]         = useState('');
  const [saved, setSaved]         = useState(false);

  const load = () => request('/services').then(d=>setServices(d||[])).catch(()=>{});
  useEffect(()=>{ load(); },[]);

  const openAdd  = () => { setForm({...EMPTY}); setFeatInput(''); setError(''); setModal('new'); };
  const openEdit = s  => { setForm({...s, features:[...(s.features||[])]}); setFeatInput(''); setError(''); setModal(s._id); };
  const closeModal = () => { setModal(null); setError(''); };

  const fc = e => {
    const { name, value, type, checked } = e.target;
    setForm(f=>({...f, [name]: type==='checkbox'?checked:value}));
  };

  const autoSlug = e => {
    if (modal==='new') {
      setForm(f=>({...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}));
    }
  };

  const addFeature = () => {
    if (featInput.trim()) { setForm(f=>({...f, features:[...f.features, featInput.trim()]})); setFeatInput(''); }
  };

  const removeFeature = i => setForm(f=>({...f, features:f.features.filter((_,idx)=>idx!==i)}));

  const save = async () => {
    setError('');
    try {
      if (modal==='new') await request('/services', { method:'POST', body:JSON.stringify(form) });
      else                await request(`/services/${modal}`, { method:'PUT', body:JSON.stringify(form) });
      setSaved(true); setTimeout(()=>setSaved(false),1500);
      load(); closeModal();
    } catch(err) { setError(err.message); }
  };

  const del    = async id => { if(!window.confirm('Delete service?'))return; await request(`/services/${id}`,{method:'DELETE'}); load(); };
  const toggle = async id => { await request(`/services/${id}/toggle`,{method:'PATCH'}); load(); };

  return (
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div className="ap-header">
        <div><h1>Services</h1><p>Add, edit and manage your property services.</p></div>
        <div style={{display:'flex',gap:8}}>
          <button className="ap-btn ap-btn-ghost" onClick={load}><RefreshCw size={14}/></button>
          <button className="ap-btn ap-btn-primary" onClick={openAdd}><Plus size={15}/> Add Service</button>
        </div>
      </div>

      <div className="ap-table-wrap">
        <table className="ap-table">
          <thead>
            <tr><th>Title</th><th>Category</th><th>Slug</th><th>Duration</th><th>Status</th><th>Order</th><th></th></tr>
          </thead>
          <tbody>
            {loading
              ? <tr><td colSpan={7} className="ap-loading">Loading…</td></tr>
              : services.length===0
                ? <tr><td colSpan={7} className="ap-empty">No services yet. Click "Add Service" to create your first one.</td></tr>
                : services.map(s=>(
                  <tr key={s._id}>
                    <td><strong style={{color:'#e2e8f0'}}>{s.title}</strong></td>
                    <td><span style={{background:'rgba(201,168,76,0.1)',color:'#c9a84c',padding:'3px 10px',borderRadius:50,fontSize:11,fontWeight:700,textTransform:'uppercase'}}>{s.category}</span></td>
                    <td><code style={{fontSize:11,color:'#64748b',background:'rgba(255,255,255,0.05)',padding:'2px 6px',borderRadius:4}}>{s.slug}</code></td>
                    <td style={{fontSize:12,color:'#94a3b8'}}>{s.duration||'—'}</td>
                    <td>
                      <button style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontSize:12,fontWeight:600,color:s.active?'#22c55e':'#64748b'}} onClick={()=>toggle(s._id)}>
                        {s.active ? <ToggleRight size={18} color="#22c55e"/> : <ToggleLeft size={18} color="#64748b"/>}
                        {s.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td style={{fontSize:13,color:'#94a3b8'}}>{s.order}</td>
                    <td style={{display:'flex',gap:6}}>
                      <button className="ap-btn ap-btn-ghost ap-btn-sm" onClick={()=>openEdit(s)}><Edit2 size={13}/></button>
                      <button className="ap-btn ap-btn-danger ap-btn-sm" onClick={()=>del(s._id)}><Trash2 size={13}/></button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal !== null && (
        <div className="ap-modal-overlay" onClick={e=>e.target===e.currentTarget&&closeModal()}>
          <div className="ap-modal">
            <div className="ap-modal-header">
              <h3>{modal==='new' ? 'Add New Service' : 'Edit Service'}</h3>
              <button className="ap-btn ap-btn-ghost ap-btn-sm" onClick={closeModal}><X size={16}/></button>
            </div>
            {error && <div className="ap-error" style={{margin:'0 22px 0'}}>{error}</div>}
            <div className="ap-modal-body">
              <div className="ap-form-row">
                <div className="ap-fg">
                  <label>Title *</label>
                  <input name="title" value={form.title} className="ap-input"
                    onChange={e=>{ fc(e); autoSlug(e); }} placeholder="e.g. Domestic EPC"/>
                </div>
                <div className="ap-fg">
                  <label>Slug *</label>
                  <input name="slug" value={form.slug} className="ap-input" onChange={fc} placeholder="e.g. domestic-epc"/>
                </div>
              </div>
              <div className="ap-form-row">
                <div className="ap-fg">
                  <label>Category *</label>
                  <select name="category" value={form.category} className="ap-select" onChange={fc}>
                    {CATS.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="ap-fg">
                  <label>Icon</label>
                  <select name="icon" value={form.icon} className="ap-select" onChange={fc}>
                    {ICONS.map(i=><option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div className="ap-fg">
                <label>Description *</label>
                <textarea name="description" value={form.description} className="ap-textarea" onChange={fc} rows={3} placeholder="Service description for the website…"/>
              </div>
              <div className="ap-form-row">
                <div className="ap-fg">
                  <label>Duration</label>
                  <input name="duration" value={form.duration} className="ap-input" onChange={fc} placeholder="e.g. 1-2 hours"/>
                </div>
                <div className="ap-fg">
                  <label>Validity</label>
                  <input name="validity" value={form.validity} className="ap-input" onChange={fc} placeholder="e.g. 10 years"/>
                </div>
              </div>
              <div className="ap-form-row">
                <div className="ap-fg">
                  <label>Colour</label>
                  <input type="color" name="color" value={form.color} onChange={fc} style={{height:40,background:'#22263a',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:4,cursor:'pointer'}}/>
                </div>
                <div className="ap-fg">
                  <label>Display Order</label>
                  <input type="number" name="order" value={form.order} className="ap-input" onChange={fc} min={0}/>
                </div>
              </div>
              <div className="ap-fg">
                <label>Features / What's Included</label>
                <div style={{display:'flex',gap:8}}>
                  <input value={featInput} className="ap-input" onChange={e=>setFeatInput(e.target.value)}
                    onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addFeature())}
                    placeholder="Type a feature and press Enter or Add"/>
                  <button type="button" className="ap-btn ap-btn-ghost" onClick={addFeature}>Add</button>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:8}}>
                  {form.features.map((f,i)=>(
                    <span key={i} style={{display:'flex',alignItems:'center',gap:4,background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#c9a84c',padding:'4px 10px',borderRadius:50,fontSize:12}}>
                      {f}
                      <button onClick={()=>removeFeature(i)} style={{background:'none',border:'none',cursor:'pointer',color:'#c9a84c',display:'flex',padding:0}}><X size={10}/></button>
                    </span>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <input type="checkbox" id="active" name="active" checked={form.active} onChange={fc}/>
                <label htmlFor="active" style={{fontSize:13,color:'#e2e8f0',cursor:'pointer'}}>Active (visible on website)</label>
              </div>
            </div>
            <div className="ap-modal-footer">
              <button className="ap-btn ap-btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="ap-btn ap-btn-primary" onClick={save}>
                <Save size={14}/> {modal==='new' ? 'Create Service' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
