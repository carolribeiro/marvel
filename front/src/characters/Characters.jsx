import React, { Component } from 'react';
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

export default class Comics extends Component {

  state = {
    data: []
  }

  async componentDidMount() {
    const timestamp = Number(new Date());
    const hash = md5.create();
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);

    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
    )
    const responseJson = await response.json()
    this.setState({ data: responseJson.data.results })
    console.log(responseJson.data.results);
  }

  render() {
    return (
      <Container  maxWidth="md">
        <Grid container spacing={4}>
          {this.state.data.map(chars => (
            <Grid item key={chars.name} xs={12} sm={6} md={4}>
              <Card >
                <CardMedia   
                  image={`${chars.thumbnail.path}.${chars.thumbnail.extension}`}
                  title={chars.name}
                />
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    {chars.name}
                  </Typography>
                  <Typography>
                    {chars.description}
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
}
//https://www.robinwieruch.de/react-hooks-fetch-data
//https://medium.com/@ecavalcanti/react-native-consumindo-a-api-da-marvel-c444e0bc1c8a
//https://github.com/cod3rcursos/curso-react-redux/blob/master/todo-app/frontend-sem-redux/src/todo/todo.jsx