const marvelUrl = 'http://gateway.marvel.com/v1/public/'
// const publicKey = `apikey=${process.env.REACT_APP_PUBLIC_API_KEY}`;
// const privateKey = `apikey=${process.env.REACT_APP_PRIVATE_API_KEY}`;
const PUBLIC_KEY = '8346d461fa71a8927973e38199c9d2e4';
const PRIVATE_KEY = '9ca18c5f710af9adb2e9c3d12423824198ada02e';
const timestamp = new Date().getTime();
const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
const auth = `&ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;
const query = `?nameStartsWith=${name}`;
const url = `${marvelUrl}${query}${auth}`;

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

  let url = `${marvelUrl}characters?ts=${timestamp}&orderBy=${sortName}&limit=${limit}&offset=${offset}&name&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
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