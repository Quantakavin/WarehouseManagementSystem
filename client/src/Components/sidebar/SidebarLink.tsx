import { ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChangeTab, selectCurrentTab, selectOpen } from "../../app/reducers/SidebarSlice";

interface SidebarLink {
  url: string;
  name: string;
  icon: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLink> = ({ url, name, icon }) => {
  const navigate = useNavigate();
  const currenttab = useAppSelector(selectCurrentTab);
  const dispatch = useAppDispatch();
  const isopen = useAppSelector(selectOpen);

  const changetab = () => {
    dispatch(ChangeTab({ currenttab: name }));
    navigate(url);
  };


const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

  return (
     <ListItem
            onClick={() => changetab()}
            disablePadding
            className="sidebartabcontainer"
            sx={{ background: (currenttab === name) ? "#3F4D65" : "transparent"}}
          >
            <ListItemButton
              // sx={{
              //   minHeight: 48,
              //   justifyContent: open ? "initial" : "center",
              //   px: 2.5,
              // }}
              sx={{
                flex: 1,
                textAlign: isopen ? "left" : "center",
              }}
            >
              <LightTooltip title={name}>
              <ListItemIcon
              sx={{color: "#bfc3cb", marginLeft: "-2px"}}
                // sx={{
                //   minWidth: 0,
                //   mr: open ? 3 : "auto",
                //   justifyContent: "center",
                // }}
              >
                {icon}
              </ListItemIcon>
              </LightTooltip>
              {isopen ?
              <ListItemText
                primary={name}
                sx={{ marginLeft: "-20px" }}
                // sx={{ opacity: isopen ? 1 : 0, marginLeft: "-20px" }}
              />: null}
            </ListItemButton>
          </ListItem>
  );
};

export default SidebarLink;

    {/* <div
      className="sidebartabcontainer"
      style={{ background: currenttab === name ? "#3F4D65" : "transparent" }}
    >
      <button
        onClick={() => changetab()}
        className="buttonremovestyling"
        style={{
          flex: 1,
          marginLeft: "10%",
          marginTop: 8,
          marginBottom: 8,
          textAlign: "left",
        }}
      >
        {icon} {name}
      </button>
    </div> */}