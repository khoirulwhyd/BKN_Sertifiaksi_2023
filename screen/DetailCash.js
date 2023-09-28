import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

export default function DetailCash() {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: 'black', fontSize: 12, paddingTop: 2 }}>Tanggal : 27 Maret 2023</Text>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Bold', color: '#3C3C3C', fontSize: 16, paddingTop: 4 }}>Rp. 50.000</Text>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: '#6B6B6B', fontSize: 12, paddingTop: 2 }}>Bayaran Project Yang Sudah Selesai</Text>
                <Text style={{ textAlign: "left", paddingTop: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: 'green' }}>
                    Pemasukkan
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: 'black', fontSize: 12, paddingTop: 2 }}>Tanggal : 27 Maret 2023</Text>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Bold', color: '#3C3C3C', fontSize: 16, paddingTop: 4 }}>Rp. 50.000</Text>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: '#6B6B6B', fontSize: 12, paddingTop: 2 }}>Bayaran Project Yang Sudah Selesai</Text>
                <Text style={{ textAlign: "left", paddingTop: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: 'red' }}>
                    Pengeluaran
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: 'black', fontSize: 12, paddingTop: 2 }}>Tanggal : 27 Maret 2023</Text>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Bold', color: '#3C3C3C', fontSize: 16, paddingTop: 4 }}>Rp. 50.000</Text>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: '#6B6B6B', fontSize: 12, paddingTop: 2 }}>Bayaran Project Yang Sudah Selesai</Text>
                <Text style={{ textAlign: "left", paddingTop: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: 'red' }}>
                    Pengeluaran
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: 'black', fontSize: 12, paddingTop: 2 }}>Tanggal : 27 Maret 2023</Text>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Bold', color: '#3C3C3C', fontSize: 16, paddingTop: 4 }}>Rp. 50.000</Text>
                <Text style={{ textAlign: 'left', fontFamily: 'OpenSans-Regular', color: '#6B6B6B', fontSize: 12, paddingTop: 2 }}>Bayaran Project Yang Sudah Selesai</Text>
                <Text style={{ textAlign: "left", paddingTop: 5, fontFamily: 'OpenSans-SemiBold', fontSize: 14, color: 'red' }}>
                    Pengeluaran
                </Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
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
        // flexDirection : 'row',
        margin: 8,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 6,
        alignItems: 'left',
        justifyContent: 'left',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0 },
        elevation: 1,
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