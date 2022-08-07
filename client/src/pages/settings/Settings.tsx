import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, ButtonBase, Chip, Container, Divider, Grid, Paper, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { GetProfile, Update2FA } from "../../api/UserDB";
import CardSkeleton from "../../Components/skeletons/CardSkeleton";
import ShieldIcon from '@mui/icons-material/Shield';
// import Shield from "@mui/icons-material/Shield";
import Shield from "../../assets/shield.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { enable2FA, disable2FA, selectEnabled2FA, selectId } from "../../app/reducers/CurrentUserSlice";
import { Toast } from "../../Components/alerts/SweetAlert";
import Popup from "../../Components/alerts/Popup";
import { motion } from "framer-motion";
import LockIcon from '@mui/icons-material/Lock';

const Settings: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userID = useAppSelector(selectId);
    const enabled2FA = useAppSelector(selectEnabled2FA);
    // const [checked, setChecked] = useState<boolean>();
    const [showEnableConfirmation, setShowEnableConfirmation] = useState<boolean>(false);
    const [showDisableConfirmation, setShowDisableConfirmation] = useState<boolean>(false);

    interface FormValues {
        enabled2FA: boolean
    }

    const mutation = useMutation((data: FormValues) =>
        Update2FA(data, userID.toString())
    );

    const enable = () => {
        mutation.mutate({ enabled2FA: !enabled2FA }, {
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "2FA enabled successfully",
                    customClass: "swalpopup",
                    timer: 1500,
                });
            },
        });
        dispatch(enable2FA())
        setShowEnableConfirmation(false)
    }

    const disable = () => {
        mutation.mutate({ enabled2FA: !enabled2FA }, {
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "2FA disabled successfully",
                    customClass: "swalpopup",
                    timer: 1500,
                });
            },
        });
        dispatch(disable2FA())
        setShowDisableConfirmation(false)
    }

    const handleChange = () => {
        if (!enabled2FA) {
            setShowEnableConfirmation(true)
        } else {
            setShowDisableConfirmation(true)
        }
        // setChecked(!checked);
    }
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





            <Box
                component="span"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography
                    sx={{ color: "#0A2540", fontWeight: "bold", fontSize: 36, mb: "20px" }}
                >
                    Settings
                </Typography>
            </Box>
            <Box className="flexcontainer" sx={{ maxWidth: "600px" }}>
                <Paper
                    sx={{
                        p: 2,
                        flexGrow: 1,
                        justifyContent: "flex-start",
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item className="flexcontainer" sx={{ mr: "10px", ml: "10px" }}>
                            <img alt="shield icon" src={Shield} height="50px" width="50px" />
                            {/* <ShieldIcon sx={{fontSize: "50px"}}/> */}
                            {/* <img alt="complex" src="/static/images/grid/complex.jpg" /> */}
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h6" style={{ color: "#0A2540", fontWeight: 600 }} component="div">
                                        Enable 2 Factor Authentication
                                    </Typography>
                                    <Typography variant="body2" gutterBottom style={{ color: "#0A2540" }}>
                                        Increase security for your account by using multiple authentication steps.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item className="flexcontainer" sx={{ flexDirection: "column" }}>
                                <Typography variant="subtitle2" component="div" sx={{ mb: "-5px" }}>
                                    Enable
                                </Typography>
                                <Switch
                                    checked={enabled2FA}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>


        </Box>
    );
};
export default Settings;