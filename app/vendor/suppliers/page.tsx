"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Clock, Phone, Package, Shield } from "lucide-react"
import { VendorLayout } from "@/components/vendor-layout"
import Link from "next/link"

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [sortBy, setSortBy] = useState("rating")

  const suppliers = [
    {
      id: 1,
      name: "Sharma Suppliers",
      rating: 4.8,
      reviews: 156,
      location: "Karol Bagh, Delhi",
      distance: "2.5 km",
      deliveryTime: "2-4 hours",
      minOrder: 500,
      categories: ["Vegetables", "Spices", "Oil"],
      verified: true,
      products: [
        { name: "Onions", price: 25, unit: "kg", stock: 500 },
        { name: "Tomatoes", price: 35, unit: "kg", stock: 200 },
        { name: "Potatoes", price: 20, unit: "kg", stock: 300 },
      ],
      phone: "+91 98765 43210",
      savings: "15% avg savings",
    },
    {
      id: 2,
      name: "Fresh Mart",
      rating: 4.6,
      reviews: 89,
      location: "Lajpat Nagar, Delhi",
      distance: "3.2 km",
      deliveryTime: "3-5 hours",
      minOrder: 750,
      categories: ["Vegetables", "Fruits", "Dairy"],
      verified: true,
      products: [
        { name: "Green Chilies", price: 80, unit: "kg", stock: 50 },
        { name: "Coriander", price: 40, unit: "kg", stock: 30 },
        { name: "Ginger", price: 120, unit: "kg", stock: 25 },
      ],
      phone: "+91 87654 32109",
      savings: "12% avg savings",
    },
    {
      id: 3,
      name: "Veggie Direct",
      rating: 4.5,
      reviews: 67,
      location: "Chandni Chowk, Delhi",
      distance: "4.1 km",
      deliveryTime: "4-6 hours",
      minOrder: 400,
      categories: ["Vegetables", "Herbs"],
      verified: false,
      products: [
        { name: "Cabbage", price: 15, unit: "kg", stock: 100 },
        { name: "Cauliflower", price: 25, unit: "kg", stock: 80 },
        { name: "Spinach", price: 30, unit: "kg", stock: 40 },
      ],
      phone: "+91 76543 21098",
      savings: "8% avg savings",
    },
    {
      id: 4,
      name: "Spice Kingdom",
      rating: 4.7,
      reviews: 134,
      location: "Khari Baoli, Delhi",
      distance: "5.0 km",
      deliveryTime: "2-3 hours",
      minOrder: 1000,
      categories: ["Spices", "Oil", "Flour"],
      verified: true,
      products: [
        { name: "Turmeric Powder", price: 180, unit: "kg", stock: 150 },
        { name: "Red Chili Powder", price: 220, unit: "kg", stock: 100 },
        { name: "Cooking Oil", price: 120, unit: "L", stock: 200 },
      ],
      phone: "+91 65432 10987",
      savings: "18% avg savings",
    },
  ]

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.categories.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLocation = !locationFilter || supplier.location.includes(locationFilter)
    const matchesCategory = !categoryFilter || supplier.categories.includes(categoryFilter)

    return matchesSearch && matchesLocation && matchesCategory
  })

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "distance":
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      case "delivery":
        return Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime)
      default:
        return 0
    }
  })

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Find Suppliers</CardTitle>
            <CardDescription>Discover verified suppliers for your raw material needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search suppliers or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Locations">All Locations</SelectItem>
                  <SelectItem value="Karol Bagh">Karol Bagh</SelectItem>
                  <SelectItem value="Lajpat Nagar">Lajpat Nagar</SelectItem>
                  <SelectItem value="Chandni Chowk">Chandni Chowk</SelectItem>
                  <SelectItem value="Khari Baoli">Khari Baoli</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Spices">Spices</SelectItem>
                  <SelectItem value="Oil">Oil</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="delivery">Delivery Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 text-orange-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                      {supplier.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{supplier.name}</CardTitle>
                        {supplier.verified && (
                          <Badge className="bg-green-100 text-green-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm ml-1">{supplier.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({supplier.reviews})</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {supplier.distance}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {supplier.savings}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Location and Delivery Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{supplier.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{supplier.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span>Min: ₹{supplier.minOrder}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{supplier.phone}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {supplier.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* Sample Products */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Available Products:</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {supplier.products.slice(0, 3).map((product) => (
                      <div key={product.name} className="bg-gray-50 p-2 rounded">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-green-600">
                          ₹{product.price}/{product.unit}
                        </p>
                        <p className="text-gray-500">
                          {product.stock} {product.unit} left
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Link href={`/vendor/suppliers/${supplier.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/vendor/order?supplier=${supplier.id}`} className="flex-1">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Order Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {sortedSuppliers.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </VendorLayout>
  )
}
