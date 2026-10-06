import { supabase } from './supabase'

const API_URL = 'http://127.0.0.1:8000/api'

export async function apiFetch(endpoint, options = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.access_token) {
    throw new Error('You are not authenticated.')
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
      ...(options.headers || {}),
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'API request failed.')
  }

  return data
}