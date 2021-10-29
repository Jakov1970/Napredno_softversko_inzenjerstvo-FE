import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useDispatch } from 'react-redux';

const Auth = () => {
    const classes = useStyles();
    const [isSignedup, setIsSignedup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const switchMode = () => {
        setIsSignedup((prevIsSignedUp) => !prevIsSignedUp);
        handleShowPassword(false);
    }
 
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try{
            dispatch({type: 'AUTH', data: {result, token }});
            history.push('/');
        }
        catch(error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try Again later.');
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignedup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignedup && (
                                <div>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autofocus half />
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autofocus half />
                                </div>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignedup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignedup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId="304135834634-qdq2qdcaoe151jk6ll5ujf61fufhoq3e.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid type="container" jusitfy="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                            {
                                isSignedup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"
                            }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth