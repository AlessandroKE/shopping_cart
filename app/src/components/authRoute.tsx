'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'
import { ReactNode } from 'react'
import { useEffect } from 'react'

interface Props {
  children: ReactNode
}

export const AuthRoute = ({ children }: Props) => {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/')
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return !isAuthenticated ? <>{children}</> : null
}