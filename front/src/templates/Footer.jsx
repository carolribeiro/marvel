import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/images/marvel_logo_footer.png' ;

function Copyright() {
    return (
      <Typography variant="body2" color="textPrimary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles(theme => ({
    
    footer: {
      backgroundColor: '#202020',
      padding: theme.spacing(6),
    },
    
  }));


export default function Footer() {
    const classes = useStyles();
    return (
    <footer className={classes.footer}>
        <img src={logo} alt="logo" href="/home"/>
        <Copyright />
    </footer>
    )
}