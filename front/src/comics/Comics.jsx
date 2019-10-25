import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../components/loading';
import { makeStyles } from '@material-ui/core/styles';
import md5 from 'js-md5';

const publicKey = `${process.env.REACT_APP_PUBLIC_API_KEY}`;
const privateKey = `${process.env.REACT_APP_PRIVATE_API_KEY}`;

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
  cardActions: {
    justifyContent: 'center',
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
  select:{
    fontSize: '0.9rem',
  },
}));

export default function Comics() {

  const classes = useStyles();

  const [comics, setComics] = useState([]);
  const [total, setTotal] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const perPageLimit = 20
  //const [values, setValues] = useState({sort: 'A-Z',});

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
 
  // useEffect(() => {
  //   const fetchData = async() => { 
  //     const timestamp = Number(new Date());
  //     const hash = md5.create();
  //     hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);
  //     await fetch(
  //       `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&orderBy=title&limit=9&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
  //     ).then((response)=>{
  //       return response.json();
  //     }).then((response)=>{
  //       setComics(response.data.results);
  //       console.log(response.data);
  //       setTotal(response.data);
  //     }) 
  //   };
  //   fetchData(); 
  // },[]);
  
  async function getComicsList(offset = 0) {
    const timestamp = Number(new Date());
    const hash = md5.create();
    hash.update(timestamp + privateKey + publicKey);
    const offsetResults = (offset === 0) ? 0 : offset+1
    await fetch(`https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&orderBy=title&offset=${offsetResults}&limit=${perPageLimit}&apikey=${publicKey}&hash=${hash.hex()}`) 
      .then(result => result.json())
      .then(response => {
        let comicsData = [...comics.concat(response.data.results)]
        setComics(comicsData)
        console.log(comicsData)
        if (isLoading)
          setLoading(false)
        if (hasMore && comics.length >= response.data.total - 1)
          setHasMore(false)
      })
  }

  useEffect(() => {    
    getComicsList()
  }, [])

  function _onComicClick(id) {
    console.log('Click on', id)
  }

  // const handleChange = event => {
  //   setValues(oldValues => ({
  //     ...oldValues,
  //     [event.target.name]: event.target.value,
  //   }));
  // };
  
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
      {/*<div style={{ float: 'left', marginTop: '5px'}}>
        <Box> 
          {total.total} results
        </Box>  
        </div>
        <div style={{ float: 'right'}}>
        <Box >
          Sort by <Select className={classes.select}
            value={values.sort}
            onChange={handleChange}
            displayEmpty
            name="sort"   
          >
            <MenuItem value='A-Z'>A-Z</MenuItem>
            <MenuItem value='Z-A'>Z-A</MenuItem>
        
          </Select>
        </Box>
      </div>*/}
      {(isLoading) ? <Loading /> :
        <InfiniteScroll style={{ overflow: 'hidden' }}
          dataLength={comics.length}
          next={() => { getComicsList(comics.length) }}
          hasMore={hasMore}
        >
      <Grid container spacing={4}>
        {comics && comics.length > 0 && comics.map(comic => (
          <Grid item key={comic.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
           
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
                <CardActions className={classes.cardActions}>
                  <Button size="small" color="primary" onClick={(event) => _onComicClick(comic.id, event)}>
                      Learn More
                  </Button>
                </CardActions>
              
            </Card>
          </Grid>
        ))}
      </Grid>
      </InfiniteScroll>
      }
    </Container>   
  );
}
//https://www.robinwieruch.de/react-hooks-fetch-data
//https://medium.com/@ecavalcanti/react-native-consumindo-a-api-da-marvel-c444e0bc1c8a
//https://github.com/cod3rcursos/curso-react-redux/blob/master/todo-app/frontend-sem-redux/src/todo/todo.jsx

//https://comiccruncher.com/