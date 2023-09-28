import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, Button, TouchableOpacity } from "react-native";
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.sqlite');


export default function ({navigation}) {
    const [passwordLama, setPasswordLama] = useState('');
    const [passwordLamaInput, setPasswordLamaInput] = useState('');
    const [passwordBaru, setPasswordBaru] = useState('');
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
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,password TEXT)'
            );
        });


        // Mengambil data dari database saat aplikasi dimuat
        fetchItems();
    }, []);

    const fetchItems = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
                const data = [];
                const len = rows.length;
                for (let i = 0; i < len; i++) {
                    data.push({
                        id: rows.item(i).id,
                        name: rows.item(i).name,
                        password: rows.item(i).password
                    });
                    setPasswordLama(rows.item(i).password);
                }
                setItems(data);

            });
        });
    };

    const updatePw = async () => {
        if (passwordLamaInput == "") {
            alert('isi password lama');
        } else {
            if (passwordBaru == "") {
                alert('isi password baru');
            } else {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
                        const usernameDb = rows.item(0).name;
                        const usernamePw = rows.item(0).password;
                        //if(username == usernameDb)
                        //{
                        if (passwordLamaInput == usernamePw) {

                            db.transaction((tx) => {
                                tx.executeSql('UPDATE users SET password = ? WHERE id = ?', [passwordBaru, 1], () => {
                                    console.log(`berhasil update password.`);
                                    //fetchItems(); // Memuat ulang data setelah memperbarui
                                });
                            });
                            alert('berhasil update password.');
                        } else {
                            alert('salah password lama');
                        }
                        // }else
                        //{
                        //alert('salah username');
                        // }
                    });
                });
            }
        }
    };


    function MyFlatList({ data }) {
        return (
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    // Render sesuatu jika kondisi bukan 'A'
                    return (
                        <View>

                            <Text style={styles.text2}>Anda Login Sebagai : {item.name}</Text>
                            <Text >
                            </Text>
                        </View>
                    );
                    //}
                }}
            />
        );
    }
    return (
        <View
            style=
            {styles.container}>

            <Text style={styles.label}>
                Ganti Password
            </Text>

            <TextInput
                placeholder="Password Lama"
                secureTextEntry={true}
                value={passwordLamaInput}
                onChangeText={(text) => setPasswordLamaInput(text)}
                style={styles.input}
            />

            <TextInput
                placeholder="Password Baru"
                secureTextEntry={true}
                value={passwordBaru}
                onChangeText={(text) => setPasswordBaru(text)}
                style={styles.input}
            />

            <TouchableOpacity onPress={updatePw}
                style={styles.button}
            >
                <Text style={styles.text}>
                    Ubah Password
                </Text>
            </TouchableOpacity>

            <MyFlatList data={items} />


        </View>
    );
}

const styles = StyleSheet.create({
    resetButton: {
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        backgroundColor: '#FFBF46',
    },
    textArea: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        width: 200,
        margin: 5,
        flex: 0,
        borderRadius: 6,
        backgroundColor: '#F8F8F8',
        width: 'full',
        height: 100,
    },
    label: {
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
    text2: {
        fontSize: 14,
        // lineHeight: 21,
        fontFamily: 'OpenSans-SemiBold',
        letterSpacing: 0.25,
        marginTop:10,
        color: 'black',
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
});