// Giphy API Key  = 432HzlwijziY4lOejK6Ug8vkj557512E

// Array of topics
topics = ['teacup pigs', 'fails', 'pain', 'puppies', 'hedgehogs', 'gnarwalls', 'angry corgis', 'dumb people', 'crashes', 'angry'];


var topicImage;

// Giphy API Key
// display Topic Info function re-renders the HTML to display the appropriate content
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

	        // Empty any gifs from gif-view
	        $('#gif-view').empty();

				

	        for(var j=0; j<response.data.length; j++){


	      		var gifHolder = $('<div class="gifHolder"></div>');
            	$('#gif-view').append(gifHolder);

            	gifHolder.append('<div><b>Gif Rating: </b>' + response.data[j].rating);

	      		topicImage = $('<img>');
	      		
          		gifHolder.append(topicImage);
          		topicImage.addClass('clickable');
          		topicImage.attr('src', response.data[j].images.downsized_still.url);
          		topicImage.attr('data-still', response.data[j].images.downsized_still.url);
          		topicImage.attr('data-play', response.data[j].images.downsized.url);	
          		topicImage.attr('data-state', 'still');	
	        }   
    	});
	}

	$(document).on("click", '.clickable', function(){


		var still = $(this).attr('data-still');
		var play = $(this).attr('data-play');
		var state = $(this).attr('data-state');
		// debugger;
	
		if(state === 'still'){
		
			$(this).attr('src', play);
			$(this).attr('data-state', 'playing');
			
		} else{

			$(this).attr('src', still);
			$(this).attr('data-state', 'still');
			
		}
	});

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


// This function handles events where the add topic button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var topic = $("#topic-input").val().trim();

        // The topic from the textbox is then added to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "topic"
      $(document).on("click", ".topic", displayGifs);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();



