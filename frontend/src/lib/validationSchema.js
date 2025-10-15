import * as Yup from "yup"

export const vendorProfileSetupValidation = Yup.object().shape({
    name: Yup.string().required("Your full name is required"),
    description: Yup.string().required().label("Decription"),
    products: Yup.string()
})