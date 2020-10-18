import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      word: '',
      isButtonpressed: 'false',
      defination: '',
      lexicalCatorgry: '',
    };
  }
  getWord = async (word) => {
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + word + '.json';
    
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
            
        if (responseObject!==null) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;

          var lexicalCatorgry = wordData.wordtype;

          this.setState({
            word: this.state.text,
            defination: definition,
            lexicalCatorgry: lexicalCatorgry,
          });
        } else {
          this.setState({
            word: this.state.text,
            defination: 'Not Found!',
          });
        }
      });
  };
  render() {
    return (
      <View style={{ backgroundColor: 'pink' }}>
        <Header
          backgroundColor={'lightgreen'}
          centerComponent={{
            text: 'POCKET DICTONARY',
            style: { color: 'red', fontSize: 18 },
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
            });
          }}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isButtonpressed: 'true' });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>

        <View style={styles.detailConainer}>
          <Text style={styles.detailsTitle}>Word:</Text>
           <Text style={{fontSize:16,fontWeight:'bold'}}>{this.state.word}</Text>
        </View>

        <View style={styles.detailConainer}>
          <Text style={styles.detailsTitle}>
            Type:
          </Text>
          <Text style={{fontSize:16,fontWeight:'bold'}}>{this.state.lexicalCatorgry}</Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.detailsTitle}>
            definition:
          </Text>
          <Text style={{fontSize:16,fontWeight:'bold'}}>{this.state.defination}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputBox: {
    width: '80%',
    height: 40,
    borderWidth: 4,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 50,
    outline: 'none',
    backgroundColor: 'yellow',
  },
  searchButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    paddin: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  detailsTitle: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
