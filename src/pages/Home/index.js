import React, { useState, useEffect } from 'react';
import { ImageBackground  } from 'react-native';
import { Text, Box, FlatList, StatusBar, VStack, Heading, Input, Icon, Center } from "native-base";
import axios from 'axios';
import {Ionicons} from '@expo/vector-icons';

import CardPokemonHome from '../../components/CardPokemonHome';

export default function Home(){
const [pokemons, setPokemons] = useState([]);

const getPokemons = async () => {
  const query = `query MyQuery {
    pokemon_v2_pokemon(limit: 2) {
      id
      name
      pokemon_species_id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
  `;

  try {
    const res = await axios({
      url: 'https://beta.pokeapi.co/graphql/v1beta',
      method: 'post',
      data: {
        query
      }
    });

    setPokemons(res.data.data.pokemon_v2_pokemon);
    console.log(pokemons);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <Box safeArea>
      <StatusBar backgroundColor='#FA8488' barStyle='light-content'/>

      <Box height='160' backgroundColor='#FA8488' borderBottomRadius={20}>

        
          <Text fontSize={40} fontWeight='black' color={'#fff'} paddingLeft={5} 
                paddingTop={7}>
              Pokédex
          </Text>

          <VStack w="100%" paddingX={5} paddingTop={1} alignSelf="center">
          <Input placeholder="Nome ou Número" variant="filled" width="100%"
                borderRadius="30" borderColor={'#FA8488'} py="2" px="1" backgroundColor={'#f8a8ac'} color={'#fff'}
                placeholderTextColor={'#fff'} fontWeight='normal' fontSize={14} marginTop='2'
                InputLeftElement={<Icon ml="2" size="6" color="#fff" as={<Ionicons name="ios-search" />} />} />
          </VStack>
          <ImageBackground 
          style={{height: 170, bottom: 210, left: 150, opacity: 0.3}}
          resizeMode="contain"
          source={require('../../img/logopoke_m.png')}
        >
        </ImageBackground>

      </Box>

      <Box alignItems={'center'}>
        <FlatList
        numColumns={'2'}
        data={pokemons}
        renderItem={({item}) => <CardPokemonHome pokemons={item} />}
        />
      </Box>
    </Box>
  );
}