import { StyleSheet } from 'react-native';

const styleConstants = {
    buttonHorizontalPadding: 30,
    buttonVerticalPadding: 5
};

const colors = {
    darkgrey: '#484848',
    offwhite: '#F6F6F6'
};

const styles = StyleSheet.create( {
    button: {
        alignItems: 'center',
        backgroundColor: colors.offwhite,
        borderColor: colors.darkgrey,
        borderRadius: 4,
        borderWidth: 1,
        elevation: 2,
        marginTop: 15,
        paddingTop: styleConstants.buttonVerticalPadding,
        paddingBottom: styleConstants.buttonVerticalPadding,
        paddingLeft: styleConstants.buttonHorizontalPadding,
        paddingRight: styleConstants.buttonHorizontalPadding,
        width: '80%'
    },

    buttonText: {
        color: colors.darkgrey,
        fontSize: 18
    },

    container: {
        alignItems: 'center',
        backgroundColor: 'oldlace',
        flex: 1,
        paddingBottom: 15
    }

} );

export default styles;
