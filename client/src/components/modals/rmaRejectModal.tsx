import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { LoadingButton } from "@mui/lab";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import config from "../../config/config";
import { Toast } from "../alerts/SweetAlert";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "background.paper",
  boxShadow: 24,
  p: 4,
};

const RejectModalButton = () => {
  const { RmaID } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setError(false);
    setErrorText("");
    setOpen(false);
  };
  const handleChange = (e) => {
    console.log(`Typed => ${e.target.value}`);
    setReason(e.target.value);
  };

  const rejectreason = {
    rejectreason: reason,
  };

  const handleConfirm = async () => {
    setLoading(true);
    if (reason !== "") {
      setTimeout(() => {
        setLoading(false);
        axios
          .put(`${config.baseURL}/rejectRMA/${RmaID}`, rejectreason)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: `RMA #${RmaID} Rejected`,
              customClass: "swalpopup",
              timer: 2000,
              width: 310,
            });
            navigate("/rma");
          })
          .catch((e) => {
            console.error("There was an error!", e);
          });
      }, 500);
    } else {
      setError(true);
      setErrorText("Please provide a reason for rejecting this RMA request");
      Toast.fire({
        icon: "error",
        title: "Please provide a reason for rejection",
        customClass: "swalpopup",
        timer: 2000,
        width: 450,
      });
      setLoading(false);
    }
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
        endIcon={<CloseIcon />}
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
            <h2
              style={{
                color: "#063970",
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              Rejecting RMA #{RmaID}
            </h2>
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
              onBlur={() => {
                if (reason === "") {
                  setError(true);
                  setErrorText(
                    "Please provide a reason for rejecting this RMA request"
                  );
                } else {
                  setError(false);
                  setErrorText("");
                }
              }}
              error={error}
              helperText={errorText}
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
                    paddingRight: 4,
                  }}
                  startIcon={<ArrowBackIosNewIcon />}
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
                  endIcon={<DoneAllIcon />}
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
};

export default RejectModalButton;
