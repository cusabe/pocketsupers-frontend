import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { gql } from '@apollo/client';

// Pocket supers Rest API via Axios
const pslocal = "http://localhost:4000/graphql"
// const psaws = "https://pocketsupersapi.appsbybenc.com/api"
const pocketsupersAPI = pslocal

// Connect to a graphql api using apollo client
const client = new ApolloClient({
    uri: pocketsupersAPI,
    cache: new InMemoryCache(),
  });
  
//   Test the connection with simple js reporting to the console
// client
// .query({
// query: gql`
//     { 
//     hello 
//     }
// `,
// })
// .then((result) => console.log(result));

export default client;