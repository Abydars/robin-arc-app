import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button } from 'react-native';
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
      fetch('http://app.go-performance.ca/?api')
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
            <Text style={styles.loadHeading}>Loading...</Text>
        </View>
        }
        {!this.state.loading &&
            <View style={styles.container}>
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
                            <Button style={styles.button} onPress={() => this.onPressNavigate(item)} title="Read More"/>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loading: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1e22',
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
  }
});
