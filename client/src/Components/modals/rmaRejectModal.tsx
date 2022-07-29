import { TextField } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { motion } from "framer-motion";
import * as React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: "absolute" as "absolute",
  height: "40%",
  width: "30%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "block",
};

export default function RejectModalButton() {
  const { RmaID } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    console.log(`Typed => ${e.target.value}`);
    setReason(e.target.value);
  };

  const rejectreason = {
    rejectreason: reason,
  };

  const handleConfirm = async () => {
    setLoading(true);
    setTimeout(() => {
      axios
      .put(`http://localhost:5000/api/rejectRMA/${RmaID}`, rejectreason)
      .then(() => navigate("/rma"))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    }, 500)
  };

  return (
    <motion.div
      className="animatable"
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9 }}
    >
      <LoadingButton
        size="small"
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "#D11A2A",
          width: 150,
          height: 50,
          borderRadius: 10,
        }}
        endIcon={<CloseIcon/>}
        onClick={handleOpen}
      >
        Reject
      </LoadingButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <TextField
              value={reason}
              onChange={handleChange}
              required
              id="filled-required"
              label="Reason for rejection"
              variant="filled"
              multiline
              fullWidth
              rows={15}
            />
            <Box
              component="span"
              sx={{
                component: "span",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 3.7,
              }}
            >
            <motion.div
              className="animatable"
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.9 }}
            >
              <LoadingButton
                size="small"
                variant="contained"
                sx={{
                  color: "white",
                  backgroundColor: "#063970",
                  width: 150,
                  height: 50,
                  borderRadius: 10,
                  paddingRight: 4
                }}
                startIcon={<ArrowBackIosNewIcon/>}
                onClick={handleClose}
              >
                Back
              </LoadingButton>
            </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <LoadingButton
                  size="small"
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "#D11A2A",
                    width: 150,
                    height: 50,
                    borderRadius: 10,
                  }}
                  loading={loading}
                  loadingPosition="end"
                  endIcon={<DoneAllIcon/>}
                  onClick={handleConfirm}
                >
                  Confirm
                </LoadingButton>
              </motion.div>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </motion.div>
  );
}
