const headerStyles = {
  borderBottom: '1px solid #AAA',
  paddingBottom: 10
};

const footerStyles = {
  marginTop: 30,
  borderTop: '1px solid #AAA',
  paddingTop: 10
};

MainLayout = ({content}) => (
  <div>
    <header style={headerStyles}>
      <h1>My Blog Post</h1>
      <a href='/'>Home</a>
    </header>
    <div>
      {content}
    </div>
    <footer style={footerStyles}>
      <small>This blog is powered by GraphQL, Lokka & Meteor</small>
    </footer>
  </div>
);
