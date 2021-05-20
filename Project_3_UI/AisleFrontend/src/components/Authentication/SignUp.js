import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axiosInstance from '../../axios';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    textFieldPhoneExtension: {
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

  
const SignUp = () => {
    // history used to push to next page.
    let history = useHistory();
    const classes = useStyles();
    // Object freeze used so properties cannot be modified without using updateFormData method.
    const initialFormData = Object.freeze({
		extension: '',
		number: '',
	});
	const [formData, updateFormData] = useState(initialFormData);
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
        // Providing data to backend. Appending ext to number 
		axiosInstance
			.post('api/authenticate/verifyNumber',{
                number: formData.extension + formData.number
			})
			.then(response => { 
                // if valid number, then go to otp page
                console.log(response.data.status) 
                console.log(`reponse: ${response.data.status}`) 
                if(response.data.status)
                    history.push( { pathname: '/AuthorizeOTP',
                                        state: { authNumber: response.data.status, phoneNumberEntered: formData.extension + formData.number }} )
                else{
                    // If error, toaster message to inform user of error 
                    toastErrorContainerFunction("Invalid Phone Number")
                }
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
                {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
                    <div className={classes.main}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Typography  style={{fontFamily:"Gilroy SemiBold"}}>
                                    Get OTP 
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="h4" component="h2" style={{fontFamily:"Gilroy ExtraBold"}}>
                                   Enter your Phone Number
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl className={classes.textFieldPhoneExtension} variant="outlined">
                                    <InputLabel htmlFor="Phone Extension">Extension </InputLabel>
                                    <OutlinedInput
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="extension"
                                        name="extension"
                                        autoComplete="extension"
                                        value={formData.extension}
                                        onChange={handleChange}
                                        labelWidth={80}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={10}>
                                <FormControl className={classes.textPhoneNumber} variant="outlined">
                                    <InputLabel htmlFor="Phone Number">Number </InputLabel>
                                    <OutlinedInput
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="number"
                                        name="number"
                                        autoComplete="number"
                                        value={formData.number}
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
                        </Grid>
                    </div>
            </Container>
        </div>
    );


}

export default SignUp