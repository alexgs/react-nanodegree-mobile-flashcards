import PropTypes from 'prop-types';
import React from 'react';
import { NavigationActions } from 'react-navigation';

import DefaultHeaderBackButton from 'react-navigation/src/views/Header/HeaderBackButton';

class HeaderBackButton extends React.PureComponent {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        navigationTarget: PropTypes.string.isRequired,  // Route name for the back-button to open
        pressColorAndroid: PropTypes.string,
        tintColor: PropTypes.string,
        title: PropTypes.string,
        titleStyle: PropTypes.any,
        truncatedTitle: PropTypes.string,
        width: PropTypes.number
    };

    constructor( props ) {
        super ( props );
        this.navigateToDeckList = this.navigateToDeckList.bind( this );
    }

    navigateToDeckList() {
        const navigateAction = NavigationActions.navigate( {
            routeName: this.props.navigationTarget
        } );
        this.props.navigation.dispatch( navigateAction );
    }

    render() {
        return (
            <DefaultHeaderBackButton
                onPress={ this.navigateToDeckList }
                pressColorAndroid={ this.props.pressColorAndroid }
                title={ this.props.title }
                titleStyle={ this.props.titleStyle }
                tintColor={ this.props.tintColor }
                truncatedTitle={ this.props.truncatedTitle }
                width={ this.props.width }
            />
        );
    }
}

export default HeaderBackButton;