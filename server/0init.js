const { MongoClient } = Meteor.npmRequire('mongodb');

DB = Promise.resolve(MongoClient.connect(process.env.MONGO_URL)).await();
Collections = {
  authors: DB.collection('authors'),
  posts: DB.collection('posts'),
  comments: DB.collection('comments')
};

// Bootstrap with some dummy data
if(!Collections.posts.findOne().await()) {
  Collections.authors.insert({
    _id: 'arunoda',
    name: 'Arunoda Susiripala'
  }).await();

  Collections.authors.insert({
    _id: 'tom',
    name: 'Tom Moodi'
  }).await();

  for(let lc=0; lc<5; lc++) {
    const postId = Random.id();
    Collections.posts.insert({
      _id: postId,
      title: `Post Title: ${lc}`,
      content: `Post content: ${lc}`,
      author: 'arunoda'
    }).await();

    const commentId = Random.id();
    Collections.comments.insert({
      _id: commentId,
      text: `Post ${lc} is awesome`,
      postId,
      author: 'tom'
    }).await();
  }
}
