// Variables
var markers = [];
var map;
var initializedPostsUser = false;
var users = ['@Lina', '@Wenzheng', '@Irina', '@Michael', '@Eric', '@Ashley', '@Homing', '@Geon', '@Jiho', '@Kush'];

var icon_base = 'assets/categories/';
var icons = {
    bar: {
        icon: icon_base + 'bar_pin_test.png'
    }
};

$( document ).ready(function () {

    // set up the Instagram api
    var feed = new Instafeed({
        get: 'user',
        tagName: 'awesome',
        accessToken: '4294116483.5c129f5.822305c4f7594a95923c2907edb68c98',
        userId:'4294116483',
        template: '<div class="post"> <div class="post_info"><p class="owner"></p> <p>{{caption}}</p> <span class="likes"><i class="icon ion-heart"></i> {{likes}}</span><span class="comments"><i class="icon ion-chatbubble"></i> {{comments}}</span> </div> <a href="{{link}}"> <img src="{{image}}" alt="" class="img-responsive"> </a> </div>',
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
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('search');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
        google.maps.event.trigger(map, 'resize');
    });
    
    map.addListener('center_changed', function() {
        markers.forEach(removeMarkers);
        addMarker(map.getCenter());
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
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

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
function addMarker(location) {
    markers.push(new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        icon: icons.bar.icon
    }));
}
    
// Remove all markers
function removeMarkers(marker) {
    marker.setMap(null);
}