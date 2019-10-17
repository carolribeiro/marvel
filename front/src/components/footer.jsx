import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/images/logo.svg' ;

function Copyright() {
    return (
      <Typography variant="body2" align="center">
        {'© '}       
        {new Date().getFullYear()}{' '}
        <Link color="inherit" href="https://github.com/carolribeiro" target='_blank'>
          Carol
        </Link>
      </Typography>
    );
  }

  const useStyles = makeStyles(theme => ({
    
    footer: {
      backgroundColor: '#000',
      padding: theme.spacing(6),
      color:'#fff',
    },
    footerLogo:{
      display: 'block',
      height: 'auto',
      width: '130px',
      margin: '23px auto 0 auto',
      paddingBottom: '23px',
    },
    
  }));


export default function Footer() {
    const classes = useStyles();
    return (
    <footer className={classes.footer}>
        <img src={logo} alt="logo" href="/home" className={classes.footerLogo}/>
        <Copyright />
    </footer>
    )
}