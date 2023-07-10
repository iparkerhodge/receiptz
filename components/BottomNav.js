import { faHome, faPlusSquare, faReceipt, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { t } from "react-native-tailwindcss"
import { Image, TouchableOpacity, View } from "react-native"
import { Link } from "react-router-native"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { BlurView } from "@react-native-community/blur"

export default BottomNav = () => {
    const { user } = useContext(UserContext)
    return (
        <BlurView style={[t.absolute, t.bottom0, t.left0, t.wFull, t.flex]} blurType="dark">
            <View style={[t.flex1, t.flex, t.flexRow, t.rounded]}>
                <Link to="/" style={[t.flex1]} component={TouchableOpacity}>
                    <View style={[t.pX8, t.pY6, t.flex, t.itemsCenter]}>
                        <FontAwesomeIcon size={20} icon={faHome} style={[t.textWhite]} />
                    </View>
                </Link>
                <Link to="/search" style={[t.flex1]} component={TouchableOpacity}>
                    <View style={[t.pX8, t.pY6, t.flex, t.itemsCenter]}>
                        <FontAwesomeIcon size={20} icon={faSearch} style={[t.textWhite]} />
                    </View>
                </Link>
                <Link to="/addReceipt" style={[t.flex1]} component={TouchableOpacity}>
                    <View style={[t.pX8, t.pY6, t.flex, t.itemsCenter]}>
                        <FontAwesomeIcon size={20} icon={faPlusSquare} style={[t.textWhite]} />
                    </View>
                </Link>
                <Link to="/receipts" style={[t.flex1]} component={TouchableOpacity}>
                    <View style={[t.pX8, t.pY6, t.flex, t.itemsCenter]}>
                        <FontAwesomeIcon size={20} icon={faReceipt} style={[t.textWhite]} />
                    </View>
                </Link>
                <Link to="/account" style={[t.flex1]} component={TouchableOpacity}>
                    <View style={[t.pX8, t.pY6, t.flex, t.itemsCenter]}>
                        <FontAwesomeIcon size={20} icon={faUser} style={[t.textWhite]} />
                    </View>
                </Link>
            </View>
        </BlurView>
    )
}