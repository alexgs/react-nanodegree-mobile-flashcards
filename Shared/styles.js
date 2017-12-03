import { StyleSheet } from 'react-native';

export const colors = {
    darkgrey: '#484848',
    offwhite: '#F6F6F6'
};

const styles = StyleSheet.create( {
    buttonText: {
        color: colors.darkgrey,
        fontSize: 18
    },

    container: {
        alignItems: 'center',
        backgroundColor: 'oldlace',
        flex: 1,
        paddingBottom: 15
    },

    containerVerticalCenter: {
        justifyContent: 'center'
    },

    header: {
        backgroundColor: colors.offwhite
    },

    inputLabel: {
        fontSize: 30,
        textAlign: 'center'
    },

    quizText: {
        fontSize: 24,
        textAlign: 'center'
    }

} );

export default styles;
