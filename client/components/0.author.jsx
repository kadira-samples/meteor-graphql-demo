Author = ({author}) => (
  <span>
    {author.name}
  </span>
);

Author.fragment = BlogSchema.createFragment(`
  fragment on Author {
    _id,
    name
  }
`);
