
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
    Image
} from 'react-native';

export default class SingleProduct extends Component<Props> {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.post_title}`,
    });

  render() {
  const {post_title, post_sku, post_image, post_category, post_content}=this.props.navigation.state.params;
    let cats = "";

                            post_category.map((c, i) => {
                                cats += c;

                                if(i < (post_category.length - 1))
                                    cats += ", ";
                            });
    return (
      <View style={styles.container}>
        <Image
        style={styles.image}
        source={(post_image == false) ? require('../img/no_image.jpg') : {uri: post_image}}
        />
        <Text style={styles.title}>{post_title}</Text>
        <Text style={styles.category}>CATEGORY: {cats}</Text>
        <Text style={styles.sku}>SKU: {(post_sku == '') ? 'N/A' : post_sku}</Text>
        <Text style={styles.description}>DESCRIPTION:</Text>
        <Text style={styles.content}>{post_content}</Text>
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
