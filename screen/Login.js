import React, {useState} from "react";
import {
    Text,
    View,
    StyleSheet,
    Button,
    Alert,
    TextInput,
    ScrollView,
    Pressable
} from 'react-native';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';

import Constants from 'expo-constants';

import Dashboard from "./Dashboard";

//import Stack Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Logins({ navigation }) {
    const Stack = createNativeStackNavigator();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
    const handleLogin = () => {
        if (username === 'yourUsername' && password === 'yourPassword') {
            // Successful login
            alert('Login successful!');
        } else {
            // Failed login
            alert('Login failed. Please check your credentials.');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Login ke akun anda
            </Text>
            <Text style={styles.label}>
                Username/Email
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan Email/Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <Text style={styles.label}>
                Password
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Pressable style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.text}>Login</Text>
            </Pressable>
        </View>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Logins" component={Logins} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    title: {
        padding: 8,
        fontSize: 20,
        fontFamily: 'OpenSans-Bold',
    },
    label : {
        padding: 8,
        fontSize: 16,
        fontFamily: 'OpenSans-SemiBold',
    },
    container: {
        flex: 1,
        justifyContent: '',
        alignItems: 'left',
        marginTop: 10,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#C3BEBE',
        padding: 10,
        width: 200,
        margin: 5,
        flex: 0,
        borderRadius: 6,
        backgroundColor: '#F8F8F8',
        width: 'full'
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
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

export default Logins;

