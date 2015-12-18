$('[data-tooltip]').hover(
    (e) ->
      $('<div class="tooltip">' +  $(this).attr('data-tooltip') + '</div>').appendTo($(this)).css
        top: ->
          -($(this).outerHeight() + 15)
      .fadeIn 300, 'swing'
    (e) -> $(this).children('.tooltip').fadeOut 300, 'swing', ->
      $(this).remove()
)