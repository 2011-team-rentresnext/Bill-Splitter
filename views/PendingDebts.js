import React, {useEffect} from 'react'
import {Text, View, TouchableOpacity, ScrollView} from 'react-native'
import {Card} from 'react-native-elements'
import styles from './styles'
import {connect} from 'react-redux'
import {getUserDebts} from '../store/debts'
import setDollar from '../util/setDollar'

export function PendingDebts(props) {
  const {debts, user, navigation} = props
  useEffect(() => {
    props.getDebt(user.id)
    const checkNotifications = navigation.addListener('focus', () => {
      props.getDebt(user.id)
    })
    return checkNotifications
  }, [navigation])

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
      {debts.length === 0 ? (
        <View>
          <Text>No pending debts</Text>
        </View>
      ) : (
        <View style={{width: '100%'}}>
          <ScrollView>
            {debts.map((debt) => {
              let creditorFullName = `${debt.creditor.firstName} ${debt.creditor.lastName}`
              if (user.id === debt.creditor.id) {
                creditorFullName = 'Me'
              }

              return (
                <TouchableOpacity
                  key={debt.receipt.id}
                  onPress={() => {
                    props.navigation.navigate('SingleDebt', {
                      debt,
                      user: user,
                    })
                  }}
                >
                  <View style={{width: '100%'}}>
                    <Card
                      title={debt.receipt.id}
                      containerStyle={{
                        borderRadius: 15,
                        backgroundColor: '#f5f5f5',
                        shadowColor: '#e3e3e3',
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                        paddingRight: 35,
                        paddingLeft: 35,
                      }}
                    >
                      <View style={styles.userCard}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text style={{fontSize: 20, fontFamily: 'Cochin'}}>
                            Created by:
                          </Text>
                          <Text style={{fontSize: 20, fontFamily: 'Cochin'}}>
                            {creditorFullName}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text
                            style={{
                              flexWrap: 'wrap',
                              fontFamily: 'Cochin',
                              fontSize: 20,
                            }}
                          >
                            Amount:
                          </Text>
                          <Text
                            style={{
                              flexWrap: 'wrap',
                              fontFamily: 'Cochin',
                              fontSize: 20,
                            }}
                          >
                            ${setDollar(debt.totalDebt)}
                          </Text>
                        </View>
                      </View>
                    </Card>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
    debts: state.debts,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getDebt: (userId) => dispatch(getUserDebts(userId)),
  }
}

export default connect(mapState, mapDispatch)(PendingDebts)
