import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/userContext';
import { UserStatus } from '../types/types';

const Home = () => {
    const { user, userStatus } = useContext<UserContext | null>(UserContext) as UserContext
    return (
        <View style={[t.bgBlack, t.hFull, t.pB20, t.flex, t.justifyCenter, t.itemsCenter]}>
            <View style={[t.itemsCenter]}>
                <Text style={[t.fontReceipt, t.text3xl, t.textWhite]}>Welcome to Receiptz</Text>
                <Text style={[t.fontReceipt, t.textXl, t.textCenter, t.textWhite]}>The app to track bets, wagers, and absurd predictions</Text>
            </View>
            <View style={[t.flex, t.flexRow, t.itemsCenter, t.mT10]}>
                <Text style={[t.mR2, t.textWhite]}>Click</Text>
                {user
                    ? <FontAwesomeIcon size={20} icon={faPlusSquare} style={[t.textGray900]} color='white' />
                    : <FontAwesomeIcon size={20} icon={faUser} style={[t.textGray900]} color='white' />
                }
                {user
                    ? <Text style={[t.mL2, t.textWhite]}>create a receipt</Text>
                    : <Text style={[t.mL2, t.textWhite]}>to {userStatus === UserStatus.EXISTS ? 'login' : 'sign up'}</Text>
                }
            </View>
            <View style={[t.mT20]} />
        </View>
    )
}

export default Home