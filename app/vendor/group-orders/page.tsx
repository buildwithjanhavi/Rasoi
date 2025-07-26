"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Plus,
  TrendingDown,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  UserPlus,
  MessageCircle,
  CheckCircle,
} from "lucide-react"
import { VendorLayout } from "@/components/vendor-layout"

export default function GroupOrdersPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGroupOrder, setNewGroupOrder] = useState({
    title: "",
    description: "",
    product: "",
    targetQuantity: "",
    maxParticipants: "",
    deadline: "",
    location: "",
  })

  const activeGroupOrders = [
    {
      id: "GRP001",
      title: "Bulk Onion Order - Karol Bagh Area",
      description: "Looking for vendors to join bulk onion purchase for better rates",
      product: "Onions",
      organizer: "Raj Kumar",
      organizerBusiness: "Raj's Chaat Corner",
      currentParticipants: 8,
      maxParticipants: 15,
      targetQuantity: 500,
      currentQuantity: 320,
      unit: "kg",
      estimatedPrice: 22,
      regularPrice: 25,
      savings: 12,
      deadline: "2024-01-20",
      location: "Karol Bagh, Delhi",
      status: "active",
      participants: [
        { name: "Raj Kumar", business: "Raj's Chaat Corner", quantity: 50 },
        { name: "Amit Singh", business: "Singh's Snacks", quantity: 40 },
        { name: "Priya Sharma", business: "Sharma Food Stall", quantity: 35 },
        { name: "Ravi Gupta", business: "Gupta's Kitchen", quantity: 45 },
      ],
    },
    {
      id: "GRP002",
      title: "Cooking Oil Group Purchase",
      description: "Monthly cooking oil bulk order for CP area vendors",
      product: "Cooking Oil",
      organizer: "Amit Singh",
      organizerBusiness: "Singh's Snacks",
      currentParticipants: 5,
      maxParticipants: 10,
      targetQuantity: 100,
      currentQuantity: 65,
      unit: "L",
      estimatedPrice: 110,
      regularPrice: 120,
      savings: 8,
      deadline: "2024-01-18",
      location: "Connaught Place, Delhi",
      status: "active",
      participants: [
        { name: "Amit Singh", business: "Singh's Snacks", quantity: 20 },
        { name: "Neha Verma", business: "Verma's Treats", quantity: 15 },
        { name: "Suresh Kumar", business: "Kumar's Corner", quantity: 18 },
      ],
    },
  ]

  const myGroupOrders = [
    {
      id: "GRP003",
      title: "Spices Bulk Order",
      description: "Monthly spices purchase for better rates",
      product: "Mixed Spices",
      organizer: "Raj Kumar",
      organizerBusiness: "Raj's Chaat Corner",
      currentParticipants: 12,
      maxParticipants: 20,
      targetQuantity: 200,
      currentQuantity: 180,
      unit: "kg",
      estimatedPrice: 180,
      regularPrice: 200,
      savings: 10,
      deadline: "2024-01-25",
      location: "Central Delhi",
      status: "organizing",
    },
  ]

  const completedGroupOrders = [
    {
      id: "GRP004",
      title: "Potato Bulk Purchase",
      product: "Potatoes",
      finalParticipants: 18,
      finalQuantity: 800,
      unit: "kg",
      finalPrice: 18,
      regularPrice: 22,
      totalSavings: 3200,
      completedDate: "2024-01-10",
      status: "completed",
    },
  ]

  const handleCreateGroupOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle group order creation
    console.log("Creating group order:", newGroupOrder)
    setShowCreateForm(false)
    setNewGroupOrder({
      title: "",
      description: "",
      product: "",
      targetQuantity: "",
      maxParticipants: "",
      deadline: "",
      location: "",
    })
  }

  const handleJoinGroup = (groupId: string) => {
    console.log("Joining group:", groupId)
  }

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Group Orders</h1>
            <p className="text-gray-600">Join or create bulk orders to save money</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Group Order
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Groups</p>
                  <p className="text-2xl font-bold text-blue-600">{activeGroupOrders.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">My Groups</p>
                  <p className="text-2xl font-bold text-green-600">{myGroupOrders.length}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Savings</p>
                  <p className="text-2xl font-bold text-orange-600">₹8,450</p>
                </div>
                <TrendingDown className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-purple-600">{completedGroupOrders.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Group Order Form */}
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Group Order</CardTitle>
              <CardDescription>Organize a bulk purchase to get better rates</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateGroupOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Order Title</label>
                    <Input
                      placeholder="e.g., Bulk Onion Order - CP Area"
                      value={newGroupOrder.title}
                      onChange={(e) => setNewGroupOrder({ ...newGroupOrder, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Product</label>
                    <Select
                      value={newGroupOrder.product}
                      onValueChange={(value) => setNewGroupOrder({ ...newGroupOrder, product: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onions">Onions</SelectItem>
                        <SelectItem value="tomatoes">Tomatoes</SelectItem>
                        <SelectItem value="potatoes">Potatoes</SelectItem>
                        <SelectItem value="oil">Cooking Oil</SelectItem>
                        <SelectItem value="spices">Spices</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    placeholder="Describe the group order details..."
                    value={newGroupOrder.description}
                    onChange={(e) => setNewGroupOrder({ ...newGroupOrder, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Quantity</label>
                    <Input
                      type="number"
                      placeholder="e.g., 500"
                      value={newGroupOrder.targetQuantity}
                      onChange={(e) => setNewGroupOrder({ ...newGroupOrder, targetQuantity: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Participants</label>
                    <Input
                      type="number"
                      placeholder="e.g., 15"
                      value={newGroupOrder.maxParticipants}
                      onChange={(e) => setNewGroupOrder({ ...newGroupOrder, maxParticipants: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Deadline</label>
                    <Input
                      type="date"
                      value={newGroupOrder.deadline}
                      onChange={(e) => setNewGroupOrder({ ...newGroupOrder, deadline: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    placeholder="e.g., Karol Bagh, Delhi"
                    value={newGroupOrder.location}
                    onChange={(e) => setNewGroupOrder({ ...newGroupOrder, location: e.target.value })}
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                    Create Group Order
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Group Orders Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Available Groups ({activeGroupOrders.length})</TabsTrigger>
            <TabsTrigger value="my-groups">My Groups ({myGroupOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedGroupOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeGroupOrders.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.title}</CardTitle>
                        <CardDescription className="mt-1">
                          Organized by {group.organizer} • {group.organizerBusiness}
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Save {group.savings}%</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{group.description}</p>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quantity Progress</span>
                        <span>
                          {group.currentQuantity}/{group.targetQuantity} {group.unit}
                        </span>
                      </div>
                      <Progress value={(group.currentQuantity / group.targetQuantity) * 100} />

                      <div className="flex justify-between text-sm">
                        <span>Participants</span>
                        <span>
                          {group.currentParticipants}/{group.maxParticipants}
                        </span>
                      </div>
                      <Progress value={(group.currentParticipants / group.maxParticipants) * 100} />
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">
                            ₹{group.estimatedPrice}/{group.unit}
                          </p>
                          <p className="text-gray-500 line-through">₹{group.regularPrice}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Ends {new Date(group.deadline).toLocaleDateString("en-IN")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{group.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{group.currentParticipants} joined</span>
                      </div>
                    </div>

                    {/* Participants Preview */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Current Participants:</h4>
                      <div className="space-y-1">
                        {group.participants.slice(0, 3).map((participant, index) => (
                          <div key={index} className="flex justify-between text-xs bg-gray-50 p-2 rounded">
                            <span>
                              {participant.name} ({participant.business})
                            </span>
                            <span>
                              {participant.quantity} {group.unit}
                            </span>
                          </div>
                        ))}
                        {group.participants.length > 3 && (
                          <p className="text-xs text-gray-500">+{group.participants.length - 3} more participants</p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleJoinGroup(group.id)}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Join Group
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-groups">
            <div className="space-y-4">
              {myGroupOrders.map((group) => (
                <Card key={group.id} className="border-orange-200 bg-orange-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{group.title}</h3>
                        <p className="text-sm text-gray-600">You are organizing this group</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">{group.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Participants</p>
                        <p className="font-medium">
                          {group.currentParticipants}/{group.maxParticipants}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="font-medium">
                          {group.currentQuantity}/{group.targetQuantity} {group.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Estimated Price</p>
                        <p className="font-medium">
                          ₹{group.estimatedPrice}/{group.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Deadline</p>
                        <p className="font-medium">{new Date(group.deadline).toLocaleDateString("en-IN")}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        Manage Group
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Group Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedGroupOrders.map((group) => (
                <Card key={group.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{group.title}</h3>
                        <p className="text-sm text-gray-600">
                          Completed on {new Date(group.completedDate).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Final Participants</p>
                        <p className="font-medium">{group.finalParticipants}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Quantity</p>
                        <p className="font-medium">
                          {group.finalQuantity} {group.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Final Price</p>
                        <p className="font-medium">
                          ₹{group.finalPrice}/{group.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Savings</p>
                        <p className="font-medium text-green-600">₹{group.totalSavings}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  )
}
