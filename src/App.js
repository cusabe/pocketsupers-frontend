// Apollo imports
import {useQuery} from '@apollo/client';
import {ListSuperheroes} from "./gql/queries.js";

// React imports
import "./App.css";
import Search from "./components/search";
import Collection from "./components/collection";


function App() {

  // Load the collection, pass it to the Collection component
  // and pass a refetch function to the Search component
  const { data: myHeroesData , refetch: reloadCollection} 
    = useQuery(ListSuperheroes);
  
  // console.log(myHeroesData);
  // console.log(reloadCollection);

  return (
    <>
      <section className="header">
        <h1>Pocket Supers</h1>
        <h3>A React.js app by Apps by Ben C</h3>
        <h2>Find all your favourite superheroes and add them to your collection</h2>
      </section>

      <section className="columns">
        <Search reload={() => reloadCollection()}/>
        <Collection myHeroesData={myHeroesData}/>
      </section>
    </>
  );
}

export default App;