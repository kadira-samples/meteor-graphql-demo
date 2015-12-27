BlogPost = ({post}) => (
  <div className={`post-${post._id}`}>
    <h2>{post.title}</h2>
    <small>
      (By - <Author author={post.author}/>)
    </small>
    <p>{post.content}</p>
    <h4>Comments</h4>
    <div>
      {post.comments.map(c => <Comment key={c._id} comment={c}/>)}
    </div>
  </div>
);

BlogPost.fragment = BlogSchema.createFragment(`
  fragment on BlogPost {
    _id,
    title,
    content,
    comments {
      ...${Comment.fragment}
    },
    author {
      ...${Author.fragment}
    }
  }
`);
