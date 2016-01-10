const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = GraphQL.types;


const query = new GraphQLObjectType({
  name: 'BlogQueries',
  fields: () => ({
    recentPost: {
      type: BlogPost,
      resolve() {
        return Collections.posts.findOne();
      }
    },

    posts: {
      type: new GraphQLList(BlogPost),
      resolve() {
        return Collections.posts.find().fetch();
      }
    },

    post: {
      type: BlogPost,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(root, args) {
        return Collections.posts.findOne({_id: args._id});
      }
    }
  })
});

const mutation = new GraphQLObjectType({
  name: 'BlogMutations',
  fields: () => ({
    addPost: {
      type: BlogPost,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        author: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(root, args) {
        Collections.posts.insert(args);
        return args;
      }
    },

    reset: {
      type: GraphQLString,
      resolve(root, args, {rootValue}) {
        if (!rootValue.userId) {
          // if this is not a loggedIn user
          throw new Error("Unauthorized");
        }
        Collections.posts.remove({});
        Collections.comments.remove({});
      }
    }
  })
});

const schema = new GraphQLSchema({
  query,
  mutation
});

GraphQL.registerSchema('Blog', schema);
