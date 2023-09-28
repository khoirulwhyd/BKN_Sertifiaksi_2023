import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

export default function () {
    const [password, setPassword] = useState('');
    const [ubahPassword, setUbahPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                Password Saat Ini
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan password saat ini"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Text style={styles.label}>
                Password Baru
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan password baru"
                onChangeText={(text) => setUbahPassword(text)}
                value={ubahPassword}
                secureTextEntry={true}
            />
            <Pressable style={styles.button}>
                <Text style={styles.text}>Ubah Password</Text>
            </Pressable>
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
    datePickerStyle: {
        width: 200,
        marginTop: 20,
    },
});