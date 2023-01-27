import React, { useState, useEffect } from 'react';
import { useWindowDimensions, View, Modal, StatusBar, Animated, Easing} from 'react-native';
import { Text, Box, FlatList, VStack, Input, Icon,
        Center, Image } from "native-base";
import axios from 'axios';
import {Ionicons} from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import CardPokemonHome from '../../components/CardPokemonHome';
import ModalPokemon from '../../components/modalPokemon';

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

const FirstRoute = (props) => (     
        <Box alignItems={'center'}>
        <FlatList
        numColumns={'2'}
        data={props.pokemons}
        renderItem={({item}) => <CardPokemonHome pokemons={item} 
                                                 pokemon={props.pokemon}/>}
        />
        </Box>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#fff', justifyContent:'center', alignItems:'center'}}>
    <Text>Em desenvolvimento</Text>
  </View>
);

const TerceiraRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#fff', justifyContent:'center', alignItems:'center'}}>
    <Text>Em desenvolvimento</Text>
  </View>
);

const QuartaRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#fff', justifyContent:'center', alignItems:'center'}}>
    <Text>Em desenvolvimento</Text>
  </View>
);


export default function Home(){
const [pokemons, setPokemons] = useState([]);
const [pokemon, setPokemon] = useState(0);
const [modalVisible, setModalVisible] = useState(false);

const {height, width} = useWindowDimensions();
const alturaTopo = height * 0.25;
const alturaList = height * 0.75;

function idPokemon(id){
  setPokemon(id);
  setModalVisible(true);
}


const renderScene = SceneMap({
  1: () => <FirstRoute pokemons={pokemons} pokemon={idPokemon} />,
  2: SecondRoute,
  3: TerceiraRoute,
  4: QuartaRoute,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#f8454c', width: 80, height:3,
    left:(width / 4 - 88) / 2, borderRadius: 50}}
    style={{ backgroundColor: '#fff', height: 30, elevation: 0, marginBottom: 12,
             marginTop: 4, marginLeft: 15, marginRight: 15 }}
    labelStyle={{color: '#000'}}
    indicatorContainerStyle={{height: 30}}
    contentContainerStyle={{}}
    activeColor={'#000'}
    inactiveColor={'#999'}

    
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color, marginTop: -22, fontWeight: 'bold' }}>
        {route.title}
      </Text>
    )}
  />
);

const [index, setIndex] = React.useState(0);
const [routes] = React.useState([
  { key: '1', title: 'Pokémons' },
  { key: '2', title: 'Abilities' },
  { key: '3', title: 'Moves' },
  { key: '4', title: 'Items' },
]);

const getPokemons = async () => {
  const query = `query MyQuery {
    pokemon_v2_pokemon(limit: 20) {
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
    //console.log(pokemons);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    
    <Box flex={1} safeArea backgroundColor={'#fff'}>
      <StatusBar backgroundColor='#FA8488' barStyle='light-content'/>

      <Modal
        animationType='fade'
        hardwareAccelerated={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(false);
          }}
        >
      <View flex={1}>
        <ModalPokemon data={pokemon} setModalVisible={() => setModalVisible(false)} />
      </View>
      </Modal>

      <Box flex={1} backgroundColor='#FA8488' borderBottomRadius={20}
      justifyContent={'flex-end'} marginBottom='2'>

      <Animated.Image style={{transform: [{rotate: spin}], height: 200, width: 200}}
      position='absolute' bottom={60} right={-50} opacity={0.3}
        source={require('../../img/logopoke_m.png')} 
        alt='imageTop'
         />
        <Text fontSize={40} fontWeight='black' color={'#fff'} paddingLeft={5} 
                marginBottom={0}>
              Pokédex
        </Text>

        <VStack w="100%" paddingX={5} alignSelf="center" marginBottom={5}>
          <Input placeholder="Nome ou Número" variant="filled" width="100%"
                borderRadius="30" borderColor={'#FA8488'} py="2" px="1"
                backgroundColor={'#f8a8ac'} color={'#fff'}
                placeholderTextColor={'#fff'} fontWeight='normal' fontSize={14}
                marginTop='2'
                InputLeftElement={<Icon ml="2" size="6" color="#fff"
                                        as={<Ionicons name="ios-search" />} />} />
        </VStack>          
      </Box>
      
      <Box flex={3}>
      <TabView
        lazy
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
      />
      </Box>

    </Box>
    
  );
}