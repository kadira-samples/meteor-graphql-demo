const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = GraphQL.types;

const sleep = (millis) => {
  return new Promise((resolve) => setTimeout(resolve, millis));
};

const query = new GraphQLObjectType({
  name: 'BlogQueries',
  fields: () => ({
    recentPost: {
      type: BlogPost,
      resolve() {
        return sleep(200)
          .then(() => Collections.posts.findOne());
      }
    },

    posts: {
      type: new GraphQLList(BlogPost),
      resolve() {
        return sleep(200)
          .then(() => Collections.posts.find().toArray());
      }
    },

    post: {
      type: BlogPost,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(root, args) {
        const selector = {_id: args._id};
        return sleep(200)
          .then(() => Collections.posts.findOne(selector));
      }
    }
  })
});

const schema = new GraphQLSchema({
  query
});

GraphQL.registerSchema('Blog', schema);
