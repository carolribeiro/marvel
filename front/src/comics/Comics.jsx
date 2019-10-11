// import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
  
//     colorPrimary:{
//       backgroundColor: '#202020',
//     },
//     colorSecondary:{
//       backgroundColor: '#A52830',
//       color :'#fff',
//     },
//     cardGrid: {
//       paddingTop: theme.spacing(8),
//       paddingBottom: theme.spacing(8),
//     },
//     card: {
//       height: '100%',
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     cardMedia: {
//       paddingTop: '56.25%', // 16:9
//     },
//     cardContent: {
//       flexGrow: 1,
//     },
//   }));
  
//   const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// export default function Characters() {
//     const classes = useStyles();
//     return(
//         <Container className={classes.cardGrid} maxWidth="md">
//             <Grid container spacing={4}>
//               {cards.map(card => (
//                 <Grid item key={card} xs={12} sm={6} md={4}>
//                   <Card className={classes.card}>
//                     <CardMedia
//                       className={classes.cardMedia}
//                       image="https://source.unsplash.com/random"
//                       title="Image title"
//                     />
//                     <CardContent className={classes.cardContent}>
//                       <Typography gutterBottom variant="h5" component="h2">
//                         Heading
//                       </Typography>
//                       <Typography>
//                         This is a media card. You can use this section to describe the content.
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       <Button size="small" color="primary">
//                         View
//                       </Button>
//                       <Button size="small" color="primary">
//                         Edit
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//         </Container>
//     );
    
// }

import React, { Component, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
    paddingTop: theme.spacing(8),
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
}));

export default function Comics() {

  const classes = useStyles();

  const [chars, setChars] = useState([]);

  async function fetchData() {
    const timestamp = Number(new Date());
    const hash = md5.create();
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
    )
    const json = await response.json()
    setChars({chars:json.data.results})
    console.log({chars:json.data.results});
  }

  useEffect(() => {
    fetchData();
  }, []);
 
  // useEffect(() => {
  //   const fetchData = async() => { 
  //     const timestamp = Number(new Date());
  //     const hash = md5.create();
  //     hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);
  //     const response = await fetch(
  //       `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
  //     )
  //     const json = await response.json()
  //     setChars({chars:json.data.results});
  //     console.log(json.data.results);   
  //   };
  //   fetchData(); 
  // },[]);
  
   //https://stackoverflow.com/questions/55667021/cannot-read-property-map-of-undefined-with-react-hooks
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
      {JSON.stringify(chars)}
        {chars && chars.length > 0 && chars.map(char => (
          <Grid item key={char.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia   
                className={classes.cardMedia}
                image={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                title={char.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {char.name}
                </Typography>
                <Typography>
                  {char.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
                  <Button size="small" color="primary">
                  Edit
                </Button>
              </CardActions>
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