// Inquiries & Leads Management Service

const STORAGE_KEY = 'rankshelter_inquiries';

const defaultInquiries = [
  {
    id: 'inq-101',
    name: 'Sarah Mitchell',
    email: 'sarah@cloudscale-saas.com',
    website: 'cloudscale-saas.com',
    service: 'AI & Generative Engine Optimization (GEO)',
    message: 'Looking to optimize our B2B SaaS platform for ChatGPT Search and Google AI Overviews. Current organic ARR is $1.2M, looking to 3x this year.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'inq-102',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@finpulse.io',
    website: 'finpulse.io',
    service: 'Authority Link Building Engine',
    message: 'We need 15+ high-DR fintech editorial backlinks per month. Please share your tier-1 publication outreach process and pricing.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  }
];

export function getInquiries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInquiries));
      return defaultInquiries;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultInquiries;
  } catch (err) {
    console.error('Failed to load inquiries:', err);
    return defaultInquiries;
  }
}

export function saveInquiry(data) {
  try {
    const list = getInquiries();
    const newInquiry = {
      id: 'inq-' + Date.now(),
      name: data.name || 'Anonymous Client',
      email: data.email || 'N/A',
      website: data.website || '',
      service: data.service || 'General Growth Consultation',
      message: data.message || '',
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    const updated = [newInquiry, ...list];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newInquiry;
  } catch (err) {
    console.error('Failed to save inquiry:', err);
    return null;
  }
}

export function updateInquiryStatus(id, newStatus) {
  try {
    const list = getInquiries();
    const updated = list.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to update inquiry status:', err);
    return null;
  }
}

export function deleteInquiry(id) {
  try {
    const list = getInquiries();
    const updated = list.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete inquiry:', err);
    return null;
  }
}

