// Giphy API Key  = 432HzlwijziY4lOejK6Ug8vkj557512E

// Array of topics
topics = ['teacup pigs', 'fails', 'pain', 'puppies', 'hedgehogs', 'gnarwalls', 'angry corgis', 'dumb people', 'crashes', 'angry'];


// Giphy API Key
// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGifs() {

	var APIKey = "432HzlwijziY4lOejK6Ug8vkj557512E";
	var topic = $(this).attr("data-name");

	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=432HzlwijziY4lOejK6Ug8vkj557512E&q=" + topic + "&limit=10&offset=0&rating=G&lang=en" + APIKey;

	$.ajax({
	      url: queryURL,
	      method: 'GET' 
	    }).done(function(response){
	
	    	// Log the data in HTML
	        console.log(response);

	        

	        for(var j=0; j<response.data.length; j++){

	      		//console.log(response.data[j].rating);


	      		var gifHolder = $('<div class="gifHolder"></div>');
            	$('#gif-view').append(gifHolder);


            	gifHolder.append('<div><b>Gif Rating: </b>' + response.data[j].rating);

	      		var topicImage = $('<img>');
          		$('.gifHolder').append(topicImage);
          		topicImage.attr('src', response.data[j].images.downsized_still.url);

          		$(document).on("click", '.gifHolder', function(){

          			console.log(response.data[j][j].images.downsized_still.url);
          			
	        		//topicImage.attr('src', response.data[j].images.downsized_still.url);

	        	});

	        } 
	        
	        
    	});
	}



function renderButtons() {

  // Deletes the topics prior to adding new topics

  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Loops through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generates buttons for each topic in the array
    var newTopic = $("<button>");
    // Adds a class of movie to our button
    newTopic.addClass("topic btn btn-primary");

    // Added a data-attribute
    newTopic.attr("data-name", topics[i]);

    // Provided the initial button text
    newTopic.text(topics[i]);

    // Added the button to the buttons-view div
    $("#buttons-view").append(newTopic);
  }
}


// This function handles events where the add movie button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topic = $("#topic-input").val().trim();

        // The movie from the textbox is then added to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".topic", displayGifs);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();



