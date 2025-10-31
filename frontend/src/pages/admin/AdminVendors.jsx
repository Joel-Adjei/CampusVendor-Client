import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Store,
  Mail,
  Calendar,
  MoreVertical,
  Download,
  RefreshCw,
} from "lucide-react";
import Button from "@/components/ui/custom/Button";
import InputField from "../../components/input/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { newVendors } from "../../lib/data";
import CusSelect from "@/components/ui/custom/Select";
import AddEditVendor from "@/components/admin/admin-vendor/AddEditVendor";
import Modal from "@/components/ui/Modal";
import { useAuthStore } from "@/store/authStore";

const AdminVendors = () => {
  // const [vendors, setVendors] = useState(newVendors);
  const [filteredVendors, setFilteredVendors] = useState(newVendors);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add', 'edit', 'view'
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const {vendors , signUpVendor: setVendors} = useAuthStore()

  // Validation schema for vendor form
  const vendorSchema = Yup.object({
    name: Yup.string().required("Vendor name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Vendor type is required"),
  });

  // Formik for vendor form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: "",
      type: "vendor",
      status: "Pending",
    },
    validationSchema: vendorSchema,
    onSubmit: (values, { resetForm }) => {
      if (modalType === "add") {
        const newVendor = {
          ...values,
          id: Date.now().toString(),
          joined: "Just now",
        };
        setVendors([...vendors, newVendor]);
      } else if (modalType === "edit") {
        setVendors(
          vendors.map((vendor) =>
            vendor.id === selectedVendor.id ? { ...vendor, ...values } : vendor
          )
        );
      }
      setShowModal(false);
      resetForm();
      setSelectedVendor(null);
    },
  });

  // Filter vendors based on search and filters
  useEffect(() => {
    let filtered = vendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || vendor.status === statusFilter;
      const matchesType = typeFilter === "All" || vendor.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
    setFilteredVendors(filtered);
  }, [vendors, searchTerm, statusFilter, typeFilter]);

  const handleAddVendor = () => {
    setModalType("add");
    setSelectedVendor(null);
    formik.resetForm();
    setShowModal(true);
  };

  const handleEditVendor = (vendor) => {
    setModalType("edit");
    setSelectedVendor(vendor);
    formik.setValues(vendor);
    setShowModal(true);
  };

  const handleViewVendor = (vendor) => {
    setModalType("view");
    setSelectedVendor(vendor);
    setShowModal(true);
  };

  const handleDeleteVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setVendors(vendors.filter((vendor) => vendor.id !== selectedVendor.id));
    setShowDeleteConfirm(false);
    setSelectedVendor(null);
  };

  const updateVendorStatus = (vendorId, newStatus) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100";
      case "Rejected":
        return "text-red-600 bg-red-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return CheckCircle;
      case "Rejected":
        return XCircle;
      case "pending":
        return Clock;
      default:
        return Clock;
    }
  };

  return (
    <div className=" bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <div className="px-6 bg-white py-4 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <Button
            Icon={RefreshCw}
            iconSize={18}
            className={"text-sm"}
            iconType="icon-left"
            variant="outline"
          >
            Refresh
          </Button>
          <div className="flex gap-3">
            <Button
              Icon={Download}
              iconSize={17}
              className={"text-sm"}
              iconType="icon-left"
              variant="secondary"
            >
              Export
            </Button>
            <Button
              Icon={Plus}
              iconSize={18}
              className={"text-sm"}
              iconType="icon-left"
              onClick={handleAddVendor}
            >
              Add Vendor
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Vendors</p>
              <p className="text-2xl font-bold text-gray-900">
                {vendors.length}
              </p>
            </div>
            <Store className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {vendors.filter((v) => v.status === "Approved").length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {vendors.filter((v) => v.status === "pending").length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {vendors.filter((v) => v.status === "Rejected").length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-6">
        <div className=" mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search vendors by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <CusSelect
                value={statusFilter}
                onChange={(option) => setStatusFilter(option.value)}
                options={[
                  { value: "All", label: "All Status" },
                  { value: "pending", label: "Pending" },
                  { value: "Approved", label: "Approved" },
                  { value: "Rejected", label: "Rejected" },
                ]}
                optionsLabel="Status"
                selectValue="Select Status"
              />

              <CusSelect
                value={typeFilter}
                onChange={(option) => setTypeFilter(option.value)}
                options={[
                  { value: "All", label: "All Types" },
                  { value: "vendor", label: "Vendor" },
                  { value: "services", label: "Services" },
                ]}
                optionsLabel="Vendor Type"
                selectValue="Select Type"
              />
            </div>
          </div>
        </div>

        {/* Vendors Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVendors.map((vendor, index) => {
                  const StatusIcon = getStatusIcon(vendor.status);
                  return (
                    <tr key={vendor.id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {vendor.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {vendor.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {vendor.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            vendor.status
                          )}`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {vendor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {vendor.joined}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewVendor(vendor)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditVendor(vendor)}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Edit Vendor"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteVendor(vendor)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Delete Vendor"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          {vendor.status === "pending" && (
                            <div className="flex gap-1">
                              <button
                                onClick={() =>
                                  updateVendorStatus(
                                    vendor.id || index,
                                    "Approved"
                                  )
                                }
                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                title="Approve"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  updateVendorStatus(
                                    vendor.id || index,
                                    "Rejected"
                                  )
                                }
                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                title="Reject"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No vendors found</p>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit/View Vendor */}
        <Modal display={showModal}>
          <AddEditVendor
            selectedVendor={selectedVendor}
            onCancel={() => {
              setShowModal(false);
              setSelectedVendor(null);
            }}
            modalType={modalType}
          />
        </Modal>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Trash2 className="h-10 w-10 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete Vendor
                  </h3>
                  <p className="text-gray-600">
                    Are you sure you want to delete "{selectedVendor?.name}"?
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVendors;
