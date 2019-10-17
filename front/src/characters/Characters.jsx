import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import md5 from 'js-md5';

const PUBLIC_KEY = '8346d461fa71a8927973e38199c9d2e4'
const PRIVATE_KEY = '9ca18c5f710af9adb2e9c3d12423824198ada02e'

const useStyles = makeStyles(theme => ({

  colorPrimary: {
    backgroundColor: '#202020',
  },
  colorSecondary: {
    backgroundColor: '#A52830',
    color: '#fff',
  },
  cardGrid: {
    paddingTop: theme.spacing(5), // 8 * 5 = 40px
    paddingBottom: theme.spacing(8), //default 8 = 64px
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Characters() {

  const classes = useStyles();

  const [chars, setChars] = useState([]);

  // async function fetchData() {
  //   const timestamp = Number(new Date());
  //   const hash = md5.create();
  //   hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);
  //   const response = await fetch(
  //     `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
  //   )
  //   const json = await response.json()
  //   setChars({chars:json.data.results})
  //   console.log({chars:json.data.results});
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);
 
  useEffect(() => {
    const fetchData = async() => { 
      const timestamp = Number(new Date());
      const hash = md5.create();
      hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);
      await fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=9&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
      ).then((response)=>{
        return response.json();
      }).then((response)=>{
        setChars(response.data.results);
        console.log(response.data.results);   
      })
      
    };
    fetchData(); 
  },[]);
  
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search character"
          inputProps={{ 'aria-label': 'search character' }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Grid container spacing={4}>
        {chars && chars.length > 0 && chars.map(char => (
          <Grid item key={char.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia   
                className={classes.cardMedia}
                image={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                title={char.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h2">
                  {char.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>   
  );
}
//https://www.robinwieruch.de/react-hooks-fetch-data
//https://medium.com/@ecavalcanti/react-native-consumindo-a-api-da-marvel-c444e0bc1c8a
//https://github.com/cod3rcursos/curso-react-redux/blob/master/todo-app/frontend-sem-redux/src/todo/todo.jsx