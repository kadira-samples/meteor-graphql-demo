const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
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
        return Collections.posts.find().toArray();
      }
    }
  })
});

const schema = new GraphQLSchema({
  query
});

GraphQL.registerSchema('Blog', schema);
