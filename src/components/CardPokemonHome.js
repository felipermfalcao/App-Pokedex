import React, { useState } from 'react';
import { ImageBackground  } from 'react-native';
import { Text, Box } from "native-base";
import {Ionicons} from '@expo/vector-icons';

export default function CardPokemonHome (props){
    return(
        <Box width={180} height={100} borderRadius={16} margin={2}
             backgroundColor={'#57cfb7'}>
            {props.pokemons.name}
        </Box>
    );
}