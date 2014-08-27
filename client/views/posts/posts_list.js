var _throttleTimer = null;
var _throttleDelay = 500;
var $window = $(window);
var $document = $(document);
var autoscroll_views = ['top', 'new', 'best', 'digest', 'recently-commented', 'my-comments', 'category', 'search'];

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

$document.ready(function () {

    $window
        .off('scroll', ScrollHandler)
        .on('scroll', ScrollHandler);

});

function ScrollHandler(e) {
    //throttle event:
	var autoscroll = false;
	var x;
	for (x in autoscroll_views) {
	  console.log(x);
	  console.log(window.location.pathname);
	  if (window.location.pathname.indexOf(autoscroll_views[x]) != -1) {
	    autoscroll = true;
	  }
	}
	if (autoscroll) {
      clearTimeout(_throttleTimer);
      _throttleTimer = setTimeout(function () {
          console.log('scroll');

          //do work
          if ($window.scrollTop() + $window.height() >= getDocHeight()) {
            var count = parseInt(Session.get('postsLimit')) + parseInt(getSetting('postsPerPage', 10));
            var categorySegment = Session.get('categorySlug') ? Session.get('categorySlug') + '/' : '';
            Router.go('/' + Session.get('view') + '/' + categorySegment + count);
          }

      }, _throttleDelay);
	}
}

Template[getTemplate('posts_list')].helpers({

  post_item: function () {
    return getTemplate('post_item');
  },
  posts : function () {
    if(this.postsList){ // XXX
      this.postsList.rewind();    
      var posts = this.postsList.map(function (post, index, cursor) {
        post.rank = index;
        return post;
      });
      return posts;
    }
  },
  hasMorePosts: function(){
    // as long as we ask for N posts and all N posts showed up, then keep showing the "load more" button
    return parseInt(Session.get('postsLimit')) == this.postsCount
  },
  loadMoreUrl: function () {
    var count = parseInt(Session.get('postsLimit')) + parseInt(getSetting('postsPerPage', 10));
    var categorySegment = Session.get('categorySlug') ? Session.get('categorySlug') + '/' : '';
    return '/' + Session.get('view') + '/' + categorySegment + count;
  }
});