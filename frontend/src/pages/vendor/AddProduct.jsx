import FileSelect from "@/components/input/FileSelect";
import InputField from "@/components/input/InputField";
import Button from "@/components/ui/custom/Button";
import Label from "@/components/ui/custom/Label";
import CusSelect from "@/components/ui/custom/Select";
import { categoryOptions } from "@/lib/data";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DollarSign, Package2, PenLineIcon, Plus, Type } from "lucide-react";
import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";
import Switch from "@/components/ui/custom/Switch";
import useVendorProductStore from "@/store/useVendorProductStore";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  price: Yup.number("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  type: Yup.string().required("Type is required"),
  state: Yup.string(),
  availability: Yup.boolean().required("Avability is Required"),
  image: Yup.mixed().required("Product image is required"),
});

const AddProduct = ({ handleAddProduct, onCancel }) => {
  const {editProduct , setEditProduct} = useVendorProductStore();

  const formik = useFormik({
    initialValues: {
      name: editProduct? editProduct.name :  "",
      price: editProduct? editProduct.price : "",
      description: editProduct? editProduct.description : "",
      category: editProduct? editProduct.category : "",
      type:  editProduct?.type ? editProduct.type :"",
      state: editProduct?.state ? editProduct.state : "",
      availability:editProduct?.availability ? editProduct.availability : false,
      image: null,
    },
    validationSchema,
    onSubmit: (values , {setSubmitting}) => {
      setSubmitting(true);
      console.log(values);
      if(values.type === "Product" && !values.state){
        toast.info("Please select the product state.");
        setSubmitting(false);
        return;
      }
      handleAddProduct(values);
      setSubmitting(false);
    },
  });

  return (
    <div>
      <form className="px-6 space-y-6" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputField
              label={"Product Name"}
              Icon={Package2}
              name={"name"}
              type="text"
              value={formik.values.name}
              formik={formik}
              isRequired
              placeholder="Enter product name"
            />
          </div>

          <div>
            <InputField
              label={"Price (GH₵)"}
              Icon={DollarSign}
              name={"price"}
              value={formik.values.price}
              formik={formik}
              placeholder="0.00"
              isRequired
            />
          </div>
        </div>

        <div>
          <InputField
            label={"Description"}
            Icon={PenLineIcon}
            name={"description"}
            as="textarea"
            value={formik.values.description}
            formik={formik}
            rows="3"
            isRequired
            placeholder="Enter product description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label label="Type" htmlFor="type" Icon={Type} isRequired />
            <CusSelect
              selectValue="Select Type"
              value={formik.values.type}
              optionsLabel="Types"
              onChange={(selected) =>
                formik.setFieldValue("type", selected.value)
              }
              options={[
                { label: "Product", value: "Product" },
                { label: "Service", value: "Service" },
              ]}
            />
            {
              formik.touched.type && formik.errors.type && (
                <div className="text-red-500 text-xs ml-3 mt-1">
                  {formik.errors.type}
                </div>
              )
            }
          </div>

          <div>
            <Label label="Category" htmlFor="category" Icon={FaCartArrowDown} isRequired />
            <CusSelect
              selectValue="Select Category"
              value={formik.values.category}
              optionsLabel="Categories"
              onChange={(selected) =>
                formik.setFieldValue("category", selected.value)
              }
              options={categoryOptions.filter((opt) => opt.value !== "all")}
            />
            {
              formik.touched.category && formik.errors.category && (
                <div className="text-red-500 text-xs ml-3 mt-1">
                  {formik.errors.category}
                </div>
              )
            }
          </div>

          {formik.values.type === "Product" && (
            <div>
              <CusSelect
                value={formik.values.state}
                selectValue="Select State"
                optionsLabel="State"
                onChange={(selected) =>
                  formik.setFieldValue("state", selected.value)
                }
                options={[
                  { label: "New", value: "new" },
                  { label: "Used", value: "used" },
                ]}
              />
              {
                formik.touched.state && formik.errors.state && (
                  <div className="text-red-500 text-xs ml-3 mt-1">
                    {formik.errors.state}
                  </div>
                )
              }
            </div>
          )}
        </div>

        <div>
          <FileSelect
            isRequired
            onFilesChange={(files) => formik.setFieldValue("image", files[0])}
            label="Upload Product Images"
            acceptedTypes="image/*,.pdf"
            maxFiles={1}
            maxSizeMB={5}
          />

          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-xs ml-3 mt-1">
              {formik.errors.image}
            </div>
          )}
        </div>

        <div>
          <Switch
            id="availability"
            description={formik.values.availability ? "Available" : "Unavailable"}
            label="Product Availability"
            checked={formik.values.availability}
            onChange={(checked) => {
              formik.setFieldValue("availability", checked)
            }}
            size="small"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            type="button"
            onClick={() => onCancel()}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type={"submit"}
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
      </form>
    </div>
  );
};

export default AddProduct;
