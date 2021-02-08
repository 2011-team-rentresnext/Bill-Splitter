import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import cat3 from '../assets/cat3.gif';
import styles from './styles';

export default class LoadingPage extends Component {
    constructor(props){
        super(props)
        this.route = this.props.route
        this.nextPage = 'Home'

    }

 
    render() {
      const { navigation } = this.props

    setTimeout(()=> navigation.navigate(`${this.nextPage}`), 3000)

    return (

        <View style={styles.container}>
            <Text style={styles.texttitle}>Slice D'Pie{'\n'}</Text>

            <Image source={cat3} style={styles.image} />

            <Text>
            {'\n'}
            {'\n'}
            {'\n'}
            </Text>

            <Text style={styles.texttitle}>Preparing Pie</Text>
        </View>
    );
  }
}
