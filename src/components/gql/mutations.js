import { gql } from '@apollo/client';

export const CreateSuperhero = gql`
    mutation createSuperhero($input: SuperheroInput ) { 
        createSuperhero (input: $input) {
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

export const UpdateSuperhero = gql`
    mutation updateSuperhero($input: SuperheroInput ) { 
        updateSuperhero (input: $input) {
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

export const DeleteSuperhero = gql`
    mutation deleteSuperhero($input: String!) { 
        deleteSuperhero (input: $input) {
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
