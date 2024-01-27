import React, { useState, useEffect, useCallback } from 'react';
import { useWindowDimensions, View, Modal, StatusBar, Animated, Easing,
  ActivityIndicator, Pressable, TextInput, Text } from 'react-native';
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
    pokemon_v2_pokemon (limit: 1025) {
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

    if(pokemons.length == 1025)
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
    
    <View style={{ flex: 1, backgroundColor: '#fff', safeArea: true }}>

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

      <View style={{backgroundColor: '#FA8488', borderBottomEndRadius: 20, borderBottomStartRadius: 20, marginBottom: 0, paddingHorizontal: 15,
                    paddingTop: 50}}>

<Animated.Image 
        style={{
          transform: [{ rotate: spin }],
          height: 200,
          width: 200,
          position: 'absolute',
          bottom: 60,
          right: -40,
          opacity: 0.3
        }}
        source={require('../../img/logopoke_m.png')}
      />

      <Text style={{ fontSize: 40, fontWeight: '800', color: '#fff', paddingLeft: 5, marginBottom: 0 }}>
        BulbaDex
      </Text>

      <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFA9AF', borderRadius: 30, height: 45, width: '80%' }}>
          <Ionicons name="search" size={20} color="white" style={{ marginLeft: 10 }} />
          <TextInput
            style={{ flex: 1, paddingLeft: 10, color: 'white' }} // Estilos inline para o TextInput
            placeholder="Pokemon name or number"
            placeholderTextColor="white" // Altera a cor do texto do placeholder
            onChangeText={(text) => searchFilter(text)}
            value={search}
          />
        </View>
        <Pressable 
          style={{ width: '20%' }}
          onPress={() => idPokemon(Math.round(Math.random() * (905 - 1) + 1))}
        >
          <View style={{ backgroundColor: '#f8a8ac', borderRadius: 8, height: 45, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
            <Ionicons name="gift-outline" size={30} color="white" style={{ }} />
            <Text style={{color: '#fff', fontSize: 8}}>Surprise me</Text>
          </View>
        </Pressable>
      </View>
      </View>

      <View style={{flex: 1}}>

      <View style={{ flex: 3 }}>
        {loadingPrincipal ? 
          <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={'#FA8488'} />
            <Text style={{ textAlign: 'center' }}>Loading pokemons!</Text>
          </View>
          :        
          <FlashList
            numColumns={2}
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={1025}
            ListFooterComponent={
              loading && (
                <View>
                  <ActivityIndicator size="large" color={'#FA8488'} />
                </View>
              )
            }
            ListEmptyComponent={
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FA8488', marginHorizontal: 8, marginVertical: 5, padding: 5, borderRadius: 5 }}>
                <Text style={{ marginHorizontal: 8, color: '#fff' }}>
                  This pokemon doesn't exist.
                </Text>
              </View>
            }
            renderItem={({ item }) => <CardPokemonHome pokemons={item} pokemon={idPokemon} />}
          />
        }
      </View>
    </View>
    </View>
    
  );
}