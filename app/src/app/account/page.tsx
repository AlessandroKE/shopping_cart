'use client'
import Link from 'next/link'
import { UserCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/protectedRoute'
import { AuthService } from '@/services/auth.service'



export default function AccountPage() {

    const [user, setUser] = useState<{name: string, email: string} | null>(null)
    useEffect(()=>{
        const u = localStorage.getItem('user')
        if(u)
          setUser(JSON.parse(u))  
    }, [])
  return (
    <ProtectedRoute>
         <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <UserCircle className="h-12 w-12 text-gray-400" />
            <div>
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Account Information</h3>
              <p className="text-sm text-gray-500">Manage your account details and preferences.</p>
            </div>
            <Link href="/orders" className="block">
              <Button variant="outline" className="w-full justify-start">
                View Orders
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter>
            <Button type="submit" variant="destructive" className="w-full" onClick={()=>{
                new AuthService().signout().finally(()=>window.location.href='/')
            }} >
              Sign Out
            </Button>
        </CardFooter>
      </Card>
    </div>
    </ProtectedRoute>
   
  )
}

