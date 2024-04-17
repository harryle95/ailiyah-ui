import {
  AiOutlineDoubleRight as RightIcon,
  AiOutlineDoubleLeft as LeftIcon,
} from "react-icons/ai";
import { useState } from "react";
import { styled } from "./components/context/factory";


function App() {
  const [visible, setVisible] = useState(false);
  const SLeftIcon = styled(LeftIcon)
  const SRightIcon = styled(RightIcon)
  const Button = styled("button")


  return (
    <Button themeName={"toggleButton"} onClick={() => setVisible(!visible)}>{visible ? <SLeftIcon themeName={"icons"} /> : <SRightIcon themeName={"icons"} />}</Button>
  )


}

export default App;
