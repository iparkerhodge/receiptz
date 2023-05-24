import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { ScrollView, View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';

const Home = () => {
    const [posts, setPosts] = useState([])

    // useEffect(() => {
    //     axios.get('http://parkers-macbook-pro.local:3000/photo_post/index')
    //         .then(res => {
    //             setPosts(res.data)
    //         })
    // }, [])


    return (
        <ScrollView style={[t.hFull, t.bgWhite]}>
            <View style={[t.pT3]}>
                <Text>home</Text>
            </View>
        </ScrollView>
    )
}

export default Home