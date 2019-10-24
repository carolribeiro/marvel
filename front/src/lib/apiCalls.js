import md5 from 'js-md5';

const marvelUrl = 'http://gateway.marvel.com/v1/public/'
const publicKey = `${process.env.REACT_APP_PUBLIC_API_KEY}`;
const privateKey = `${process.env.REACT_APP_PRIVATE_API_KEY}`;
const timestamp = Number(new Date());
const hash = md5.create();
hash.update(timestamp + privateKey + publicKey);

//http://gateway.marvel.com/v1/public/characters?limit=12&nameStartsWith=${character}&ts=${ts}&apikey=${key}&hash=${hash}`

//https://github.com/inglkruiz/react-marvel-api

const getMarvelCharacters = (options) => {
  const {
    offset,
    name,
    exactMatch,
    sortName,
    limit,
  } = Object.assign({
    offset: 0,
    name: '',
    exactMatch: false,
    sortName: '',
    limit: 20,
  }, options);
  //https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=9&apikey=${publicKey}&hash=${hash.hex()}`
  let url = `${marvelUrl}characters?ts=${timestamp}&orderBy=${sortName}&limit=${limit}&offset=${offset}&apikey=${publicKey}&hash=${hash.hex()}`
  if (name) {
    if (exactMatch) { url += `&name=${name}`; }
    else { url += `&nameStartsWith=${name}`; }
  }
  return fetch(url)
    .then(res => res.json())
    .then((resObj) => {
      try {
        if (resObj.code === 200) {
          if (offset > resObj.data.total) {
            throw new Error('Page does not exist.');
          } else {
            const pages = Math.floor(resObj.data.total / limit);
            return {
              characters: resObj.data.results,
              maxPage: resObj.data.total % limit > 0 ? pages + 1 : pages,
            };
          }
        } else {
          throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
        }
      } catch (e) {
        console.error(e);
        return {
          characters: [],
          maxPage: 0,
        };
      }
    });
}

export {
  getMarvelCharacters,
};