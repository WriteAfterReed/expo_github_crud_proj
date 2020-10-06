import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { 
    FlatList,  
    ScrollView, 
    StyleSheet, 
    View, 
    Text,
    Button} from 'react-native';
import axios from 'axios';

export default function RepoScreen() {
  return (
    <ScrollView style={styles.container}>
      <RepoList/>
    </ScrollView>
  );
}

class RepoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repo_object: "",
            current_user: (this.props.curr_user ? this.props.curr_user  : "WriteAfterReed"), 
            // We default to the creator of homebrew if we don't have a curr user

        }
    }

    componentDidMount() {
        this.setState({current_user: (this.props.curr_user ? this.props.curr_user  : "WriteAfterReed") });
        user_endpoint = "https://api.github.com/users/".concat(this.state.current_user);
        user_endpoint = user_endpoint.concat("/repos");
        axios.get(user_endpoint)
        .then(response => {
        console.log("Success");
        this.setState({ repo_object: response.data });
        })
        .catch(error => {
        console.log(error);
        });

    }

    // PUT /user/starred/:owner/:repo

    unstar(owner, repo_name) {
      var config = {
        headers: {'Authorization': "Bearer " + ""} // Insert auth here
      };
      endpoint = "https://api.github.com/user/starred/".concat(owner);
      endpoint = endpoint.concat("/");
      endpoint = endpoint.concat(repo_name);
      
      axios.delete(endpoint, config)
      .then(response => {
        console.log("Success");
        console.log("Unstar request succeded!");
        }) 
        .catch(error => {
        console.log(error);
        console.log("Unstar request failed!");
        });
    }


    star(owner, repo_name) {
      var config = {
        headers: {'Authorization': "Bearer " + ""} // Insert auth here

      };
      endpoint = "https://api.github.com/user/starred/".concat(owner);
      endpoint = endpoint.concat("/");
      endpoint = endpoint.concat(repo_name);
      var axios = require("axios");
      axios.request({
        url: endpoint,
        method: "put",
        auth: {
          username: "", // Insert auth here
          password: ""
        },
      }).then(response => {
      console.log("Success");
      console.log("Star Request succeed!");
      }) 
      .catch(error => {
      console.log(error);
      console.log("Star request failed!");
      });
    }


    render() {
        const { repo_object } = this.state;


        return (
        <View style={styles.container}>
        <FlatList
            data={repo_object}
            renderItem={
                ({item}) =>
                    <View style={styles.box}>
                        <Button
                        title={item.name} 
                        onPress={  
                                _handleOpenWithWebBrowser = () => {
                                    WebBrowser.openBrowserAsync(item.html_url);
                                }
                            }
                        style={styles.button}
                        />
                        <Text style={styles.header}>Repo Owner:</Text>
                        <Text style={styles.item}>{item.owner.login} </Text>
                        <Text style={styles.header}>Repo Description:</Text>
                        <Text style={styles.para}>{item.description}</Text>
                        <Button
                          title={"Starr: ".concat(item.name)} 
                          onPress={  
                                  () => {
                                    this.star(item.owner.login , item.name);
                                  }
                              }
                          />
                        <Button
                          title={"Unstarr: ".concat(item.name)} 
                          onPress={  
                                  () => {
                                    this.unstar(item.owner.login , item.name);
                                  }
                              }
                          />
                    </View>
                }
            keyExtractor={({id}, index) => id}
            />
        </View>
        );
    }
}

RepoScreen.navigationOptions = {
  title: 'Repos',
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

      },
  })
  