import { faHeart, faHome, faPlusSquare, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { t } from "react-native-tailwindcss"
import { Image, TouchableOpacity, View } from "react-native"
import { Link } from "react-router-native"
import { useContext } from "react"
import { UserContext } from "../context/userContext"

export default BottomNav = () => {
    const { user } = useContext(UserContext)
    return (
        <View style={[t.absolute, t.bottom0, t.flex, t.flexRow, t.bgGray900]}>
            <Link to="/" style={[t.flex1]} component={TouchableOpacity}>
                <View style={[t.p8, t.flex, t.itemsCenter]}>
                    <FontAwesomeIcon size={20} icon={faHome} style={[t.textWhite]} />
                </View>
            </Link>
            <Link to="/search" style={[t.flex1]} component={TouchableOpacity}>
                <View style={[t.p8, t.flex, t.itemsCenter]}>
                    <FontAwesomeIcon size={20} icon={faSearch} style={[t.textWhite]} />
                </View>
            </Link>
            <Link to="/addCharge" style={[t.flex1]} component={TouchableOpacity}>
                <View style={[t.p8, t.flex, t.itemsCenter]}>
                    <FontAwesomeIcon size={20} icon={faPlusSquare} style={[t.textWhite]} />
                </View>
            </Link>
            <Link to="/likes" style={[t.flex1]} component={TouchableOpacity}>
                <View style={[t.p8, t.flex, t.itemsCenter]}>
                    <FontAwesomeIcon size={20} icon={faHeart} style={[t.textWhite]} />
                </View>
            </Link>
            <Link to="/account" style={[t.flex1]} component={TouchableOpacity}>
                <View style={[t.p8, t.flex, t.itemsCenter]}>
                    {user
                        ? <Image source={{ uri: user.twitterProfileImage }} style={{ height: 24, width: 24, borderRadius: 12 }} />
                        : <FontAwesomeIcon size={20} icon={faUser} style={[t.textWhite]} />
                    }
                </View>
            </Link>
        </View>
    )
}