// Variables
var markers = [];
var results = [];
var owner = {'1648141780196322489_6419152996':'maurahong', "1648203274850261973_6419152996":"siettafe", "1648205996408348201_6419152996":"meetvirginiablog", "1648207492566790906_6419152996":"_meenz_", "1648142329398496137_6419152996":"morgan_lilian", "1648142964357440401_6419152996":"blairsheets", "1648143607554019750_6419152996":"iya_112","1648143875813406561_6419152996":"emilywilliams7207", "1648144910229243633_6419152996":"ihellodao", "1648145274085184512_6419152996":"soeunp88", "1648145728210784819_6419152996":"raque_l", "1648146078569424576_6419152996": "adinapreston","1648146491154638543_6419152996":"swisskissberner", "1648146859104337560_6419152996":"llpz44"};
var map;
var geocoder;
var initializedPostsUser = false;

var icon_base = 'assets/categories/';
var icons = {
    bar: icon_base + 'bar_pin_v2.png',
    hotel: icon_base + 'hotel_pin_v2.png',
    oak: icon_base + 'oak-tree_pin_v2.png',
    restaurant: icon_base + 'restaurant_pin_v2.png',
    tickets: icon_base + 'tickets_pin_v2.png',
	camera: icon_base + 'camera_pin_v2.png',
	
	cat_all: icon_base + 'all.png',
	cat_bar: icon_base + 'bar.png',
	cat_hotel: icon_base + 'hotel.png',
	cat_oak: icon_base + 'oak-tree.png',
	cat_restaurant: icon_base + 'restaurant.png',
	cat_tickets: icon_base + 'tickets.png',
	cat_camera: icon_base + 'camera.png',
	
	cat_all_selected: icon_base + 'all_selected.png',
	cat_bar_selected: icon_base + 'bar_selected.png',
	cat_hotel_selected: icon_base + 'hotel_selected.png',
	cat_oak_selected: icon_base + 'oak-tree_selected.png',
	cat_restaurant_selected: icon_base + 'restaurant_selected.png',
	cat_tickets_selected: icon_base + 'tickets_selected.png',
	cat_camera_selected: icon_base + 'camera_selected.png'
};
var locations = {
    Biscuit_Bitch: {
		name: "Biscuit Bitch",
        address: "1909 1st Ave, Seattle, WA 98101",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.restaurant,
		category: icons.cat_restaurant
    },
    Seattle_Art_Museum: {
		name: "Seattle Art Museum",
        address: "1300 1st Ave, Seattle, WA 98101",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.tickets,
		category: icons.cat_tickets
    },
    The_Edgewater: {
		name: "The Edgewater",
        address: "2411 Alaskan Way, Seattle, WA 98121",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.hotel,
		category: icons.cat_hotel
    },
    The_Nest: {
		name: "The Nest",
        address: "110 Stewart St, Seattle, WA 98101",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.bar,
		category: icons.cat_bar
    },
    Volunteer_Park: {
		name: "Volunteer Park",
        address: "1247 15th Ave E, Seattle, WA 98112",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.oak,
		category: icons.cat_oak
    },
	Palisade_Restaurant: {
		name: "Palisade Restaurant",
		address: "2601 W Marina Pl, Seattle, WA 98199-4331",
		lat_lng: {lat: 0, lng: 0},
		icon: icons.restaurant,
		category: icons.cat_restaurant
	},
	Pike_Place_Market: {
		name: "Pike Place Market",
		address: "Between Pike and Pine Sts. at First Ave., Seattle, WA 98101",
		lat_lng: {lat: 0, lng: 0},
		icon: icons.camera,
		category: icons.cat_camera
	}
};

$( document ).ready(function () {

    // set up the Instagram api
    var feed = new Instafeed({
        get: 'user',
        tagName: 'awesome',
        accessToken: '6419152996.166bd80.3f5e1392db904047832daf97129569e4',
        userId:'6419152996',
        template: '<div class="post"><p id ={{id}} class="owner"></p> <div onclick="changeStarColor(this)" class = "like_container"> <p id="star" > &#9733;</p> <p id="add" >Add to favorite</p> </div> <div class="post_content" onclick="open_post_modal(this)"> <div class="post_info"> <p>{{caption}}</p> <span class="likes"><i class="icon ion-heart"></i> {{likes}}</span><span class="comments"><i class="icon ion-chatbubble"></i> {{comments}}</span> </div> <div> <img id ="post_image" src="{{image}}" alt="" class="img-responsive"> </div> </div> </div>',
        resolution: 'standard_resolution'
    });
    feed.run();
});

function initializePostsOwner() {
    if (initializedPostsUser === true)
        return;
    initializedPostsUser = true;
    var posts = document.getElementsByClassName("owner");
    for (var i = 0; i < posts.length; i++) {
        posts[i].innerHTML = "@" + owner[posts[i].id];
    }
}

function changeStarColor(target){
    console.log(target.childNodes);
    var addFavorite = target.childNodes[3];
    var star = target.childNodes[1];
    if (star.style.color === "yellow"){
        star.style.opacity = 0.3;
        star.style.color = "black";
        addFavorite.innerHTML="Add to favorite";
    }
    else{
        star.style.opacity = 1;
        star.style.color = "yellow";
        addFavorite.innerHTML="Favorited";
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
			addMarker(loc);
    	}
		markers.forEach(addClickListener);
	});
	
    map.addListener('bounds_changed', function() {
        //markers.forEach(removeMarkers);
        searchBox.setBounds(map.getBounds());
        google.maps.event.trigger(map, 'resize');
        
//       for(var key in locations) {
//			var loc = locations[key];
//			if(map.getBounds().contains(loc.lat_lng)) {
//				addMarker(loc.lat_lng, loc.icon);
//        	}
//    	}
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
function addMarker(loc) {
    markers.push(new google.maps.Marker({
        map: map,
        position: loc.lat_lng,
        icon: loc.icon,
		title: loc.name
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
    console.log("addclicklistenermarker");
	var modal = document.getElementById("pin-modal");
	marker.addListener('click', function() {	
		modal.style.display = "block";
		document.getElementById("location_name").innerHTML = marker.title;
		for(var key in locations) {
			var loc = locations[key];
			if(loc.name == marker.title) {
				document.getElementById("location_address").innerHTML = loc.address;
				document.getElementById("location_category").src = loc.category;
			}
		}
	});
}

function closeModal(id) {
	document.getElementById(id).style.display="none";
}

function open_post_modal(target){
    console.log(target.childNodes);
    var link = target.childNodes[3].childNodes[1].src;
    var caption = target.childNodes[1].childNodes[1].innerHTML;
    document.getElementById('post_img_large').src= link;
    document.getElementById('post_modal').style.display="block";
    document.getElementById('post_caption').innerHTML=caption;
}

function changeCategory(category, selected, id) {
	document.getElementById("cat_all").src = icons.cat_all;
	document.getElementById("cat_res").src = icons.cat_restaurant;
	document.getElementById("cat_bar").src = icons.cat_bar;
	document.getElementById("cat_cam").src = icons.cat_camera;
	document.getElementById("cat_tic").src = icons.cat_tickets;
	document.getElementById("cat_oak").src = icons.cat_oak;
	
	markers.forEach(removeMarkers);
	if(category == 'all') {
		for(var key in locations) {
			var loc = locations[key];
			addMarker(loc);
			document.getElementById(id).src = selected;
		}
	} else {
		for(var key in locations) {
			var loc = locations[key];
			if(loc.icon == category) {
				addMarker(loc);
				document.getElementById(id).src = selected;
			}
		}
	}
	
	markers.forEach(addClickListener);
}

function catSeeMore() {
    console.log("hi");
    document.getElementById("cat_modal").style.display = "block";
}