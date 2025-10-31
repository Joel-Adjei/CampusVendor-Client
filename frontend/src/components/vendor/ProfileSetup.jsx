import { ArrowBigLeft, ArrowLeft, ArrowRight, UserCog2Icon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/custom/Button";
import SetProfileName from "./SetProfileName";
import SetProduct from "./SetProduct";
import { useFormik } from "formik";
import { vendorProfileSetupValidation } from "@/lib/validationSchema";

const ProfileSetup =({onSetup})=>{
    const [page , setpage]= useState(0)
    const savedForm = useRef()

    useEffect(()=>{
        const saved = localStorage.getItem("vendorSetup")
        savedForm.current = JSON.parse(localStorage.getItem("vendorSetup"))
        console.log(savedForm)
    },[])

    const formik = useFormik({
        initialValues: {
            name: savedForm.current ? savedForm.current.name : "",
            description: savedForm.current ? savedForm.current.description : "",
            products : savedForm.current ? savedForm.current.products : "",
        },
        validationSchema: vendorProfileSetupValidation,
        onSubmit: (values)=> {
            console.log(values)
            onSetup(false);
            localStorage.setItem("vendorSetup", JSON.stringify(formik.values))
        },
    })

    const stages = [
        {page: 0 , content: <SetProfileName formik={formik} />},
        {page: 1 , content: <SetProduct formik={formik} />}
    ]

    function handlePageChange(type){
        if(type == "increase"){
            setpage((prev)=> prev +1)
            localStorage.setItem("vendorSetup", JSON.stringify(formik.values))
        }else{
            setpage((prev)=> prev - 1);
            localStorage.setItem("vendorSetup", JSON.stringify(formik.values))
        }
    }

    function renderPage(){
        const currentPage  = stages.find((stage)=> stage.page == page)
        return currentPage.content;
    }

    return(
        <section className="fixed px-3 flex justify-center items-center top-0 z-70 w-full h-[100vh] bg-black/30 backdrop-blur-xs">
            <div className="w-full max-w-2xl flex flex-col rounded-2xl h-120 bg-white">
                <h2 className="w-full py-3 rounded-t-2xl flex items-center justify-center text-3xl text-blue-600 border-b-2 font-bold bg-gray-100/20">
                    <UserCog2Icon className="text-yellow-300 mr-3" />
                    Set<span className="text-yellow-300" >Up</span> 
                </h2>

                <div className="content flex-1 flex flex-col p-4 overflow-y-auto overflow-x-hidden">
                    <div className="flex-1 ">
                        {renderPage()}
                    </div>

                    <div className="flex justify-between p-2">
                        <Button
                            onClick={()=> handlePageChange("decrease")}
                            disabled={page == 0}
                            variant="outline"
                            className={"disabled:border-none"}
                            Icon={ArrowLeft}
                        />
                        { page === stages.length - 1 ?
                            <Button
                             variant="secondary"
                             disabled={!formik.isValid}
                             type={"submit"}
                             onClick={()=> formik.handleSubmit()}
                            >
                                Finish
                            </Button> 
                            : <Button
                                
                                onClick={()=> handlePageChange("increase")}
                                variant="outline"
                                Icon={ArrowRight}
                            />
                        }
                    </div>
                </div>

                
            </div>
        </section>
    )
}

export default ProfileSetup;