import { TextField } from "@material-ui/core";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { motion } from "framer-motion";
import * as React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

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

export default function TLoanRejectModalButton() {
  const { TLoanNumber } = useParams();
  const navigate = useNavigate();
  const [remarks, setRemarks] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    console.log(`Typed => ${e.target.value}`);
    setRemarks(e.target.value);
  };

  const tloanremarks = {
    remarks,
  };

  const handleConfirm = async () => {
    axios
      .put(
        `http://localhost:5000/api/tloan/reject/${TLoanNumber}`,
        tloanremarks
      )
      .then(() => navigate("/tloan"))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
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
      <Button
        size="small"
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "#D11A2A",
          width: 200,
          height: 50,
          borderRadius: 10,
        }}
        onClick={handleOpen}
      >
        Reject
      </Button>
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
              value={remarks}
              onChange={handleChange}
              required
              id="filled-required"
              label="Remarks"
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
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    color: "white",
                    backgroundColor: "#063970",
                    width: 150,
                    height: 50,
                    borderRadius: 10,
                  }}
                  onClick={handleClose}
                >
                  Back
                </Button>
              </motion.div>
              <motion.div
                className="animatable"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
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
                >
                  Confirm
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </motion.div>
  );
}
