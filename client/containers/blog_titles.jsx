BlogTitlesContainer = GraphQL.bindData((props, onData) => {
  return BlogSchema.watchQuery(BlogTitlesContainer.query, onData)
})(BlogTitles);

BlogTitlesContainer.query = `
  {
    posts {
      ...${BlogTitles.fragment}
    }
  }
`;
