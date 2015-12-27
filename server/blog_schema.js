const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = GraphQL.types;

const BlogType = new GraphQLObjectType({
  name: 'Blog',
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    content: {type: GraphQLString}
  }
});

const query = new GraphQLObjectType({
  name: 'BlogQueries',
  fields: {
    recentPost: {
      type: BlogType,
      resolve() {
        return {
          _id: 'one',
          title: 'Test Post',
          content: 'This content is amazing'
        }
      }
    }
  }
});

const schema = new GraphQLSchema({
  query
});

GraphQL.registerSchema('Blog', schema);