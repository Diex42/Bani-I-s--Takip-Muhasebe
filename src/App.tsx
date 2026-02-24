import { Route, Routes } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import DashBoard from "./pages/DashBoard"
import Jobs from "./pages/Jobs"
import Brands from "./pages/Brands"
import Finance from "./pages/Finance"
import Team from "./pages/Team"
import Login from "./pages/Login"


function App() {

  return (
    <>
      <Routes>
        <Route path="/giris" element={<Login />} />
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<DashBoard/>}/>
          <Route path="/isler" element={<Jobs/>}/>
          <Route path="/markalar" element={<Brands/>}/>
          <Route path="/finans" element={<Finance/>}/>
          <Route path="/ekip" element={<Team/>}/>        
        </Route>
      </Routes>


    </>
  )
}

export default App
