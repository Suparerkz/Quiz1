import React, { Component } from "react";

import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import moment from "moment";

class ExpenseItem extends Component {
  render() {
    let { expdate, category, amount } = this.props.item;
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="white">
        <View style={styles.row}>
          <View style={{ flex: 2 }}>
            <Text>{expdate}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text>{category}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "right" }}>{amount}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#DDDDDD"
  }
});

export default ExpenseItem;
