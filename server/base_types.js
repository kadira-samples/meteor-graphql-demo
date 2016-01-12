const { GraphQLObjectType, GraphQLString, GraphQLList } = GraphQL.types;

Author = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    _id: {type: GraphQLString},
    name: {type: GraphQLString}
  })
});


BlogPost = new GraphQLObjectType({
  name: 'BlogPost',
  fields: () => ({
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    author: {
      type: Author,
      resolve(post) {
        return Collections.authors.findOne({_id: post.author})
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve(post) {
        return Collections.comments.find({postId: post._id}).fetch();
      }
    }
  })
});


Comment = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    _id: {type: GraphQLString},
    text: {type: GraphQLString},
    author: {
      type: Author,
      resolve(comment) {
        return Collections.authors.findOne({_id: comment.author});
      }
    }
  })
});
