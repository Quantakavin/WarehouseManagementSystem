import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

interface PopupProps {
  showpopup: boolean;
  heading: string;
  subheading: string;
  popupimage: React.ReactNode;
  closepopup: () => void;
  buttons?: React.ReactNode;
}


const Popup: React.FC<PopupProps> = ({showpopup, heading, subheading, popupimage, closepopup, buttons}) => {

  const popupstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "600px",
    bgcolor: 'background.paper',
    border: '1px solid #d3d3d3',
    textAlign: 'center',
    boxShadow: 24,
    outline: 0,
    borderRadius: "10px",
    pt: 5,
    px: 10,
    pb: 5
  };

    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showpopup}
        onClose={() => closepopup()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showpopup}>
          <Box sx={popupstyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ fontSize: "25px" }}>
              {heading}
            </Typography>
            {popupimage}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {subheading}
            </Typography>
            <div className="flexcontainer" style={{ flexDirection: "row", marginTop: 20 }}>
              {buttons}
            </div>
          </Box>
        </Fade>
      </Modal>
    )
}

export default Popup;