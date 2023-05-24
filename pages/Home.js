import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ScrollView, View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    // useEffect(() => {
    //     axios.get('http://parkers-macbook-pro.local:3000/photo_post/index')
    //         .then(res => {
    //             setPosts(res.data)
    //         })
    // }, [])


    return (
        <View style={[t.bgWhite, t.hFull, t.pB20, t.flex, t.justifyCenter, t.itemsCenter]}>
            <View style={[t.itemsCenter]}>
                <Text style={[t.fontReceipt, t.text3xl]}>Welcome to Receiptz</Text>
                <Text style={[t.fontReceipt, t.textXl, t.textCenter]}>The app to track bets, wagers, and absurd predictions</Text>
            </View>
            <View style={[t.flex, t.flexRow, t.itemsCenter, t.mT10]}>
                <Text style={[t.mR2]}>Click</Text>
                <FontAwesomeIcon size={20} icon={faPlusSquare} style={[t.textGray900]} />
                <Text style={[t.mL2]}>to add a charge</Text>
            </View>
            <View style={[t.mT20]} />
        </View>
    )
}

export default Home