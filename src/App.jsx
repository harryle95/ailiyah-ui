import { AiOutlineDoubleRight as RightIcon, AiOutlineDoubleLeft as LeftIcon } from "react-icons/ai";
import { ToggleButton } from "./components/IconButton";
import { useThemeContext, Theme } from "./components/ThemeContext";
import { useState } from "react";

function App() {
  const [state, setState] = useState(false);
  const theme = useThemeContext();
  const iconClass = Theme.toString(theme['icons'])
  return (
    <ToggleButton
      onIcon={<RightIcon className={iconClass} />}
      offIcon={<LeftIcon className={iconClass} />}
      width="w-10"
      height="h-10"
      state={state}
      onClick={() => setState(!state)}
    />
  )
}

export default App;
