import React, { useEffect } from "react";
// import Users from "./Users";
// import Order from "./Order";
// import Products from "./Products";
// import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sales from "./Sales";
// import Logout from "./Logout";
// import AddOrder from  "./components/AddOrder";
// import Orders from "./components/Orders";
// import ManageOrders from "./components/ManageOrders";
// import Payment from "./components/Payments.js";
// import OrderList from "./OrderList";
// import PaymentSummary from "./components/PaymentSummary.js";
// import QRCodePayment from "./components/QRCodePayment.js";
// import Sucess from "./components/sucess.js";
import LandingPage from "../Pages/LandingPageLogin";

function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        {/* <Route path="/" element={<Logout />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/orderlist/payments" element={<PaymentSummary />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} /> */}
        {/* <Route exact path="/manage-orders" element={<ManageOrders/>} /> */}
        {/* <Route path="/orders/:order_id" element={<Orders />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/qrpayment" element={<QRCodePayment />} />
        <Route exact path="/sucess" element={<Sucess />} /> */}
      </Routes>
    </Router>
  );
}

export default Home;
