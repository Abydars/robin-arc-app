
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
    Image,
    Alert,
    ScrollView
} from 'react-native';

export default class SearchForm extends Component<Props> {
    static navigationOptions = {
        title: 'Search by Vehicle',
    };
   state = {year: '', make: '', model: '', qualifier: '', makes: [], models: [], qualifiers: []}
   updateYear = (year) => {
      this.setState({
        makes: ['Loading...']
      });
      fetch('http://app.go-performance.ca/wp-admin/admin-ajax.php?action=get_data_makes&yr='+year)
      .then((response) => response.json())
      .then((result)=>{
        this.setState({
            makes: result
        });
      })
      this.setState({ year: year })
   }
   updateMake = (make) => {
         this.setState({
            models: ['Loading...']
         });
         fetch('http://app.go-performance.ca/wp-admin/admin-ajax.php?action=get_data_models&make='+make+'&yr='+this.state.year)
         .then((response) => response.json())
         .then((result)=>{
           this.setState({
               models: result
           });
         })
         this.setState({ make: make })
      }

   updateModel = (model) => {
            this.setState({
                qualifiers: ['Loading...']
            });
            fetch('http://app.go-performance.ca/wp-admin/admin-ajax.php?action=get_data_qualifiers&make='+this.state.make+'&yr='+this.state.year+'&model='+model)
            .then((response) => response.json())
            .then((result)=>{
              this.setState({
                  qualifiers: result
              });
            })
            this.setState({ model: model })
   }

   updateQualifier= (qualifier) => {
    this.setState({ qualifier:qualifier })
   }
   onPressSearch(){
         if(this.state.year != '' && this.state.make != '' && this.state.model != ''){
            const {navigate} = this.props.navigation;
            navigate('SearchResults', {year: this.state.year, make: this.state.make, model: this.state.model, qualifier: this.state.qualifier})
         }else{
            Alert.alert(
              'Alert',
              'You must fill in all the fields',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: true }
            )
         }
   }
  render() {
    const {makes, models, qualifiers} = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
            <Image
                style={styles.image}
                source={require('../img/logo.png')}
            />
            <Picker style={styles.picker} selectedValue = {this.state.year} onValueChange = {this.updateYear}>
                <Picker.Item label = "Select Year" />
                <Picker.Item label = "2015" value = "2015" />
                <Picker.Item label = "2014" value = "2014" />
                <Picker.Item label = "2013" value = "2013" />
                <Picker.Item label = "2012" value = "2012" />
                <Picker.Item label = "2011" value = "2011" />
                <Picker.Item label = "2010" value = "2010" />
                <Picker.Item label = "2009" value = "2009" />
                <Picker.Item label = "2008" value = "2008" />
                <Picker.Item label = "2007" value = "2007" />
                <Picker.Item label = "2006" value = "2006" />
                <Picker.Item label = "2005" value = "2005" />
                <Picker.Item label = "2004" value = "2004" />
                <Picker.Item label = "2003" value = "2003" />
                <Picker.Item label = "2002" value = "2002" />
                <Picker.Item label = "2001" value = "2001" />
                <Picker.Item label = "2000" value = "2000" />
                <Picker.Item label = "1999" value = "1999" />
                <Picker.Item label = "1998" value = "1998" />
                <Picker.Item label = "1997" value = "1997" />
                <Picker.Item label = "1996" value = "1996" />
                <Picker.Item label = "1995" value = "1995" />
                <Picker.Item label = "1994" value = "1994" />
                <Picker.Item label = "1993" value = "1993" />
                <Picker.Item label = "1992" value = "1992" />
                <Picker.Item label = "1991" value = "1991" />
                <Picker.Item label = "1990" value = "1990" />
            </Picker>
            <Picker style={styles.picker} selectedValue = {this.state.make} onValueChange = {this.updateMake}>
                {makes.map((m, i) => <Picker.Item key={i} label = {m} value = {m} />)}
            </Picker>
            <Picker style={styles.picker} selectedValue = {this.state.model} onValueChange = {this.updateModel}>
                {models.map((m, i) => <Picker.Item key={i} label = {m} value = {m} />)}
            </Picker>
            <Picker style={styles.picker} selectedValue = {this.state.qualifier} onValueChange = {this.updateQualifier}>
                {qualifiers.map((m, i) => <Picker.Item key={i} label = {m} value = {m} />)}
            </Picker>
            <TouchableOpacity style={styles.button} onPress={this.onPressSearch.bind(this)}><Text style={styles.button_text}>SEARCH</Text></TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#dedede',
    width: '100%'
  },
  picker: {
    backgroundColor: '#232325',
    marginTop: 5,
    marginBottom: 5,
    color: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize : 23,
    color: '#000000',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: "#fff200",
    padding: 20,
  },
  button_text: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    padding: 10,
    fontSize: 15,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 100,
    width: 360,
    marginBottom: 50
  },
});
