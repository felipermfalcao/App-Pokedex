import React, { useState, memo } from 'react';
import { ImageBackground, useWindowDimensions, Pressable  } from 'react-native';
import { Text, Box, HStack, Image, Modal  } from "native-base";
import {Ionicons} from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureDetector , Gesture} from 'react-native-gesture-handler';

function CardPokemonHome (props){

    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });
    const animatedStyles = useAnimatedStyle(() => {
    return {
        transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 0.8 : 1) },
        ]
    };
    });

    const start = useSharedValue({ x: 0, y: 0 });
    const gesture = Gesture.Tap()
    .onBegin(() => {
        isPressed.value = true;
    })
    .onFinalize(() => {
        isPressed.value = false;
    });

    let corTipo = '#000';

    if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'normal')
    {
        corTipo = '#A4ACAF';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'fighting')
    {
        corTipo = '#D56723';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'flying')
    {
        corTipo = '#8e97c4';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'poison')
    {
        corTipo = '#B97FC9';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'ground')
    {
        corTipo = '#f4a142';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'rock')
    {
        corTipo = '#c48c4f';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'bug')
    {
        corTipo = '#97b45e';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'ghost')
    {
        corTipo = '#6a6a8f';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'steel')
    {
        corTipo = '#9f9f9f';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'fire')
    {
        corTipo = '#f87f89';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'water')
    {
        corTipo = '#7ac0f8';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'grass')
    {
        corTipo = '#4ad3ae';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'electric')
    {
        corTipo = '#ffc957';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'psychic')
    {
        corTipo = '#d97b93';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'ice')
    {
        corTipo = '#A5C2D7';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'dragon')
    {
        corTipo = '#4d4d4d';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'dark')
    {
        corTipo = '#1a1a1a';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'unknown')
    {
        corTipo = '#999999';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'fairy')
    {
        corTipo = '#FDB9E9';
    }
    else if (props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name == 'shadow')
    {
        corTipo = '#858585';
    }

    function formatNumber(num) {
        return "#" + num.toString().padStart(3, "0");
    }
    function formatNumberImg(num) {
        return num.toString().padStart(3, "0");
    }

    const tipo2 = props.pokemons.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name.charAt(0).toUpperCase() +
    props.pokemons.pokemon_v2_pokemontypes[1]?.pokemon_v2_type.name.slice(1);

    const {height, width} = useWindowDimensions();

    function passarId (id){
        props.pokemon(id);
    }

    return(
    <GestureDetector gesture={gesture}>
      <Pressable onPress={() => passarId(props.pokemons.id)}>
        <Animated.View style={[animatedStyles]}
        width={180} height={120} borderRadius={16} marginLeft={(width * 0.022)}
        marginRight={(width * 0.022)} marginTop={(height * 0.006)} marginBottom={(height * 0.006)}
             backgroundColor={corTipo}>
            <HStack space={2} justifyContent="space-between" marginBottom={2}>
                <Text color={'#fff'} paddingTop={4} paddingLeft={3} fontSize={13}
                    fontWeight={'bold'}>
                        {props.pokemons.name.charAt(0).toUpperCase() +
                        props.pokemons.name.slice(1)}
                </Text>

                <Text paddingTop={2} paddingRight={3} fontSize={25}
                      color={'#fff'} fontWeight={'black'} opacity='0.4'>
                    {formatNumber(props.pokemons.id)}
                </Text>
            </HStack>

            <HStack space={2} justifyContent="space-between">
                <Box>
                    <Box marginLeft={3} backgroundColor='rgba(255,255,255,0.3)' borderRadius={20} paddingX='4'
                         paddingY={0.4} marginBottom='1'>
                        <Text color='#fff' fontSize='12' fontWeight={500}>
                            {props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name.charAt(0).toUpperCase() +
                        props.pokemons.pokemon_v2_pokemontypes[0].pokemon_v2_type.name.slice(1)}</Text>
                    </Box>
                    <Box>
                    {tipo2 ? 
                    <Box marginLeft={3} backgroundColor='rgba(255,255,255,0.3)' borderRadius={20} paddingX='4'
                         paddingY={0.4}>
                        <Text color='#fff' fontSize='12' fontWeight={500}>
                           {tipo2}
                        </Text>
                    </Box> : ''}
                    </Box>
                </Box>

                <Box>
                    <Image size={100} marginTop={-5}
                    alt={'pokemon'}
                    source={{uri:`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatNumberImg(props.pokemons.id)}.png`}} 
                    />
                </Box>
            </HStack>

            <Image size={100} position='absolute' bottom={-20} right={-18} zIndex='-1' opacity={0.3}
                source={require('../img/logopoke_m.png')} 
                alt='imageTop'
                />
        </Animated.View>
        </Pressable>
        </GestureDetector>
    );
}

export default memo (CardPokemonHome);