Comment = ({comment}) => (
  <div>
    <Author author={comment.author}/>: {comment.text}
  </div>
);
Comment.displayName = 'Comment';

Comment.fragment = BlogSchema.createFragment(`
  fragment on Comment {
    _id,
    text,
    author {
      ...${Author.fragment}
    }
  }
`);
