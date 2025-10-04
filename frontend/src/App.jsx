import { BlurFade } from "@/components/ui/blur-fade"

function App() {

  return (
    <>
      <BlurFade delay={0.25}  inView>
        <p className="text-4xl font-extrabold">
          TRIAL TEST
        </p>
      </BlurFade>
      
    </>
  )
}

export default App
