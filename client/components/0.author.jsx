Author = ({author}) => (
  <span>
    {author.name}
  </span>
);
Author.displayName = 'Author';

Author.fragment = BlogSchema.createFragment(`
  fragment on Author {
    _id,
    name
  }
`);
