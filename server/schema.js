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
        const coll = Collections.posts.rawCollection();
        return sleep(200)
          .then(() => Promisify(coll, 'findOne')());
      }
    },

    posts: {
      type: new GraphQLList(BlogPost),
      resolve() {
        const coll = Collections.posts.rawCollection();
        const cursor = coll.find();
        return sleep(200)
          .then(() => Promisify(cursor, 'toArray')());
      }
    },

    post: {
      type: BlogPost,
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(root, args) {
        const selector = {_id: args._id};
        const coll = Collections.posts.rawCollection();
        return sleep(200)
          .then(() => Promisify(coll, 'findOne')(selector));
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
        const coll = Collections.posts.rawCollection();
        return sleep(800)
          .then(() => Promisify(coll, 'insert')(args))
          .then(() => args);
      }
    }
  })
});

const schema = new GraphQLSchema({
  query,
  mutation
});

GraphQL.registerSchema('Blog', schema);
