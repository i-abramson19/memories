import React, { useEffect, useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';

import { gapi } from 'gapi-script';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Auth = () => {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: CLIENT_ID,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const classes  = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) =>!prevShowPassword );

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData,  [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const onSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });

            navigate('/');
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    };

    const onFailure = response => {
        console.log('FAILED', response);
    };
    
    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text': 'password'} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name='confirmPassword' label='Confirm password' handleChange={handleChange} type='password' /> }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    {
                        !isSignup && (
                            <GoogleLogin
                                clientId={CLIENT_ID}
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                className={classes.googleButton}
                            />
                    )}
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;