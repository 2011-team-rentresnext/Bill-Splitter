import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  FlatList,
  SafeAreaView,
  ScrollView
} from "react-native";
import {Card} from 'react-native-elements'
import styles from "./styles";
import { connect } from 'react-redux';
import { getUserDebts } from '../store/debts'


 class PendingDebts extends React.Component {
  constructor() {
    super();
  }

  componentDidMount(){
    this.props.getDebt(this.props.user.id)
  }

  render() {
    const { debts } = this.props

    return (
        <View 
            style={{
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center',
                // justifyContent: 'center',
                height: '100%',
            }}
        >

            {(debts.length === 0) ? 
                (<View>
                    <Text>
                    No pending debts  
                    </Text>
                </View>):

                (<View style={{width: '100%'}}>
                <ScrollView>
                {debts.map((debt) => {
       
                return (
                    <TouchableOpacity
                    key={debt.id}
                    >

                    <View style={{width: '100%'}}>
                        <Card
                        title={debt.id}
                        containerStyle={{
                            borderRadius: 15,
                            backgroundColor: '#f5f5f5',
                            shadowColor: '#e3e3e3',
                            shadowOffset: {width: 2, height: 2},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                        }}
                        >
                        <View style={styles.userCard}>
                            <Text style={{fontSize: 25}}>{debt.id} </Text>
                            <Text style={{flexWrap: 'wrap'}}>${debt.amountOwed}</Text>

                        </View>
                        </Card>
                    </View>
                    </TouchableOpacity>
                )
                })}
                </ScrollView>
                </View>)
            }

        </View>
        )
    }

}


const mapState = (state) => {
    return { 
        user: state.user,
        debts: state.debts
      };
} 

const mapDispatch = (dispatch) => {
    return {
        getDebt: (userId) => dispatch(getUserDebts(userId))
    };
  };

  export default connect(mapState, mapDispatch)(PendingDebts)