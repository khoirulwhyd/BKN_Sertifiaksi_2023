import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from "react-native";
// import datepicker
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SQLite from 'expo-sqlite';
import Moment from 'moment';


const db = SQLite.openDatabase('db.sqlite'); // returns Database object

export default function Pengeluaran({navigation}) {

    const [name, setName] = useState('');
    const [nominal, setNominal] = useState('');
    const [items, setItems] = useState([]);
    Moment.locale('id');
    var dt = new Date();
    var bulan = Moment(dt).format('M');
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
        //    db.transaction((tx) => {
        //   tx.executeSql('ALTER TABLE items ADD COLUMN tanggal TEXT');
        // });

        // db.transaction((tx) => {
        //   tx.executeSql('ALTER TABLE items ADD COLUMN tipe TEXT');
        // });

        // Mengambil data dari database saat aplikasi dimuat
        fetchItems();
    }, []);

    const fetchItems = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM items WHERE tipe ="keluar" ', [], (_, { rows }) => {
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

    const resetItem = () => {
        setName(''); // Mengosongkan input setelah menambahkan
        setNominal('');
        setDate(new Date());
    };

    const addItem = () => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO items (name,nominal,tanggal,tipe,bulan) VALUES (?,?,?,?,?)',
                [name, nominal, date.toLocaleString(), 'keluar', bulan], (_, { insertId }) => {
                    console.log(`Data berhasil ditambahkan dengan ID: ${insertId}`);
                    fetchItems(); // Memuat ulang data setelah menambahkan
                    setName(''); // Mengosongkan input setelah menambahkan
                    setNominal('');
                    setDate(new Date());
                });
        });
    };

    const deleteItem = (id) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM items WHERE id = ?', [id], () => {
                //console.log(`Data dengan ID ${id} berhasil dihapus.`);
                fetchItems(); // Memuat ulang data setelah menghapus
            });
        });
    };

    
    return (

        <View style={styles.container}>
            <Text style={styles.label}>Masukkan Tanggal</Text>
            <Pressable style={styles.tanggal} onPress={showDatepicker} >
                <Text style={styles.text}>Pilih Tanggal</Text>
            </Pressable>
            <Text style={{ marginTop: 8, color: '#1CA33A', fontFamily: 'OpenSans-SemiBold', marginBottom: 8 }}>Dipilih : {date.toLocaleString()}</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    onChange={onChange}
                />
            )}
            <Text style={styles.label}>Masukkan Nominal (Rp)</Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan Nominal"
                onChangeText={(text) => setNominal(text)}
                keyboardType="numeric"
                value={nominal}
            />

            <Text style={styles.label}>Masukkan Keterangan</Text>
            <TextInput
                style={styles.textArea}
                placeholder="Masukkan Keterangan"
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <Pressable style={styles.button} onPress={addItem}>
                <Text style={styles.text}>Simpan</Text>
            </Pressable>
            <Pressable style={styles.resetButton} onPress={resetItem}>
                <Text style={styles.text2}>Reset Form</Text>
            </Pressable>
            <FlatList
                style={{
                    marginTop: 20,
                }}
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text style={{ fontFamily: 'OpenSans-SemiBold', marginVertical: 5, }}>ID: {item.id}</Text>
                        <Text style={styles.textCaption}>Tanggal: {item.tanggal}</Text>
                        <Text style={styles.textCaption}>Nominal: {item.nominal}</Text>
                        <Text style={styles.textCaption}>Keterangan: {item.name}</Text>
                        <Text style={styles.textCaption}>tipe: {item.tipe}</Text>

                        <Pressable
                            style={styles.buttonDanger} onPress={() => deleteItem(item.id)}>
                            <Text style={styles.text}>Hapus</Text>
                        </Pressable>
                    </View>
                )}
            />

        </View>
    );
}
const styles = StyleSheet.create({
    buttonDanger: {
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        backgroundColor: '#D14B57',
    },
    textCaption: {
        marginTop: 2,
        fontSize: 12,
        fontFamily: 'OpenSans-SemiBold',
        color: '#595858'
    },
    tanggal: {
        alignItems: 'center',
        marginTop: 5,
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        backgroundColor: '#1CA33A',
    },
    resetButton: {
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#C3BEBE'
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#C3BEBE',
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
    text2: {
        fontSize: 14,
        // lineHeight: 21,
        fontFamily: 'OpenSans-SemiBold',
        letterSpacing: 0.25,
        color: 'gray',
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
});
