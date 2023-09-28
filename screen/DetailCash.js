import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, FlatList } from "react-native";
import * as SQLite from 'expo-sqlite';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

//db
const db = SQLite.openDatabase('db.sqlite'); // returns Database object



export default function ({ navigation }) {
    const [name, setName] = useState('');
    const [nominal, setNominal] = useState('');
    const [items, setItems] = useState([]);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };



    useEffect(() => {
        // Membuat tabel jika belum ada
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,tanggal TEXT,nominal TEXT,tipe TEXT,bulan TEXT)'
            );
        });


        // Mengambil data dari database saat aplikasi dimuat
        fetchItems();
    }, []);

    const fetchItems = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM items', [], (_, { rows }) => {
                const data = [];
                const len = rows.length;
                for (let i = 0; i < len; i++) {
                    const formattedNumber = rows.item(i).nominal.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                    });
                    data.push({
                        id: rows.item(i).id,
                        name: rows.item(i).name,
                        tanggal: rows.item(i).tanggal,
                        tipe: rows.item(i).tipe,
                        nominal: formattedNumber
                    });
                }
                setItems(data);
            });
        });
    };
    
    function MyFlatList({ data }) {
        return (
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    if (item.tipe === 'masuk') {
                        // Render sesuatu jika kondisi adalah 'A'
                        return (
                            <View style={styles.card}>
                                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: 'black', fontSize: 12, paddingTop: 2 }}>ID : {item.id}</Text>
                                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: 'black', fontSize: 12, paddingTop: 2 }}>Tanggal : {item.tanggal}</Text>
                                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Bold', color: 'green', fontSize: 16, paddingTop: 4 }}>(+) Rp.{parseInt(item.nominal).toLocaleString()}</Text>
                                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: '#6B6B6B', fontSize: 12, paddingTop: 2 }}>{item.name}</Text>
                                <Text style={{ textAlign: "left", paddingTop: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: 'green' }}>
                                    Pemasukkan
                                </Text>
                            </View>
                        );
                    } else {
                        // Render sesuatu jika kondisi bukan 'A'
                        return (
                            <View style={styles.card}>
                                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: 'black', fontSize: 12, paddingTop: 2 }}>ID : {item.id}</Text>
                                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: 'black', fontSize: 12, paddingTop: 2 }}>Tanggal : {item.tanggal}</Text>
                                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Bold', color: '#D14B57', fontSize: 16, paddingTop: 4 }}>(-) Rp.{parseInt(item.nominal).toLocaleString()}</Text>
                                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: '#6B6B6B', fontSize: 12, paddingTop: 2 }}>{item.name}</Text>
                                <Text style={{ textAlign: "left", paddingTop: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: '#D14B57' }}>
                                    Pengeluaran
                                </Text>
                            </View>
                        );
                    }
                }}
            />
        ); 
    }
    return(
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={fetchItems}>
                <Text style={styles.text}>Perbarui Data</Text>
            </Pressable>
            <Text style={styles.heading1}>
                Detail Cash Flow
            </Text>

            <MyFlatList data={items} />
        </View>
    );
}

const styles = StyleSheet.create({
    heading1: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
        marginTop: 15,
        marginVertical: 10
    },
    Card1: {
        flexDirection: 'row',
        flex: 0,
        margin: 8,
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0 },
        elevation: 1,
    },
    card: {
        // flexDirection : 'row'
        marginVertical: 5,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 6,
        alignItems: 'left',
        justifyContent: 'left',
        // shadowColor: 'black',
        // shadowOpacity: 0.2,
        // shadowOffset: { width: 0 },
        // elevation: 1,
        borderWidth: 1,
        borderColor: '#E2E1E1',
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
    // label: {
    //     color: 'green',
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    //     textAlign:'right',
    //     padding: 8,
    //     fontSize: 14,
    //     fontFamily: 'OpenSans-SemiBold',
    // },
    container: {
        flex: 1,
        justifyContent: '',
        alignItems: 'left',
        marginTop: 10,
        padding: 10,
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
        marginTop: 2,
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
        color: 'white',
    },
});