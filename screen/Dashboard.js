import React, {useState, useEffect} from "react";
import {
    Text,
    View,
    StyleSheet,
    Button,
    Alert,
    TextInput,
    ScrollView,
    Pressable,
    Image,
    TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Grafik from './../assets/Grafik.png';
import Constants from 'expo-constants';

import * as SQLite from 'expo-sqlite';
import Moment from 'moment';

const db = SQLite.openDatabase('db.sqlite');

//import Page
import Pemasukkan from "./Pemasukkan";

function Dashboards({ navigation, iconName, title, description, onPress }) {
    const [masuk, setMasuk] = useState('');
    const [keluar, setKeluar] = useState('');
    const [saldo, setSaldo] = useState('');
    Moment.locale('id');
    var dt = new Date();
    var bulan = Moment(dt).format('M');
    var ini = Moment(dt).format('MMMM');
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // Membuat tabel jika belum ada
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,tanggal TEXT,nominal TEXT,tipe TEXT,bulan TEXT)'
            );
        });


        // Mengambil data dari database saat aplikasi dimuat
        fetchMasuk();
        fetchKeluar();
        saldoGet();
    }, []);

    const fetchMasuk = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT sum(nominal) as nominal FROM items WHERE tipe = "masuk" AND bulan = ?', [bulan], (_, { rows }) => {
                const len = rows.item(0).nominal;
                console.log(`Data masuk: ${len}`);
                setMasuk(len);
            });
        });
    };

    const fetchKeluar = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT sum(nominal) as nominal FROM items WHERE tipe = "keluar" AND  bulan = ?', [bulan], (_, { rows }) => {
                const len = rows.item(0).nominal;
                console.log(`Data keluar: ${len}`);
                setKeluar(len);
            });
        });
    };

    const saldoGet = () => {
        fetchMasuk();
        fetchKeluar();
        let oke = masuk - keluar;
        console.log(oke);
        setSaldo(oke);
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
        
        <ScrollView style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.flexItems}>
                <View style={styles}>
                    <Text style={styles.headerText}>
                        Selamat Datang
                    </Text>
                    <Text style={{ color: '#E8E8E8', fontSize: 14, paddingVertical: 4, fontFamily: 'OpenSans-Regular' }}>
                        Muhammad Khoirul
                    </Text>
                </View>
                <View style={styles.icons}>
                    <Ionicons name="ios-settings" size={24} color="white" onPress={() => navigation.navigate('Setting')} />
                </View>
            </View>
            <View style={styles.flexTitle}>
                <View style={styles.icons}>
                    <FontAwesome name="bar-chart-o" size={20} color="#0750B5" />
                </View>
                <View style={styles}>
                    <Text style={styles.titleContainer}>
                        Rangkuman Bulan {ini}
                    </Text>
                </View>
            </View>
            {/* <Text style={styles.label}> Rangkuman Pemasukkan Bulan Ini</Text> */}
            <View style={styles.Card1}>
                
                <Image
                    style={styles.image}
                    source={Grafik}
                    contentFit="cover"
                    transition={1000}
                />
                {/* <Text style={{ alignContent: 'center', textAlign: 'center', fontFamily: 'OpenSans-Regular', color: 'green' }}>Pengeluaran : Rp. 20.000</Text>
                <Text style={{ alignContent: 'center', textAlign: 'center', fontFamily: 'OpenSans-Regular', color: 'red' }}>Pemasukkan : Rp. 20.000</Text> */}
                <View style={styles.flexTitle}>
                    <View style={styles.titleMenu}>
                        <Text style={{ alignContent: 'center', textAlign: 'center', fontFamily: 'OpenSans-Regular', color: 'red', fontSize:12, }}>
                            Pengeluaran : Rp. {parseInt(keluar).toLocaleString()}
                        </Text>
                    </View>
                    <View style={styles}>
                        <Text style={{ alignContent: 'center', textAlign: 'center', fontFamily: 'OpenSans-Regular', color: 'green', fontSize: 12, }}>
                            Pemasukan : Rp. {parseInt(masuk).toLocaleString()}
                        </Text>
                    </View>
                </View>
                <View style={styles}>
                    <Text style={{ alignContent: 'center', textAlign: 'center', fontFamily: 'OpenSans-Bold', color: 'gray', fontSize: 14, }}>
                        Saldo : Rp. {parseInt(saldo).toLocaleString()}
                    </Text>
                </View>
            </View>
            
            <View style={styles.flexTitle}>
                <View style={styles.icons}>
                    <MaterialIcons name="menu-book" size={20} color="#0750B5" />
                </View>
                <View style={styles}>
                    <Text style={styles.titleContainer}>
                        Menu Lainnya
                    </Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Pemasukkan')}>
                <View style={styles.cardFlex}>
                    <View style={styles.icons}>
                        <AntDesign name="addfile" size={24} color="#555555" />
                    </View>
                    <View style={styles}>
                        <Text style={styles.titleMenu}>
                            Tambah Pemasukkan
                        </Text>                       
                    </View>
                    <View style={styles.righticon}>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Pengeluaran')}>
                <View style={styles.cardFlex}>
                    <View style={styles.icons}>
                        <AntDesign name="addfile" size={24} color="#555555" />
                    </View>
                    <View style={styles}>
                        <Text style={styles.titleMenu}>
                            Tambah Pengeluaran
                        </Text>
                    </View>
                    <View style={styles.righticon}>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DetailCash')}>
                <View style={styles.cardFlex}>
                    <View style={styles.icons}>
                        <AntDesign name="addfile" size={24} color="#555555" />
                    </View>
                    <View style={styles}>
                        <Text style={styles.titleMenu}>
                            Detail Cash Flow
                        </Text>
                    </View>
                    <View style={styles.righticon1}>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                    </View>
                </View>
            </TouchableOpacity>
            
        </ScrollView>
    );
}
const Stack = createNativeStackNavigator();
function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Pemasukkan" component={Pemasukkan} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        fontSize: 12,
        alignContent: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'OpenSans-Bold',
        color: '#555555',
        textAlign: 'auto',
    },
    titleMenu: {
        alignContent: 'center',
        justifyContent: 'flex-start',
        fontFamily: 'OpenSans-SemiBold',
        color: '#555555',
        textAlign: 'auto',
    },
    icons: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    righticon: {
        alignContent: 'right',
        justifyContent: 'flex-end',
        textAlign: 'right',
        marginLeft: 70,
        paddingHorizontal: 10,
    },
    righticon1: {
        alignContent: 'right',
        justifyContent: 'flex-end',
        textAlign: 'right',
        marginLeft: 105,
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize : 20,
        color: '#fff',
        fontFamily: 'OpenSans-SemiBold'
    },
    Card1: {
        flex: 0,
        margin: 8,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#C3BEBE',
    },
    flexItems: {
        gap: 105,
        flexDirection: 'row',
        backgroundColor: '#0750B5',
        height: 80,
        width: 'full',
        padding: 10,
        borderRadius: 6,
        marginBottom: 10,
        alignItems: 'left',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0 },
        elevation: 1,
    },

    flexTitle: {
        gap: 3,
        flexDirection: 'row',
        backgroundColor: '',
        height: 40,
        width: 'full',
        
        marginBottom: 1,
        alignItems: 'center',
        justifyContent: 'left',
    },

    cardFlex: {
        gap: 3,
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        height:70,
        width: 'full',
        padding: 10,
        margin: 8,
        borderRadius: 6,
        marginBottom: 2,
        alignItems: 'center',
        justifyContent: 'left',
        borderWidth: 1,
        borderColor: '#C3BEBE',
        // shadowColor: 'black',
        // shadowOpacity: 0.2,
        // shadowOffset: { width: 10, },
        // elevation: 3,
    },
    headerCard: {
        flex: 0,
        backgroundColor: '#0750B5',
        height: 80,
        width: 'full',
        padding: 10,
        borderRadius: 10,
        alignItems: 'left',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0 },
        elevation: 1,
    },
    card: {
        flex: 0,
        margin: 8,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0  },
        elevation: 1,
    },
    title: {
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: 'gray',
        marginTop: 5,
    },
    label : {
        padding: 8,
        fontSize: 14,
        fontFamily: 'OpenSans-SemiBold',
    },
    container: {
        flex: 1,
        marginTop: 10,
        padding: 10,
        marginBottom:10
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
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

export default Dashboards;

