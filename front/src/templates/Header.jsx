import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import logo from '../assets/images/marvel_logo.png' ;

function ListItemLink(props) {
    const { primary, to } = props;
    
    const renderLink = React.useMemo(
        () =>
          React.forwardRef((itemProps, ref) => (
            // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
            // See https://github.com/ReactTraining/react-router/issues/6056
            <RouterLink to={to} {...itemProps} innerRef={ref} />
          )),
        [to],
      );

    return (
      <li>
        <ListItem button component={renderLink}>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }

ListItemLink.propTypes = {
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}

const useStyles = makeStyles(theme => ({
  
  appBar: {
    backgroundColor: '#202020',
    position: 'relative',
  },
  colorPrimary:{
    backgroundColor: '#202020',
  },
  colorSecondary:{
    backgroundColor: '#A52830',
    color :'#fff',
  },
  toolbarContent:{
    justifyContent:'center',
  },
  toolbarPrimary:{
    justifyContent:'center',
    paddingTop:'0px',
  },
  toolbarHidden:{
    visibility: 'hidden',
  },
  toolbarSecondary: {
    justifyContent:'center',
    overflowX: 'auto',
    display: 'inline-flex',
  },
}));


export default function Menu() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbarPrimary}>
            <img src={logo} alt="logo" href="/home"/>
        </Toolbar>
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
            <List className={classes.toolbarSecondary}>
                <ListItemLink to="/characters" primary="Characters" />
                <ListItemLink to="/comics" primary="Comics" />  
                <ListItemLink to="/comics" primary="Movies" />  
            </List>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}