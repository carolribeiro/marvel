import React, { useState, useEffect } from 'react';
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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../components/loading';
import Modal from '@material-ui/core/Modal';
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
  select: {
    fontSize: '0.9rem',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Characters() {

  const classes = useStyles();

  const [characters, setCharacters] = useState([]);
  const [total, setTotal] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const perPageLimit = 20;
  const [hasMore, setHasMore] = useState(true);
  //const [values, setValues] = useState({sort: 'A-Z',});

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getCharacterList(offset = 0) {
    const timestamp = Number(new Date());
    const hash = md5.create();
    hash.update(timestamp + privateKey + publicKey);
    const offsetResults = (offset === 0) ? 0 : offset + 1
    await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&offset=${offsetResults}&limit=${perPageLimit}&apikey=${publicKey}&hash=${hash.hex()}`)
      .then(result => result.json())
      .then(response => {
        const charactersData = [...characters.concat(response.data.results)]
        setCharacters(charactersData)
        setTotal(response.data.total)
        console.log(charactersData)
        if (isLoading)
          setLoading(false)
        if (hasMore && characters.length >= response.data.total - 1)
          setHasMore(false)
      })
  }

  useEffect(() => {
    getCharacterList()
  }, [])

  function _onCharacterClick(id) {
    console.log('Click on', id)
  }

  function search(name) {
    console.log('Click on', name)
  }

  // useEffect(() => {
  //   const fetchData = async() => { 
  //     const timestamp = Number(new Date());
  //     const hash = md5.create();
  //     hash.update(timestamp + privateKey + publicKey);
  //     await fetch(
  //       `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=9&apikey=${publicKey}&hash=${hash.hex()}`
  //     ).then((response)=>{
  //       return response.json();
  //     }).then((response)=>{
  //       setChars(response.data.results);
  //       setTotal(response.data.total);

  //     })   
  //   };
  //   fetchData(); 
  // },[]);

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
          placeholder="Search character"
          inputProps={{ 'aria-label': 'search character' }}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton className={classes.iconButton} onClick={(event) => search(characters.name, event)} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {/*<div style={{ float: 'left', marginTop: '5px'}}>
        <Box> 
          {total} results
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
      </div> */}
      {(isLoading) ? <Loading /> :
        <InfiniteScroll style={{ overflow: 'hidden' }}
          dataLength={characters.length}
          next={() => { getCharacterList(characters.length) }}
          hasMore={hasMore}
        >
          <Grid container spacing={4}>
            {characters && characters.length > 0 && characters.map(char => (
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
                  <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" onClick={(event) => _onCharacterClick(char.id, event)}>
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
//https://github.com/MatheusHAS/reactjs-marvel-api
//https://www.robinwieruch.de/react-hooks-fetch-data
//https://medium.com/@ecavalcanti/react-native-consumindo-a-api-da-marvel-c444e0bc1c8a
//https://github.com/cod3rcursos/curso-react-redux/blob/master/todo-app/frontend-sem-redux/src/todo/todo.jsx