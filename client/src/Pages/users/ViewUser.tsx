import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Container } from "react-bootstrap";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import { useQuery } from "react-query";
import { GetUser } from "../../api/UserDB";
import CardField from "../../components/cards/CardField";
import CardContainer from "../../components/cards/CardContainer";

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
        <CardContainer header={user.Username} subheading={user.UserGroupName}>
        <CardField label="Company:" value = {user.CompanyName} />
        <CardField label="Email:" value = {user.Email} />
        <CardField label="Phone No:" value = {user.MobileNo} />
        <CardField label="Notification Groups:" value = {notigroups} />
        </CardContainer>
        )
    }
}
export default ViewUser;