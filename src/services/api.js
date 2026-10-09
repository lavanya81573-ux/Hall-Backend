const API_BASE_URL = 'http://localhost:8080/api';

// Generic Fetch Wrapper with Error Handling
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[Spring Boot Backend] Offline or Error on ${endpoint}:`, error.message);
    throw error;
  }
}

// Authentication API
export const authApi = {
  login: (email, password) => apiRequest('/auth/login', 'POST', { email, password }),
  register: (name, email, password, phone, role) => apiRequest('/auth/register', 'POST', { name, email, password, phone, role })
};

// Halls API
export const hallsApi = {
  getAll: (category) => apiRequest(`/halls${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getById: (id) => apiRequest(`/halls/${id}`),
  create: (hallData) => apiRequest('/halls', 'POST', hallData),
  update: (id, hallData) => apiRequest(`/halls/${id}`, 'PUT', hallData),
  delete: (id) => apiRequest(`/halls/${id}`, 'DELETE')
};

// Bookings API
export const bookingsApi = {
  getAll: (userEmail) => apiRequest(`/bookings${userEmail ? `?userEmail=${encodeURIComponent(userEmail)}` : ''}`),
  getById: (id) => apiRequest(`/bookings/${id}`),
  create: (bookingData) => apiRequest('/bookings', 'POST', bookingData),
  updateStatus: (id, status) => apiRequest(`/bookings/${id}/status`, 'PUT', { status })
};

// Payments API
export const paymentsApi = {
  process: (paymentData) => apiRequest('/payments/process', 'POST', paymentData)
};
