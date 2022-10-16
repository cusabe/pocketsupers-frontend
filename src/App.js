// React imports
import axios from "axios";
import { useQuery, useMutation} from '@apollo/client';
// import { gql } from '@apollo/client';

import React, { useState, useEffect, useCallback } from "react";
import { FormGroup, Label, Input, Button }
   from "reactstrap";
   import "./App.css";

import HeroCard from "./components/herocard";
import {ListSuperheroes} from "./components/gql/queries.js";
import {CreateSuperhero, UpdateSuperhero, DeleteSuperhero} from "./components/gql/mutations.js";



//  Superheroapi will use axios
const accessToken = "195368556243435";
const superheroAPI = "https://www.superheroapi.com/api.php/" + accessToken;

// Pocket supers Rest API via Axios
// const pslocal = "http://localhost:5000/api"
// const psaws = "http://54.66.252.110:5000/api"
const psaws = "https://pocketsupersapi.appsbybenc.com/api"
const pocketsupersAPI = psaws

// Pocket supers GraphQL API via Apollo

function App() {
  // Searching for heroes on left side of screen
  const [searchText,setSearchText] = useState("iron");
  const [response, setResponse] = useState(null);
  const [heroes, setHeroes] = useState([]);
  
  // Display myheroes collection on right side
  const [myheroes, setMyheroes] = useState([]);

  // Load the collection once and store state
  const { 
    loading: myHeroesLoading,
    error: myHeroesError,
    data: myHeroesData
  } = useQuery(ListSuperheroes);

  // Set up mutations
  const [
    createSuperhero,
    {
      data: createSuperheroData,
      // loading: createSuperheroLoading,
      // error: createSuperheroError,
    },
  ] = useMutation(CreateSuperhero);

  const [
    updateSuperhero,
    {
      data: updateSuperheroData,
      // loading: createSuperheroLoading,
      // error: createSuperheroError,
    },
  ] = useMutation(UpdateSuperhero);

  const [
    deleteSuperhero,
    {
      data: deleteSuperheroData,
      // loading: createSuperheroLoading,
      // error: createSuperheroError,
    },
  ] = useMutation(DeleteSuperhero);
  
  useEffect(() => {
    // add hero collection when it loads
    if (myHeroesData) {
      setMyheroes(myHeroesData.listSuperheroes);
    }
  }, [myHeroesData]);

  useEffect(() => {
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
      // axios.post(pocketsupersAPIadd,addHero[0]).then((response) => {
      //   console.log("response.data is", response.data)
      // });

      // Then create the graphql record with a mutation
      console.log(createSuperhero);
      console.log(addHero[0]);
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

    }
  },[heroes, myheroes, createSuperhero]);


  const onRemove = useCallback((id) => { 
    // Remove hero from collection here in React
    setMyheroes(myheroes.filter((h)=>h.id!==id))

    // Then delete it from API record
    const pocketsupersAPIremove = pocketsupersAPI+`/delete/${id}`
    console.log("delete from collection",pocketsupersAPIremove);
    // axios.delete(pocketsupersAPIremove).then((response) => {
    //   console.log("response.data is", response.data)
    // });
    console.log(id);
    deleteSuperhero({variables: {input: id}});

  },[myheroes,deleteSuperhero]);


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
    // axios.patch(pocketsupersAPIupdate,updateHero[0]).then((response) => {
    //   console.log("response.data is", response.data)
    // });
    console.log(updateHero)
    const updateStrippedHero = 
        { name: updateHero[0].name,
          id: updateHero[0].id,
          image: { url: updateHero[0].image.url},
          powerstats: { 
            strength: updateHero[0].powerstats.strength,
            intelligence: updateHero[0].powerstats.intelligence,
            speed: updateHero[0].powerstats.speed,
            durability: updateHero[0].powerstats.durability,
            power: updateHero[0].powerstats.power,
            combat: updateHero[0].powerstats.combat
          } 
        }
    updateSuperhero({variables: {input: updateStrippedHero}});

  },[myheroes, updateSuperhero]);


  // if (myHeroesLoading) return <p>Loading...</p>;
  // if (myHeroesError) return <p>Error :(</p>;


  return (
    <>
      <section className="header">
        <h1>Pocket Supers</h1>
        <h3>A React.js app by Apps by Ben C</h3>
        <h2>Find all your favourite superheroes and add them to your collection</h2>
      </section>

      {/* <section>
        <HelloTest />
      </section> */}

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

export default App;