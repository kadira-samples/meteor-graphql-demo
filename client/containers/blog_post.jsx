BlogPostContainer = GraphQL.bindData((props, onData) => {
  return BlogSchema.watchQuery(BlogPostContainer.query, onData);
})(BlogPost);

BlogPostContainer.query = `
  {
    post: recentPost {
      ...${BlogPost.fragment}
    }
  }
`;
