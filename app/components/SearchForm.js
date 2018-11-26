
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Picker,
    Label,
    Button,
    FlatList,
} from 'react-native';

export default class SearchForm extends Component<Props> {
    static navigationOptions = {
        title: 'Search Form',
    };
   state = {user: ''}
   updateUser = (user) => {
      this.setState({ user: user })
   }
   onPressSearch(){
         const {navigate} = this.props.navigation;
         navigate('SearchResults')
   }
  render() {
    return (
      <View style={styles.container}>
            <Text style={styles.heading}>Vehicle Parts Finder</Text>
            <Picker style={styles.picker} selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                <Picker.Item label = "Select Year" value = "" />
            </Picker>
            <Picker style={styles.picker} selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                <Picker.Item label = "Select Make" value = "" />
            </Picker>
            <Picker style={styles.picker} selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                <Picker.Item label = "Select Model" value = "" />
            </Picker>
            <Picker style={styles.picker} selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                <Picker.Item label = "Product Name" value = "" />
            </Picker>
            <Button style={styles.button} onPress={this.onPressSearch.bind(this)} title="SEARCH"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    width: '100%',
  },
  picker: {
    marginTop: 5,
    marginBottom: 5,
    color: 'white',
    backgroundColor: 'blue'
  },
  heading: {
    textAlign: 'center',
    fontSize : 23
  },
  button: {
    backgroundColor: '#1e90ff',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    display: 'none'
  },
  label: {
      padding: 10,
      fontSize: 15,
      justifyContent: 'center',
    },
});
