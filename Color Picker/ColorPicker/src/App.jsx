import { useState } from "react";
import ColorPicker from "./ColorPicker"
import { Box } from "./Box";


function App() {
  const [bgcolor, setbgColor] = useState("#f5f5f5");
  const [textcolor, setTextColor] = useState("#000");

  return (
    <div

      className="h-screen w-full flex flex-col items-center gap-15 py-15 bg-[#fffde6]">
      <h1 className="text-8xl cursive text-[#2c2c2c]">Color Picker</h1>
      <ColorPicker setbgColor={setbgColor} setTextColor={setTextColor} />
      <Box bgcolor={bgcolor} textcolor={textcolor} />
    </div>
  )
}

export default App
