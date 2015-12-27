const headerStyles = {
  borderBottom: '1px solid #AAA',
  paddingBottom: 10
};

const footerStyles = {
  marginTop: 30,
  borderTop: '1px solid #AAA',
  paddingTop: 10
};

const resetBlog = () => {
  BlogSchema.mutate(`
    {reset}
  `)
  .then(() => {
    BlogSchema.refetchQuery(BlogTitlesContainer.query);
  })
  .catch(err =>{
    alert(err.message);
  });
};

MainLayout = ({content}) => (
  <div>
    <header style={headerStyles}>
      <h1>My Blog Post</h1>
      <a href='/'>Home</a> |
      <a href='/add-post'>Add Post</a>
      <button onClick={resetBlog}>Reset Blog</button>
    </header>
    <div>
      {content}
    </div>
    <footer style={footerStyles}>
      <small>This blog is powered by GraphQL, Lokka & Meteor</small>
    </footer>
  </div>
);
