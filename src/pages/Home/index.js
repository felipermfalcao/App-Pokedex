import React, { useState, useEffect, useCallback } from 'react';
import { useWindowDimensions, View, Modal, StatusBar, Animated, Easing,
        ActivityIndicator, Pressable } from 'react-native';
import { Text, Box, FlatList, VStack, Input, Icon, Image, Button, HStack } from "native-base";
import axios from 'axios';
import {Ionicons} from '@expo/vector-icons';
import { FlashList } from "@shopify/flash-list";
import { gestureHandlerRootHOC} from 'react-native-gesture-handler';

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
  outputRange: ['0deg', '360deg']
})

export default function Home(){
  const [pokemon, setPokemon] = useState(0);
const [modalVisible, setModalVisible] = useState(false);  
const [pokemons, setPokemons] = useState([]);
const [loading, setLoading] = useState(false);
const [loadingPrincipal, setLoadingPrincipal] = useState(true);
const [page, setPage] = useState(0);
const [totalPokemons, setTotalPokemons] = useState(false);
const [refreshing, setRefreshing] = useState(false);

const [search, setSearch] = useState(''); 
const [filteredData, setFilteredData] = useState([]); 
const [masterData, setMasterData] = useState([]);

const ExampleWithHoc = gestureHandlerRootHOC(() => (
  <View flex={1}>
    <ModalPokemon data={pokemon} setModalVisible={() => setModalVisible(false)}/>
  </View>
)
)

function idPokemon(id){
  setPokemon(id);
  setModalVisible(true);
}

//    pokemon_v2_pokemon (limit: 150, offset: ${page}) {

const getPokemons = async () => {
  const query = `query MyQuery {
    pokemon_v2_pokemon (limit: 1008) {
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
    
   
    if(page > 1)
    {
      setPokemons([...pokemons, ...res.data.data.pokemon_v2_pokemon]);
      setLoading(false);
      setTotalPokemons(pokemons.length);
      //console.log(pokemons.length)

      setFilteredData(res.data.data.pokemon_v2_pokemon);
      setMasterData(res.data.data.pokemon_v2_pokemon);
    }
    else
    {
      setPokemons(res.data.data.pokemon_v2_pokemon);
      setLoadingPrincipal(false);

    setFilteredData(res.data.data.pokemon_v2_pokemon);
    setMasterData(res.data.data.pokemon_v2_pokemon);
    }

    //console.log(pokemons);
  } catch (err) {
    //console.log(err);
  }
};

  useEffect(() => {
    getPokemons();
  }, [page]);

  function morePokemons() { 
    if(loading)
    {
      return;
    }

    if(pokemons.length == 905)
    {
      //console.log(pokemons.length);
      return;
    }

    setLoading(true);
    setPage(page + 150);
  }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  
  const refreshControl = useCallback(() => {
    setRefreshing(true);
    wait(5000).then(() => setRefreshing(false));
  }, []);

//console.log('renderizou')

const {height, width} = useWindowDimensions();
const alturaTopo = height * 0.25;
const alturaList = height * 0.75;

const searchFilter = (text) => {
  if (text) {
    const newData = masterData.filter(
      function (item) {
        if (item.name || item.id) {
          const itemData = item.name.toUpperCase();
          const itemNumberData = item.id ? item.id.toString().toUpperCase() : '';
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1 || itemNumberData.indexOf(textData) > -1;
        }
    });
    setFilteredData(newData);
    setSearch(text);
  } else {
    setFilteredData(masterData);
    setSearch(text);
  }
};

  return (
    
    <Box flex={1} safeArea backgroundColor={'#fff'}>

      <Modal
        animationType='fade'
        hardwareAccelerated={true}
        transparent={true}
        visible={modalVisible}
      //   onShow={() => {
      //     InteractionManager.runAfterInteractions(() => {
      //         //console.log('terminou de montar modal');
      //     });
      // }}
        onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <ExampleWithHoc />
      </Modal> 

      <StatusBar backgroundColor='#FA8488' barStyle='light-content'/>      

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

        <HStack w="100%" paddingX={5} alignSelf="center" marginBottom={5}>
          <Input placeholder="Pokemon name or number" variant="filled" width="80%"
                borderRadius="30" borderColor={'#FA8488'} py="2" px="1"
                backgroundColor={'#f8a8ac'} color={'#fff'}
                placeholderTextColor={'#fff'} fontWeight='normal' fontSize={14}
                marginTop='2'
                onChangeText={(text) => searchFilter(text)}
                value={search}
                InputLeftElement={<Icon ml="2" size="6" color="#fff"
                                        as={<Ionicons name="ios-search" />} />} />
          <Pressable width='20%'
          onPress={() => idPokemon(Math.round(Math.random() * (905 - 1) + 1))}>
            <Box alignItems='center' backgroundColor= '#f8a8ac' justifyContent='center' 
                 marginLeft='3' marginRight='0' padding='2' marginTop='2.5' borderRadius='8'>
              <Icon ml="0" size="6" color="#fff"
                    as={<Ionicons name="gift-outline" />} />
            </Box>
          </Pressable>
        </HStack>          
      </Box>
      
      <Box flex={3}>
        {loadingPrincipal ? 
          <View style={{flex: 1, backgroundColor: '#fff', justifyContent:'center', alignContent: 'center'}}>
            <ActivityIndicator size="large" color={'#FA8488'} />
            <Text textAlign={'center'}>Loading pokemons!</Text>
          </View>
          :        
        <FlashList
          numColumns={'2'}
          data={filteredData} //antes pokemons
          keyExtractor={(item) => item.id.toString()}
          //maxToRenderPerBatch={5}
          //updateCellsBatchingPeriod={200}
          // windowSize={3}
          // removeClippedSubviews
          showsVerticalScrollIndicator={false}
          //onEndReachedThreshold={0.1}
          //onRefresh={() => refreshControl()}
          //refreshing={refreshing}
          //onEndReached={morePokemons}
          estimatedItemSize={905}
          ListFooterComponent={
            loading && (
              <View>
                <ActivityIndicator size="large" color={'#FA8488'} />
              </View>
            )
          }
          ListEmptyComponent={
            <Box flex={1} justifyContent='center' alignContent={'center'} background='#FA8488'
                 marginX={8} marginY='5' padding={5} borderRadius='5' >
              <Text marginX={8} color='#fff'>
              This pokemon doesn't exist.</Text>
            </Box>
          }
          renderItem={({item}) => <CardPokemonHome pokemons={item} 
                                                  pokemon={idPokemon}/>}
          />
        }
      </Box>

    </Box>
    
  );
}