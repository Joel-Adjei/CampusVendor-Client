import { create } from "zustand"

const intialValues = {
    editProduct: null
}

const useVendorProductStore = create((set)=> ({
    ...intialValues,
    
    setEditProduct : (product) => set(()=> ({editProduct : product}))
}))

export default useVendorProductStore;