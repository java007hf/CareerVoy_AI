import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <div className="wrap">
        <HomePage />
      </div>
    </>
  )
}

export default App
