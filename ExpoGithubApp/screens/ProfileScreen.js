import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { 
    Image, 
    Platform,
    TouchableOpacity,
    FlatList, 
    ActivityIndicator, 
    ScrollView, 
    StyleSheet, 
    View, 
    Text,
    Button,
    AsyncStorage
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import axios from 'axios';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FollowersScreen from './FollowersScreen'; // Add in new screen for follow
import FollowingScreen from './FollowingScreen';
import RepoScreen from './RepoScreen';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

main_page = 1;
// 8cd9364fef58086936be694dbc8f92b7a5d607e1
var db_obj = {
    user_login: "",
    user_name: "",
    user_bio: "",
    user_followers: null,
    user_following: null,
}
export class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_object: "",
            current_user: (this.props.curr_user ? this.props.curr_user  : "WriteAfterReed"), // We default to the creator of homebrew if we don't have a curr user
            res: "",
        }


    }

    componentDidMount() {

        this.setState({current_user: (this.props.curr_user ? this.props.curr_user  : "WriteAfterReed") });
        user_endpoint = "https://api.github.com/users/".concat(this.state.current_user);
        user_endpoint.concat("repos");
        axios.get(user_endpoint)
        .then(response => {
        console.log("Success");
        console.log("Profile page mounted!")
        this.setState({ user_object: response.data });
        })
        .catch(error => {
        console.log(error);
        });


    }

    load = async (key) => {
        try {
          const res = await AsyncStorage.getItem(key)

          if (res !== null) {
            console.log("Loading payload to DB");
            console.log(JSON.stringify(res));
            if(key === "user_login"){
                db_obj.user_login = res;
            } else if (key === "user_name"){
                db_obj.user_name = res;
            } else if (key === "user_bio"){
                db_obj.user_bio = res;
            } else if (key === "user_followers"){
                db_obj.user_following = res;
            } else if (key === "user_following"){
                db_obj.user_followers = res;
            }
          }

        } catch (e) {
          console.log('Failed to load obj from DB .')
        }
      }
    
    save = async (key, value) => {
        try {
          console.log("Attemping " + key + " save to db with " + value);
          await AsyncStorage.setItem(key, value).then(console.log("Saving payload to DB"));
        } catch (e) {
            console.log('Failed to save obj to DB .')
        }
    }

    // TODO: Add in the clickable for the following, followers, and repos to the next page
    // TODO: Format the data so it's human readable??
      
  render() {
    const { user_object } = this.state;
    const {current_user} = this.state;

    // this.save("user_login", user_object.login);
    // this.save("user_name", user_object.name); 
    // this.save("user_bio", user_object.bio);
    // this.save("user_followers", JSON.stringify(user_object.followers));
    // this.save("user_following", JSON.stringify(user_object.following));


    // this.load("user_login");
    // this.load("user_name");
    // this.load("user_bio");
    // this.load("user_followers"); 
    // this.load("user_following");

    return (
      <ScrollView>
          <View style={styles.container}>

                <Text style={styles.title}>
                    Welcome to {user_object.name}'s Github profile!
                </Text>

                <View style={styles.img}>
                    <Image source={{uri: user_object.avatar_url}} style={{width: 100, height: 100}} />
                </View>

                <View style={styles.box}>
                    <Text style={styles.header}>
                        User name:
                    </Text>
                    <Text style={styles.item}>
                        {user_object.login}
                    </Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.header}>
                        Email:
                    </Text>
                    <Text style={styles.item}>
                        {user_object.email}
                    </Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.header}>
                        Bio:
                    </Text>
                    <Text style={styles.item}>
                        {user_object.bio}
                    </Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.header}>
                        Website:
                    </Text>
                    <Text style={styles.item}>
                        {user_object.blog}
                    </Text>
                </View>

                <View style={styles.box}>
                    <Button
                    title="Repo Count:"
                    onPress={() => this.props.navigation.navigate('Repos')}
                    />
                    <Text style={styles.title}>
                        {user_object.public_repos}
                    </Text>
                </View>

                <View style={styles.box}>
                    <Button
                    title="Followers Count:"
                    onPress={() => this.props.navigation.navigate('Followers')}
                    />
                    <Text style={styles.title}>
                        {user_object.followers}
                    </Text>
                </View>

                <View style={styles.box}>
                    <Button
                    title="Following Count:"
                    onPress={() => this.props.navigation.navigate('Following')}
                    />
                    <Text style={styles.title}>
                        {user_object.following}
                    </Text>
                </View>


                <View style={styles.box}>
                    <Text style={styles.header}>
                        User since: 
                    </Text>
                    <Text style={styles.title}>
                        {user_object.created_at}
                    </Text>
                </View>



        </View>
      </ScrollView>
    );
  }
}


ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const RootStack = createStackNavigator(
    {
        Profile: ProfileScreen,
        Repos: RepoScreen,
        Followers: FollowersScreen,
        Following: FollowingScreen
    },
    {
        initialRouteName: 'Profile',
    },
);
  
const AppContainer = createAppContainer(RootStack);


export default class App extends React.Component {
    render() {
        return <AppContainer/>;
    }

}

App.navigationOptions = {
    header: null
};


const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "#EE7C64",
    backgroundColor: '#99ccff',
    },
    box: {
        padding: 20,
        backgroundColor: '#ffffff',
        margin: 15,
    },
    header: {
        paddingTop: 2,
        paddingBottom: 10,
        fontSize: 12,
        fontWeight: 'bold',
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
    title: {
        alignContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        paddingBottom: 15,
    },
    img: {
        alignContent: "center",
        alignSelf: "center",
        alignItems: 'center',
        margin: 5,
        backgroundColor: "black"
    },
  })
  