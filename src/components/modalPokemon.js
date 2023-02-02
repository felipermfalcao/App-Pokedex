import React, {useState, useEffect, memo} from 'react';
import { View, Pressable, StatusBar, ActivityIndicator,
         InteractionManager, useWindowDimensions, StyleSheet } from 'react-native';
import { Icon, HStack, Box, Text, Image, ScrollView, FlatList } from "native-base";
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import { FlashList } from "@shopify/flash-list";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, FadeInLeft, FadeInDown, FadeInUp, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { GestureDetector , Gesture} from 'react-native-gesture-handler';

import EvolutionPokemons from './EvolutionPokemonsModal';
import PokemonsForms from './PokemonsForms';

function ModalPokemon(props) {
  const [pokemonDetalhe, setPokemonDetalhe] = useState([]);
  const [idPokemon, setIdPokemon] = useState(props.data);
  const [loading, setLoading] = useState(true);
  const [loadingImg, setLoadingImg] = useState(true);
  const [loadingImgEvo, setLoadingImgEvo] = useState(true);
  const [loadingPt, setLoadingPt] = useState(false);
  const [idType, setIdType] = useState('pokemon_species_id: ');
  const [idioma, setIdioma] = useState('pt');
  const [idiomaPT, setIdiomaPT] = useState(false);
  const [pokemonDetalhePT, setPokemonDetalhePT] = useState([]);


  const {height, width} = useWindowDimensions();

  const isPressed3 = useSharedValue(false);
    const offset3 = useSharedValue({ x: 0, y: 0 });

  const isPressed4 = useSharedValue(false);
    const offset4 = useSharedValue({ x: 0, y: 0 });

  const isPressed5 = useSharedValue(false);
    const offset5 = useSharedValue({ x: 0, y: 0 });

    const rotation = useSharedValue(0);

    const animatedStylesLoop = useAnimatedStyle(() => {
      return {
        transform: [
          {
            rotate: `${rotation.value}deg`,
          },
        ],
      };
    }, [rotation.value]);

    const animatedStyles3 = useAnimatedStyle(() => {
    return {
        transform: [
        { translateX: withRepeat(withTiming(isPressed3.value ? 100 : 0, { duration: 300 }), 3, true) },
        { translateY: offset3.value.y },
        { scale: 1 },
        ]
    };
    });

    const animatedStyles4 = useAnimatedStyle(() => {
      return {
          transform: [
          { translateX: withRepeat(withTiming(isPressed4.value ? 100 : 0, { duration: 300 }), 3, true) },
          { translateY: offset4.value.y },
          { scale: 1},
          ]
      };
      });

      const animatedStyles5 = useAnimatedStyle(() => {
        return {
            transform: [
            { translateX: offset5.value.x },
            { translateY: offset5.value.y },
            { scale: withSpring(isPressed5.value ? 1.3 : 1) },
            ]
        };
        });
    const start = useSharedValue({ x: 0, y: 0 });
    const gesture3 = Gesture.Tap()
    .onBegin(() => {
        isPressed3.value = true;
        //console.log('toou');
    })
    .onFinalize(() => {
        isPressed3.value = false;
    });

    const gesture4 = Gesture.Tap()
    .onBegin(() => {
        isPressed4.value = true;
        //console.log('toou');
    })
    .onFinalize(() => {
        isPressed4.value = false;
    });

    const gesture5 = Gesture.Pan()
    .onBegin(() => {
        isPressed5.value = true;
        //console.log('toou');
    })
    .onFinalize(() => {
        isPressed5.value = false;
    });

// const spinValue = new Animated.Value(0);

// Animated.loop(
//   Animated.timing(
//     spinValue,
//     {
//      toValue: 1,
//      duration: 8000,
//      easing: Easing.linear,
//      useNativeDriver: true
//     }
//   )
//  ).start();

// Next, interpolate beginning and end values (in this case 0 and 1)
// const spin = spinValue.interpolate({
//   inputRange: [0, 1],
//   outputRange: ['0deg', '0deg']
// }) 

function forms (id){
  setIdType('id: ');
  setIdPokemon(id);
}

function pokemonsEvo (id){
  setIdType('pokemon_species_id: ');
  setIdPokemon(id);
}


  const getPokemons = async () => {
    const query = `query MyQuery {
      pokemon_v2_pokemon(where: {${idType} {_eq: ${idPokemon}}}) {
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
      //console.log(pokemonDetalhe[1].name);
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

    useEffect(() => {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 20000,
          easing: Easing.linear,
        }),
        -1
      );
    }, []);

if(loading)
{
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(250,132,136,0.9)', justifyContent: 'center', 
                  alignItems: 'center'}}>
      <Image 
      style={{height: 250, width: 250}}
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

  const evo = pokemonDetalhe[0].pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies;
  let evolucao = false;
  if(evo == null)
  {
    evolucao = false;
  }
  else
  {
    const evo2 = pokemonDetalhe[0].pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies[1];

    if(evo2)
    {
      evolucao = true;
    }
    else
    {
      evolucao = false;
    }
  }
  
  const formsPokemons = pokemonDetalhe[1];
  let form = false;
  if(formsPokemons == null)
  {
    form = false;
  }
  else
  {
    form = true;
  }

  function mudarIdioma (){
    if(idioma == 'pt')
    {
      setIdioma('en');
      setIdiomaPT(true);

      async function loadPokemonDetalhePT (){
  
        const formData = new FormData();
        formData.append('idPokemon', idPokemon);
  
        await axios.post('https://felipefalcao.com.br/appPokedex/', formData, {
          headers: { 'Content-Type': 'multipart/form-data'}
        }).then(response => {
          //console.log(response.data);
          setPokemonDetalhePT(response.data);
          setLoadingPt(false);
    
        setLoading(false);
        }).catch(error => {
          //console.log(error);
        });
        
      }
  
      loadPokemonDetalhePT();
      
      
    }
    else
    {
      setIdioma('pt');
      setIdiomaPT(false);
    }
  }

  //console.log(pokemonDetalhePT);

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
      <Animated.View entering={FadeInUp.delay(100)}>
        <Text marginLeft={10} color='#fff' fontSize={25} fontWeight={'black'}>
          {formatNumber(pokemonDetalhe[0].id)}
        </Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(300)}>
        <Text marginLeft={10} marginTop={-4} color='#fff' fontSize={38} fontWeight={'black'}>
          {pokemonDetalhe[0].name.charAt(0).toUpperCase() +
          pokemonDetalhe[0].name.slice(1)}
        </Text>
        </Animated.View>
      </Box>

      <HStack space={3} justifyContent="center" alignItems={'center'}> 
      <GestureDetector gesture={gesture3}>
      <Animated.View entering={FadeInUp.delay(900)} style={animatedStyles3}>
      <Pressable
          onPress={() => {setIdPokemon(pokemonDetalhe[0].id - 1), setLoadingImg(true)}}
          >
            <Icon
              marginTop={18} marginLeft={4}
              as={Ionicons} name="chevron-back-outline" size={30} color="#fff" _dark={{
              color: "warmGray.50"
            }} />
        </Pressable>
        </Animated.View>
        </GestureDetector>

      <Box>
      {loadingImg && <ActivityIndicator size='large' color='#fff' />}
      <GestureDetector gesture={gesture5}>
      <Animated.View entering={FadeInLeft} style={animatedStyles5}>
      <Image 
            alignSelf={'center'}
            size={280} marginTop={3}
            alt={'pokemon'} 
            onLoadEnd={() => setLoadingImg(false)}
            onLoadStart={() => setLoadingImg(true)}
            source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetalhe[0].id}.png`}}
            />
       </Animated.View>
       </GestureDetector>
      </Box>
      
      <GestureDetector gesture={gesture4}>
      <Animated.View entering={FadeInUp.delay(900)} style={animatedStyles4}>
      <Pressable
          onPress={() => {setIdPokemon(pokemonDetalhe[0].id + 1), setLoadingImg(true)}}
          >
            <Icon
              marginTop={18} marginRight={4}
              as={Ionicons} name="chevron-forward-outline" size={30} color="#fff" _dark={{
              color: "warmGray.50"
            }} />
        </Pressable>
        </Animated.View>
        </GestureDetector>
      </HStack>
      

      <Animated.Image 
      style={[styles.imageBack, animatedStylesLoop]}
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

      {evolucao ? <Box style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft:10, marginRight: 10}}>
        <FlashList 
        data={pokemonDetalhe[0].pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies}
        renderItem={({ item }) =>
        <Pressable onPress={() => {pokemonsEvo(item.id), setLoadingImg(true)}}>
        <EvolutionPokemons data={item}/>
        </Pressable>
        }
        estimatedItemSize={12}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={(props) =>{
          return(
          <View><Icon mt="16" size="6" color="#fff"
          as={<Ionicons name="chevron-forward-outline" />} /></View>
          );
        }
        }
        />
      </Box> : ''}

      {form ? <Box><Text color='#fff' fontSize={25} fontWeight={'black'}
            marginTop={10} marginLeft={10} textAlign={'left'}>
          Forms
      </Text>
      <Box style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft:10, marginRight: 10}}>
        <FlashList 
        data={pokemonDetalhe}
        renderItem={({ item }) =>
        <Pressable onPress={() => {forms(item.id), setLoadingImg(true)}}>
        <PokemonsForms data={item}/>
        </Pressable>
        }
        estimatedItemSize={12}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={(props) =>{
          return(
          <View><Icon mt="16" size="6" color="#fff"
          as={<Ionicons name="chevron-forward-outline" />} /></View>
          );
        }
        }
        />
      </Box>
</Box> : ''}


      {idiomaPT ?

      loadingPt ? <View><ActivityIndicator size='large' color='#fff' /></View>  : <Animated.View entering={FadeInDown.delay(500)} marginBottom={30}>
        
      <Box marginX={10}>
      <HStack space={2}>
        <Text color='#fff' fontSize={25} fontWeight={'black'}
              marginTop={8}
        >
          Sobre
        </Text>

        <Pressable onPress={() => {mudarIdioma()}}>
          <Box background={'rgba(255,255,255,0)'} padding={1.5} paddingLeft='2' paddingRight={2} borderRadius={8} marginTop={9}>
            <Text fontSize={13} fontWeight={'black'} color={'rgba(255,255,255,0)'}>{idioma}</Text>
          </Box>
        </Pressable>
      </HStack>

      <HStack space={2} justifyContent={'space-between'}>
        <Box>
        <Text color='#fff' fontWeight='bold' fontSize={16} marginBottom={2} marginTop={2}
        >
          Peso<Text fontWeight='400'>: {pokemonDetalhe[0].weight / 10} kg</Text></Text>
        </Box>

        <Box>
        <Text color='#fff' fontWeight='bold' fontSize={16} marginBottom={2} marginTop={2}
        >
          Altura<Text fontWeight='400'>: {pokemonDetalhe[0].height / 10} m</Text></Text>
        </Box>
      </HStack>

      <HStack space={2} justifyContent={'space-between'}>
        <Box>
        <Text color='#fff' fontWeight='bold' fontSize={16} marginBottom={2} marginTop={2}
        >
          Geração<Text fontWeight='400'>: {pokemonDetalhe[0].pokemon_v2_pokemonspecy.generation_id}</Text></Text>
        </Box>

        <Box>
        <Text color='#fff' fontWeight='bold' fontSize={16} marginBottom={2} marginTop={2}
        >
          Taxa de Captura<Text fontWeight='400'>: {pokemonDetalhe[0].pokemon_v2_pokemonspecy.capture_rate}/255</Text></Text>
        </Box>
      </HStack>

      <Text color='#fff' fontSize={15}
            marginTop={2} textAlign={'justify'}>
        {pokemonDetalhePT.descricao_1}
      </Text>
      <Text color='#fff' fontSize={15}
            marginTop={2} textAlign={'justify'}>
        {pokemonDetalhePT.descricao_2}
      </Text>

      <Text color='#fff' fontSize={25} fontWeight={'black'}
            marginTop={2}
      >
        Habilidades
      </Text>
      
      <View>
      <FlatList 
      data={pokemonDetalhePT.habilidades}
      
      renderItem={({ item }) =>
      <View padding={10} backgroundColor={'rgba(255,255,255,0.2)'} borderRadius={10} width={180}
            marginRight={12} marginTop={5}>
        <Text textTransform={'uppercase'} fontWeight='bold' color={'#fff'}>{item.habilidade_nome}</Text>
        <Text marginTop={2} color={'#fff'}>{item.habilidade_descricao}</Text>
      </View>
      
      }
      estimatedItemSize={3}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      // ItemSeparatorComponent={(props) =>{
      //   return(
      //   <View><Icon mt="16" size="6" color="#fff"
      //   as={<Ionicons name="chevron-forward-outline" />} /></View>
      //   );
      // }
      // }
      />  
      </View>

      </Box>
    </Animated.View>
      
      
      :
      
      <Animated.View entering={FadeInDown.delay(500)} marginBottom={30}>
        
        <Box marginX={10}>
        <HStack space={2}>
          <Text color='#fff' fontSize={25} fontWeight={'black'}
                marginTop={8}
          >
            About
          </Text>

          <Pressable onPress={() => {mudarIdioma(), setIdiomaPT(true)}}>
            <Box background={'rgba(255,255,255,0)'} padding={1.5} paddingLeft='2' paddingRight={2} borderRadius={8} marginTop={9}>
              <Text fontSize={13} fontWeight={'black'} color={'rgba(255,255,255,0)'}>{idioma}</Text>
            </Box>
          </Pressable>
        </HStack>

        <HStack space={2} justifyContent={'space-between'}>
          <Box>
          <Text color='#fff' fontWeight='bold' fontSize={16} marginBottom={2} marginTop={2}
          >
            Weight<Text fontWeight='400'>: {pokemonDetalhe[0].weight / 10} kg</Text></Text>
          </Box>

          <Box>
          <Text color='#fff' fontWeight='bold' fontSize={16} marginBottom={2} marginTop={2}
          >
            Height<Text fontWeight='400'>: {pokemonDetalhe[0].height / 10} m</Text></Text>
          </Box>
        </HStack>

        <HStack space={2} justifyContent={'space-between'}>
          <Box>
          <Text color='#fff' fontWeight='bold' fontSize={16} marginBottom={2} marginTop={2}
          >
            Generation<Text fontWeight='400'>: {pokemonDetalhe[0].pokemon_v2_pokemonspecy.generation_id}</Text></Text>
          </Box>

          <Box>
          <Text color='#fff' fontWeight='bold' fontSize={16} marginBottom={2} marginTop={2}
          >
            Capture Rate<Text fontWeight='400'>: {pokemonDetalhe[0].pokemon_v2_pokemonspecy.capture_rate}/255</Text></Text>
          </Box>
        </HStack>

        <Text color='#fff' fontSize={15}
              marginTop={2} textAlign={'justify'}>
          {descricao1Ajustada}
        </Text>
        <Text color='#fff' fontSize={15}
              marginTop={2} textAlign={'justify'}>
          {descricao2Ajustada}
        </Text>

        <Text color='#fff' fontSize={25} fontWeight={'black'}
              marginTop={2}
        >
          Ability
        </Text>
        
        <View>
        <FlatList 
        data={pokemonDetalhe[0].pokemon_v2_pokemonabilities}
        
        renderItem={({ item }) =>
        <View padding={10} backgroundColor={'rgba(255,255,255,0.2)'} borderRadius={10} width={180}
              marginRight={12} marginTop={5}>
          <Text textTransform={'uppercase'} fontWeight='bold' color={'#fff'}>{item.pokemon_v2_ability.name}</Text>
          <Text marginTop={2} color={'#fff'}>{item.pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0]?.short_effect}</Text>
          <Text marginTop={2} color={'#fff'}>{item.pokemon_v2_ability.pokemon_v2_abilityeffecttexts[1]?.short_effect}</Text>
          <Text marginTop={2} color={'#fff'}>{item.pokemon_v2_ability.pokemon_v2_abilityeffecttexts[2]?.short_effect}</Text>
        </View>
        
        }
        keyExtractor={item => item.id}
        estimatedItemSize={3}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // ItemSeparatorComponent={(props) =>{
        //   return(
        //   <View><Icon mt="16" size="6" color="#fff"
        //   as={<Ionicons name="chevron-forward-outline" />} /></View>
        //   );
        // }
        // }
        />  
        </View>

        </Box>
      </Animated.View>}
      
      

      


    </View>
  </ScrollView>
  );
}
}

export default memo(ModalPokemon);

const styles = StyleSheet.create({
  imageBack:{
    width: 450,
    height: 450
  }
})