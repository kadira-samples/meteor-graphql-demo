Collections = {
  authors: new Mongo.Collection('authors'),
  posts: new Mongo.Collection('posts'),
  comments: new Mongo.Collection('comments')
};


// Bootstrap with some dummy data
if(!Collections.authors.findOne()) {
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
