import React, { Component } from "react";
import { withNavigation } from "react-navigation";

import {
  StyleSheet,
  Text,
  Button,
  FlatList,
  View,
  TouchableHighlight,
  AsyncStorage
} from "react-native";

import ExpenseItem from "../components/ExpenseItem";

const extractKey = ({ expkey }) => expkey;

class ExpenseList extends Component {
  constructor(props) {
    super(props);

    this.state = { expenses: [] };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Expense List",
      headerRight: (
        <Button title="Add" onPress={navigation.getParam("addDetail")} />
      )
    };
  };

  componentWillMount = () => {
    this.props.navigation.setParams({ addDetail: this._addDetail });
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this._load();
    });
    this._load();
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _addDetail = () => {
    this.props.navigation.navigate("Detail", {
      expkey: null
    });
  };

  _load = async () => {
    try {
      let t_expenses = [];
      let keys = await AsyncStorage.getAllKeys();
      keys.forEach(async key => {
        const retrieveItem = await AsyncStorage.getItem(key);
        const item = JSON.parse(retrieveItem);
        t_expenses.push({
          expkey: key,
          expdate: item.expdate,
          category: item.category,
          amount: item.amount,
          note: item.note
        });
        this.setState({ expenses: t_expenses });
        console.log(this.state.expenses);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  _view = key => {
    this.props.navigation.navigate("Detail", {
      expkey: key
    });
  };

  renderItem = ({ item }) => {
    return <ExpenseItem onPress={() => this._view(item.expkey)} item={item} />;
  };

  render() {
    // console.log("====================================");
    // console.log(this.state.expenses);
    // console.log("====================================");
    return (
      <FlatList
        style={styles.container}
        data={this.state.expenses}
        renderItem={this.renderItem}
        keyExtractor={extractKey}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: "#DDDDDD"
  }
});

export default withNavigation(ExpenseList);
