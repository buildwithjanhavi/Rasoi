"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Star,
  Plus,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { SupplierLayout } from "@/components/supplier-layout"

export default function SupplierDashboard() {
  const [user, setUser] = useState<any>(null)
  const [totalOrders, setTotalOrders] = useState(45)
  const [monthlyRevenue, setMonthlyRevenue] = useState(125000)
  const [activeProducts, setActiveProducts] = useState(28)
  const [avgRating, setAvgRating] = useState(4.7)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const recentOrders = [
    {
      id: "ORD001",
      vendor: "Raj's Chaat Corner",
      vendorPhone: "+91 98765 43210",
      items: "Onions (25kg), Tomatoes (15kg)",
      amount: 1450,
      status: "pending",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-16",
    },
    {
      id: "ORD002",
      vendor: "Singh's Snacks",
      vendorPhone: "+91 87654 32109",
      items: "Cooking Oil (10L), Spices (5kg)",
      amount: 1800,
      status: "confirmed",
      orderDate: "2024-01-14",
      deliveryDate: "2024-01-15",
    },
    {
      id: "ORD003",
      vendor: "Sharma Food Stall",
      vendorPhone: "+91 76543 21098",
      items: "Potatoes (30kg), Green Chilies (2kg)",
      amount: 760,
      status: "delivered",
      orderDate: "2024-01-13",
      deliveryDate: "2024-01-14",
    },
  ]

  const topProducts = [
    { name: "Onions", sold: "450 kg", revenue: "₹11,250", trend: "up" },
    { name: "Tomatoes", sold: "320 kg", revenue: "₹11,200", trend: "up" },
    { name: "Cooking Oil", sold: "180 L", revenue: "₹21,600", trend: "down" },
    { name: "Potatoes", sold: "280 kg", revenue: "₹5,600", trend: "stable" },
  ]

  const lowStockItems = [
    { name: "Green Chilies", current: 15, minimum: 50, unit: "kg" },
    { name: "Ginger", current: 8, minimum: 25, unit: "kg" },
    { name: "Coriander", current: 12, minimum: 30, unit: "kg" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "confirmed":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-orange-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <SupplierLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-blue-100 mt-1">
                {user.businessName} • {user.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Today's Date</p>
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
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-green-600">₹{monthlyRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold text-orange-600">{activeProducts}</p>
                </div>
                <Package className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-purple-600">{avgRating}</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your business efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/supplier/products">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                  <Package className="h-6 w-6" />
                  <span className="text-sm">Manage Products</span>
                </Button>
              </Link>

              <Link href="/supplier/orders">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="text-sm">View Orders</span>
                </Button>
              </Link>

              <Link href="/supplier/analytics">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-sm">Analytics</span>
                </Button>
              </Link>

              <Link href="/supplier/customers">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 bg-transparent">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Customers</span>
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
                <CardDescription>Latest orders from vendors</CardDescription>
              </div>
              <Link href="/supplier/orders">
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
                        <p className="text-sm text-gray-600">{order.vendor}</p>
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

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Your best performing items this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">Sold: {product.sold}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-2">
                      <div>
                        <p className="font-semibold">{product.revenue}</p>
                      </div>
                      {getTrendIcon(product.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-800">Low Stock Alert</CardTitle>
            </div>
            <CardDescription className="text-orange-700">
              These items are running low and need restocking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lowStockItems.map((item) => (
                <div key={item.name} className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      Low Stock
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Stock</span>
                      <span className="font-medium">
                        {item.current} {item.unit}
                      </span>
                    </div>
                    <Progress value={(item.current / item.minimum) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        Minimum: {item.minimum} {item.unit}
                      </span>
                      <span>{Math.round((item.current / item.minimum) * 100)}%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-orange-600 hover:bg-orange-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Orders</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="font-semibold">₹28,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">New Customers</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Orders</span>
                  <span className="font-semibold">{totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="font-semibold">₹{monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Growth</span>
                  <span className="font-semibold text-green-600">+15%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{avgRating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Reviews</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Repeat Customers</span>
                  <span className="font-semibold">78%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SupplierLayout>
  )
}
