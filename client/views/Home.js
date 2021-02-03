import React, {Component} from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Platform, StatusBar, Image, TouchableOpacity} from 'react-native'
import { Button, normalize } from 'react-native-elements'
import pie from '../../assets/pie.jpg'
import styles from './styles'

export default class Home extends Component {
    constructor(){
    super();
    
    // //bind this to access props in handler
    // this.onPressButton = this.onPressButton.bind(this)
    }

    render(){
        const {navigation} = this.props
        return (
        <View style={styles.container}>
           <Text style={styles.texttitle}>Slice D'Pie{'\n'}</Text>
           
           <Image
                source={pie}
                style={styles.image} 
            />

            <Text>
                {'\n'}
                {'\n'}
                {'\n'}
             
            </Text>

            <TouchableOpacity
                style={styles.loginbutton}

                // onPress={th }

                onPress={() => navigation.navigate('Login')}>

                    <Text style={styles.logintext}>Login</Text>

            </TouchableOpacity>
                
            <TouchableOpacity
                style={styles.loginbutton}>
                    <Text style={styles.logintext}>Sign Up</Text>
            </TouchableOpacity>
        </View>

         )
    }

    
}

  