import React, {Component} from 'react'
import { Text, TextInput, View, Platform, StatusBar, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Button, normalize } from 'react-native-elements'
import pie from '../../assets/pie.jpg'
import styles from './styles'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { ImageBackground } from 'react-native'



export default class Signup extends Component {
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        } 
    }
    
    render(){
        return (
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>

    
            <Text style={styles.texttitle}>Slice D'Pie</Text>
            
                <Text>
                    {'\n'}
                </Text>
                
                <Text style={styles.usernamelabel}>First Name</Text>
                <TextInput 
                    style={styles.credentialinput} 
                    onChangeText={firstName=> this.setState({ firstName})}
                />

                <Text>
                    {'\n'}  
                </Text>
                
                <Text style={styles.usernamelabel}>Last Name</Text>
                <TextInput 
                    style={styles.credentialinput} 
                    onChangeText={lastName=> this.setState({ lastName})}
                />

                <Text>
                    {'\n'}  
                </Text>

                <Text style={styles.usernamelabel}>Email</Text>
                <TextInput 
                    style={styles.credentialinput} 
                    onChangeText={email=> this.setState({email})}
                />

                {/* //space */}
                <Text>
                {'\n'}    
                </Text>
                
                
                <Text 
                    style={styles.usernamelabel}>Password</Text>
                
                <TextInput

                    secureTextEntry={true}
                    style={styles.credentialinput} 
                    onChangeText={password=> this.setState({ password })}
                    />
            
                <Text>
                    {'\n'}
                </Text>

                <TouchableOpacity
                    style={styles.loginbutton}
                    onPress={()=> alert(`First name is ${this.state.firstName}, last name is ${this.state.lastName}, Email is ${this.state.email} and pass is ${this.state.password}` )}
                    >

                        <Text style={styles.logintext}>Sign up</Text>

                </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

  
         )
    }

}

  