import React from 'react';
import { View, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, BounceIn } from 'react-native-reanimated';
import { GestureDetector , Gesture} from 'react-native-gesture-handler';
import { Text, Image } from "native-base";

export default function EvolutionPokemons({data}) {

    const isPressed2 = useSharedValue(false);
    const offset2 = useSharedValue({ x: 0, y: 0 });

    const animatedStyles2 = useAnimatedStyle(() => {
    return {
        transform: [
        { translateX: offset2.value.x },
        { translateY: offset2.value.y },
        { scale: withSpring(isPressed2.value ? 0.5 : 1) },
        ]
    };
    });

    const start = useSharedValue({ x: 0, y: 0 });
    const gesture2 = Gesture.Tap()
    .onBegin(() => {
        isPressed2.value = true;
        //console.log('toou');
    })
    .onFinalize(() => {
        isPressed2.value = false;
    });


 return (
 
    <GestureDetector gesture={gesture2}>
    <Animated.View style={animatedStyles2} entering={BounceIn.delay(100)}>     
      <Image 
        alignSelf={'center'}
        size={100} marginTop={3}
        alt={'pokemon'}
        // onLoadEnd={() => setLoadingImgEvo(false)}
        // onLoadStart={() => setLoadingImgEvo(true)}
        source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}}
        />
    
      <Text textAlign={'center'} color='#fff'>{data.name}</Text> 
    </Animated.View> 
    </GestureDetector>
  );
}

