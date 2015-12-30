AddBlogPostContainer = class AddBlogPostContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <h2>Add New Post</h2>
        <button onClick={this.addPost.bind(this)}>Add Post</button>
      </div>
    );
  }

  addPost() {
    const _id = Random.id();
    const title = `New Post: ${_id}`;
    const content = `New post content: ${_id}`;

    // post object
    const post = {
      _id, title, content,
      comments: [],
      author: {name: 'arunoda'},
      saving: true
    };

    // update the cache with above post
    BlogSchema.cache.setItemPayload(
      BlogPostContainer.query,
      {postId: _id},
      {post},
    );

    // invoke the mutation
    BlogSchema.mutate(`
      {
        post: addPost(
          _id: "${_id}",
          title: "${title}",
          content: "${content}",
          author: "arunoda"
        ) {
          ...${BlogPost.fragment}
        }
      }
    `)
    .then((payload) => {
      // if success, update the cache with the modified document
      BlogSchema.cache.setItemPayload(
        BlogPostContainer.query,
        {postId: _id},
        payload
      );
    }, (error) => {
      // if there is an error, alert it
      alert(error.message);
    })
    .then(() => {
      // refetch the query for the home page titles
      BlogSchema.refetchQuery(BlogTitlesContainer.query);
    });

    // change route
    FlowRouter.go(`/post/${_id}`);
  }
}