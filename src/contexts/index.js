// Apollo imports
import {useQuery} from '@apollo/client';
import {ListSuperheroes} from "../gql/queries.js";

// React imports
import { createContext, useState
    // , useReducer , useEffect 
} from "react";

export const CollectionContext = createContext();

// export const CollectionReducer = (state, action) => {
//     console.log("CollectionReducer says:",action.payload);
//     switch (action.type) {
//         case "UPDATE_COLLECTION": 
//             return {...state};
//         default:
//             throw new Error();
//     }
// }

export const CollectionContextProvider = ({ children }) => {
  const[myheroes,setMyheroes] = useState([]);  // Simple useState version

//   const[state,dispatch] = useReducer(CollectionReducer,"Hello!");

  return (
    <CollectionContext.Provider value={{myheroes, setMyheroes}}>
      {children}
    </CollectionContext.Provider>
  );
};

