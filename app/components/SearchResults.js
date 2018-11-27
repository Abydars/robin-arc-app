import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
//import renderIf from './RenderIf.js';

export default class SearchResults extends Component<Props> {
  static navigationOptions = {
     title: 'Search Results',
  };
  constructor(){
        super();
        this.state = {
        data: [],
        loading: true
    }
  }
  componentDidMount(){
      const {year, make, model, qualifier} = this.props.navigation.state.params;
      fetch('http://app.go-performance.ca/?api&yr='+year+'&make='+make+'&model='+model+'&qualifier='+qualifier)
//      fetch('http://app.go-performance.ca/?api')
      .then((response) => response.json())
      .then((result)=>{
//          console.warn(result)
          this.setState({
                  data:result,loading:false
              })
      })
    }
    onPressNavigate(item){
        const {navigate} = this.props.navigation;
        navigate('SingleProduct', item)
    }
  render() {
    return (
        <View style={styles.container}>
        {this.state.loading &&
        <View style={styles.loading}>
            <ActivityIndicator size="large" color="#232325" />
        </View>
        }
        {!this.state.loading &&
            <View>
            <Text style={styles.resultCount}>Showing 57 results</Text>
            <FlatList
                data={this.state.data}
                renderItem={({item}) => {
                        let cats = "";

                        item.post_category.map((c, i) => {
                            cats += c;

                            if(i < (item.post_category.length - 1))
                                cats += ", ";
                        });

                        return (<View style={styles.productDiv}>
                            <Image
                            style={styles.image}
                            source={(item.post_image == false) ? require('../img/no_image.jpg') : {uri: item.post_image}}
                            />
                            <Text style={styles.title}>{item.post_title}</Text>
                            <Text style={styles.category}>CATEGORY: {cats}</Text>
                            <Text style={styles.sku}>SKU: {(item.post_sku == '') ? 'N/A' : item.post_sku}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => this.onPressNavigate(item)}><Text style={styles.button_text}>Read More</Text></TouchableOpacity>
                        </View>
                        );
                    }
                }
                />
            </View>
        }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
//    justifyContent: 'center',
    backgroundColor: '#dedede',
//    alignSelf: 'stretch',
//    width: '100%'
  },
  loading: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dedede',
  },
  loadHeading: {
    fontSize: 18,
    color: "#fff",
  },
  productDiv: {
    width: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    marginBottom : 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  image: {
    width: 350,
    height: 200,
    marginBottom: 10,
  },
  category: {
    fontSize: 15,
    marginBottom : 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  resultCount: {
    fontSize: 16,
    margin: 10,
    textAlign: 'left',
  },
  sku: {
    marginBottom : 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  button: {
    backgroundColor: "#fff200",
    padding: 10,
  },
  button_text: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
