import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useNavigate } from "react-router-dom";
import { TableCell } from "@mui/material";

interface MenuProps {
    id: number | string;
}
const ActionMenu: React.FC<MenuProps> = ({id}) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const navigate = useNavigate();

    return (
        <>
        <TableCell sx={{ color: "#0A2540" }} align="center">
        <MoreVertIcon onClick={() => setShowMenu(!showMenu)}/>
        {showMenu? 
        <div style={{position: "relative"}}>
        <div className="actiondropdown">
          <a
            style={{color: "#0A2540"}}
            onClick={() => {
                navigate(`/user/${id}`);
            }}
          >
            <PageviewIcon style={{ marginRight: 5 }} /> View Details
          </a>
          <hr className="navprofiledivider" />
          <a style={{color: "#0A2540"}} onClick={() => navigate(`/edituser/${id}`)}>
            <ModeEditOutlineIcon style={{ marginRight: 5 }} /> Edit Details
          </a>
          <hr className="navprofiledivider" />
          <a style={{color: "#D11A2A"}}>
            <DeleteOutlineIcon style={{ marginRight: 5 }} /> Delete
          </a>
        </div>
        </div>
        : null}
        </TableCell>

        </>
    )
}
export default ActionMenu;