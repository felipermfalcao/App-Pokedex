import React from 'react';
import { View, StatusBar, Linking, Pressable } from 'react-native';
import { Icon, HStack, Box, Text, Image } from "native-base";
import {Ionicons} from '@expo/vector-icons';

export default function Desenvolvimento() {

  const abrirNavaegador = () => {
    Linking.openURL('https://www.buymeacoffee.com/devfalcon');
  }


  const id = Math.round(Math.random() * (1008 - 1) + 1);

 return (
   <View style={{flex: 1, backgroundColor: '#FA8488', justifyContent: 'center', alignItems: 'center'}}>
    <StatusBar backgroundColor='#FA8488' barStyle='light-content'/> 

    <Image 
      style={{height: 200, width: 200}}
      source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}}
                alt='imageTop'
      />


    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>Hey 👋, buy me a coffee!</Text>
    
    <Box>
    <Pressable width='20%'
          onPress={() => abrirNavaegador()}>
            
            <Box alignItems='center' backgroundColor= '#f8a8ac' justifyContent='center' 
                 marginLeft='3' marginRight='0' padding='2' marginTop='2.5' borderRadius='8'>
                  <HStack space={2}>
              <Icon ml="0" size="6" color="#fff"
                    as={<Ionicons name="cafe-outline" />} />
                    <Text color={'#fff'}>Donate</Text>
                    </HStack>
            </Box>

          </Pressable>

    </Box>

    <Box marginX='30' marginTop={5}>
      
    <Text color='#fff' fontSize={10} textAlign={'center'}>When you tap you will be redirected to the buymeacoffee.com website where you can make a donation</Text>
    <Text color='#fff' fontSize={10} textAlign={'center'} marginTop='10'><Icon ml="0" size="4" color="#fff"
                    as={<Ionicons name="logo-whatsapp" />} /> +55 85 98751-7076</Text>
    <Text color='#fff' fontSize={10} textAlign={'center'} marginTop='1'><Icon ml="0" size="4" color="#fff"
                    as={<Ionicons name="mail-outline" />} /> contato@felipefalcao.com.br</Text>
    </Box>

    <Image 
      style={{height: 450, width: 450, bottom: -100, right: -100}}
      zIndex={-1} opacity={0.1} position={'absolute'}
                source={require('../../img/logopoke_m.png')} 
                alt='imageTop'
      />
   </View>
  );
}