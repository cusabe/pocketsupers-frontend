import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';



// Connect to a graphql api using apollo client
const client = new ApolloClient({
    uri: ' http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });
  
//   Test the connection with simple js reporting to the console
client
.query({
query: gql`
    { 
    hello 
    }
`,
})
.then((result) => console.log(result));

export default client;