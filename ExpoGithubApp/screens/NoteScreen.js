import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { 
    FlatList,  
    ScrollView, 
    StyleSheet, 
    View, 
    Text,
    Button,
    Image} from 'react-native';
import axios from 'axios';


user_global = "";
export default function NoteScreen() {
  return (
    <ScrollView style={styles.container}>
      <NoteList/>
    </ScrollView>
  );

}

class NoteList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            repo_object: "",
            current_user: (this.props.curr_user ? this.props.curr_user  : "WriteAfterReed"),
        }
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    componentDidMount() {
        this.setState({current_user: (this.props.curr_user ? this.props.curr_user  : "WriteAfterReed") });
        user_endpoint = "https://api.github.com/notifications";
        var axios = require("axios");
        endpoint = user_endpoint;
        axios.request({
          url: endpoint,
          method: "get",
          auth: {
            username: "", // Removed Auth info
            password: ""
          },
        }).then(response => {
        console.log("Success");
        console.log(response.data);
        this.setState({ noteObj: response.data });
        })
        .catch(error => {
        console.log(error);
        });

    }

    
    forceUpdateHandler(new_user){ // got this idea from: https://stackoverflow.com/questions/47368728/react-native-reload-page
      user_global = new_user;
      this.forceUpdate();
    };
  
    render() {
        const { noteObj } = this.state;
        return (
        <View style={styles.container}>
        <FlatList
            data={noteObj}
            renderItem={
                ({item}) =>
                    <View style={styles.box}>
                        <View tyle={styles.button}>
                        <Text>Notif:</Text>
                        <Text>{noteObj.subject}</Text>
                        <Text>{noteObj.owner}</Text>
                        <Text>{noteObj.text}</Text>
                        </View>
                    </View>
                }
            keyExtractor={({id}, index) => id}
            />
        </View>
        );
    }
}

NoteScreen.navigationOptions = {
  title: 'Notifications',
};


const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingLeft: 5,
     paddingRight: 5,
    },
    box: {
        padding: 20,
        borderColor: "#aaaaaa",
    },
    header: {
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: 12,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 5,
      fontSize: 12,
      height: 40,
    },
    para: {
        padding: 5,
        fontSize: 12,
        height: 40,
        backgroundColor: '#99ccff',
      },
    button: {
      alignContent: "center",
      alignSelf: "center",
      alignItems: 'center',
      margin: 5,
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      },
      img: {
        alignContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        margin: 5,
        backgroundColor: "black"
    },
  })
  