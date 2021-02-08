import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  FlatList,
  SafeAreaView
} from 'react-native';
import styles from './styles';
import pic from '../assets/HandsomeSquidward.png';

export default class FriendsList extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }

  //to use inside FlatList in render
  renderItem = ({item}) => {
    return (
        <View>
            <TouchableOpacity style={styles.Card}>
                <View style={styles.friendsrow}>
                
                <Image source={item.photo} style={styles.friendimg} />
                
                <View>
                    <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.firstName} {item.lastName}</Text>
                    <Text style={styles.mblTxt}>Something</Text>
                    </View>
                    <View style={styles.emailContainer}>
                    <Text style={styles.emailTxt}>{item.email}</Text>
                    </View>
                </View>
                </View>
            </TouchableOpacity>
            <View style={{height: 10}}></View>
        </View>
    );
  }


  render() {
    const friends = [
      {
        id: 1,
        firstName: 'Ayuna',
        lastName: 'Tsyrenova',
        email: 'ayuna@email.com',
        photo: pic,
      },
      {
        id: 2,
        firstName: 'Matt',
        lastName: 'Ellison',
        email: 'osa@email.com',
        photo: pic,
      },
      {
        id: 3,
        firstName: 'Julie',
        lastName: 'Lam',
        email: 'osa@email.com',
        photo: pic,
      },
      {
        id: 4,
        firstName: 'Ivan',
        lastName: 'Lozano',
        email: 'osa@email.com',
        photo: pic,
      },
      {
        id: 5,
        firstName: 'Ayuna',
        lastName: 'Ura',
        email: 'ayuna@email.com',
        photo: pic,
      },
      {
        id: 6,
        firstName: 'Matt',
        lastName: 'Eins',
        email: 'osa@email.com',
        photo: pic,
      },
      {
        id: 7,
        firstName: 'Julie',
        lastName: 'Love',
        email: 'osa@email.com',
        photo: pic,
      },
      {
        id: 8,
        firstName: 'Ivan',
        lastName: 'Lamb',
        email: 'osa@email.com',
        photo: pic,
      },
    ];
    const { navigation } = this.props;
    return (
          
              <FlatList 
                contentContainerStyle={{backgroundColor: 'white'}}
                ListHeaderComponent={
                  <View style={{height: 10}}></View>
                }
                extraData={this.state}
                data={friends}
                keyExtractor = {(item) => {
                  return item.id;
                }}
                renderItem={this.renderItem}
              />
    );
  }
}