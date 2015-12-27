const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = GraphQL.types;

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
        const coll = Collections.authors.rawCollection();
        return Promisify(coll, 'findOne')({_id: post.author});
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve(post) {
        const coll = Collections.comments.rawCollection();
        const cursor = coll.find({postId: post._id});
        return Promisify(cursor, 'toArray')();
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
        const coll = Collections.authors.rawCollection();
        return Promisify(coll, 'findOne')({_id: comment.author});
      }
    }
  })
});
