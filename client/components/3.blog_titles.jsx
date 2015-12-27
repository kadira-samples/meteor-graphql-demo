BlogTitles = ({posts}) => (
  <ul>
    {posts.map(post => (
      <li key={post._id}>
        <a href={`/post/${post._id}`}>
          {post.title} (<Author author={post.author}/>)
        </a>
      </li>
    ))}
  </ul>
);

BlogTitles.fragment = BlogSchema.createFragment(`
  fragment on BlogPost {
    _id,
    title,
    author {
      ...${Author.fragment}
    }
  }
`);
