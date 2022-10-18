// Axios imports
import axios from "axios";
import {superheroAPI} from "../../axios/apisettings";

// GraphQL imports
import { useMutation, useLazyQuery} from '@apollo/client';
import {GetSuperheroByID} from "../../gql/queries.js";
import {CreateSuperhero} from "../../gql/mutations.js";

// React imports
import React, { useState, useEffect, useCallback } from "react";
import { FormGroup, Label, Input, Button }
   from "reactstrap";
import "../../App.css";
import HeroCard from "../herocard";


function Search(reload) {

  // Search for heroes and list them on left side of screen
  const [searchText, setSearchText] = useState("iron");
  const [response, setResponse] = useState(null);
  const [heroes, setHeroes] = useState([]);

  const [ getSuperheroByID ] = useLazyQuery(GetSuperheroByID);
  const [ createSuperhero ] = useMutation(CreateSuperhero);
  
  useEffect(() => {
    // Search for some heroes to start with
    const superheroAPIsearch = superheroAPI+"/search/iron";
    console.log("first search",superheroAPIsearch);
    axios.get(superheroAPIsearch).then((response) => {
      setResponse(response.data.response);
      setHeroes(response.data.results);
    });
  }, [setHeroes]);

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

  const onAdd = useCallback((id) => { 
    getSuperheroByID({variables: {id: id}}).then(result => {
      // If superhero is not already in the collection
      if (result.data.getSuperheroByID === null) {
        // Then create the graphql record with a mutation
        console.log("Superhero is absent:",result.data.getSuperheroByID);
        const addHero=heroes.filter((h)=>h.id===id);
        const addStrippedHero = 
        { name: addHero[0].name,
          id: addHero[0].id,
          image: { url: addHero[0].image.url},
          powerstats: { 
            strength: addHero[0].powerstats.strength,
            intelligence: addHero[0].powerstats.intelligence,
            speed: addHero[0].powerstats.speed,
            durability: addHero[0].powerstats.durability,
            power: addHero[0].powerstats.power,
            combat: addHero[0].powerstats.combat
          } 
        }
      createSuperhero({variables: {input: addStrippedHero}});
      console.log(reload);
      reload.reload();
      } else {
        console.log("hero",id,"is already in the collection:",result.data.getSuperheroByID);
      }
    })
  },[heroes
    , createSuperhero, getSuperheroByID, reload
  ]);

    const handleChange = useCallback((e,id,field) => {
    const newHeroes = heroes.map(hero => {
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

    setHeroes(newHeroes);

  },[heroes]);

  return (
    <>
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
                  isCollection={false}
                  onAdd={onAdd}
                  handleChange={handleChange}
                />
              );
            })
          }
        </div>
    </>
  );
}

export default Search;