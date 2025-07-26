"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  TrendingUp,
  Users,
  MessageCircle,
  Package,
  Star,
  Search,
  Filter,
  Plus,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { VendorLayout } from "@/components/vendor-layout"
import { RasoiBot } from "@/components/rasoi-bot"

export default function VendorDashboard() {
  const [user, setUser] = useState<any>(null)
  const [activeOrders, setActiveOrders] = useState(3)
  const [totalSpent, setTotalSpent] = useState(15420)
  const [savedAmount, setSavedAmount] = useState(2340)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const recentOrders = [
    {
      id: "ORD001",
      supplier: "Sharma Suppliers",
      items: "Onions, Tomatoes, Potatoes",
      amount: 1250,
      status: "delivered",
      date: "2024-01-15",
    },
    {
      id: "ORD002",
      supplier: "Fresh Mart",
      items: "Oil, Spices, Flour",
      amount: 890,
      status: "in-transit",
      date: "2024-01-14",
    },
    {
      id: "ORD003",
      supplier: "Veggie Direct",
      items: "Green Chilies, Coriander",
      amount: 340,
      status: "processing",
      date: "2024-01-13",
    },
  ]

  const topSuppliers = [
    { name: "Sharma Suppliers", rating: 4.8, orders: 12, savings: "₹1,200" },
    { name: "Fresh Mart", rating: 4.6, orders: 8, savings: "₹890" },
    { name: "Veggie Direct", rating: 4.5, orders: 6, savings: "₹450" },
  ]

  const mostOrderedItems = [
    { name: "Onions", quantity: "50 kg", frequency: "Weekly" },
    { name: "Tomatoes", quantity: "30 kg", frequency: "Bi-weekly" },
    { name: "Cooking Oil", quantity: "10 L", frequency: "Monthly" },
    { name: "Potatoes", quantity: "25 kg", frequency: "Weekly" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-transit":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-orange-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-orange-100 mt-1">
                {user.businessName} • {user.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-orange-100">Today's Date</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString("en-IN")}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-blue-600">{activeOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalSpent.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Money Saved</p>
                  <p className="text-2xl font-bold text-orange-600">₹{savedAmount.toLocaleString()}</p>
                </div>
                <Star className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Support Cases</p>
                  <p className="text-2xl font-bold text-purple-600">2</p>
                </div>
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/vendor/suppliers">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                  <Search className="h-6 w-6" />
                  <span className="text-sm">Find Suppliers</span>
                </Button>
              </Link>

              <Link href="/vendor/compare">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                  <Filter className="h-6 w-6" />
                  <span className="text-sm">Compare Prices</span>
                </Button>
              </Link>

              <Link href="/vendor/group-orders">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Group Orders</span>
                </Button>
              </Link>

              <Link href="/vendor/support">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-sm">Get Support</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest order activity</CardDescription>
              </div>
              <Link href="/vendor/orders">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.supplier}</p>
                        <p className="text-xs text-gray-500">{order.items}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{order.amount}</p>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>{order.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Suppliers */}
          <Card>
            <CardHeader>
              <CardTitle>Your Top Suppliers</CardTitle>
              <CardDescription>Based on your order history and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSuppliers.map((supplier, index) => (
                  <div key={supplier.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm ml-1">{supplier.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{supplier.orders} orders</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600 font-medium">Saved {supplier.savings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Most Ordered Items */}
        <Card>
          <CardHeader>
            <CardTitle>Most Ordered Items</CardTitle>
            <CardDescription>Your frequently purchased raw materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mostOrderedItems.map((item) => (
                <div key={item.name} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <Package className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">Avg: {item.quantity}</p>
                  <p className="text-xs text-gray-500">{item.frequency}</p>
                  <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                    <Plus className="h-4 w-4 mr-1" />
                    Quick Order
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Chatbot */}
      <RasoiBot />
    </VendorLayout>
  )
}
