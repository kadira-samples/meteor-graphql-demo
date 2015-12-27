AddBlogPostContainer = class extends React.Component {
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

    // optimisitic updates
    const post = {
      _id, title, content,
      comments: [],
      author: {name: 'arunoda'},
      saving: true
    };

    BlogSchema.cache.setItemPayload(
      BlogPostContainer.query,
      {postId: _id},
      {post},
    );

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
      BlogSchema.cache.setItemPayload(
        BlogPostContainer.query,
        {postId: _id},
        payload
      );
    }, (error) => {
      alert(error.message);
    })
    .then(() => {
      BlogSchema.refetchQuery(BlogTitlesContainer.query);
    });

    // change route
    FlowRouter.go(`/post/${_id}`);
  }
}
