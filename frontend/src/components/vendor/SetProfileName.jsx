import { User } from "lucide-react";
import InputField from "../input/InputField";
import { BlurFade } from "../ui/blur-fade";

const SetProfileName =({formik})=>{
    return (
        <BlurFade direction="right" blur="0" offset={50}>
        <div className="space-y-9 md:px-8">
            <InputField 
                label={"Fullname"}
                placeholder={"eg. Amos Gyasi"}
                name={"name"}
                Icon={User}
                formik={formik}
            />
            <InputField 
                label={"Description"}
                as="textarea"
                placeholder={""}
                name={"description"}
                Icon={User}
                formik={formik}
            />
        </div>
        </BlurFade>
    )
}

export default SetProfileName;