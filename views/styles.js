import * as React from 'react'
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  image: {
    width: 360,
    height: 250,
    borderRadius: 80,
  },
  loadingImage: {
    width: '100%',
  },
  text: {
    margin: 5,
  },
  texttitle: {
    color: '#E83535',
    textAlign: 'center',
    fontSize: 45,
    fontFamily: 'Cochin',
  },
  textsubtitle: {
    color: '#E83535',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'Cochin',
    paddingTop: 3,
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
    fontFamily: 'Cochin',
  },

  //for Login component
  imagelogin: {
    width: 350,
    height: 200,
    borderRadius: 80,
    paddingBottom: 45,
  },
  usernamelabel: {
    color: '#E83535',
    fontSize: 30,
    fontFamily: 'Cochin',
    paddingTop: 10,
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
    fontSize: 25,
  },

  //sign up
  profilebg: {
    width: 400,
    height: 700,
    resizeMode: 'stretch',
  },

  // Receipt Items Component
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userCard: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },

  selectedtemCardText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'white',
  },

  selectedItemCard: {
    backgroundColor: '#E83535',
    color: 'white',
    borderRadius: 15,
    shadowColor: '#e3e3e3',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  //UserHome component
  navbar: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  footerButton: {
    // margin: '2%',
    width: '100%',
    height: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    shadowColor: '#e3e3e3',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  navtextbig: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Cochin',
  },

  navtextsmall: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Cochin',
  },

  profileimage: {
    width: 275,
    height: 275,
    borderRadius: 200,
  },

  profilenametext: {
    width: '75%',
    color: '#E83535',
    fontSize: 35,
    fontFamily: 'Cochin',
  },

  profileemailtext: {
    color: '#E83535',
    fontSize: 28,
    fontFamily: 'Cochin',
  },

  //FriendsList
  friendsCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },

  friendimg: {
    width: '50%',
    height: 100,
  },

  friendsCardCol: {
    flex: 1,
    flexDirection: 'row',
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
    fontSize: 65,
    fontFamily: 'Cochin',
  },
  titleview: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E83535',
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
    fontFamily: 'Cochin',
  },

  //for Login component
  imagelogin: {
    width: 350,
    height: 200,
    borderRadius: 80,
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
    fontSize: 25,
  },

  //sign up
  profilebg: {
    width: 400,
    height: 700,
    resizeMode: 'stretch',
  },

  //UserHome component
  navbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  navtextbig: {
    color: 'white',
    fontSize: 35,
  },

  navtextsmall: {
    color: 'white',
    fontSize: 27,
  },
  navtextsettings: {
    color: '#E83535',
    fontSize: 35,
  },
  profileimage: {
    width: 275,
    height: 275,
    borderRadius: 200,
  },

  profilenametext: {
    color: '#E83535',
    fontSize: 35,
  },

  profileemailtext: {
    color: '#E83535',
    fontSize: 28,
  },

  //FriendsList
  friendsCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  friendsCol: {
    width: '100%',
  },

  scroll: {
    width: '100%',
  },

  friendimg: {
    borderRadius: 50,
    width: 90,
    height: 90,
  },

  friendsrow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E83535',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 3,
    padding: 15,
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
  },

  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 30,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 20,
    marginLeft: 15,
  },

  titleFriendList: {
    flex: 1,
    color: 'white',
    fontSize: 50,
    height: 80,
  },

  Card: {
    shadowColor: 'grey', // IOS
    shadowOffset: {height: 2, width: 5}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 1, // Android
    height: 'auto',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
  },
})
