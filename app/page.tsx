"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Store, Users, TrendingUp, Truck } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [loginData, setLoginData] = useState({ phone: "", password: "", role: "vendor" })
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    password: "",
    role: "vendor",
    businessName: "",
    location: "",
  })
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - in real app, validate credentials
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: loginData.role === "vendor" ? "Raj Kumar" : "Sharma Suppliers",
        phone: loginData.phone,
        role: loginData.role,
        businessName: loginData.role === "vendor" ? "Raj's Chaat Corner" : "Sharma Suppliers Pvt Ltd",
        location: "Delhi",
      }),
    )

    if (loginData.role === "vendor") {
      router.push("/vendor/dashboard")
    } else {
      router.push("/supplier/dashboard")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock registration
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: registerData.name,
        phone: registerData.phone,
        role: registerData.role,
        businessName: registerData.businessName,
        location: registerData.location,
      }),
    )

    if (registerData.role === "vendor") {
      router.push("/vendor/dashboard")
    } else {
      router.push("/supplier/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <h1 className="text-2xl font-bold text-gray-900">RasoiSwaad</h1>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Street Food Connect
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Connect Street Food Vendors with
                <span className="text-orange-600"> Verified Suppliers</span>
              </h2>
              <p className="text-lg text-gray-600">
                Source quality raw materials directly from trusted suppliers. Compare prices, track orders, and grow
                your street food business with RasoiSwaad.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Store className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-sm font-medium">Verified Suppliers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium">Best Prices</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium">Group Orders</span>
              </div>
            </div>
          </div>

          {/* Login/Register Form */}
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to RasoiSwaad</CardTitle>
              <CardDescription>Login or create your account to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={loginData.phone}
                        onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>I am a</Label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="role"
                            value="vendor"
                            checked={loginData.role === "vendor"}
                            onChange={(e) => setLoginData({ ...loginData, role: e.target.value })}
                          />
                          <span>Vendor</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="role"
                            value="supplier"
                            checked={loginData.role === "supplier"}
                            onChange={(e) => setLoginData({ ...loginData, role: e.target.value })}
                          />
                          <span>Supplier</span>
                        </label>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                      Login
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-phone">Phone Number</Label>
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business">Business Name</Label>
                      <Input
                        id="business"
                        placeholder="Enter your business name"
                        value={registerData.businessName}
                        onChange={(e) => setRegisterData({ ...registerData, businessName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter your city"
                        value={registerData.location}
                        onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="Create a password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>I am a</Label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="reg-role"
                            value="vendor"
                            checked={registerData.role === "vendor"}
                            onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                          />
                          <span>Vendor</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="reg-role"
                            value="supplier"
                            checked={registerData.role === "supplier"}
                            onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                          />
                          <span>Supplier</span>
                        </label>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
