'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/signin')
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <>{children}</> : null
}