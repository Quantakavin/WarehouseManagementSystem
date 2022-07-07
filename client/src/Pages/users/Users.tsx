import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Container } from "react-bootstrap";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import { useQuery } from "react-query";
import { GetAllUsers } from "../../api/UserDB";
import CardField from "../../components/cards/CardField";
import CardContainer from "../../components/cards/CardContainer";
import Table from "../../components/table/Table";
import TestTable from "./TestTable";


const Users: React.FC = () => {
    const UserQuery = useQuery(`users`,() => GetAllUsers());

    if (UserQuery.isLoading) {
        return(<></>)
    } else {
        return(
            <>
            <TestTable/>
            </>
        )
    }
}
export default Users;