"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
  RefreshCw,
  MapPin,
  Phone,
} from "lucide-react"
import { VendorLayout } from "@/components/vendor-layout"
import Link from "next/link"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const orders = [
    {
      id: "ORD001",
      supplier: "Sharma Suppliers",
      supplierPhone: "+91 98765 43210",
      items: [
        { name: "Onions", quantity: 25, unit: "kg", price: 25 },
        { name: "Tomatoes", quantity: 15, unit: "kg", price: 35 },
        { name: "Potatoes", quantity: 20, unit: "kg", price: 20 },
      ],
      totalAmount: 1450,
      status: "delivered",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-15",
      deliveryAddress: "Raj's Chaat Corner, CP, Delhi",
      trackingId: "TRK001",
      paymentStatus: "paid",
    },
    {
      id: "ORD002",
      supplier: "Fresh Mart",
      supplierPhone: "+91 87654 32109",
      items: [
        { name: "Cooking Oil", quantity: 5, unit: "L", price: 120 },
        { name: "Turmeric Powder", quantity: 2, unit: "kg", price: 180 },
        { name: "Red Chili Powder", quantity: 1, unit: "kg", price: 220 },
      ],
      totalAmount: 1180,
      status: "in-transit",
      orderDate: "2024-01-14",
      deliveryDate: "2024-01-16",
      deliveryAddress: "Raj's Chaat Corner, CP, Delhi",
      trackingId: "TRK002",
      paymentStatus: "paid",
    },
    {
      id: "ORD003",
      supplier: "Veggie Direct",
      supplierPhone: "+91 76543 21098",
      items: [
        { name: "Green Chilies", quantity: 2, unit: "kg", price: 80 },
        { name: "Coriander", quantity: 3, unit: "kg", price: 40 },
        { name: "Ginger", quantity: 1, unit: "kg", price: 120 },
      ],
      totalAmount: 440,
      status: "processing",
      orderDate: "2024-01-13",
      deliveryDate: "2024-01-17",
      deliveryAddress: "Raj's Chaat Corner, CP, Delhi",
      trackingId: "TRK003",
      paymentStatus: "pending",
    },
    {
      id: "ORD004",
      supplier: "Spice Kingdom",
      supplierPhone: "+91 65432 10987",
      items: [
        { name: "Cumin Seeds", quantity: 1, unit: "kg", price: 300 },
        { name: "Coriander Seeds", quantity: 1, unit: "kg", price: 250 },
      ],
      totalAmount: 550,
      status: "cancelled",
      orderDate: "2024-01-12",
      deliveryDate: null,
      deliveryAddress: "Raj's Chaat Corner, CP, Delhi",
      trackingId: "TRK004",
      paymentStatus: "refunded",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-transit":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
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
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeOrders = orders.filter((order) => ["processing", "in-transit"].includes(order.status))
  const completedOrders = orders.filter((order) => order.status === "delivered")
  const cancelledOrders = orders.filter((order) => order.status === "cancelled")

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-orange-600">{activeOrders.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedOrders.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ₹{orders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>Track and manage all your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search orders or suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.supplier}</p>
                          <p className="text-xs text-gray-500">
                            Ordered on {new Date(order.orderDate).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">₹{order.totalAmount.toLocaleString()}</p>
                        <div className="flex space-x-2 mt-1">
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          <Badge className={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium mb-2">Order Items:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-600 ml-2">
                              {item.quantity} {item.unit} × ₹{item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{order.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{order.supplierPhone}</span>
                      </div>
                      {order.deliveryDate && (
                        <div className="flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-gray-400" />
                          <span>Expected: {new Date(order.deliveryDate).toLocaleDateString("en-IN")}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span>Tracking: {order.trackingId}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {order.status === "in-transit" && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Track Order
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Invoice
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm" className="text-orange-600 bg-transparent">
                          Reorder
                        </Button>
                      )}
                      {order.status === "processing" && (
                        <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <Card key={order.id} className="border-orange-200 bg-orange-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.supplier}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{order.totalAmount.toLocaleString()}</p>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedOrders.map((order) => (
                <Card key={order.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.supplier}</p>
                          <p className="text-xs text-gray-500">
                            Delivered on {new Date(order.deliveryDate!).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{order.totalAmount.toLocaleString()}</p>
                        <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                          Reorder
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cancelled">
            <div className="space-y-4">
              {cancelledOrders.map((order) => (
                <Card key={order.id} className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.supplier}</p>
                          <p className="text-xs text-gray-500">
                            Cancelled on {new Date(order.orderDate).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-500">₹{order.totalAmount.toLocaleString()}</p>
                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* No Orders */}
        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500 mb-4">Start by placing your first order from our suppliers.</p>
              <Link href="/vendor/suppliers">
                <Button className="bg-orange-600 hover:bg-orange-700">Browse Suppliers</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </VendorLayout>
  )
}
