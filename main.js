$(document).ready(function () {
  var baseUrl = 'https://api.chucknorris.io/jokes/';

  $.ajax({
    url: baseUrl + 'categories',
    method: 'GET',
    success: function(data){
      for (var i = 0; i < data.length; i++) {
        var category = data[i];
        $('.category').append('<option value="' + category + '">' + category +'</option>');
      }
    }, error: function (error) {
        alert(error);
    }
  });


  $('#bottone-search').click(function () {
    var categoriaSelezionata = $('.category').val();
    $.ajax({
      url: baseUrl + 'random',
      method: 'GET',
      data: {
        category: categoriaSelezionata
      },
      success: function (data) {
        makeJoke(data);
      }, error: function (error) {
          alert(error);
      }
    })
  });

  $('#text-input').keyup(function (e) {

      if(e.which == 13){
        var input = $('#text-input').val();
        $.ajax({
          url: baseUrl + 'search',
          method: 'GET',
          data: {
            query: input
          },
          success: function (data) {
            if(data.total > 0){
              var random = Math.floor(Math.random() * data.total);
              var joke = data.result[random];
              makeJoke(joke);
            }
          }, error: function (error) {
              alert(error);
          }

        })
      }
  });

  // funzione per creare jokes
  function makeJoke(data) {
    var source = $("#category-template").html();
    var template = Handlebars.compile(source);
    var context = {
      img: data.icon_url,
      joke: data.value,
      data: data.updated_at
    };
    var html = template(context);

    $('.contenitore-joke').append(html);
  }



})
