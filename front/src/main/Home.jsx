import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import banner from '../assets/images/fundo.jpeg';

const useStyles = makeStyles(theme => ({
  
  colorPrimary:{
    backgroundColor: '#202020',
  },
  colorSecondary:{
    backgroundColor: '#A52830',
    color :'#fff',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  banner:{
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'block',
    margin: '0 auto',
    maxWidth: '1600px',
    overflow: 'hidden',
    top: '0',
    width: 'auto',
    zIndex: '0',
    height: '562px',
  },
}));

export default function Home (){
  const classes = useStyles();
    return (
      <React.Fragment>
        <main>
          <Paper>
            <div className={classes.banner}>
              <img src={banner} alt="banner"/>
            </div>  
          </Paper>
          <div className={classes.heroContent}>
            <Container maxWidth="md">            
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Last comics
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Something short and leading about the collection below—its contents, the creator, etc.
                Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                entirely.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" className={classes.colorSecondary}>
                      Main call to action
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>
      </React.Fragment>
    );

}