import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import HeroCard from "./components/herocard";
import "./App.css";
import { FormGroup, Label, Input, Button }
   from "reactstrap";


const accessToken = "195368556243435";
const superheroAPI = "https://www.superheroapi.com/api.php/" + accessToken;

// const pslocal = "http://localhost:5000/api"
// const psaws = "http://54.66.252.110:5000/api"
const psaws = "https://pocketsupersapi.appsbybenc.com/api"

const pocketsupersAPI = psaws

export default function App() {
  // Searching for heroes on left side of screen
  const [searchText,setSearchText] = useState("iron");
  const [response, setResponse] = useState(null);
  const [heroes, setHeroes] = useState([]);
  
  // Display myheroes collection on right side
  const [myheroes, setMyheroes] = useState([]);

  useEffect(() => {
    // Load the collection
    const pocketsupersAPIsearch = pocketsupersAPI+"/getAll";
    console.log("load collection",pocketsupersAPIsearch);
    axios.get(pocketsupersAPIsearch).then((response) => {
      setMyheroes(response.data);
      console.log("response.data is", response.data)
    });

    // Search for some heroes to start with
    const superheroAPIsearch = superheroAPI+"/search/iron";
    console.log("first search",superheroAPIsearch);
    axios.get(superheroAPIsearch).then((response) => {
      setResponse(response.data.response);
      setHeroes(response.data.results);
    });
  }, []);

  // Search again each time the search button clicked
  const onSearch = () => {
    const superheroAPIsearch = superheroAPI+"/search/"+searchText;
    console.log("search",superheroAPIsearch);
    axios.get(superheroAPIsearch).then((response) => {
      if (response.data.response === "error") {
        console.log(response.data);      
        setResponse(response.data.error);
      } else {
        setResponse(response.data.response);
      }
      setHeroes(response.data.results);
    });
  };

  // Only add a hero if their id isn't already in the collection
  const onAdd = useCallback((id) => { 
    console.log(myheroes);
    // console.log(myheroes[0]._id);
    if (myheroes.filter((h)=>h.id===id).length > 0) {
      console.log("hero",id,"is already in the collection");
    } else {
      // Add hero to collection here in React app
      const addHero=heroes.filter((h)=>h.id===id);
      setMyheroes([...myheroes,...addHero]);
      
      // Then save it to API record
      const pocketsupersAPIadd = pocketsupersAPI+"/post";
      console.log("save to collection",pocketsupersAPIadd);
      axios.post(pocketsupersAPIadd,addHero[0]).then((response) => {
        console.log("response.data is", response.data)
      });

    }
  },[heroes, myheroes]);


  const onRemove = useCallback((id) => { 
    // Remove hero from collection here in React
    setMyheroes(myheroes.filter((h)=>h.id!==id))

    // Then delete it from API record
    const pocketsupersAPIremove = pocketsupersAPI+`/delete/${id}`
    console.log("delete from collection",pocketsupersAPIremove);
    axios.delete(pocketsupersAPIremove).then((response) => {
      console.log("response.data is", response.data)
    });

  },[myheroes]);


  const handleChange = useCallback((e,id,field,collection) => {
    let editHeroes = {};
    if (collection) {
      editHeroes = myheroes;
    } else {
      editHeroes = heroes;
    }
    const newHeroes = editHeroes.map(hero => {
      if (hero.id === id) {
        switch(field) {
          case 'intelligence':
            return {...hero, powerstats: 
              {...hero.powerstats, 
                intelligence: e.target.value}};
          case 'strength':
            return {...hero, powerstats: 
              {...hero.powerstats, 
                strength: e.target.value}};
          case 'speed':
            return {...hero, powerstats: 
              {...hero.powerstats, 
                speed: e.target.value}};
          case 'durability':
            return {...hero, powerstats: 
              {...hero.powerstats, 
                durability: e.target.value}};
          case 'power':
            return {...hero, powerstats: 
              {...hero.powerstats, 
                power: e.target.value}};
          case 'combat':
            return {...hero, powerstats: 
              {...hero.powerstats, 
                combat: e.target.value}};
          default:
            return hero;
        }
      } else {
        return hero;
      }
    })

    if (collection) {
      setMyheroes(newHeroes)
    } else {
      setHeroes(newHeroes);
    }

  },[heroes,myheroes]);


  // Save changes to stats for heroes in the collection
  const onSave = useCallback((id) => { 
    // Update the API record
    const updateHero=myheroes.filter((h)=>h.id===id);
    const pocketsupersAPIupdate = pocketsupersAPI+`/update/${id}`;
    console.log("update stats in collection",pocketsupersAPIupdate);
    axios.patch(pocketsupersAPIupdate,updateHero[0]).then((response) => {
      console.log("response.data is", response.data)
    });

  },[myheroes]);


  return (
    <>
      <section className="header">
        <h1>Pocket Supers</h1>
        <h3>A React.js app by Apps by Ben C</h3>
        <h2>Find all your favourite superheroes and add them to your collection</h2>

      </section>

      <section className="columns">
        <div className="column">
          <h4>Search for a Superhero here</h4>
            <FormGroup className="form">
              <Label className="label">Search here</Label>
              <Input className="input"
                type="text"
                name="searchText"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <Button className="button"
               onClick={() => onSearch()}>
                Search
              </Button>
              <p>Response: {response}</p>
              <p>Results: {heroes&&heroes.length}</p>
            </FormGroup>
          
          {heroes &&
            heroes.length > 0 &&
            heroes.map((hero, index) => {
              return (
                <HeroCard 
                  hero={hero}
                  key={index}
                  collection={false}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  handleChange={handleChange}
                  onSave={onSave}
                />
              );
            })
          }

        </div>

        <div className="column">
            <h4>Your Pocket Supers collection</h4>
            <p>Pocket Supers: {myheroes&&myheroes.length}</p>
            {myheroes &&
            myheroes.length > 0 &&
            myheroes.map((hero, index) => {
              return (
                <HeroCard 
                  hero={hero}
                  key={index}
                  collection={true}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  handleChange={handleChange}
                  onSave={onSave}
                />
              );
            })
          }
        </div>
      </section>
    </>
  );
}
