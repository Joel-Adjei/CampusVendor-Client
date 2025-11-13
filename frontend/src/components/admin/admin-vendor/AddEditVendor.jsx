import InputField from "@/components/input/InputField";
import Button from "@/components/ui/custom/Button";
import CusSelect from "@/components/ui/custom/Select";
import { useFormik } from "formik";
import React, { useEffect } from "react";


const AddEditVendor = ({selectedVendor , onCancel , modalType}) => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            description: '',
            phone: '',
            status: 'Pending',
        },
        onSubmit: (values) => {
            console.log('Form submitted:', values);
        },
    });

    const checkIfEditMode = modalType === "edit" && selectedVendor;

    useEffect(() => {
        if (checkIfEditMode) {
            formik.setValues({
                name: selectedVendor.name || '',
                email: selectedVendor.email || '',
                description: selectedVendor.description || '',
                phone: selectedVendor.phoneNumber || '',
                status: selectedVendor.status || 'Pending',
            });
        }
    }, [checkIfEditMode, selectedVendor]);


  return (
    <div>
      <div className="max-w-190">
        <div className="h-full w-full overflow-y-auto">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {modalType === "add" && "Add New Vendor"}
              {modalType === "edit" && "Edit Vendor"}
            </h3>
          </div>

          <div className="p-6">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <InputField
                  label="Vendor Name"
                  name="name"
                  placeholder="Enter vendor name"
                  isRequired
                  formik={formik}
                />

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  isRequired
                  formik={formik}
                />

                <InputField
                  label="Description"
                  name="description"
                  placeholder="Enter vendor description"
                  isRequired
                  formik={formik}
                  as="textarea"
                />

                <InputField
                    label="Phone Number"
                    name="phone"
                    placeholder="Enter phone number"
                    isRequired
                    formik={formik}
                />

                {modalType === "edit" && (
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">
                      Status
                    </label>
                    <CusSelect
                      selectValue="Select Status"
                      value={formik.values.status}
                        optionsLabel="Vendor Status"
                        onChange={(selectedOption) => {
                            formik.setFieldValue('status', selectedOption.value);
                        }}
                        options={[
                            { value: 'Pending', label: 'Pending' },
                            { value: 'Approved', label: 'Approved' },
                            { value: 'Rejected', label: 'Rejected' },
                        ]}
                    />
                  </div>
                )}
              </form>
          </div>

          <div className="px-6 py-4 border-t flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
                Cancel
            </Button>
            {modalType !== "view" && (
              <Button
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
              >
                {modalType === "add" ? "Add Vendor" : "Save Changes"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditVendor;
