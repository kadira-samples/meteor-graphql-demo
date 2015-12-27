Blog = ({post}) => (
  <div className={`post-${post._id}`}>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
  </div>
);

Blog.fragment = BlogSchema.createFragment(`
  fragment on Blog {
    _id,
    title,
    content
  }
`);

BlogContainer = GraphQL.bindData((props, onData) => {
  return BlogSchema.watchQuery(BlogContainer.query, onData);
})(Blog);

BlogContainer.query = `
  {
    post: recentPost {
      ...${Blog.fragment}
    }
  }
`;