import React, { Component } from "react";

import { StyleSheet, Button, View, AsyncStorage } from "react-native";

import t from "tcomb-form-native";
import moment from "moment";

const Form = t.form.Form;

let myFormatFunction = (format, date) => {
  return moment(date).format(format);
};

const ExpDetail = t.struct({
  expkey: t.String,
  expdate: t.String,
  category: t.String,
  amount: t.String,
  note: t.String
});

const formStyles = {
  ...Form.stylesheet, // copy over all of the default styles
  formGroup: {
    normal: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: "blue",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    },
    // the style applied when a validation error occours
    error: {
      color: "red",
      fontSize: 18,
      marginBottom: 7,
      fontWeight: "600"
    }
  }
};

const options = {
  fields: {
    expkey: {
      hidden: true
    },
    expdate: {
      label: "Expense Date"
      // mode: 'date',
      // config: {
      // 	format: (date) => myFormatFunction("DD MMM YYYY",date)
      // }
    },
    note: {
      multiline: true
    }
  },
  stylesheet: formStyles
};

class ExpenseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        expkey: new Date().valueOf().toString(),
        expdate: myFormatFunction("YYYY-MM-DD", new Date()),
        category: "",
        amount: null,
        note: ""
      }
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Expense Detail",
      headerRight: (
        <Button title="Save" onPress={navigation.getParam("saveDetail")} />
      )
    };
  };

  _saveDetail = async () => {
    const value = this.refs._form.getValue();
    try {
      await AsyncStorage.setItem(
        value.expkey,
        JSON.stringify({
          expdate: value.expdate,
          category: value.category,
          amount: value.amount,
          note: value.note
        })
      );
      alert("saved successfully.");
      this.props.navigation.navigate("List");
    } catch (error) {
      console.log(error.message);
    }
  };

  _load = async key => {
    try {
      const retrieveItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrieveItem);
      const value = {
        expkey: key,
        expdate: item.expdate,
        category: item.category,
        amount: item.amount,
        note: item.note
      };
      this.setState({ value: value });
      console.log(value);
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount = () => {
    let { expkey } = this.props.navigation.state.params;
    console.log(expkey)
    console.log(typeof expkey)
    if (expkey !== null) {
      this._load(expkey);
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({ saveDetail: this._saveDetail });
    /* add your code here */
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="_form"
          type={ExpDetail}
          options={options}
          value={this.state.value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ExpenseDetail;
