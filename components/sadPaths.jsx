import { Button, Dialog, Text, } from "@rneui/themed"
import { Component, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../core/navigators";
import { useNavigation } from "@react-navigation/native";

export const ErrorDialog = (props) => {
    const { open, close, msg, title = "An error ocurred !" } = props
    return (
        <Dialog
            isVisible={open}
            overlayStyle={{ borderRadius: 20 }}
        >
            <Dialog.Title title={title} titleStyle={styles.errTitle} />
            {msg && <Text >{msg}</Text>}
            <Dialog.Actions>
                <Dialog.Button title={'OK'} onPress={close} />
            </Dialog.Actions>
        </Dialog>
    )
}

export const LoadingPage = (props) => {
    return (
        <View style={styles.container}>
            <Text h4>Fetching the details...</Text>
            <Dialog.Loading/>
        </View>
    )
}

// export class ErrorBoundary extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false, error: null };
//     }

//     static getDerivedStateFromError(error) {
//         return { hasError: true, error };
//     }

//     componentDidCatch(error, errorInfo) {
//         console.log(error);
//     }

//     render() {
//         if (this.state.hasError) {
//             return <ErrorScreen error={this.state.error} />
//         }

//         return this.props.children;
//     }
// }

// const ErrorScreen = ({error}) => {
//     const { loggedState } = useContext(AuthContext);
//    const navigation = useNavigation();
//    const fallbackScreen = loggedState.loggedIn ? 'home' : 'login'
//     return (
//         <View style={styles.container}>
//             <Text style={styles.errorText}>Something went wrong.</Text>
//             <Text style={styles.errorDetails}>{error.toString()}</Text>
//             <Button
//                 title={'Take me to ' + fallbackScreen + ' page'}
//                 onPress={() => navigation.navigate(fallbackScreen)}
//                 containerStyle={styles.errorHomeButton}
//             />
//         </View>
//     );
// }

const styles = StyleSheet.create({
    errTitle: {
        fontSize: 25,
        textShadowColor: 'rgba(255, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    },
    errorDetails: {
        marginTop: 10,
        fontSize: 14,
        color: 'gray',
    },
    errorHomeButton: {
        borderRadius: 10,
        marginVertical: 15,
    },
});