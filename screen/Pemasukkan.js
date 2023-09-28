import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Button} from "react-native";
// import datepicker
import DateTimePicker from '@react-native-community/datetimepicker';




export default function Pemasukkan() {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const [nominal, setNominal] = useState('');
    const [keterangan, setKeterangan] = useState('');
    
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

    return(
        
        <View style={styles.container}>
            <Text style={styles.label}>Masukkan Tanggal</Text>
            <Pressable style={styles.tanggal} onPress={showDatepicker} >
                <Text style={styles.text}>Pilih Tanggal</Text>
            </Pressable>
            <Text style={{ marginTop: 8, color: '#1CA33A', fontFamily:'OpenSans-SemiBold', marginBottom: 8 }}>Dipilih : {date.toLocaleString()}</Text>
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
                onChangeText={(text) => setKeterangan(text)}
                value={keterangan}
            />
            <Pressable style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.text}>Simpan</Text>
            </Pressable>
            <Pressable style={styles.resetButton} onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.text}>Reset Form</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
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
        backgroundColor: '#FFBF46',
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
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
});
