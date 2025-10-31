import React, { useState, useEffect } from 'react'
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter,
  Eye,
  ShoppingBag,
  DollarSign,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Truck
} from 'lucide-react'
import Button from "@/components/ui/custom/Button";
import Modal from '@/components/ui/Modal';

const VendorOrders = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data based on color palette
  const mockOrders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      email: 'john@student.edu',
      phone: '+1 234-567-8900',
      items: [{ name: 'Campus T-Shirt', quantity: 2, price: 25.00 }],
      total: 50.00,
      status: 'pending',
      date: '2024-10-23',
      address: '123 Campus Ave, Room 204'
    },
    {
      id: '#ORD-002',
      customer: 'Sarah Johnson',
      email: 'sarah@student.edu',
      phone: '+1 234-567-8901',
      items: [{ name: 'Study Guide', quantity: 1, price: 35.00 }],
      total: 35.00,
      status: 'processing',
      date: '2024-10-22',
      address: '456 Student Hall, Room 101'
    },
    {
      id: '#ORD-003',
      customer: 'Mike Wilson',
      email: 'mike@student.edu',
      phone: '+1 234-567-8902',
      items: [{ name: 'Campus Hoodie', quantity: 1, price: 45.00 }],
      total: 45.00,
      status: 'completed',
      date: '2024-10-21',
      address: '789 University Blvd, Apt 3B'
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockOrders)
      setFilteredOrders(mockOrders)
      setIsLoading(false)
    }, 1500)
  }, [])

  useEffect(() => {
    let filtered = orders.filter(order => 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [searchTerm, statusFilter, orders])

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
      processing: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
      completed: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
      cancelled: 'bg-gradient-to-r from-red-500 to-red-600 text-white'
    }
    return colors[status] || 'bg-gray-500 text-white'
  }

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      processing: Package,
      completed: CheckCircle,
      cancelled: XCircle
    }
    const Icon = icons[status]
    return Icon ? <Icon size={16} /> : null
  }

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    revenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-900 to-blue-500 rounded-full animate-pulse"></div>
          <div className="animate-bounce">
            <Package className="w-8 h-8 mx-auto text-blue-900" />
          </div>
          <p className="text-blue-900 font-medium">Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header with color palette integration */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-400 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500 rounded-full opacity-10 translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-md backdrop-blur-sm">
                <ShoppingBag className="w-8 h-8 text-brand" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-Montserrat">Order Management</h1>
                <p className="text-blue-100 mt-1">Manage and track all your customer orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards with color scheme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white  p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-amber-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-amber-300 mt-1">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-amber-300" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Processing</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.processing}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full animate-pulse">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className=" p-3 ">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by customer name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-400 to-blue-700 text-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold ">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order, index) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                    style={{ 
                      animation: `slideIn 0.5s ease-out ${index * 100}ms forwards`,
                      opacity: 0 
                    }}
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-blue-900">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600">${order.total.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => setSelectedOrder(order)}
                        variant="secondary"
                        iconType="icon-left"
                        Icon={Eye}
                        iconSize={16}
                        className="!px-4 !py-2"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <Modal display={true}>
            <div 
              // className=" rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6" />
                    <div>
                      <h2 className="text-xl font-bold">Order Details</h2>
                      <p className="text-blue-100">{selectedOrder.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{selectedOrder.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span>{selectedOrder.phone}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <span>{selectedOrder.address}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => setSelectedOrder(null)}
                    variant="primary"
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

export default VendorOrders