const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `Error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  products: {
    getAll: () => apiFetch<any[]>('/products'),
    getById: (id: string) => apiFetch<any>(`/products/${id}`),
    getByCategory: async (category: string) => {
      const all = await apiFetch<any[]>('/products');
      return all.filter(p => p.category_name === category);
    },
  },
  orders: {
    create: (orderData: any) => apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
    getUserOrders: (userId: string) => apiFetch<any[]>(`/orders/user/${userId}`),
  },
  users: {
    getDashboardSummary: (userId: string) => apiFetch<any>(`/users/summary/${userId}`),
    getDetailedOrders: (userId: string) => apiFetch<any[]>(`/users/${userId}/orders`),
    getSubscriptions: (userId: string) => apiFetch<any[]>(`/users/${userId}/subscriptions`),
    pauseSubscription: (userId: string, subscriptionId: string | number) =>
      apiFetch(`/users/${userId}/subscriptions/${subscriptionId}/pause`, { method: 'PUT' }),
    resumeSubscription: (userId: string, subscriptionId: string | number) =>
      apiFetch(`/users/${userId}/subscriptions/${subscriptionId}/resume`, { method: 'PUT' }),
    cancelSubscription: (userId: string, subscriptionId: string | number) =>
      apiFetch(`/users/${userId}/subscriptions/${subscriptionId}/cancel`, { method: 'PUT' }),
  },
  admin: {
    getStats: () => apiFetch<any>('/admin/stats'),
    getRecentOrders: () => apiFetch<any[]>('/admin/recent-orders'),
    getAllOrders: () => apiFetch<any[]>('/admin/orders'),
    getCustomers: () => apiFetch<any[]>('/admin/customers'),
  },
};
