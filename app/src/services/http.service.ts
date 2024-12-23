import env from "@/env"

export class HttpClient<T= Record<string, never>> {
  private baseUrl: string = env.NEXT_PUBLIC.API_URL
  private token = ''

  constructor(baseUrl: string | null = null) {
    if (baseUrl) this.baseUrl = baseUrl
    this.token = localStorage.getItem('token') ?? ''
  }

  private async handleResponse(response: Response, path: string) {
    if (response.status === 401 && !path.includes('/api/login')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.token = ''
      const currentPath = window.location.pathname.toLowerCase()
      if (!currentPath.includes('/signup') && !currentPath.includes('/signin')) {
        window.location.href = '/signin'
      }
    }
   
    if (response.headers.get('content-length') === '0') return null
    
    return await response.json()
  }

  async get<T>(path: string, queries: Record<string, string | number> | null = null) {
    const response = await fetch(`${this.baseUrl}${path}${queries ? this.toQueryString(queries) : ''}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
    return await this.handleResponse(response, path) as T
  }

  async post<D = Record<string, never>, R=T>(path: string, data: D, queries: Record<string, string | number> | null = null) {
    const response = await fetch(`${this.baseUrl}${path}${queries ? this.toQueryString(queries) : ''}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(data),
    })
    return await this.handleResponse(response, path) as R
  }

  async put<D = Record<string, never>, R=T>(path: string, data: D, queries: Record<string, string | number> | null = null) {
    const response = await fetch(`${this.baseUrl}${path}${queries ? this.toQueryString(queries) : ''}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(data),
    })
    return await this.handleResponse(response, path) as R
  }

  async patch<D = Record<string, never>, R=T>(path: string, data: Partial<D>, queries: Record<string, string | number> | null = null) {
    const response = await fetch(`${this.baseUrl}${path}${queries ? this.toQueryString(queries) : ''}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(data),
    })
    return await this.handleResponse(response, path) as R
  }

  async delete(path: string, queries: Record<string, string | number> | null = null) {
    const response = await fetch(`${this.baseUrl}${path}${queries ? this.toQueryString(queries) : ''}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    })
    return await this.handleResponse(response, path)
  }

  private toQueryString(params: Record<string, string | number>): string {
    return (
      "?" +
      Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&")
    );
  }
}