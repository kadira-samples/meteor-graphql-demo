FlowRouter.route('/', {
  action() {
    ReactLayout.render(MainLayout, {
      content: <BlogTitlesContainer />
    });
  }
});

FlowRouter.route('/post/:postId', {
  action(params) {
    ReactLayout.render(MainLayout, {
      content: <BlogPostContainer {...params} />
    });
  }
});
