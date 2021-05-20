import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import PictureMain from './imagePic/PictureMain.png'
import PictureSecondaryLeft from './imagePic/PictureSecondaryLeft.png'
import PictureSecondaryThird from './imagePic/PictureSecondaryThird.png'
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppsIcon from '@material-ui/icons/Apps';
import MailIcon from '@material-ui/icons/Mail';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PersonIcon from '@material-ui/icons/Person';
import Blur from 'react-blur'

// Css for material UI property 
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    main:{
        display: "flex",
        height: "100%",
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
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
    appBar: {
        top: 'auto',
        maxWidth: 600,
        maxHeight: 50,
        bottom: 0
    },
  }));

  
const WelcomePage = () => {
    // Loc used to get the current page sate ( This prevents users acessing page with only url)
    const loc = useLocation();
    const classes = useStyles();
    const [authToken, setAuthToken] =  useState(null);
    const [profileInfo, setProfileInfo] =  useState(null);


    useEffect(() => {
        setAuthToken(loc.state.authToken);   
        setProfileInfo(loc.state.profileInfo)
    }, [loc]);

    return(
        // Trying to restrict the width to get an app like experience.
        <div className={classes.root}>
            <Container maxWidth="sm">
                {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
                    <div className={classes.main}>
                        <Grid container 
                              spacing={3}
                              align="center"
                              justify="center"
                        >
                            <Grid item xs={12}>
                                <Typography variant="h3" component="h2" style={{fontFamily:"Gilroy ExtraBold"}}>
                                    Notes
                                </Typography>
                            </Grid>
                            <Grid item xs={12}> 
                                <Typography variant="h5" component="h2" style={{fontFamily:"Gilroy SemiBold"}}>
                                    Personal messages to you
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <div style = {{position: 'relative'}} >
                                            <CardMedia
                                                className={classes.media}
                                                image={PictureMain}
                                                title="Picture 1"
                                            />
                                            {/* Relative positioning of picture to overlay text on image  */}
                                            <div style={{position: 'absolute', color: 'white', top: "90%", left: '15%', transform: 'translateX(-50%)', fontSize:'130%', fontFamily:"Gilroy ExtraBold"}} >Meena, 23</div>
                                            <div style={{position: 'absolute', color: 'white', top: "96%", left: '20%', transform: 'translateX(-50%)', fontSize:'90%', fontFamily:"Gilroy SemiBold"}} >Tap to review 50+ notes</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h4" component="h2" style={{fontFamily:"Gilroy ExtraBold"}}>
                                    Interested in You
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h6" component="h2"  color="textSecondary">
                                   Premium members can view all their likes at once.
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    // onClick={handleSubmit}
                                    style={{fontFamily:"Gilroy SemiBold"}}
                                    >
                                        Upgrade
                                    </Button>
                            </Grid>
                            <Grid item xs={6}>
                            <div style = {{position: 'relative'}} >
                                {/* Blur tag used to blur the images */}
                                <Blur img = {PictureSecondaryLeft} blurRadius={7} enableStyles>
                                    <Card>
                                        <CardContent>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={PictureSecondaryLeft}
                                                    title="Picture 1"
                                                />
                                                 {/* Relative positioning of picture to overlay text on image  */}
                                                <div style={{position: 'absolute', color: 'white', top: "90%", left: '20%', transform: 'translateX(-50%)', fontSize:'130%', fontFamily:"Gilroy ExtraBold"}} >Teena</div>
                                        </CardContent>
                                    </Card>
                                </Blur>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style = {{position: 'relative'}} >
                                    {/* Blur tag used to blur the images */}
                                    <Blur img = {PictureSecondaryThird} blurRadius={7} enableStyles>
                                        <Card>
                                            <CardContent>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={PictureSecondaryLeft}
                                                        title="Picture 1"
                                                    />
                                                    <div style={{position: 'absolute', color: 'white', top: "90%", left: '15%', transform: 'translateX(-50%)', fontSize:'130%', fontFamily:"Gilroy ExtraBold"}} >Beena</div>
                                            </CardContent>
                                        </Card>
                                    </Blur>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <BottomNavigation
                                >
                                <BottomNavigationAction label="Discover" icon={<AppsIcon />} />
                                <BottomNavigationAction label="Notes" icon={<MailIcon />} />
                                <BottomNavigationAction label="Matches" icon={<ChatBubbleIcon />} />
                                <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
                                </BottomNavigation>
                            </Grid>
                        </Grid>
                    </div>
            </Container>
        </div>
    );


}

export default WelcomePage