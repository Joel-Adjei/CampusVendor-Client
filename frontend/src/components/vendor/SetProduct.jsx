import React from "react";
import { BlurFade } from "../ui/blur-fade";
import InputField from "../input/InputField";
import { User } from "lucide-react";

const SetProduct =({formik})=>{
    return (
        <BlurFade direction="left" blur="0" offset={50}>
        <div className="md:px-8">
            <InputField 
                label={"Products"}
                as="textarea"
                placeholder={""}
                name={"products"}
                Icon={User}
                formik={formik}
            />
        </div>
        </BlurFade>
    )
}

export default SetProduct;