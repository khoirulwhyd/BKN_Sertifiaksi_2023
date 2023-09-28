import React, { useState, useEffect, useCallback } from "react";
import {
    Text,
    View,
    StyleSheet,
    Alert,
    TextInput,
    TouchableOpacity,
    Pressable
} from 'react-native';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import Dashboard from "./Dashboard";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Stack Navigator
import { NavigationContainer } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.sqlite');

const Logins = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    var masterUsername = 'admin';
    var masterPassword = 'admin';

    useEffect(() => {
        const initiate = async () => { };
        initiate();
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,password TEXT)'
            );
        });
    }, []);

    const login = async () => {
        if (username == "") {
            alert('Harap isi username');
        } 
        else {
            if (password == "") {
                alert('Harap isi password');
            } else {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
                        const usernameDb = rows.item(0).name;
                        const usernamePw = rows.item(0).password;
                        if (username == usernameDb) {
                            if (password == usernamePw) {
                                alert('Selamat datang');
                                props.navigation.navigate("Dashboard");

                            } else {
                                alert('salah password');
                            }
                        } else {
                            alert('salah username');
                        }
                        console.log(usernamePw);
                    });
                });

                //buat user
                // db.transaction((tx) => {
                //     tx.executeSql('INSERT INTO users (name,password) VALUES (?,?)', 
                //     [masterUsername,masterPassword], (_, { insertId }) => {
                //     console.log(`Data berhasil ditambahkan dengan ID: ${insertId}`);
                //     });
                // });

                // cek user
                // db.transaction((tx) => {
                //     tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
                //     const data = [];
                //     const len = rows.item(0).name;
                //     console.log(len);
                //     });
                // });
            }
        }
    };




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
                onChangeText={setUsername}
                value={username}
            />
            <Text style={styles.label}>
                Password
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => login()}
                style={styles.button}
            >
                <Text style={styles.text}>
                Login
                </Text>
            </TouchableOpacity>
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

