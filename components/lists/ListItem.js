import React from 'react'
import {View, StyleSheet, Image, TouchableHighlight} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'

import Text from '../Text'
import colors from '../../config/colors'

function ListItem({title, subTitle, image, onPress}) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        <FontAwesome5 name="receipt" size={35} color="black" />
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    // flexGrow: 1,
    // marginTop: 8,
    marginBottom: 10,
    // paddingBottom: 5,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    shadowColor: '#e3e3e3',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  detailsContainer: {
    // flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: '500',
  },
})

export default ListItem
