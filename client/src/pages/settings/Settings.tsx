import {
  Backdrop,
  Box,
  Fade,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LockIcon from "@mui/icons-material/Lock";
import PasswordIcon from "@mui/icons-material/Password";
import TelegramIcon from "@mui/icons-material/Telegram";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { motion } from "framer-motion";
import { Update2FA } from "../../api/UserDB";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  disable2FA,
  enable2FA,
  selectEnabled2FA,
  selectId,
  selectTelegramID,
} from "../../app/reducers/CurrentUserSlice";
import Shield from "../../assets/shield.png";
import Popup from "../../components/alerts/Popup";
import { Toast } from "../../components/alerts/SweetAlert";
import config from "../../config/config";
import useWindowSize from "../../hooks/useWindowSize";
import { ChangeTab } from "../../app/reducers/SidebarSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface State {
  password: string;
  showPassword: boolean;
}
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9@$!%*#?&]{8,}$/i;
const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector(selectId);
  const enabled2FA = useAppSelector(selectEnabled2FA);
  const currentTeleID = useAppSelector(selectTelegramID);
  const [enabledTele, setEnabledTele] = useState(false);
  useEffect(() => {
    setEnabledTele(currentTeleID !== null);
    dispatch(ChangeTab({ currenttab: "Null" }));
  }, []);
  const [showEnableConfirmation, setShowEnableConfirmation] =
    useState<boolean>(false);
  const [showDisableConfirmation, setShowDisableConfirmation] =
    useState<boolean>(false);
  const [showTeleDisableConfirmation, setShowTeleDisableConfirmation] =
    useState<boolean>(false);
  const [telegramID, setTelegramID] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [pwerror, setPWError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const { viewportwidth } = useWindowSize();
  const handleClose = () => {
    setError(false);
    setErrorText("");
    setOpen(false);
  };
  const TeleID = {
    telegramid: telegramID,
  };
  const DisableTeleID = {
    TelegramID: null,
  };
  const newpassword = {
    password: values.password,
  };
  const isNumbers = (str) => /^[0-9]*$/.test(str);
  const handleTeleTextChange = (e) => {
    const { value } = e.target;
    if (isNumbers(value)) {
      setTelegramID(e.target.value);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    if (telegramID !== "") {
      setLoading(false);
      setOpen(false);
      axios
        .put(`${config.baseURL}/userTele/${userID}`, TeleID, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          console.log("called");
          setEnabledTele(true);
          Toast.fire({
            icon: "success",
            title: `Telegram Notifications Enabled`,
            customClass: "swalpopup",
            timer: 2000,
            width: 310,
          });
        })
        .catch((e) => {
          console.log(e);
          console.error("There was an error!", e);
        });
    } else {
      setError(true);
      setErrorText("Please provide your Telegram User ID");
      Toast.fire({
        icon: "error",
        title: "Please provide your Telegram User ID",
        customClass: "swalpopup",
        timer: 2000,
        width: 450,
      });
      setLoading(false);
    }
  };
  const handleDisableTeleConfirm = async () => {
    setLoading(true);
    setLoading(false);
    axios
      .put(`${config.baseURL}/userTele/${userID}`, DisableTeleID, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setShowTeleDisableConfirmation(false);
        setEnabledTele(false);
        Toast.fire({
          icon: "success",
          title: `Telegram Notifications Disabled`,
          customClass: "swalpopup",
          timer: 2000,
          width: 310,
        });
      })
      .catch((error) => {
        console.log(error);
        console.error("There was an error!", error);
      });
  };
  // Password modal open/close
  const handleOpenChangePassword = () => {
    setShowChangePassword(true);
  };
  const handleCloseChangePassword = () => {
    setPWError(false);
    setShowChangePassword(false);
    setValues({ password: "", showPassword: false });
  };
  // Handle change of text in password field
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleChangePassword = async () => {
    setLoading(true);
    setPWError(false);
    if (!values.password.match(passwordRegex) && values.password !== "") {
      setPWError(true);
      Toast.fire({
        icon: "error",
        title: "Please enter a valid password!",
        customClass: "swalpopup",
        timer: 2000,
        width: 400,
      });
      setLoading(false);
    } else if (values.password === "") {
      setPWError(true);
      Toast.fire({
        icon: "error",
        title: "Please enter a new password",
        customClass: "swalpopup",
        timer: 2000,
        width: 380,
      });
      setLoading(false);
    } else if (values.password !== "" && values.password.match(passwordRegex)) {
      setLoading(false);
      setPWError(false);
      setShowChangePassword(false);
      axios
        .put(`${config.baseURL}/userpassword/${userID}`, newpassword, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          Toast.fire({
            icon: "success",
            title: `Successfully changed password`,
            customClass: "swalpopup",
            timer: 2000,
            width: 400,
          });
        })
        .catch((error) => {
          Toast.fire({
            icon: "error",
            title: `Failed to change password`,
            customClass: "swalpopup",
            timer: 2000,
            width: 310,
          });
          console.log(error);
          console.error("There was an error!", error);
        });
      setValues({ password: "", showPassword: false });
    }
  };
  interface FormValues {
    enabled2FA: boolean;
  }
  const mutation = useMutation((data: FormValues) =>
    Update2FA(data, userID.toString())
  );
  const enable = () => {
    mutation.mutate(
      { enabled2FA: !enabled2FA },
      {
        onSuccess: () => {
          Toast.fire({
            icon: "success",
            title: "2FA enabled successfully",
            customClass: "swalpopup",
            timer: 1500,
          });
        },
      }
    );
    dispatch(enable2FA());
    setShowEnableConfirmation(false);
  };
  const disable = () => {
    mutation.mutate(
      { enabled2FA: !enabled2FA },
      {
        onSuccess: () => {
          Toast.fire({
            icon: "success",
            title: "2FA disabled successfully",
            customClass: "swalpopup",
            timer: 1500,
          });
        },
      }
    );
    dispatch(disable2FA());
    setShowDisableConfirmation(false);
  };
  const handle2FAChange = () => {
    if (!enabled2FA) {
      setShowEnableConfirmation(true);
    } else {
      setShowDisableConfirmation(true);
    }
    // setChecked(!checked);
  };
  const handleTeleChange = () => {
    if (enabledTele === false) {
      setOpen(true);
      //   setShowTeleEnableConfirmation(true);
    } else {
      setShowTeleDisableConfirmation(true);
      //   setShowTeleDisableConfirmation(true);
    }
    // setChecked(!checked);
  };
  return (
    <Box sx={{ pl: 3, pr: 3, pt: 1, height: "100%", width: "100%" }}>
      <Popup
        showpopup={showEnableConfirmation}
        heading="Are you sure you want to enable 2FA"
        subheading="By doing so, you will have to enter a 6 digit code sent to your phone no every time you login"
        popupimage={<LockIcon sx={{ color: "#31A961", fontSize: "150px" }} />}
        closepopup={() => setShowEnableConfirmation(false)}
        buttons={
          <>
            <button
              style={{ alignSelf: "flex-start" }}
              className="cardbackbutton"
              onClick={() => setShowEnableConfirmation(false)}
              type="button"
            >
              Cancel
            </button>
            <motion.button
              style={{ alignSelf: "flex-end" }}
              className="normalbutton"
              onClick={() => enable()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enable
            </motion.button>
          </>
        }
      />
      <Popup
        showpopup={showDisableConfirmation}
        heading="Are you sure you want to disable 2FA"
        subheading="By doing so, you would lose an additional layer of security for your account"
        popupimage={<LockIcon sx={{ color: "#31A961", fontSize: "150px" }} />}
        closepopup={() => setShowDisableConfirmation(false)}
        buttons={
          <>
            <button
              style={{ alignSelf: "flex-start" }}
              className="cardbackbutton"
              onClick={() => setShowDisableConfirmation(false)}
              type="button"
            >
              Cancel
            </button>
            <motion.button
              style={{ alignSelf: "flex-end" }}
              className="deletebutton"
              onClick={() => disable()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Disable
            </motion.button>
          </>
        }
      />
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
              variant="h6"
              component="h2"
              sx={{
                display: "flex",
                fontSize: "25px",
                justifyContent: "center",
              }}
            >
              Enable Telegram Notifications
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TelegramIcon
                sx={{
                  color: "#2AABEE",
                  fontSize: "150px",
                  alignSelf: "center",
                }}
              />
            </Box>
            <TextField
              value={telegramID}
              onChange={handleTeleTextChange}
              required
              id="filled-required"
              label="Telegram User ID"
              variant="filled"
              multiline
              fullWidth
              onBlur={() => {
                if (telegramID === "") {
                  setError(true);
                  setErrorText("Please enter your Telegram User ID");
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
                    backgroundColor: "#31A961",
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
      <Popup
        showpopup={showTeleDisableConfirmation}
        heading="Are you sure you want to disable Telegram Notifications?"
        subheading="You will no longer receive notification from the ISDNWMS Telegram bot regarding your RMA and T-Loan requests."
        popupimage={
          <TelegramIcon sx={{ color: "#2AABEE", fontSize: "150px" }} />
        }
        closepopup={() => setShowDisableConfirmation(false)}
        buttons={
          <>
            <button
              style={{ alignSelf: "flex-start" }}
              className="cardbackbutton"
              onClick={() => setShowTeleDisableConfirmation(false)}
              type="button"
            >
              Cancel
            </button>
            <motion.button
              style={{ alignSelf: "flex-end" }}
              className="deletebutton"
              onClick={handleDisableTeleConfirm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Disable
            </motion.button>
          </>
        }
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showChangePassword}
        onClose={handleCloseChangePassword}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showChangePassword}>
          <Box sx={style}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                display: "flex",
                fontSize: "25px",
                justifyContent: "center",
              }}
            >
              Change Password
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PasswordIcon
                sx={{
                  color: "black",
                  fontSize: "150px",
                  alignSelf: "center",
                }}
              />
            </Box>
            <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                error={pwerror}
                onBlur={() => {
                  if (
                    values.password === "" ||
                    !values.password.match(passwordRegex)
                  ) {
                    setPWError(true);
                  } else {
                    setPWError(false);
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />{" "}
              {!!pwerror && values.password === "" && (
                <FormHelperText error>Please enter a password</FormHelperText>
              )}
              {!!pwerror &&
                !values.password.match(passwordRegex) &&
                values.password !== "" && (
                  <FormHelperText error>
                    Password should be over 8 characters long with a mix of
                    uppercase/lowercase letters and numbers
                  </FormHelperText>
                )}
            </FormControl>
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
                  onClick={handleCloseChangePassword}
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
                    backgroundColor: "#31A961",
                    width: 150,
                    height: 50,
                    borderRadius: 10,
                  }}
                  loading={loading}
                  loadingPosition="end"
                  endIcon={<DoneAllIcon />}
                  onClick={handleChangePassword}
                >
                  Confirm
                </LoadingButton>
              </motion.div>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Box
        component="span"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          sx={{
            color: "#0A2540",
            fontWeight: "bold",
            fontSize: 36,
            mb: "20px",
          }}
        >
          Settings
        </Typography>
      </Box>
      <Box className="flexcontainer" sx={{ maxWidth: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={viewportwidth < 1000 ? 12 : 6}>
            <Paper
              sx={{
                p: 2,
                flexGrow: 1,
                justifyContent: "flex-start",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#FFFFFF",
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  className="flexcontainer"
                  sx={{ mr: "10px", ml: "10px" }}
                >
                  <img
                    alt="shield icon"
                    src={Shield}
                    height="50px"
                    width="50px"
                  />
                  {/* <ShieldIcon sx={{fontSize: "50px"}}/> */}
                  {/* <img alt="complex" src="/static/images/grid/complex.jpg" /> */}
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="h6"
                        sx={{ color: "#0A2540", fontWeight: 600 }}
                        component="div"
                      >
                        Enable 2 Factor Authentication
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{ color: "#0A2540" }}
                      >
                        Increase security for your account by using multiple
                        authentication steps.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className="flexcontainer"
                    sx={{ flexDirection: "column" }}
                  >
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ mb: "-5px" }}
                    >
                      Enable
                    </Typography>
                    <Switch
                      checked={enabled2FA}
                      onChange={handle2FAChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={viewportwidth < 1000 ? 12 : 6}>
            <Paper
              sx={{
                p: 2,
                flexGrow: 1,
                justifyContent: "flex-start",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  className="flexcontainer"
                  sx={{ mr: "10px", ml: "10px" }}
                >
                  <TelegramIcon sx={{ fontSize: "50px", color: "#2AABEE" }} />
                  {/* <img alt="complex" src="/static/images/grid/complex.jpg" /> */}
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="h6"
                        style={{ color: "#0A2540", fontWeight: 600 }}
                        component="div"
                      >
                        Enable Telegram Notifications
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{ color: "#0A2540" }}
                      >
                        Receive updates on your RMA and T-Loan requests via the
                        ISDNMS Telegram bot.
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className="flexcontainer"
                    sx={{ flexDirection: "column" }}
                  >
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{ mb: "-5px" }}
                    >
                      Enable
                    </Typography>
                    <Switch
                      checked={enabledTele}
                      onChange={handleTeleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={viewportwidth < 1000 ? 12 : 6}>
            <Paper
              sx={{
                p: 2,
                flexGrow: 1,
                justifyContent: "flex-start",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
              onClick={handleOpenChangePassword}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  className="flexcontainer"
                  sx={{ mr: "10px", ml: "10px" }}
                >
                  <PasswordIcon sx={{ fontSize: "50px", color: "black" }} />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="h6"
                        style={{ color: "#0A2540", fontWeight: 600 }}
                        component="div"
                      >
                        Change Password
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{ color: "#0A2540" }}
                      >
                        Change your account password.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default Settings;
