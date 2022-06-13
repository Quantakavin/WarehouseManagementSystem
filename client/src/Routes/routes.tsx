import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";


// const DashboardPage
// const ProductsPage 
// const TloansPage
// const RMAPage
// cosnt BinLocationsPage

const HomePage = import("../Pages/home");


const AppRoutes = () => {
    return (
            <Routes>
               <Route path="/home">{HomePage}</Route>

            
            </Routes>
    );
};
export default AppRoutes;