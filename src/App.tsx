import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "./components/Navbar"
import { ImageForm } from "./components/ImageForm"
import { useState } from "react"
import { Report } from "./components/Report";

function App() {

  const [formSubmitted, setFormSubmitted] = useState(false);

  const submitForm = () => setFormSubmitted(true);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <div className=" h-[60vh] flex justify-center items-center">
        <ImageForm submitForm={submitForm}/>
      </div>
      <div>
        {
          formSubmitted ? <Report/>: null
        }
      </div>
    </ThemeProvider>
  )
}

export default App
