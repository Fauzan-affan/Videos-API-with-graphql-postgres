const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// const {getAllVideos, getVideoById, createVideo, deleteVideo} = require('./data.js');
const massive = require('massive');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.port || 5678;
const DB_URL = 'postgres://postgres:postgres@localhost:5432/video-graphql'
const server = express();

massive({
    connectionString: DB_URL
}).then(db => {
    server.set('db', db)
})

const commentType = new GraphQLObjectType({
    name: 'Comment',
    description: 'Comment for each video on KODE platform',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        text: {
            type: GraphQLString
        }
    }
});

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'The video for KODE platform',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id for each video on KODE platform'
        },
        title: {
            type: GraphQLString,
            description: 'The title of each video on KODE platform'
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration for each video on KODE platform'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Weather or not each video has been watched'
        },
        comments: {
            type: new GraphQLList(commentType),
            description: 'Comment for certain video'
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root of query type',
    fields: {
        video: {
            type: videoType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'ID of the video for filter purpose'
                }
            },
            resolve: async (_, args) => {
                const video = await server.get('db').videos.findOne({id: args.id});
                video.comments = await server.get('db').comments.find({video_id: video.id});
                return video;
            }
        },
        videos: {
            type: new GraphQLList(videoType),
            resolve: async () => {
                const videos = await server.get('db').videos.find({});
                for (let index = 0; index < videos.length; index++) {
                    videos[index].comments = await server.get('db').comments.find({video_id: videos[index].id})
                }
                return videos;
            }
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root of mutation type',
    fields: {
        createVideo: {
            type: videoType,
            args: {
                title: {
                    type: GraphQLString
                },
                duration: {
                    type: GraphQLInt
                },
                watched: {
                    type: GraphQLBoolean
                }
            },
            resolve: (_, args) => {
                return server.get('db').videos.insert(args)
            }
        },
        deleteVideo: {
            type: videoType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => {
                return server.get('db').videos.destroy(args.id)
            }
        },
        createComment: {
            type: commentType,
            description: 'Create a new comment',
            args: {
                video_id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                text: {
                    type: GraphQLString
                }
            },
            resolve: (_, args) => server.get('db').comments.insert(args)
        },
        deleteComment: {
            type: commentType,
            description: 'Delete a comment',
            args: {
                video_id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_, args) => server.get('db').comments.destroy(args.video_id)
        }
    }
})

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

server.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

server.listen(PORT, console.log(`Server running at prot ${PORT}`))