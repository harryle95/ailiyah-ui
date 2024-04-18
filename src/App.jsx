import * as SButton from "./components/built/Buttons"


function App() {
  
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SButton.InvisibleButtonGroup state={true}>
        <SButton.UploadButton tooltipContent="Upload"/>
        <SButton.DownloadButton tooltipContent="Download"/>
      </SButton.InvisibleButtonGroup>
    </div>

  )
}

export default App;
