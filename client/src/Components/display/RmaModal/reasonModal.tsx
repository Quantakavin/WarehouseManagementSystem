import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@material-ui/core";
import { width } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Box2 } from "three";

const style = {
  position: "absolute" as "absolute",
  height: "70%",
  width: "70%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "block",
};

export default function ReasonModalButton() {
  let { RmaID } = useParams();
  const navigate = useNavigate();
  const [rma, setRma] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const rma = await axios.get(`http://localhost:5000/api/RMA/${RmaID}`);

      setRma(rma.data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <div>
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
        onClick={handleOpen}
      >
        View Reason
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
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{
                marginLeft: 0,
                color: "#D11A2A",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              <h2>Reason for rejection</h2>
              <Box sx={{ height: "90%", color: "black", fontWeight: "normal" }}>
                {rma.RejectReason}
              </Box>
            </Typography>
            <Box sx={{ display: "flex", height: 1, width: 1 }}>
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
                  Close
                </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
