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
import {ProfileScreen} from "./ProfileScreen";


user_global = "";
export default function FollowersScreen() {
  return (
    <ScrollView style={styles.container}>
      <FollowerList/>
    </ScrollView>
  );

}

class FollowerList extends React.Component {

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
        user_endpoint = "https://api.github.com/users/".concat(this.state.current_user);
        user_endpoint = user_endpoint.concat("/followers");
        axios.get(user_endpoint)
        .then(response => {
        console.log("Success");
        this.setState({ follower_object: response.data });
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
        const { follower_object } = this.state;

        if(user_global === ""){
          return (
          <View style={styles.container}>
          <FlatList
              data={follower_object}
              renderItem={
                  ({item}) =>
                      <View style={styles.box}>
                          <View tyle={styles.button}>
                            <Button
                            title={"Follower: ".concat(item.login)} 
                            onPress={  
                                    () => {
                                      this.forceUpdateHandler(item.login);
                                    }
                                }
                            />
                          </View>
                          <View style={styles.img}>
                            <Image source={{uri: item.avatar_url}} style={{width: 100, height: 100}} />
                          </View>
                      </View>
                  }
              keyExtractor={({id}, index) => id}
              />
          </View>
          );
        } else { // This will render the profile view per person
          return(
          <View>
            <Button
            title = "Return to List"
            onPress={  
              () => {
                this.forceUpdateHandler("");
              }
            } />
            <ProfileScreen curr_user={user_global}>
            </ProfileScreen>

          </View>
          );
        }
    }
}

FollowersScreen.navigationOptions = {
  title: 'Followers',
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
  