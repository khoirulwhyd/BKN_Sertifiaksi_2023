import * as React from 'react';
import { Button, View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import SVG from './assets/ilustrasi.png';

import Logins from './screen/Login';
import Dashboard from './screen/Dashboard';
import Pemasukkan from './screen/Pemasukkan';
import Pengeluaran from './screen/Pengeluaran';
import DetailCash from './screen/DetailCash';
import Setting from './screen/Setting';

function HomeScreen({ navigation }) {
  const [fontsLoaded, fontError] = useFonts({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Medium': require('./assets/fonts/OpenSans-Medium.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
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
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }} onLayout={onLayoutRootView}>
      <Image source={SVG} height={200} width={200} />
      <View style={styles.textContainer}>
        <Text style={{ fontFamily: 'OpenSans-Bold', fontSize: 24, marginTop: 10, color: '#3C3C3C' }}>
          Buku Kas Nusantara
        </Text>
        <Text style={styles.textParagraph}>
          Buku kas nusantara adalah sebuah aplikasi sederhana yang digunakan sebagai pencatatan dan pemasukan penjualan buku.
        </Text>
      </View>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Logins')}>
        <Text style={styles.text}>Masuk Ke Aplikasi</Text>
      </Pressable>
    </View>
  );
}

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Logins" component={Logins} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Pemasukkan" component={Pemasukkan} />
        <Stack.Screen name="Pengeluaran" component={Pengeluaran} />
        <Stack.Screen name="DetailCash" component={DetailCash} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  headerr : {
    fontFamily: 'OpenSans-SemiBold',
    color: 'red'
  },
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  textParagraph: {
    marginTop: 5,
    fontFamily: 'OpenSans-Regular',
    margin: 30,
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
    fontWeight: "bold",
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
export default App;
