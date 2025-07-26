"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingUp, TrendingDown, Star, MapPin, Clock, Package, ShoppingCart, Filter } from "lucide-react"
import { VendorLayout } from "@/components/vendor-layout"

export default function ComparePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("Onions") // Updated default value
  const [locationFilter, setLocationFilter] = useState("Karol Bagh") // Updated default value

  const products = [
    "Onions",
    "Tomatoes",
    "Potatoes",
    "Green Chilies",
    "Ginger",
    "Garlic",
    "Cooking Oil",
    "Turmeric Powder",
    "Red Chili Powder",
    "Coriander Seeds",
  ]

  const priceComparisons = [
    {
      product: "Onions",
      suppliers: [
        {
          name: "Sharma Suppliers",
          price: 25,
          unit: "kg",
          rating: 4.8,
          location: "Karol Bagh",
          deliveryTime: "2-4 hours",
          stock: 500,
          trend: "down",
          priceChange: -2,
          minOrder: 10,
        },
        {
          name: "Fresh Mart",
          price: 27,
          unit: "kg",
          rating: 4.6,
          location: "Lajpat Nagar",
          deliveryTime: "3-5 hours",
          stock: 300,
          trend: "up",
          priceChange: 1,
          minOrder: 15,
        },
        {
          name: "Veggie Direct",
          price: 24,
          unit: "kg",
          rating: 4.5,
          location: "Chandni Chowk",
          deliveryTime: "4-6 hours",
          stock: 200,
          trend: "stable",
          priceChange: 0,
          minOrder: 5,
        },
        {
          name: "Delhi Wholesale",
          price: 26,
          unit: "kg",
          rating: 4.4,
          location: "Azadpur",
          deliveryTime: "5-7 hours",
          stock: 800,
          trend: "down",
          priceChange: -1,
          minOrder: 25,
        },
      ],
    },
    {
      product: "Tomatoes",
      suppliers: [
        {
          name: "Sharma Suppliers",
          price: 35,
          unit: "kg",
          rating: 4.8,
          location: "Karol Bagh",
          deliveryTime: "2-4 hours",
          stock: 200,
          trend: "up",
          priceChange: 3,
          minOrder: 10,
        },
        {
          name: "Fresh Mart",
          price: 32,
          unit: "kg",
          rating: 4.6,
          location: "Lajpat Nagar",
          deliveryTime: "3-5 hours",
          stock: 150,
          trend: "stable",
          priceChange: 0,
          minOrder: 8,
        },
        {
          name: "Veggie Direct",
          price: 38,
          unit: "kg",
          rating: 4.5,
          location: "Chandni Chowk",
          deliveryTime: "4-6 hours",
          stock: 100,
          trend: "up",
          priceChange: 2,
          minOrder: 5,
        },
      ],
    },
  ]

  const filteredComparisons = priceComparisons.filter((comparison) => {
    const matchesSearch = !searchTerm || comparison.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProduct = !selectedProduct || comparison.product === selectedProduct
    return matchesSearch && matchesProduct
  })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-red-500"
      case "down":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Price Comparison</CardTitle>
            <CardDescription>Compare prices across different suppliers to get the best deals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Onions">All Products</SelectItem> {/* Updated value prop */}
                  {products.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Karol Bagh">All Locations</SelectItem> {/* Updated value prop */}
                  <SelectItem value="Karol Bagh">Karol Bagh</SelectItem>
                  <SelectItem value="Lajpat Nagar">Lajpat Nagar</SelectItem>
                  <SelectItem value="Chandni Chowk">Chandni Chowk</SelectItem>
                  <SelectItem value="Azadpur">Azadpur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Price Comparison Tables */}
        {filteredComparisons.map((comparison) => (
          <Card key={comparison.product}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{comparison.product}</CardTitle>
                  <CardDescription>Comparing {comparison.suppliers.length} suppliers</CardDescription>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  Best: ₹{Math.min(...comparison.suppliers.map((s) => s.price))}/kg
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Supplier</th>
                      <th className="text-left py-3 px-2">Price</th>
                      <th className="text-left py-3 px-2">Trend</th>
                      <th className="text-left py-3 px-2">Rating</th>
                      <th className="text-left py-3 px-2">Location</th>
                      <th className="text-left py-3 px-2">Delivery</th>
                      <th className="text-left py-3 px-2">Stock</th>
                      <th className="text-left py-3 px-2">Min Order</th>
                      <th className="text-left py-3 px-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.suppliers
                      .sort((a, b) => a.price - b.price)
                      .map((supplier, index) => (
                        <tr
                          key={supplier.name}
                          className={`border-b hover:bg-gray-50 ${index === 0 ? "bg-green-50" : ""}`}
                        >
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-2">
                              <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                                {supplier.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{supplier.name}</p>
                                {index === 0 && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">Best Price</Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="font-semibold text-lg">
                              ₹{supplier.price}
                              <span className="text-sm text-gray-500">/{supplier.unit}</span>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-1">
                              {getTrendIcon(supplier.trend)}
                              <span className={`text-sm ${getTrendColor(supplier.trend)}`}>
                                {supplier.priceChange > 0 ? "+" : ""}
                                {supplier.priceChange !== 0 ? `₹${supplier.priceChange}` : "Stable"}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm ml-1">{supplier.rating}</span>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {supplier.location}
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {supplier.deliveryTime}
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex items-center text-sm">
                              <Package className="h-4 w-4 mr-1 text-gray-400" />
                              <span className={supplier.stock < 100 ? "text-red-600" : "text-green-600"}>
                                {supplier.stock} kg
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <span className="text-sm text-gray-600">{supplier.minOrder} kg</span>
                          </td>
                          <td className="py-4 px-2">
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Order
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* No Results */}
        {filteredComparisons.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}

        {/* Price Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Market Insights</CardTitle>
            <CardDescription>Price trends and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  <h3 className="font-medium text-green-800">Price Drops</h3>
                </div>
                <p className="text-sm text-green-700">
                  Onions and Potatoes prices have dropped by 5-8% this week. Good time to stock up!
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                  <h3 className="font-medium text-red-800">Price Increases</h3>
                </div>
                <p className="text-sm text-red-700">
                  Tomato prices are rising due to seasonal changes. Consider alternative suppliers.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-blue-800">Best Deals</h3>
                </div>
                <p className="text-sm text-blue-700">
                  Sharma Suppliers offers the best overall value with competitive prices and fast delivery.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </VendorLayout>
  )
}
