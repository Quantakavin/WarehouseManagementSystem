import { TextField } from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CancelIcon from "@mui/icons-material/Close";
import DoneAllIcon from "@mui/icons-material/DoneAll";
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
import { Toast } from "../../components/alerts/SweetAlert";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function TLoanRejectModalButton() {
  const { TLoanID } = useParams();
  const navigate = useNavigate();
  const [remarks, setRemarks] = useState("");
  const [open, setOpen] = React.useState(false);
  const [remarksError, setRemarksError] = useState(false);
  const [remarksErrorText, setRemarksErrorText] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    console.log(`Typed => ${e.target.value}`);
    setRemarks(e.target.value);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setRemarksError(false);
    if (remarks === "") {
      setRemarksError(true);
      setRemarksErrorText("Input Is Needed");
    }
    try {
      axios
        .put(`http://localhost:5000/api/tloan/rejectExtension/${TLoanID}`, {
          remarks,
        })
        .then(() => {
          Toast.fire({
            icon: "success",
            title:
              "TLoan Extension For TLoan" +
              "#" +
              TLoanID +
              " Has Been Rejected",
            customClass: "swalpopup",
            timer: 2000,
            width: 700,
          });
          navigate("/tloan");
        });
    } catch (error) {
      this.setState({ errorMessage: error.message });
      console.error("There was an error!", error);
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
          width: 210,
          height: 50,
          borderRadius: 10,
        }}
        endIcon={<CancelIcon />}
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
            <h3
              style={{
                color: "#063970",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Rejecting Extension For Loan #{TLoanID}
            </h3>
            <TextField
              value={remarks}
              onChange={handleChange}
              required
              id="filled-required"
              label="Remarks"
              variant="filled"
              multiline
              fullWidth
              rows={15}
              error={remarksError}
              helperText={remarksErrorText}
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
                  onClick={handleConfirm}
                  endIcon={<DoneAllIcon />}
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
