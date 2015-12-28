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
    <header>
      <h1>My Blog Post</h1>
      <a href='/'>Home</a>
      <a href='/add-post'>Add Post</a>
      <button onClick={resetBlog}>Reset Blog</button>
    </header>
    <div>
      {content}
    </div>
    <footer>
      This blog is powered by GraphQL, Lokka & Meteor
    </footer>
  </div>
);
