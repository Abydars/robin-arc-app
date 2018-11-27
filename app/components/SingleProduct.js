
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
    ScrollView
} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class SingleProduct extends Component<Props> {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.post_title}`,
    });

  render() {
  const {post_title, post_sku, post_image, post_category, post_content, post_variations}=this.props.navigation.state.params;
    let cats = "";

                            post_category.map((c, i) => {
                                cats += c;

                                if(i < (post_category.length - 1))
                                    cats += ", ";
                            });
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
            <Image
            style={styles.image}
            source={(post_image == false) ? require('../img/no_image.jpg') : {uri: post_image}}
            />
            <Text style={styles.title}>{post_title}</Text>
            <Text style={styles.category}>CATEGORY: {cats}</Text>
            <Text style={styles.sku}>SKU: {(post_sku == '') ? 'N/A' : post_sku}</Text>
            <Text style={styles.description}>DESCRIPTION:</Text>
            <HTMLView
                 value={post_content}
            />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    //flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#dedede',
    //alignSelf: 'stretch',
    //width: '100%'
  },
  title: {
    marginBottom : 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
  },
    category: {
    fontSize: 15,
    marginBottom : 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
    sku: {
    marginBottom : 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
    image: {
    width: 350,
    height: 200,
    marginBottom: 10,
  },
  description: {
    marginBottom : 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  content: {
    lineHeight: 30,
    fontSize: 15,
  }
});
