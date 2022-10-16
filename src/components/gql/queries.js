import { gql } from '@apollo/client';

export const ListSuperheroes = gql`
    query listSuperheroes { 
        listSuperheroes {
            name
            id
            image {
                url
            }
            powerstats {
                intelligence
                strength
                speed
                durability
                power
                combat
            }
        }
    }
`;

export const GetSuperheroByID = gql`
    query getSuperheroByID ($id: String!) { 
        getSuperheroByID  (id: $id)
        {
            name
            id
            image {
                url
            }
            powerstats {
                intelligence
                strength
                speed
                durability
                power
                combat
            }
        }
    }
`;
