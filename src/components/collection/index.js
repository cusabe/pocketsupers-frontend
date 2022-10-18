// React imports
import { useMutation} from '@apollo/client';
import {UpdateSuperhero, DeleteSuperhero} from "../../gql/mutations.js";

import React, { useEffect, useCallback } from "react";
import "../../App.css";
import HeroCard from "../herocard";



import {useContext} from "react";

// Context
import {CollectionContext} from "../../contexts";


function Collection(myHeroesData) {
//   const [myheroes, setMyheroes] = useState([]);
  const {myheroes,setMyheroes} = useContext(CollectionContext);


  // Set up mutations
  const [ updateSuperhero ] = useMutation(UpdateSuperhero);
  const [ deleteSuperhero ] = useMutation(DeleteSuperhero);
  
  useEffect(() => {
    // add hero collection when it loads
    if (myHeroesData&&myHeroesData.myHeroesData) {
      console.log("UseEffect heroesdata:",myHeroesData.myHeroesData);
      setMyheroes(myHeroesData.myHeroesData.listSuperheroes);
    }
  }, [myHeroesData,setMyheroes]);

  const onRemove = useCallback((id) => { 
    // Remove hero from collection here in React
    setMyheroes(myheroes.filter((h)=>h.id!==id))

    // Then delete it from API record
    console.log(id);
    deleteSuperhero({variables: {id: id}});

  },[myheroes,deleteSuperhero,setMyheroes]);

  const handleChange = useCallback((e,id,field) => {
    const newHeroes = myheroes.map(hero => {
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

    setMyheroes(newHeroes)

  },[myheroes, setMyheroes]);


  // Save changes to stats for heroes in the collection
  const onSave = useCallback((id) => { 
    // Update the API record
    const updateHero=myheroes.filter((h)=>h.id===id);

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


  return (
    <>
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
                    isCollection={true}
                    handleChange={handleChange}
                    onSave={onSave}
                    onRemove={onRemove}
                />
                );
            })
            }
        </div>
    </>
  );
}

export default Collection;