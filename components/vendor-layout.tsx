"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChefHat,
  Home,
  Store,
  BarChart3,
  ShoppingCart,
  Users,
  MessageCircle,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

interface VendorLayoutProps {
  children: React.ReactNode
}

export function VendorLayout({ children }: VendorLayoutProps) {
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const navigation = [
    { name: "Dashboard", href: "/vendor/dashboard", icon: Home },
    { name: "Suppliers", href: "/vendor/suppliers", icon: Store },
    { name: "Compare Prices", href: "/vendor/compare", icon: BarChart3 },
    { name: "My Orders", href: "/vendor/orders", icon: ShoppingCart },
    { name: "Group Orders", href: "/vendor/group-orders", icon: Users },
    { name: "Support", href: "/vendor/support", icon: MessageCircle },
    { name: "Settings", href: "/vendor/settings", icon: Settings },
  ]

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-600" />
            <span className="text-xl font-bold text-gray-900">RasoiSwaad</span>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-orange-100 text-orange-600 rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.businessName}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
                </h1>
                <p className="text-sm text-gray-500">{user.businessName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
