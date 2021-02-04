import React, {Component} from 'react'
import { Text, TextInput, View, Platform, StatusBar, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Button, normalize } from 'react-native-elements'
import pie from '../../assets/pie.jpg'
import styles from './styles'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { ImageBackground } from 'react-native'



export default class History extends Component {
    constructor(){
        super()
        this.state = {
            transactions: []
        } 
    }
    
    render(){
        return (
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>

    
            <Text style={styles.texttitle}>Slicing History</Text>
            
                <Text>
                    {'\n'}
                </Text>
                
                
                <Text style={styles.usernamelabel}>Search</Text>
                <TextInput 
                    style={styles.credentialinput} 
                />

                <Text>
                    {'\n'}  
                </Text>
                
                <Text>
                    {'\n'}  
                </Text>
                
                <Text>
                    {'\n'}  
                </Text>
                
                <Text>
                    {'\n'}  
                </Text>
                
                <Text>
                    {'\n'}  
                </Text>
                
                <Text>
                    {'\n'}  
                </Text>
                
                <Text>
                    {'\n'}  
                </Text>
                
                <Text>
                    {'\n'}  
                </Text>
                
                <Text>
                    {'\n'}  
                </Text>
                
                <Text>
                    {'\n'}  
                </Text>
                
                <Text>
                    {'\n'}  
                </Text>
                
                
                <TouchableOpacity
                    style={styles.loginbutton}
                    onPress={()=> alert(`The history will go here!` )}
                    >

                        <Text style={styles.logintext}>Export as PDF</Text>

                </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

  
         )
    }

}

  