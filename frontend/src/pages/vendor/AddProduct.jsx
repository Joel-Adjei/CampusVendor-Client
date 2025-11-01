import FileSelect from "@/components/input/FileSelect";
import InputField from "@/components/input/InputField";
import Button from "@/components/ui/custom/Button";
import CusSelect from "@/components/ui/custom/Select";
import { categoryOptions } from "@/lib/data";
import { useFormik } from "formik";
import { Package2, Plus } from "lucide-react";
import React from "react";

const AddProduct = ({ handleAddProduct, setShowAddModal }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      image: null,
    },
    onSubmit: (values) => {
      console.log(values);
      handleAddProduct(values);
    },
  });

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-6 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Plus className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">Add New Product</h2>
              <p className="text-blue-100">
                Create a new product for your catalog
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Package2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <InputField
              name={"name"}
              type="text"
              value={formik.values.name}
              formik={formik}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($)
            </label>
            <InputField
              name={"price"}
              type="number"
              value={formik.values.price}
              formik={formik}
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <InputField
            name={"description"}
            as="textarea"
            value={formik.values.description}
            formik={formik}
            rows="3"
            placeholder="Enter product description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <CusSelect
              selectValue="Select Category"
              value={formik.values.category}
              optionsLabel="Categories"
              onChange={(selected) =>
                formik.setFieldValue("category", selected.value)
              }
              options={categoryOptions.filter((opt) => opt.value !== "all")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity
            </label>
            <InputField
              name={"stock"}
              type="number"
              value={formik.values.stock}
              formik={formik}
              placeholder="0"
            />
          </div>
        </div>

        <div>
            <FileSelect
            onFilesChange={(files) => formik.setFieldValue("image", files[0])}
            label="Upload Product Images"
            acceptedTypes="image/*,.pdf"
            maxFiles={1}
            maxSizeMB={5}
            
          />
            </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={() => setShowAddModal(false)}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={formik.handleSubmit}
            variant="primary"
            iconType="icon-left"
            Icon={Plus}
            iconSize={16}
            className="flex-1"
            disabled={formik.isSubmitting}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
