import { faReceipt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { t } from 'react-native-tailwindcss'

interface ILoading {
    duration?: number //in ms
    iconSize?: number
    iconColor?: string
    bgColor?: string
    padding?: number
}

const startRotationAnimation = (durationMs: number, rotationDegree: Animated.Value): void => {
    Animated.loop(Animated.timing(
        rotationDegree,
        {
            toValue: 360,
            duration: durationMs,
            easing: Easing.linear,
            useNativeDriver: true
        }
    )).start()
}

export const Loading: React.FC<ILoading> = ({ duration = 2500, iconSize = 40, iconColor = 'white', bgColor = 'black', padding = 20 }) => {
    const degree = useRef(new Animated.Value(0)).current

    useEffect(() => {
        startRotationAnimation(duration, degree)
    }, [degree])

    return (
        <Animated.View
            style={[t.flex, t.justifyCenter, t.itemsCenter, t.roundedFull, {
                backgroundColor: bgColor,
                width: iconSize + padding,
                height: iconSize + padding,
                transform: [{
                    rotate: degree.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg']
                    })
                }]
            }]}
        >
            <FontAwesomeIcon size={iconSize} icon={faReceipt} style={{ color: iconColor }} />
        </Animated.View>
    )
}