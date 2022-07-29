import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PageviewIcon from "@mui/icons-material/Pageview";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TableCell,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface MenuProps {
  id: number | string;
}
const ActionMenu: React.FC<MenuProps> = ({ id }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <TableCell sx={{ color: "#0A2540" }} align="center">
        <Button
          sx={{ color: "#0A2540" }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            sx={{ color: "#0A2540" }}
            onClick={() => navigate(`/user/${id}`)}
          >
            <ListItemIcon>
              <PageviewIcon sx={{ color: "#0A2540" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: "14px" }}>
              View Details
            </ListItemText>
          </MenuItem>
          <MenuItem
            sx={{ color: "#0A2540", fontSize: "15px" }}
            onClick={() => navigate(`/edituser/${id}`)}
          >
            <ListItemIcon>
              <ModeEditOutlineIcon sx={{ color: "#0A2540" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: "14px" }}>
              Edit Details
            </ListItemText>
          </MenuItem>
          <MenuItem sx={{ color: "#D11A2A", fontSize: "15px" }}>
            <ListItemIcon>
              <DeleteOutlineIcon sx={{ color: "#D11A2A" }} fontSize="small" />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: "14px" }}>
              Delete
            </ListItemText>
          </MenuItem>
        </Menu>
      </TableCell>
    </>
  );
};
export default ActionMenu;
