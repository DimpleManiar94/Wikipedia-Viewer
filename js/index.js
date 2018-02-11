$(document).ready(function(){
  $('#wiki-search').autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
  });
  $('#wiki-search').on('keypress', function(e){
    if(e.keyCode == 13){
      fetchWikiResult($('#wiki-search').val());
    }
  });
  $('.search-btn').on('click', function(){
    fetchWikiResult($('#wiki-search').val());
  });
  
  function fetchWikiResult(searchString){
    $.ajax({
                url: 'https://en.wikipedia.org/w/api.php',
                data: { action: 'query', list: 'search', srsearch: searchString,  format: 'json' },
                dataType: 'jsonp',
                success: function(data){
                  $('.result').html("");
                  for(i=0; i<data.query.search.length; i++){
                    $('.result').append('<div class="header"><h4><a target="_blank" href="https://en.wikipedia.org/wiki/' + encodeURI(data.query.search[i].title) + '">' + data.query.search[i].title + '</a></h2><p>' + data.query.search[i].snippet + '</p></div><hr>');
                  }
                }
            });
  }
});