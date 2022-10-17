// React imports
import "./App.css";
import Search from "./components/search";
import Collection from "./components/collection";


function App() {
  return (
    <>
      <section className="header">
        <h1>Pocket Supers</h1>
        <h3>A React.js app by Apps by Ben C</h3>
        <h2>Find all your favourite superheroes and add them to your collection</h2>
      </section>

      <section className="columns">
        <Search />
        <Collection />
      </section>
    </>
  );
}

export default App;