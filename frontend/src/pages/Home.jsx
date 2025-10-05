import React from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import Button from "@/components/ui/Button"
import { AArrowUp } from "lucide-react"

const Home =()=>{
    return(
        <div>
            <BlurFade>
                <p className="text-4xl">Home Page</p> 
            </BlurFade>

            <Button
                className={""}
                variant="primary"
                Icon={AArrowUp}
                iconType="icon-left"
                isLoading
                onClick={()=> alert("You clicked")}
            >
                Click
            </Button>

            <Button Icon={AArrowUp}  iconType="icon-only" variant="outline" />
                
        </div>
    )
}

export default Home