import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Container } from "react-bootstrap";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import { useQuery } from "react-query";
import { GetAllUsers } from "../../api/UserDB";
import CardField from "../../components/cards/CardField";
import CardContainer from "../../components/cards/CardContainer";

const Users: React.FC = () => {
    const UserQuery = useQuery(`users`,() => GetAllUsers(), {
        onSuccess: (data) => {
            //console.log(data.data[0])
        }
    });

    if (UserQuery.isLoading) {
        return(<></>)
    } else {
        return(
            <></>
        )
    }
}
export default Users;