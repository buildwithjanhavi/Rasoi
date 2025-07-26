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
import {
  MessageCircle,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Phone,
  Mail,
  HelpCircle,
  FileText,
  Truck,
  CreditCard,
  Users,
  Settings,
} from "lucide-react"
import { VendorLayout } from "@/components/vendor-layout"

export default function SupportPage() {
  const [showCreateTicket, setShowCreateTicket] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const supportTickets = [
    {
      id: "TKT001",
      subject: "Order delivery delayed",
      category: "Delivery",
      priority: "high",
      status: "open",
      createdDate: "2024-01-15",
      lastUpdate: "2024-01-15",
      assignedTo: "Support Team",
      description: "My order ORD002 was supposed to be delivered today but hasn't arrived yet.",
      responses: [
        {
          from: "Support Team",
          message: "We are checking with the supplier about your order status. Will update you shortly.",
          timestamp: "2024-01-15 10:30 AM",
        },
      ],
    },
    {
      id: "TKT002",
      subject: "Payment issue with group order",
      category: "Payment",
      priority: "medium",
      status: "in-progress",
      createdDate: "2024-01-14",
      lastUpdate: "2024-01-14",
      assignedTo: "Finance Team",
      description: "Unable to complete payment for group order GRP001. Getting error message.",
      responses: [
        {
          from: "Finance Team",
          message: "We have identified the issue and are working on a fix. Please try again in 2 hours.",
          timestamp: "2024-01-14 2:15 PM",
        },
      ],
    },
    {
      id: "TKT003",
      subject: "Supplier rating dispute",
      category: "General",
      priority: "low",
      status: "resolved",
      createdDate: "2024-01-12",
      lastUpdate: "2024-01-13",
      assignedTo: "Quality Team",
      description: "I want to dispute my rating for Sharma Suppliers as the quality was not as expected.",
      responses: [
        {
          from: "Quality Team",
          message: "We have reviewed your case and updated the supplier rating. Thank you for your feedback.",
          timestamp: "2024-01-13 11:45 AM",
        },
      ],
    },
  ]

  const faqItems = [
    {
      category: "Orders",
      icon: Truck,
      questions: [
        {
          question: "How do I track my order?",
          answer:
            "You can track your order by going to the Orders section and clicking on the tracking ID. Real-time updates will be shown.",
        },
        {
          question: "Can I cancel my order?",
          answer:
            "Orders can be cancelled within 30 minutes of placement if they haven't been processed by the supplier.",
        },
        {
          question: "What if my order is delayed?",
          answer:
            "If your order is delayed beyond the promised delivery time, you can raise a support ticket and we'll help resolve it.",
        },
      ],
    },
    {
      category: "Payments",
      icon: CreditCard,
      questions: [
        {
          question: "What payment methods are accepted?",
          answer:
            "We accept UPI, debit/credit cards, net banking, and digital wallets. Cash on delivery is available for select suppliers.",
        },
        {
          question: "How do refunds work?",
          answer:
            "Refunds are processed within 5-7 business days to your original payment method after order cancellation or return.",
        },
        {
          question: "Are there any transaction fees?",
          answer:
            "No, we don't charge any transaction fees. However, your bank or payment provider may charge processing fees.",
        },
      ],
    },
    {
      category: "Group Orders",
      icon: Users,
      questions: [
        {
          question: "How do group orders work?",
          answer:
            "Group orders allow multiple vendors to combine their orders for bulk discounts. You can join existing groups or create your own.",
        },
        {
          question: "What are the benefits of group orders?",
          answer: "Group orders typically offer 10-20% savings, better supplier rates, and shared delivery costs.",
        },
        {
          question: "How is payment handled in group orders?",
          answer:
            "Each participant pays for their portion individually. Payment is collected only after the minimum quantity is reached.",
        },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <MessageCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-orange-100 text-orange-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating ticket:", newTicket)
    setShowCreateTicket(false)
    setNewTicket({
      subject: "",
      category: "",
      priority: "",
      description: "",
    })
  }

  const filteredTickets = supportTickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
            <p className="text-gray-600">Get help and manage your support tickets</p>
          </div>
          <Button onClick={() => setShowCreateTicket(true)} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Call Support</p>
                  <p className="text-sm text-gray-600">+91 1800-123-4567</p>
                  <p className="text-xs text-gray-500">24/7 Available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-gray-600">support@rasoiswaad.com</p>
                  <p className="text-xs text-gray-500">Response in 2-4 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-gray-600">Chat with RasoiBot</p>
                  <p className="text-xs text-gray-500">Instant responses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Ticket Form */}
        {showCreateTicket && (
          <Card>
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
              <CardDescription>Describe your issue and we'll help you resolve it</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select
                      value={newTicket.category}
                      onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delivery">Delivery Issues</SelectItem>
                        <SelectItem value="payment">Payment Problems</SelectItem>
                        <SelectItem value="supplier">Supplier Related</SelectItem>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="technical">Technical Problems</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <Select
                      value={newTicket.priority}
                      onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    placeholder="Please provide detailed information about your issue..."
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                    Create Ticket
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateTicket(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Support Tabs */}
        <Tabs defaultValue="tickets" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tickets">My Tickets ({supportTickets.length})</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Help Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tickets List */}
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(ticket.status)}
                        <div>
                          <h3 className="font-semibold text-lg">{ticket.subject}</h3>
                          <p className="text-sm text-gray-600">Ticket ID: {ticket.id}</p>
                          <p className="text-xs text-gray-500">
                            Created: {new Date(ticket.createdDate).toLocaleDateString("en-IN")} • Last updated:{" "}
                            {new Date(ticket.lastUpdate).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm">{ticket.description}</p>
                    </div>

                    {/* Responses */}
                    {ticket.responses.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium text-sm">Latest Response:</h4>
                        {ticket.responses.map((response, index) => (
                          <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-3">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-sm">{response.from}</span>
                              <span className="text-xs text-gray-500">{response.timestamp}</span>
                            </div>
                            <p className="text-sm">{response.message}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Assigned to: {ticket.assignedTo}</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Tickets */}
            {filteredTickets.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm ? "Try adjusting your search terms." : "You haven't created any support tickets yet."}
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setShowCreateTicket(true)} className="bg-orange-600 hover:bg-orange-700">
                      Create Your First Ticket
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="faq">
            <div className="space-y-6">
              {faqItems.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <category.icon className="h-5 w-5 text-orange-600" />
                      </div>
                      <CardTitle>{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.questions.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <HelpCircle className="h-4 w-4 mr-2 text-orange-600" />
                            {faq.question}
                          </h4>
                          <p className="text-sm text-gray-600 ml-6">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Getting Started Guide</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Learn how to set up your account, find suppliers, and place your first order.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Group Orders Guide</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Maximize savings by organizing or joining group orders with other vendors.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Settings className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="font-semibold">Account Management</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage your profile, payment methods, and notification preferences.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Truck className="h-5 w-5 text-orange-600" />
                    </div>
                    <h3 className="font-semibold">Order Tracking</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Track your orders in real-time and understand delivery statuses.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="font-semibold">Payment & Billing</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Understand payment methods, billing cycles, and refund policies.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <HelpCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold">Troubleshooting</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Common issues and their solutions to help you resolve problems quickly.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </VendorLayout>
  )
}
