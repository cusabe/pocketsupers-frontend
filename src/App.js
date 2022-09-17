import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import HeroCard from "./components/herocard";
import "./App.css";
import { FormGroup, Label, Input, Button }
   from "reactstrap";


const accessToken = "195368556243435";
const superheroapiURL = "https://superheroapi.com/api.php/" + accessToken;


export default function App() {
  const [response, setResponse] = useState(null);
  const [heroes, setHeroes] = useState([]);
  const [myheroes, setMyheroes] = useState([]);
  const [searchText,setSearchText] = useState("iron");

  // Search once for iron
  useEffect(() => {
    const axiosCallString = superheroapiURL+"/search/iron";
   
    console.log(axiosCallString);
    axios.get(axiosCallString).then((response) => {
      setResponse(response.data.response);
      setHeroes(response.data.results);
    });
  }, []);

  // Then search each time the search button clicked
  const onSearch = () => {
    const axiosCallString = superheroapiURL+"/search/"+searchText;
   
    console.log(axiosCallString);
    axios.get(axiosCallString).then((response) => {
      if (response.data.response === "error") {
        console.log(response.data);      
        setResponse(response.data.error);
      } else {
        setResponse(response.data.response);
      }
      setHeroes(response.data.results);
    });
  };

  const onAdd = useCallback((id) => { 
    const addHero=heroes.filter((h)=>h.id===id);
    setMyheroes([...myheroes,...addHero]);
  },[heroes, myheroes]);

  const onRemove = useCallback((id) => { 
    setMyheroes(myheroes.filter((h)=>h.id!==id))
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

  return (
    <>
      <section class="header">
        <h1>Pocket Supers</h1>
        <h3>A React.js app by Apps by Ben C</h3>
        <h2>Find all your favourite superheroes and add them to your collection</h2>

      </section>

      <section class="columns">
        <div class="column">
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
                />
              );
            })
          }

        </div>

        <div class="column">
            <h4>Your superhero collection</h4>
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
                />
              );
            })
          }
        </div>
      </section>
    </>
  );
}
