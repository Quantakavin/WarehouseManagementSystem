import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  ChangeTab,
  selectCurrentTab,
  selectOpen,
} from "../../app/reducers/SidebarSlice";
import useWindowSize from "../../hooks/useWindowSize";

interface SidebarLinkType {
  url: string;
  name: string;
  icon: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkType> = ({ url, name, icon }) => {
  const navigate = useNavigate();
  const currenttab = useAppSelector(selectCurrentTab);
  const dispatch = useAppDispatch();
  const isopen = useAppSelector(selectOpen);
  const { viewportwidth } = useWindowSize();

  const changetab = () => {
    dispatch(ChangeTab({ currenttab: name }));
    navigate(url);
  };

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
      classes={{ popper: className }}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  return (
    <ListItem
      onClick={() => changetab()}
      disablePadding
      className="sidebartabcontainer"
      sx={{ background: currenttab === name ? "#3F4D65" : "transparent" }}
    >
      <motion.div
        className="animatable"
        whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.9 }}
      >
        <ListItemButton
          // sx={{
          //   minHeight: 48,
          //   justifyContent: open ? "initial" : "center",
          //   px: 2.5,
          // }}
          sx={{
            flex: 1,
            textAlign: isopen && viewportwidth > 800 ? "left" : "center",
          }}
        >
          <LightTooltip title={name}>
            <ListItemIcon
              sx={{ color: "#bfc3cb", marginLeft: "-2px" }}
              // sx={{
              //   minWidth: 0,
              //   mr: open ? 3 : "auto",
              //   justifyContent: "center",
              // }}
            >
              {icon}
            </ListItemIcon>
          </LightTooltip>
          {isopen && viewportwidth > 800 ? (
            <ListItemText
              primary={name}
              sx={{ marginLeft: "-20px" }}
              // sx={{ opacity: isopen ? 1 : 0, marginLeft: "-20px" }}
            />
          ) : null}
        </ListItemButton>
      </motion.div>
    </ListItem>
  );
};

export default SidebarLink;
