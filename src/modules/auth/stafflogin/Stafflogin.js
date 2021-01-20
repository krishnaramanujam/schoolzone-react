import React, {useState} from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


import axios from '../../../functions/axios';
import requests from '../../../functions/request';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://dvsl.in/schoolzone/adminlogin.php" rel="noopener" target="_blank">
                dvsl.in
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
  }


  
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function Stafflogin() {
    const classes = useStyles();

    const [formData, setFormData] = useState({username: '', password: '', remember: false});

    const onChange = ({target}) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setFormData(prevState => ({
            ...prevState,
            [target.name] : value
        }));
    }// close onchange


    //Toast 
    const [openToast, setopenToast] = useState({visibility: false,type: '',message: ''});
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        
        setopenToast({visibility: false,type: '',message: ''});
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const reqData = formData;

        async function fetchData(){
            await axios.post(requests.staff_SignIn, reqData)
                .then((response) => {

                    switch (response.data.message) {
                        case 'SUCCESS':
                            window.localStorage.setItem('Token', response.data.token);
                            window.localStorage.setItem('AuthStatus', 'true');
                            window.localStorage.setItem('UserName', response.data.UserName);
                            
                            //Display Alert
                            setopenToast({visibility: true, type:'success', message: 'Successfully Login!'});
                            return window.open('/homescreen');
                            
                        case 'USERNAME_ERROR':
                            //Open Alert//Display Alert
                            setopenToast({visibility: true, type:'error', message: 'Invalid Username!'});

                            
                            break;    
                        case 'PASSWORD_ERROR':
                            //Open Alert
                            setopenToast({visibility: true, type:'error', message: 'Invalid Password!'});
                            break;    
                            
                        default:
                            //Open Alert
                            setopenToast({visibility: true, type:'error', message: 'Server Error'});

                    }// close switch
            
            
                });
        }// close FetchData
        fetchData();

    }// close on handleSubmit

    return (
        <div>   

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    <Typography component="h1" variant="h6" color="primary">
                    (Schoolzone - SIWS)
                    </Typography>
                    
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus value={formData.username} onChange={onChange}
                        />
                        <TextField
                            variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={formData.password} onChange={onChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" name="remember" checked={formData.remember} onChange={onChange} />} label="Remember me" 
                        />
                    
                        <Button
                            type="submit" fullWidth variant="contained" color="primary" className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2"> Forgot password? </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>

            {openToast.visibility ? 
                <Snackbar open={openToast.visibility} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top",horizontal: "right"}}>
                <Alert onClose={handleClose} severity={openToast.type}>
                     {openToast.message}
                </Alert>
                </Snackbar>
                :
                ''
            }

        </div>
    )
}

export default Stafflogin
