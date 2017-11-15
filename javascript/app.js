// Variables
var markers = [];
var results = [];
var map;
var geocoder;
var initializedPostsUser = false;
var users = ['@Lina', '@Wenzheng', '@Irina', '@Michael', '@Eric', '@Ashley', '@Homing', '@Geon', '@Jiho', '@Kush'];

var icon_base = 'assets/categories/';
var icons = {
    bar: icon_base + 'bar_pin.png',
    hotel: icon_base + 'hotel_pin.png',
    oak: icon_base + 'oak-tree_pin.png',
    restaurant: icon_base + 'restaurant_pin.png',
    tickets: icon_base + 'tickets_pin.png'
};
var locations = {
    Biscuit_Bitch: {
        address: "1909 1st Ave, Seattle, WA 98101",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.restaurant
    },
    Seattle_Art_Museum: {
        address: "1300 1st Ave, Seattle, WA 98101",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.tickets
    },
    The_Edgewater: {
        address: "2411 Alaskan Way, Seattle, WA 98121",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.hotel
    },
    The_Nest: {
        address: "110 Stewart St, Seattle, WA 98101",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.bar
    },
    Volunteer_Park: {
        address: "1247 15th Ave E, Seattle, WA 98112",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.oak
    },
	Palisade_Restaurant: {
		address: "2601 W Marina Pl, Seattle, WA 98199-4331",
		lat_lng: {lat: 0, lng: 0},
		icon: icons.restaurant
	},
	Pike_Place_Market: {
		address: "Between Pike and Pine sts. at First Ave., Seattle, WA 98101",
		lat_lng: {lat: 0, lng: 0},
		icon: icons.oak
	}
};

$( document ).ready(function () {

    // set up the Instagram api
    var feed = new Instafeed({
        get: 'user',
        tagName: 'awesome',
        accessToken: '4294116483.5c129f5.822305c4f7594a95923c2907edb68c98',
        userId:'4294116483',
        template: '<div class="post"><p class="owner"></p> <div onclick="changeStarColor(this)" class = "like_container"> <p id="star" > &#9733;</p> <p id="add" >Add to favorite</p> </div> <div class="post_content"> <div class="post_info"> <p>{{caption}}</p> <span class="likes"><i class="icon ion-heart"></i> {{likes}}</span><span class="comments"><i class="icon ion-chatbubble"></i> {{comments}}</span> </div> <a href="{{link}}"> <img src="{{image}}" alt="" class="img-responsive"> </a></div> </div>',
        resolution: 'standard_resolution'
    });
    feed.run();
});

function initializePostsOwner() {
    if (initializedPostsUser === true)
        return;
    initializedPostsUser = true;
    var posts = document.getElementsByClassName("owner");
    console.log(posts.length);
    for (i = 0; i < posts.length; i++) {
        console.log(posts[i].innerHTML);
        posts[i].innerHTML = users[Math.floor(Math.random()*users.length)];
    }
}

function changeStarColor(target){
    console.log(target.childNodes);
    var addFavorite = target.childNodes[3];
    var star = target.childNodes[1];
    if (star.style.color === "yellow"){
        star.style.opacity = 0.3;
        star.style.color = "black";
        addFavorite.innerHTML="Add to favorite ";
    }
    else{
        star.style.opacity = 1;
        star.style.color = "yellow";
        addFavorite.innerHTML="Favorite ";
    }
}

function open_sidebar() {
    document.getElementById("map").style.marginLeft = "40%";
    document.getElementById("map").style.width = "60%";
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("sidebar_button").style.left = "40%";
    document.getElementById("sidebar_button").onclick = close_sidebar;
}

function close_sidebar() {
    document.getElementById("map").style.marginLeft = "0";
    document.getElementById("map").style.width = "100%";
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("sidebar_button").style.left = "0";
    document.getElementById("sidebar_button").onclick = open_sidebar;
}

function updateView(value){
    document.getElementById("location").innerHTML = value;
}

// Map and Search box
function initAutocomplete() {
	geocoder = new google.maps.Geocoder();
    for(var key in locations) {
        var loc = locations[key];
        geocodeAddress(loc);
    }
	
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 47.6062095, lng: -122.3320708},
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('search');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    
    //geocoding
    	
    
    // Bias the SearchBox results towards current map's viewport.
	map.addListener('tilesloaded', function() {
		for(var key in locations) {
			var loc = locations[key];
			if(map.getBounds().contains(loc.lat_lng)) {
				addMarker(loc.lat_lng, loc.icon);
        	}
    	}
		markers.forEach(addClickListener);
	});
	
    map.addListener('bounds_changed', function() {
        markers.forEach(removeMarkers);
        searchBox.setBounds(map.getBounds());
        google.maps.event.trigger(map, 'resize');
        
        for(var key in locations) {
			var loc = locations[key];
			if(map.getBounds().contains(loc.lat_lng)) {
				addMarker(loc.lat_lng, loc.icon);
        	}
    	}
		markers.forEach(addClickListener);
    });
    
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(removeMarkers);

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

// Add marker (pin) based on location (right now just puts it in center of map)
function addMarker(location, icon) {
    markers.push(new google.maps.Marker({
        map: map,
        position: location,
        icon: icon
    }));
}
    
// Remove a marker
function removeMarkers(marker) {
    marker.setMap(null);
}

// Convert address to lat lng
function geocodeAddress(location) {
    geocoder.geocode({'address': location.address}, function(results, status) {
        if(status === 'OK') {
            location.lat_lng = results[0].geometry.location;
        }
    });
}



function addClickListener(marker) {
	var modal = document.getElementById("modal");
	marker.addListener('click', function() {	
		modal.style.display = "block";
	});
}

function closeModal() {
	document.getElementById("modal").style.display="none";
}