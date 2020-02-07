import React from "react";
import "./Posts.css";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Post from "../Post";

class Posts extends React.Component{
  constructor(){
    super();
    this.state = {
      posts : []
    }
  }
  componentDidMount(){
    Notification.requestPermission();
    this.props.apollo_client
    .query({
      query:gql`
        {
          posts(user_id: "a"){
            id
            user{
              nickname
              avatar
            }
            image
            caption
          }
        }
    `})
    .then(response =>{
      this.setState({posts: response.data.posts});
    });
    //  subscribe to posts channel
    this.posts_channel = this.props.pusher.subscribe('posts-channel');
    // listen for a new post
    this.posts_channel.bind("new-post", data => {
      this.setState({ posts: this.state.posts.concat(data.post) });
      if(Notification.permission === 'granted' ){
        try{
          let notification = new Notification(
            'Pusher Instagram Clone',
            { 
              body: `New post from ${data.post.user.nickname}`,
              icon: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
              image: `${data.post.image}`,
            }
          );
          notification.onclick = function(event){
            window.open('http://localhost:3000','_blank');
          }
        }catch(e){
          console.log('Error displaying notification');
        }
      }
    },this);
  }
  render(){
    return (
      <div>
        <div className="Posts">
          {this.state.posts
            .slice(0)
            .reverse()
            .map(post => (
            <Post 
              nickname={post.user.nickname} 
              avatar={post.user.avatar} 
              image={post.image} 
              caption={post.caption} 
              key={post.id}
            />
            )
          )}
        </div>
      </div>
    );
  }
}
export default Posts;