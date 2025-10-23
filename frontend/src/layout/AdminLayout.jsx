import PanelNavbar from '@/components/vendor/PanelNavbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
        <PanelNavbar />
        <div className="min-h-[calc(100vh-3.85rem)] bg-gray-50 md:pl-65">
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout