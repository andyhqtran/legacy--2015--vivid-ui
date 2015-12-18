(function() {
  $('[data-tooltip]').hover(function(e) {
    return $('<div class="tooltip">' + $(this).attr('data-tooltip') + '</div>').appendTo($(this)).css({
      top: function() {
        return -($(this).outerHeight() + 15);
      }
    }).fadeIn(300, 'swing');
  }, function(e) {
    return $(this).children('.tooltip').fadeOut(300, 'swing', function() {
      return $(this).remove();
    });
  });

}).call(this);
