import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPageLogin";
import Dashboard from "../Pages/Dashboards";
import Products from "../Pages/Products";
// import Table from "../Pages/Products";
// import TLoan from "../Pages/Tloan";
// import RMA from "../Pages/RMA";
// import UserManagement from "../Pages/UserManagement";
// import BinLocations from "../Pages/BinLocations";

function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/tloan" element={<TLoan />} />
        <Route path="/rma" element={<RMA />} />
        <Route path="/usermanagment" element={<UserManagement />} />
        <Route path="/binlocations" element={<BinLocations />} /> */}
      </Routes>
    </Router>
  );
}
export default Home;
