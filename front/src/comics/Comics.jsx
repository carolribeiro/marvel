import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
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

export default function Comics() {

  const classes = useStyles();

  const [comics, setComics] = useState([]);

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
        `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&orderBy=title&limit=9&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
      ).then((response)=>{
        return response.json();
      }).then((response)=>{
        setComics(response.data.results);
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
          placeholder="Search comic"
          inputProps={{ 'aria-label': 'search comic' }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Grid container spacing={4}>
        {comics && comics.length > 0 && comics.map(comic => (
          <Grid item key={comic.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia   
                  className={classes.cardMedia}
                  image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  title={comic.title}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {comic.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
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

//https://comiccruncher.com/