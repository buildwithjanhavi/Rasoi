"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"

export function RasoiBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hello! I'm RasoiBot, your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const quickQuestions = [
    "Find best onion prices",
    "Track my order",
    "Suggest suppliers near me",
    "Group order benefits",
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        message: getBotResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputMessage("")
  }

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("price") || lowerMessage.includes("onion")) {
      return "I found 3 suppliers with competitive onion prices: Sharma Suppliers (₹25/kg), Fresh Mart (₹27/kg), and Veggie Direct (₹24/kg). Would you like me to help you place an order?"
    } else if (lowerMessage.includes("track") || lowerMessage.includes("order")) {
      return "Your recent order ORD002 is currently in transit and will be delivered by 6 PM today. You can track it in real-time from the Orders section."
    } else if (lowerMessage.includes("supplier") || lowerMessage.includes("near")) {
      return "Based on your location in Delhi, I recommend these top-rated suppliers: Sharma Suppliers (4.8★), Fresh Mart (4.6★), and Delhi Wholesale (4.5★). All offer same-day delivery!"
    } else if (lowerMessage.includes("group") || lowerMessage.includes("bulk")) {
      return "Group orders can save you 10-15% on bulk purchases! I can help you find other vendors in your area interested in combining orders. Would you like me to create a group order?"
    } else {
      return "I can help you with finding suppliers, comparing prices, tracking orders, and managing your account. What specific information are you looking for?"
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
    handleSendMessage()
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-orange-600 hover:bg-orange-700 shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-orange-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <CardTitle className="text-sm">RasoiBot</CardTitle>
          <Badge variant="secondary" className="bg-orange-500 text-white text-xs">
            AI Assistant
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-orange-700">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-80">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === "user" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {msg.type === "bot" && <Bot className="h-4 w-4 mt-0.5 text-orange-600" />}
                  {msg.type === "user" && <User className="h-4 w-4 mt-0.5" />}
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="p-2 border-t">
          <div className="flex flex-wrap gap-1 mb-2">
            {quickQuestions.map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                className="text-xs h-6 bg-transparent"
                onClick={() => handleQuickQuestion(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="text-sm"
            />
            <Button size="sm" onClick={handleSendMessage} className="bg-orange-600 hover:bg-orange-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
