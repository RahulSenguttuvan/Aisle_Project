import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axiosInstance from '../../axios';
import { IconButton, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@material-ui/icons/Edit';

// Css for material UI property 
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    main:{
        position: "absolute",
        display: "flex",
        height: "80%",
        padding: '1%',
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textFieldOTP: {
		width: '15ch',
	},
    textPhoneNumber: {
        width: '20ch',
    },
    submit: {
		background: 'yellow',
        color: 'black',
        whiteSpace: 'normal',
        borderRadius: '20%',
	},
  }));

  
const AuthorizeOtp = () => {
    // history used to push to next page.
    let history = useHistory();
    // Loc used to get the current page sate ( This prevents users acessing page with only url)
    const loc = useLocation();
    const classes = useStyles();
    const [authPhone, setAuthPhone] =  useState(null);
    const [seconds, setSeconds] = useState(60);
    const [currPhoneNumber, setCurrPhoneNumber] =  useState(null);
    // Object freeze used so properties cannot be modified without using updateFormData method.
    const initialFormData = Object.freeze({
		OTP: '',
        authorizationToken: '',
	});
	const [formData, updateFormData] = useState(initialFormData);

    // As soon as page loads, loc state must be set and timer should start from 60 
    useEffect(() => {
        setAuthPhone(loc.state.authNumber);   
        setCurrPhoneNumber(loc.state.phoneNumberEntered); 
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000);     
    }, [loc]);
    
    // startTimer called when page loads and should be checked whenever there is a change in seconds state 
    useEffect(() => {
        startTimer()
    }, [seconds]);

    // Function used to check if seconds hits 0, if 0 go to prev page.
    const startTimer = () => {
        if( seconds == 0 ){
            history.push('/')
        }
    }
    // Function used to populate state as user types.
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
	};

    // handle submit called when button clicked.
    const handleSubmit = (e) =>{
		e.preventDefault();
        // Providing data to backend 
		axiosInstance
			.post('api/authenticate/verifyOTP/',{
                otp: formData.OTP,
                number: currPhoneNumber
			})
			.then(response => { 
                // If API request is completed succesfully, check if otp valid.
                console.log(`reponse: ${response.data.token}`)
                if(response.data.token){
                    // If valid OTP, send auth key to get profile info
                    axiosInstance
                        .post('api/getProfileInfo/',{
                            authorizationToken: response.data.token,
                        })
                        .then(response => { 
                            // Once API returns object, push to next page.
                            console.log(`reponse: ${response.data}`)
                            history.push( { pathname: '/profileHome',
                                        state: { profileInfo: response.data }})
                        })
                        .catch(error => {
                            // If error, toaster message to inform user of error 
                            console.log(`reponse: ${error}`)
                            toastErrorContainerFunction("Could not get profile info")
                        });
                }
                else
                    toastErrorContainerFunction("Invalid OTP")
			})
			.catch(error => {
                console.log(`reponse: ${error}`)
			});
	}
    // Added toast configure to fix display
    toast.configure();
    function toastErrorContainerFunction(message) {
        toast.error(message, {
          position: "top",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
          return (
              <ToastContainer
                position="top"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
          );
      }

    return(
        // Trying to restrict the width to get an app like experience.
        <div className={classes.root}>
            <Container maxWidth="sm">
                {/* Container restricted to mobile type view in browser */}
                {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
                    <div className={classes.main}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <FormControl className={classes.textPhoneNumber} variant="outlined">
                                    <InputLabel htmlFor="Phone Number">Number </InputLabel>
                                    <OutlinedInput
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="number"
                                        name="number"
                                        autoComplete="number"
                                        value={currPhoneNumber}
                                        onChange={handleChange}
                                        labelWidth={80}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton color="primary">
                                    <EditIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="h4" component="h2" style={{fontFamily:"Gilroy ExtraBold"}}>
                                   Enter The OTP
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.textFieldOTP} variant="outlined">
                                    <InputLabel htmlFor="Phone Extension">OTP </InputLabel>
                                    <OutlinedInput
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="OTP"
                                        name="OTP"
                                        autoComplete="OTP"
                                        value={formData.OTP}
                                        onChange={handleChange}
                                        labelWidth={80}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    onClick={handleSubmit}
                                >
                                    Continue
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography style={{fontFamily:"Gilroy SemiBold"}}>
                                    {seconds}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
            </Container>
        </div>
    );


}

export default AuthorizeOtp