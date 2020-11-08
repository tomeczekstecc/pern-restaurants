import axios from 'axios';

// let baseURL;
// process.env.NODE_ENV === 'development'
//   ? (baseURL = 'http://localhost:4000/api/v1/restaurants')
//   : (baseURL = '/api/v1/restaurants');
// console.log(process.env.NODE_ENV);

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api/v1/restaurants'
    : 'api/v1/restaurants';

export default axios.create({
  baseURL,
});
