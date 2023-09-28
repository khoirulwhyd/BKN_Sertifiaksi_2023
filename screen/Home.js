import React from "react";
import { useCallback } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Button } from 'react-native';
import SVG from '../assets/ilustrasi.png';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {
    createStackNavigator,
    HeaderBackButton,
} from '@react-navigation/stack';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles.js';
import {Login} from './Login';
import SvgUri from 'react-native-svg-uri';



const Stack = createStackNavigator();
const Home = (navigate) => {
    const navigation = useNavigation();

    const [fontsLoaded, fontError] = useFonts({
        'OpenSans-Bold': require('./../assets/fonts/OpenSans-Bold.ttf'),
        'OpenSans-SemiBold': require('./../assets/fonts/OpenSans-SemiBold.ttf'),
        'OpenSans-Medium': require('./../assets/fonts/OpenSans-Medium.ttf'),
        'OpenSans-Regular': require('./../assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Light': require('./../assets/fonts/OpenSans-Light.ttf'),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={{ 
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            }} onLayout={onLayoutRootView}>
            <SvgUri
                width="200"
                height="500"
                source={require('./../assets/Ilustration.svg')}
            />
            <View style={styles.textContainer}>
                <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 24, marginTop: 10, color: '#3C3C3C' }}>
                    Buku Kas Nusantara
                </Text>
                <Text style={styles.textParagraph}>
                    Buku kas nusantara adalah sebuah aplikasi sederhana yang digunakan sebagai pencatatan dan pemasukan penjualan buku.
                </Text>               
            </View>
            <Pressable style={styles.button} onPress={() => navigation.navigate(Login)}>
                <Text style={styles.text}>Masuk Ke Aplikasi</Text>
            </Pressable>
        </View>
    )
}




const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
    textParagraph: {
        marginTop:5,
        fontFamily: 'OpenSans-Regular',
        margin:30,
        alignContent: 'center',
        textAlign: 'center',
        color: '#6B6B6B'
    },
    textContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontFamily: 'OpenSans-Bold',
        fontWeight:"bold",
        fontSize: 20,
        color: '#3C3C3C',
    },
    imageContainer: {
        alignItems: 'center',
    },
    logoImage: {
        width: 900,
        height: 200,
        marginTop: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        backgroundColor: '#0750B5',
    },
    text: {
        fontSize: 14,
        // lineHeight: 21,
        fontFamily: 'OpenSans-SemiBold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Home;