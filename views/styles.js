import * as React from 'react'
import { StyleSheet } from  'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 360,
      height: 250,
      borderRadius: 80,
    },
    text: {
      margin: 5,
    },
    texttitle: {
        color: '#E83535',
        fontSize: 45,
        fontFamily: "Cochin"
    },
    loginbutton: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        height: 48,
        width: 300,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E83535',    
    },
    logintext: {
        color: 'white',
        fontSize: 30,
        fontFamily: "Cochin"
    },

    //for Login component
    imagelogin: {
        width: 350,
        height: 200,
        borderRadius: 80,
      },
    usernamelabel: {
        color: '#E83535',
        fontSize: 30,
        fontFamily: "Cochin"
    },
    credentialinput: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        height: 48,
        width: 300,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#E83535',
        borderWidth: 2,
        textAlign: 'center',
        fontSize: 25   
    },
    
    //sign up
    profilebg: {
        width: 400,
        height: 700,
        resizeMode:'stretch'
      },
  
      //UserHome component
    navbar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },

    navtextbig: {
        color: 'white',
        fontSize: 35,
        fontFamily: "Cochin"
    },

    navtextsmall: {
        color: 'white',
        fontSize: 30,
        fontFamily: "Cochin"
    },

    profileimage: {
        width: 275,
        height: 275,
        borderRadius: 200,
    },

    profilenametext: {
        color: '#E83535',
        fontSize: 35,
        fontFamily: "Cochin"
    },

    profileemailtext: {
        color: '#E83535',
        fontSize: 28,
        fontFamily: "Cochin"
    },

    //FriendsList
    friendsCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    
    friendimg: {
        width: '50%',
        height: 100
    },

    friendsCardCol: {
        flex: 1,
        flexDirection: 'row',
    },
});
 

  