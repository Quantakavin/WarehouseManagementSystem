import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Container } from "react-bootstrap";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import { useQuery } from "react-query";
import { GetUser } from "../../api/UserDB";

const ViewUser: React.FC = () => {
    const params = useParams();
    const [user, setUser] = useState<any>(null);

    const UserQuery = useQuery([`user${params.id}`, params.id],() => GetUser(params.id), {
        onSuccess: (data) => {
            console.log(data.data[0])
            setUser(data.data[0]);
        }
    });

    if (UserQuery.isLoading) {
        return(<></>)
    } else {
        let notigroups: string = "";
        user.NotificationGroups.forEach( (notigroup, index) => {
            if (index === 0) {
                notigroups += notigroup.NotiGroupName;
            } else {
                notigroups += ", " + notigroup.NotiGroupName;
            }
        })

        return(
        <Container className="cardcontainer shadow">
        <h2 className="cardheader">{user.Username}</h2>
        <p className="cardsubheading">{user.UserGroupName}</p>
        <div className="flexcontainer cardfield">
            <p className="cardfieldlabel">Company:</p>
            <p className="cardfieldvalue">{user.CompanyName}</p>
        </div>
        <div className="flexcontainer cardfield">
            <p className="cardfieldlabel">Email:</p>
            <p className="cardfieldvalue">{user.Email}</p>
        </div>
        <div className="flexcontainer cardfield">
            <p className="cardfieldlabel">Phone No:</p>
            <p className="cardfieldvalue">{user.MobileNo}</p>
        </div>
        <div className="flexcontainer cardfield">
            <p className="cardfieldlabel">Notification Groups:</p>
            <p className="cardfieldvalue">{notigroups}</p>
        </div>
        </Container>
        )
    }
}
export default ViewUser;