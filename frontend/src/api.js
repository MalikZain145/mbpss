const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function apiCall(endpoint, options = {}) {
  const res = await fetch(`${API}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || json.errors?.[0]?.msg || 'Request failed');
  return json;
}

export const submitQuoteRequest  = data => apiCall('/quotes',   { method:'POST', body:JSON.stringify(data) });
export const submitContactForm   = data => apiCall('/contacts', { method:'POST', body:JSON.stringify(data) });
export const submitReview        = data => apiCall('/reviews',  { method:'POST', body:JSON.stringify(data) });
export const getApprovedReviews  = ()   => apiCall('/reviews/approved');
export const getPublicServices   = (cat) => apiCall(`/services/public${cat ? `?category=${cat}` : ''}`);
export const getServiceBySlug    = (slug) => apiCall(`/services/public/${slug}`);
