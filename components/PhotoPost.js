import React from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native'
import { t } from 'react-native-tailwindcss'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const PhotoPost = ({ post }) => {
    const { image_url, username } = post
    return (
        <View style={[t.pT3]}>
            <View style={[t.flex, t.flexRow, t.itemsCenter, t.p2]}>
                <Image style={[t.h8, t.w8, t.bgGray900, t.roundedFull]} />
                <Text style={[t.textXl, t.pL2, t.fontMedium]}>{username}</Text>
            </View>
            <Image style={{ aspectRatio: 1 }} source={{ uri: `http://parkers-macbook-pro.local:3000${image_url}` }} />
            <View style={[t.flex, t.flex1, t.flexRow]}>
                <TouchableOpacity style={[t.p3]}>
                    <FontAwesomeIcon size={20} icon={faHeart} />
                </TouchableOpacity>
                <TouchableOpacity style={[t.p3]}>
                    <FontAwesomeIcon size={20} icon={faComment} />
                </TouchableOpacity>
                <TouchableOpacity style={[t.p3]}>
                    <FontAwesomeIcon size={20} icon={faPaperPlane} />
                </TouchableOpacity>
                <TouchableOpacity style={[t.p3]}>
                    <FontAwesomeIcon size={20} icon={faBookmark} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PhotoPost