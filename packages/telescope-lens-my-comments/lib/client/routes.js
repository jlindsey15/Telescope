Meteor.startup(function () {

  Router.map(function() {

    this.route('posts_my_comments', {
      path: '/my-comments',
      controller: PostsListController
    });

  });

});

viewNav.push(
  {
    route: 'posts_my_comments',
    label: 'My Comments'
  }  
);