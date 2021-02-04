import React, {Component} from 'react'
import { Text, TextInput, View, Platform, StatusBar, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Button, normalize } from 'react-native-elements'
import pie from '../../assets/pie.jpg'
import styles from './styles'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { ImageBackground } from 'react-native'
import pic from '../../assets/HandsomeSquidward.png'
import profile from '../../assets/profile.png'
import { Link } from '@react-navigation/native';



export default class UserHome extends Component {
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            image: ''
        } 
    }
    
    render(){
        const {navigation} = this.props
        return (
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>

            <ImageBackground
                source={profile} 
                style={styles.container}
            >
            <View style={styles.navbar}>
                <Text style={styles.navtextsmall}>Settings {'\n'} </Text>
                <Text style={styles.navtextbig}>Home </Text>
                <Text style={styles.navtextsmall}>Logout</Text>
            </View>

                <Image
                    source={pic}
                    style={styles.profileimage}
                />

                <Text style={styles.profilenametext}>Handsome Squidward</Text>
        
                <Text style={styles.profileemailtext}>handsome@email.com</Text>
               
                <Text>
                    {'\n'}  
                </Text>

                

                <TouchableOpacity
                    style={styles.loginbutton}
                    onPress={() => navigation.navigate('Scanner')}   
                >

                        <Text style={styles.logintext}>Start Slicing!</Text>

                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => navigation.navigate('FriendsList')}  
                    style={styles.loginbutton}  
                >

                        <Text style={styles.logintext}>Slicing Friends</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginbutton}   
                >

                        <Text style={styles.logintext}
                        onPress={() => navigation.navigate('History')}
                        >Slicing History</Text>

                </TouchableOpacity>

                </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

  
         )
    }

}

  