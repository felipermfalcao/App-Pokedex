import React, {useState, useEffect, memo} from 'react';
import { View, Pressable, StatusBar, ActivityIndicator, Animated, Easing,
         InteractionManager, useWindowDimensions } from 'react-native';
import { Icon, HStack, Box, Text, Image, ScrollView } from "native-base";
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

function ModalPokemon(props) {
  const [pokemonDetalhe, setPokemonDetalhe] = useState([]);
  const [idPokemon, setIdPokemon] = useState(props.data);
  const [loading, setLoading] = useState(true);
  const [loadingImg, setLoadingImg] = useState(true);

  const {height, width} = useWindowDimensions();

const spinValue = new Animated.Value(0);

Animated.loop(
  Animated.timing(
    spinValue,
    {
     toValue: 1,
     duration: 8000,
     easing: Easing.linear,
     useNativeDriver: true
    }
  )
 ).start();

// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '0deg']
})  

  const getPokemons = async () => {
    const query = `query MyQuery {
      pokemon_v2_pokemon(where: {id: {_eq: ${idPokemon}}}) {
        weight
        height
        name
        pokemon_species_id
        id
        order
        pokemon_v2_pokemonabilities {
          id
          pokemon_v2_ability {
            name
            pokemon_v2_abilityeffecttexts(where: {language_id: {_eq: 9}}) {
              short_effect
            }
          }
        }
        pokemon_v2_pokemonforms {
          form_name
          is_mega
        }
        pokemon_v2_pokemonspecy {
          generation_id
          capture_rate
          pokemon_v2_evolutionchain {
            pokemon_v2_pokemonspecies {
              name
              id
            }
          }
          pokemon_v2_generation {
            id
            name
          }
          pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}, version_id: {_in: [26, 34]}}) {
            flavor_text
          }
        }
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
            id
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
  
      setPokemonDetalhe(res.data.data.pokemon_v2_pokemon);
      setLoading(false);
      //console.log(pokemonDetalhe[0].name);
    } catch (err) {
      //console.log(err);
    }
  };
  
    useEffect(() => {
      InteractionManager.runAfterInteractions(() => {
        getPokemons();
        //console.log('chamou');
    });

      //console.log(idPokemon);
    }, [idPokemon]);

if(loading)
{
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(250,132,136,0.9)', justifyContent: 'center', 
                  alignItems: 'center'}}>
      <Image 
      style={{height: 250, width: 250 }}
      zIndex={-1} opacity={1} position={'absolute'}
                source={require('../img/logopoke_m.png')} 
                alt='imageTop'
      />
    <ActivityIndicator size="large" style={{marginTop: 17}} />
    <Text style={{textAlign: 'center', color: '#fff'}}></Text>
    </View>
  );
}
else
{
  let corTipo = '#000';

    if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'normal')
    {
        corTipo = '#A4ACAF';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'fighting')
    {
        corTipo = '#D56723';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'flying')
    {
        corTipo = '#8e97c4';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'poison')
    {
        corTipo = '#B97FC9';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'ground')
    {
        corTipo = '#f4a142';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'rock')
    {
        corTipo = '#c48c4f';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'bug')
    {
        corTipo = '#97b45e';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'ghost')
    {
        corTipo = '#6a6a8f';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'steel')
    {
        corTipo = '#9f9f9f';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'fire')
    {
        corTipo = '#f87f89';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'water')
    {
        corTipo = '#7ac0f8';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'grass')
    {
        corTipo = '#4ad3ae';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'electric')
    {
        corTipo = '#ffc957';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'psychic')
    {
        corTipo = '#d97b93';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'ice')
    {
        corTipo = '#A5C2D7';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'dragon')
    {
        corTipo = '#4d4d4d';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'dark')
    {
        corTipo = '#1a1a1a';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'unknown')
    {
        corTipo = '#999999';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'fairy')
    {
        corTipo = '#FDB9E9';
    }
    else if (pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'shadow')
    {
        corTipo = '#858585';
    }

    function formatNumber(num) {
        return "#" + num.toString().padStart(3, "0");
    }

    function formatNumberImg(num) {
      return num.toString().padStart(3, "0");
  }

  const tipo2 = pokemonDetalhe[0].pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name.charAt(0).toUpperCase() +
  pokemonDetalhe[0].pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name.slice(1);

  const descricao1 = pokemonDetalhe[0].pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[0]?.flavor_text;
  let descricao1Ajustada = descricao1?.replace(/\n/g, "");

  const descricao2 = pokemonDetalhe[0].pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[1]?.flavor_text;
  let descricao2Ajustada = descricao2?.replace(/\n/g, "");


 return (
  <ScrollView>  
    <View backgroundColor={corTipo} flex={1}>
      <StatusBar backgroundColor={corTipo} barStyle='light-content'/>

      <HStack space={2} justifyContent="space-between">      
        <Pressable
          onPress={props.setModalVisible}
          >
            <Icon
              marginTop={18} marginLeft={4}
              as={Ionicons} name="return-up-back-outline" size={30} color="#fff" _dark={{
              color: "warmGray.50"
            }} />
        </Pressable>

        <Pressable   
          >
            <Icon
              marginTop={18} marginRight={4}
              as={Ionicons} name="heart-outline" size={30} color="#fff" _dark={{
              color: "warmGray.50"
            }} />
        </Pressable> 
      </HStack>

      <Box >
        <Text marginLeft={10} color='#fff' fontSize={25} fontWeight={'black'}>
          {formatNumber(pokemonDetalhe[0].id)}
        </Text>
        <Text marginLeft={10} marginTop={-4} color='#fff' fontSize={38} fontWeight={'black'}>
          {pokemonDetalhe[0].name.charAt(0).toUpperCase() +
          pokemonDetalhe[0].name.slice(1)}
        </Text>
      </Box>
                 
      <Box>
      {loadingImg && <ActivityIndicator size='large' color='#fff' />}
      <Image 
            alignSelf={'center'}
            size={280} marginTop={3}
            alt={'pokemon'} 
            onLoadEnd={() => setLoadingImg(false)}
            onLoadStart={() => setLoadingImg(true)}
            source={{uri:`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatNumberImg(pokemonDetalhe[0].id)}.png`}}
            />
      </Box>

      <Animated.Image 
      style={{transform: [{rotate: spin}], height: 450, width: 450 }}
      position='absolute' top={20} right={-70} zIndex={-1} opacity={0.3}
                source={require('../img/logopoke_m.png')} 
                alt='imageTop'
      />

      <HStack space={2} justifyContent="center">
          <Box marginLeft={3} backgroundColor='rgba(255,255,255,0.3)' borderRadius={20} paddingX='4'
              paddingY={0.4} marginBottom='1'>
              <Text color='#fff' fontSize='12' fontWeight={900}>
                  {pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name.charAt(0).toUpperCase() +
              pokemonDetalhe[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name.slice(1)}</Text>
          </Box>

          <Box>
          {tipo2 ? 
          <Box marginLeft={3} backgroundColor='rgba(255,255,255,0.3)' borderRadius={20} paddingX='4'
              paddingY={0.4}>
              <Text color='#fff' fontSize='12' fontWeight={900}>
                {tipo2}
              </Text>
          </Box> : ''}
          </Box>
      </HStack>

      <Box>
        <Text marginLeft={10} color='#fff' fontSize={25} fontWeight={'black'}
              marginTop={8}
        >
          About
        </Text>

        <Text marginLeft={10} marginRight={10} color='#fff' fontSize={15}
              marginTop={2} textAlign={'justify'}>
          {descricao1Ajustada}
        </Text>
        <Text marginLeft={10} marginRight={5} color='#fff' fontSize={15}
              marginTop={2} textAlign={'justify'}>
          {descricao2Ajustada}
        </Text>
      </Box>


    </View>
  </ScrollView>
  );
}
}

export default memo(ModalPokemon);