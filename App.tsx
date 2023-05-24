import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { t } from 'react-native-tailwindcss';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

// Components
import BottomNav from './components/BottomNav';

// Pages
import Home from './pages/Home';
import Search from './pages/Search';
import AddCharge from './pages/AddCharge';
import Likes from './pages/Likes';
import MyPhotos from './pages/MyPhotos';
import Header from './components/Header';

SplashScreen.preventAutoHideAsync()

function App() {
  const [fontsLoaded, error] = useFonts({
    'receipt': require('./assets/fonts/VT323-Regular.otf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <SafeAreaView><Text>{JSON.stringify(error)}</Text></SafeAreaView>
  }

  return (
    <SafeAreaView style={[t.bgGray900, t.flex, t.hFull, t.wFull]} onLayout={onLayoutRootView}>
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/search' Component={Search} />
        <Route path='/addCharge' Component={AddCharge} />
        <Route path='/likes' Component={Likes} />
        <Route path='/myPhotos' Component={MyPhotos} />
      </Routes>
      <BottomNav />
    </SafeAreaView>
  );
}

export default () => (
  <NativeRouter>
    <App />
  </NativeRouter>
)