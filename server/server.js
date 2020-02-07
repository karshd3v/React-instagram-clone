// server/server.js

let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");
// let bodyParser = require("body-parser");

let schema = buildSchema(`
    type User {
    id : String!
    nickname : String!
    avatar : String!
    }
    type Post {
        id: String!
        user: User!
        caption : String!
        image : String!
    }
    type Query{
    user(id: String) : User!
    post(user_id: String, post_id: String) : Post!
    posts(user_id: String) : [Post]
    }
`);

let userslist = {
    a: {
        id: "a",
        nickname: "Utkarsh",
        avatar: "https://avatars2.githubusercontent.com/u/11817859?s=460&v=4"
    },
};
let postslist = {
    a: {
        a: {
        id: "a",
        user: userslist["a"],
        caption: "Amazing Tree & View",
        image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
        },
        b: {
        id: "b",
        user: userslist["a"],
        caption: "Angular Book :)",
        image:
            "https://cdn-images-1.medium.com/max/1000/1*ltLfTw87lE-Dqt-BKNdj1A.jpeg"
        },
        c: {
        id: "c",
        user: userslist["a"],
        caption: "Lovely Flowers",
        image: "https://cdn.pixabay.com/photo/2013/08/20/15/47/sunset-174276_1280.jpg"
        },
        d: {
        id: "d",
        user: userslist["a"],
        caption: "Amazing Tree & View",
        image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
        }
    }
};
let root = {
    user: function({ id }) {
        return userslist[id];
    },
    post: function({ user_id, post_id }) {
        return postslist[user_id][post_id];
    },
    posts: function({ user_id }) {
        return Object.values(postslist[user_id]);
    }
};
let app = express();
app.use(cors());
// app.use(bodyParser.json());
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");