Collections = {
  authors: new Mongo.Collection('authors'),
  posts: new Mongo.Collection('posts'),
  comments: new Mongo.Collection('comments')
};

Promisify = (context, fnName) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      args.push((error, result) => {
        if(error) {
          return reject(error);
        }

        return resolve(result);
      });

      context[fnName].apply(context, args);
    });
  }
};

// Bootstrap with some dummy data
if(!Collections.posts.findOne()) {
  Collections.authors.insert({
    _id: 'arunoda',
    name: 'Arunoda Susiripala'
  });

  Collections.authors.insert({
    _id: 'tom',
    name: 'Tom Moodi'
  });

  for(let lc=0; lc<5; lc++) {
    const postId = Random.id();
    Collections.posts.insert({
      _id: postId,
      title: `Post Title: ${lc}`,
      content: `Post content: ${lc}`,
      author: 'arunoda'
    });

    const commentId = Random.id();
    Collections.comments.insert({
      _id: commentId,
      text: `Post ${lc} is awesome`,
      postId,
      author: 'tom'
    });
  }
}
