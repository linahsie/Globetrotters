// Variables
var markers = [];
var results = [];
var owner = {'1648141780196322489_6419152996':'maurahong', "1648203274850261973_6419152996":"siettafe", "1648205996408348201_6419152996":"meetvirginiablog", "1648207492566790906_6419152996":"_meenz_", "1648142329398496137_6419152996":"morgan_lilian", "1648142964357440401_6419152996":"blairsheets", "1648143607554019750_6419152996":"iya_112","1648143875813406561_6419152996":"emilywilliams7207", "1648144910229243633_6419152996":"ihellodao", "1648145274085184512_6419152996":"soeunp88", "1648145728210784819_6419152996":"raque_l", "1648146078569424576_6419152996": "adinapreston","1648146491154638543_6419152996":"_meenz_", "1648146859104337560_6419152996":"llpz44"};
var id_dict = {'maurahong':'1648141780196322489_6419152996', "siettafe":"1648203274850261973_6419152996", "meetvirginiablog":"1648205996408348201_6419152996", "_meenz_":"1648207492566790906_6419152996", "morgan_lilian":"1648142329398496137_6419152996", "blairsheets":"1648142964357440401_6419152996", "iya_112":"1648143607554019750_6419152996","emilywilliams7207":"1648143875813406561_6419152996", "ihellodao":"1648144910229243633_6419152996","soeunp88": "1648145274085184512_6419152996", "raque_l":"1648145728210784819_6419152996",  "adinapreston":"1648146078569424576_6419152996","swisskissberner":"1648146491154638543_6419152996", "llpz44":"1648146859104337560_6419152996"};
var friend_loc = {'_meenz_':1, 'ihellodao':3, 'llpz44':5, 'iya_112':7, 'raque_l':9, 'maurahong':11, 'siettafe':13, 'meetvirginiablog':15, 'morgan_lilian':17, 'blairsheets':19};

var map;
var geocoder;
var friend_filter = {};
var category_filter = {};

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
    cat_camera_selected: icon_base + 'camera_selected.png',

    cat_bar_check: icon_base + 'bar_check.png',
    cat_hotel_check: icon_base + 'hotel_check.png',
    cat_oak_check: icon_base + 'oak-tree_check.png',
    cat_restaurant_check: icon_base + 'restaurant_check.png',
    cat_tickets_check: icon_base + 'tickets_check.png',
    cat_camera_check: icon_base + 'camera_check.png',

    cat_bar_gray: icon_base + 'bar_gray.png',
    cat_hotel_gray: icon_base + 'hotel_gray.png',
    cat_oak_gray: icon_base + 'oak-tree_gray.png',
    cat_restaurant_gray: icon_base + 'restaurant_gray.png',
    cat_tickets_gray: icon_base + 'tickets_gray.png',
    cat_camera_gray: icon_base + 'camera_gray.png'
};


var locations = {
    Biscuit_Bitch: {
        name: "Biscuit Bitch",
        address: "1909 1st Ave, Seattle, WA 98101",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.restaurant,
        category: icons.cat_restaurant,
        score: "assets/4.5 stars.png",
        pic1: "https://media1.fdncms.com/stranger/imager/u/large/25014514/13895078_1273269562684182_2405888235649214765_n.jpg",
        pic2: "https://s3-media1.fl.yelpcdn.com/bphoto/U9Qx1zpJvHKtS5NN51m0iQ/348s.jpg",
        pic3: "http://www.yahglobal.com/images/business/details/biscuit-bitch-seattle.jpg",
        pic4: "https://2.bp.blogspot.com/-SsXMr6-zHs4/VECE_xiTShI/AAAAAAAAY2U/6dlHOvEWVd4/s1600/101714maaf-biscuitbitchcaffelieto03.jpg",
        friendsStats: "2",
        post1:{name:'ihellodao', src:'http://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/23596038_535015253504162_2704947171542695936_n.jpg'},
        post2:{name:'soeunp88', src:'http://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/23507668_1530528950349631_1892949935985262592_n.jpg'},
        website: "http://biscuitbitch.com",
        phone: "(206) 728 - 2219",
        price: "$",
        hours: "7:00 AM - 2:00 PM",
        user1: "AplrilFNP",
        user2: "CHerieTanya",
        review1: "I got here right at 9am on Sunday morning and already lined up. Fast service though. Food was very good. Sat at outside table. Many tourist and locals. Be prepared to wait and find somewhere else to enjoy the food. Very little seating space.",
        review2: "We drove to Seattle from Vancouver BC with these biscuits in mind. Having been here once before, we needed a fix. We were not disappointed. The staff is also a delight.",
        review1_score: "assets/4 star review.png",
        review2_score: "assets/5 star review.png"
    },
    Seattle_Art_Museum: {
        name: "Seattle Art Museum",
        address: "1300 1st Ave, Seattle, WA 98101",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.tickets,
        category: icons.cat_tickets,
        score: "assets/4.5 stars.png",
        pic1: "http://www.seattleartmuseum.org/Assets%20About%20SAM/hammering-man.jpg",
        pic2: "http://kusama.site.seattleartmuseum.org/wp-content/uploads/sites/16/2017/03/HMSG_Kusama_LoveForever_01_RGB_1080px.jpg",
        pic3: "http://www.seattleartmuseum.org/Assets%20About%20SAM/seattle-art-museum.jpg",
        pic4: "http://mediad.publicbroadcasting.net/p/kuow/files/styles/medium/public/201601/SAM-cars6_0.jpg",
        friendsStats: "2",
        post1:{name:'maurahong', src:'http://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/23507880_144325126192784_6753212568262672384_n.jpg'},
        post2:{name:'siettafe', src:'http://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/23596512_1751245091848190_6951484867284566016_n.jpg'},
        website: "http://www.seattleartmuseum.org",
        phone: "1 (206) 654-3100",
        price: "N/A",
        hours: "10:00 AM - 5:00 PM",
        user1: "suzannetoliver",
        user2: "radicalBMXer",
        review1: "The Andrew Wyeth exhibit is particularly interesting. Although unfamiliar with his work until today, am now a great admirer! Multiple items / galleries are also of great interest: the porcelain gallery, the African collection, and European works. Highly recommend.",
        review2: "A rather underwhelming art museum. We visit art museums all over the world, and this one does not stand out. It is not bad, but the collection seems rather scattered.",
        review1_score: "assets/5 star review.png",
        review2_score: "assets/1 star review.png"
    },
    The_Edgewater: {
        name: "The Edgewater",
        address: "2411 Alaskan Way, Seattle, WA 98121",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.hotel,
        category: icons.cat_hotel,
        score: "assets/4 stars.png",
        pic1: "http://www.theroamingboomers.com/wp-content/uploads/2011/07/Edgewater-Hotel-Seattle_588.jpg",
        pic2: "http://www.edgewaterhotel.com/App_Data/MediaFiles/B/6/2/%7BB62DAF93-FF1B-46B6-8718-F6C0555F9EF7%7DTE_Lobby.jpg",
        pic3: "https://images.trvl-media.com/hotels/1000000/20000/11200/11133/11133_149_z.jpg",
        pic4: "https://cdn.wedding-spot.com/images/venues/3584/Edgewater-Hotel-Wedding-Seattle-WA-12_main.1431371856.png",
        friendsStats: "2",
        post1:{name:'meetvirginiablog', src:'http://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/23507653_147224312698679_5423666048345833472_n.jpg'},
        post2:{name:'_meenz_', src:'http://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/23595931_145826546170506_1767955839231983616_n.jpg'},
        website: "http://www.edgewaterhotel.com/?utm_source=TripAdvisorBL&utm_medium=listing&utm_campaign=TripABL",
        phone: "(830) 541 - 7800",
        price: "$$$",
        hours: "24 hrs",
        user1: "daveg",
        user2: "michael4",
        review1: "Great place on the water. The restaurant was right on the water for a great view while eating. The staff was excellent, very friendly and helpful. Grrat location within easy walking distance to all the downtown activities",
        review2: "My wife and I stayed for two days for our 29th anniversary and couldn't have had a better time or service. I would recommend this to anyone looking for a place to stay in Seattle, WA. for a special time.",
        review1_score: "assets/4 star review.png",
        review2_score: "assets/5 star review.png"
    },
    The_Nest: {
        name: "The Nest at Thompson Seattle",
        address: "110 Stewart St, Seattle, WA 98101",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.bar,
        category: icons.cat_bar,
        score: "assets/4.5 stars.png",
        pic1: "https://thompsonprod.blob.core.windows.net/thompsonprod-container/2016/05/11135450/The_Nest.jpg",
        pic2: "https://cdn.vox-cdn.com/thumbor/YCfyWVOFtAHWnZLGdXlR1ZdD80k=/0x600/cdn.vox-cdn.com/uploads/chorus_asset/file/6390175/015_-_Thompson_Seattle_The_Nest_Interior.0.jpg",
        pic3: "https://s3-media4.fl.yelpcdn.com/bphoto/HETDGdYn7P6IdMkm6vhQXA/o.jpg",
        pic4: "https://cdn.wedding-spot.com/images/venues/8960/Thompson-Seattle-Wedding-Seattle-WA-12_main.1477001833.jpg",
        friendsStats: "2",
        post1:{name:'morgan_lilian', src:'http:////scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/23594687_392373994514845_4782168981395996672_n.jpg'},
        post2:{name:'blairsheets', src:'http://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/23498140_300574953763831_3738128870587498496_n.jpg'},
        website: "http://www.thompsonhotels.com/hotels/seattle/thompson-seattle/restaurant-bars/the-nest",
        phone: "(206) 623 - 4600",
        price: "$$$$",
        hours: "5:00 PM - 12:00 AM",
        user1: "pugetTom",
        user2: "charlotte3",
        review1: "Amazing view! This is a great spot for a drink after work, or before dinner. We tried to get in after dinner and it was so crowded we could not find a place to stand, much less sit.",
        review2: "We were meeting people up there for drinks but when we exited the elevator we were asked if we had a reservation, for drinks!? Then we had to get our hand stamped!!! Why?Apparently, there are people who pay $50 to reserve a couch there. Well, we took in the views but there was absolutely no place to sit or even stand comfortably so we left. Views are spectacular though! Just a bit too pretentious! People who sit there think they are cool just because they spend $ on being able to sit on a couch for a bit, in our opinion they just seem silly and not cool at all :-)",
        review1_score: "assets/5 star review.png",
        review2_score: "assets/3 star review.png"
    },
    Volunteer_Park: {
        name: "Volunteer Park",
        address: "1247 15th Ave E, Seattle, WA 98112",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.oak,
        category: icons.cat_oak,
        score: "assets/4.5 stars.png",
        pic1: "http://tanglewoodconservatories.com/wp-content/uploads/2014/05/volunteer_main.jpg",
        pic2: "https://media1.fdncms.com/stranger/imager/u/original/24157597/shutterstock_103534460.jpg",
        pic3: "https://www.theclio.com/web/ul/18759.36935.jpeg",
        pic4: "https://amateurbotannist.files.wordpress.com/2011/07/25f09-img_1232.jpg",
        friendsStats: "2",
        post1:{name:'iya_112', src:'http://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/23507504_186247568592045_918372219585822720_n.jpg'},
        post2:{name:'emilywilliams7207', src:'http://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/23594583_137795413653072_7214794941241753600_n.jpg'},
        website: "http://www.seattle.gov/parks/find/parks/volunteer-park",
        phone: "(206) 684 - 4075",
        price: "Free",
        hours: "6:00 AM - 10:00 PM",
        user1: "taha_mb",
        user2: "linda_c:",
        review1: "I walked alone in this park in an afternoon. It was calm and relaxing. It might not satisfy tourists, because while it is quite beautiful and relaxing, it is not a very special place",
        review2: "Go to Volunteer Park and pack a lunch. It's really a nice park with a great museum and a relaxing place to have a picnic. Plus, getting there you get to see some pretty amazing homes in the area!",
        review1_score: "assets/4 star review.png",
        review2_score: "assets/5 star review.png"
    },
    Palisade_Restaurant: {
        name: "Palisade Restaurant",
        address: "2601 W Marina Pl, Seattle, WA 98199-4331",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.restaurant,
        category: icons.cat_restaurant,
        score: "assets/4.5 stars.png",
        pic1: "https://media-cdn.tripadvisor.com/media/photo-o/09/48/4b/b7/palisade.jpg",
        pic2: "http://vp.cdn.cityvoterinc.com/GetImage.ashx?img=00/00/00/02/02/30/20230-2764220.jpg",
        pic3: "https://img.grouponcdn.com/deal/nTYmBDEiS4h2HYMvUKthVT/Palisade_Food4-700x420/v1/c700x420.jpg",
        pic4: "https://cdn.wedding-spot.com/images/venues/7485/Alani-Room-at-the-Palisade-Wedding-Seattle-WA-4_main.1453525170.jpg",
        friendsStats: "2",
        post1:{name:'raque_l', src:'http://scontent.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/23507830_1801203963285244_8064666877747527680_n.jpg'},
        post2:{name:'adinapreston', src:'http://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/23498728_196478230920947_30203498515660800_n.jpg'},
        website: "https://palisaderestaurant.com",
        phone: "(206) 285 - 1000",
        price: "$$$$",
        hours: "11:30 AM - 10:00 PM",
        user1: "jeanh",
        user2: "psamob",
        review1: "Oh my! Where to begin. Firstly great service, great location, great view and brilliant ambience from the minute you arrive. But let's get to the food which is the most important part of a dining experience. Every single course our group ordered was impeccable. Presentation? First class. Flavours? First class. Every course was superb. We loved the attention from our servers. Every attention was made to every single detail. Everything was delicious. I can't wait to return and I will never forget our first night here. Fantastic!",
        review2: "This fine seafood restaurant is located in a beautiful surrounding where you see sailboats galore and great views of Elliott Bay. We had a relaxed seafood dinner with superb food. The service was impeccable. We sat and visited for quite some time while partaking of our dinner and never felt rushed, despite the restaurant's being full. This is a great establishment.",
        review1_score: "assets/5 star review.png",
        review2_score: "assets/5 star review.png"
    },
    Pike_Place_Market: {
        name: "Pike Place Market",
        address: "Between Pike and Pine Sts. at First Ave., Seattle, WA 98101",
        lat_lng: {lat: 0, lng: 0},
        icon: icons.camera,
        category: icons.cat_camera,
        score: "assets/4.5 stars.png",
        pic1: "http://pikeplacemarket.org/sites/default/files/styles/page_image/public/plan-your-visit-header.jpg?itok=tcl-zP7-",
        pic2: "https://cdn.vox-cdn.com/thumbor/VjrdnIjF9QTw5qjGR1KKFfi1EPg=/0x0:2000x1329/1200x900/filters:focal(654x260:974x580)/cdn.vox-cdn.com/uploads/chorus_image/image/55235639/eatersea0916_pike_place_market_shutterstock_mcarter.0.0.jpg",
        pic3: "http://image.boomsbeat.com/data/images/full/28734/1-jpg.jpg",
        pic4: "http://digitalphotoacademy.com/wp-content/uploads/sites/17/2016/12/pike-place-market-19.jpg",
        friendsStats: "2",
        post1:{name:'swisskissberner', src:'http://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/23594798_1742576706049651_5308012169726525440_n.jpg'},
        post2:{name:'llpz44', src:'http://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/23594478_130450257667702_5269201672713797632_n.jpg'},
        website: "http://pikeplacemarket.org",
        phone: "(206) 682 - 7453",
        price: "Free",
        hours: "6:00 AM - 1:30 AM",
        user1: "danielleh",
        user2: "issacB",
        review1: "Always have to stop and visit the Pike Place Market when I’m in Seattle! It’s such a staple in the downtown area and culture. So many fun things to see and local artisan treasures to find.",
        review2: "Got to visit after over 15 years and the same atmosphere continues! Very nice place to visit and see things, even if you are not buying a Salmon or crab. Nice place to walk through on your way to the piers.",
        review1_score: "assets/5 star review.png",
        review2_score: "assets/5 star review.png"
    }
};
var num_selected = 5;
var category_selection = {
    restaurant: {
        id: "sel_res",
        selected: true,
        icon: icons.cat_restaurant,
        icon_check: icons.cat_restaurant_check,
        icon_gray: icons.cat_restaurant_gray,
        icon_selected: icons.cat_restaurant_selected,
        pin: icons.restaurant,
		title: "Restaurants"
    },
    bar: {
        id: "sel_bar",
        selected: true,
        icon: icons.cat_bar,
        icon_check: icons.cat_bar_check,
        icon_gray: icons.cat_bar_gray,
        icon_selected: icons.cat_bar_selected,
        pin: icons.bar,
		title: "Bars"
    },
    camera: {
        id: "sel_cam",
        selected: true,
        icon: icons.cat_camera,
        icon_check: icons.cat_camera_check,
        icon_gray: icons.cat_camera_gray,
        icon_selected: icons.cat_camera_selected,
        pin: icons.camera,
		title: "Points of Interest"
    },
    tickets: {
        id: "sel_tic",
        selected: true,
        icon: icons.cat_tickets,
        icon_check: icons.cat_tickets_check,
        icon_gray: icons.cat_tickets_gray,
        icon_selected: icons.cat_tickets_selected,
        pin: icons.tickets,
		title: "Attractions"
    },
    oak: {
        id: "sel_oak",
        selected: true,
        icon: icons.cat_oak,
        icon_check: icons.cat_oak_check,
        icon_gray: icons.cat_oak_gray,
        icon_selected: icons.cat_oak_selected,
        pin: icons.oak,
		title: "Parks"
    },
    hotel: {
        id: "sel_hot",
        selected: false,
        icon: icons.cat_hotel,
        icon_check: icons.cat_hotel_check,
        icon_gray: icons.cat_hotel_gray,
        icon_selected: icons.cat_hotel_selected,
        pin: icons.hotel,
		title: "Hotels"
    }
};
var categories = {
    1: {
		id: "cat1",
        icon: icons.cat_restaurant,
        icon_selected: icons.cat_restaurant_selected,
        pin: icons.restaurant,
		title: "Restaurants",
		selected: false
    },
    2: {
		id: "cat2",
        icon: icons.cat_bar,
        icon_selected: icons.cat_bar_selected,
        pin: icons.bar,
		title: "Bars",
		selected: false
    },
    3: {
		id: "cat3",
        icon: icons.cat_camera,
        icon_selected: icons.cat_camera_selected,
        pin: icons.camera,
		title: "Points of Interest",
		selected: false
    },
    4: {
		id: "cat4",
        icon: icons.cat_tickets,
        icon_selected: icons.cat_tickets_selected,
        pin: icons.tickets,
		title: "Attractions",
		selected: false
    },
    5: {
		id: "cat5",
        icon: icons.cat_oak,
        icon_selected: icons.cat_oak_selected,
        pin: icons.oak,
		title: "Parks",
		selected: false
    }
};

// instagram post related
$( document ).ready(function () {

    // set up the Instagram api
    var feed = new Instafeed({
        get: 'user',
        tagName: 'awesome',
        accessToken: '6419152996.166bd80.3f5e1392db904047832daf97129569e4',
        userId:'6419152996',
        template: '<div class="post"><p id ={{id}} class="owner"></p> <div onclick="changeStarColor(this)" class = "like_container"> <p id="star" > &#9733;</p> <p id="add" >Add to favorite</p> </div> <div class="post_content" onclick="open_post_modal(this)"> <div class="post_info"> <p>{{caption}}</p> <div id="comment_like"> <span class="likes"><i class="icon ion-heart"></i> {{likes}}</span><span class="comments"><i class="icon ion-chatbubble"></i> {{comments}}</span></div> </div> <div> <img id ="post_image" src="{{image}}" alt="" class="img-responsive"> </div> </div> </div>',
        resolution: 'standard_resolution',
        sortBy: "least-recent"
    });
    feed.run();
});

function filterFriend(target, friend_name) {
    changeCategorySelectAll();
    if (friend_name in id_dict) {
        if (id_dict[friend_name] in friend_filter) {
            target.style.filter = '';
            if (friend_loc[friend_name] <= 9) {
                var friend_icons = document.getElementById("friends_icon");
                friend_icons.childNodes[friend_loc[friend_name]].style.filter = '';
            }
            friend_icons = document.getElementById("friends_icon2");
            friend_icons.childNodes[friend_loc[friend_name]].style.filter  = '';
            delete friend_filter[id_dict[friend_name]];
        }
        else {
            friend_filter[id_dict[friend_name]] = true;
            target.style.filter = 'drop-shadow(2px 2px 0 #644B7A) drop-shadow(-2px -2px 0  #644B7A) drop-shadow(-2px 2px 0  #644B7A) drop-shadow(2px -2px 0  #644B7A)';
            if (friend_loc[friend_name] <= 9) {
                var friend_icons = document.getElementById("friends_icon");
                friend_icons.childNodes[friend_loc[friend_name]].style.filter = 'drop-shadow(2px 2px 0 #644B7A) drop-shadow(-2px -2px 0  #644B7A) drop-shadow(-2px 2px 0  #644B7A) drop-shadow(2px -2px 0  #644B7A)';
            }
            friend_icons = document.getElementById("friends_icon2");
            friend_icons.childNodes[friend_loc[friend_name]].style.filter  = 'drop-shadow(2px 2px 0 #644B7A) drop-shadow(-2px -2px 0  #644B7A) drop-shadow(-2px 2px 0  #644B7A) drop-shadow(2px -2px 0  #644B7A)';
        }
    }
    console.log(friend_filter);
    updatePostWithFriendFilter();
}

function changeCategorySelectAll() {
    document.getElementById("cat_all").src = icons.cat_all;
    document.getElementById("cat1").src = categories[1].icon;
    document.getElementById("cat2").src = categories[2].icon;
    document.getElementById("cat3").src = categories[3].icon;
    document.getElementById("cat4").src = categories[4].icon;
    document.getElementById("cat5").src = categories[5].icon;
	
	document.getElementById("cat1").title = categories[1].title;
	document.getElementById("cat2").title = categories[2].title;
	document.getElementById("cat3").title = categories[3].title;
	document.getElementById("cat4").title = categories[4].title;
	document.getElementById("cat5").title = categories[5].title;

    markers.forEach(removeMarkers);
	for(var i = 1; i <= 5; i++) {
		categories[i].selected = false;
	}
	for(var key in locations) {
		var loc = locations[key];
		if(loc.icon == categories[1].pin || loc.icon == categories[2].pin || loc.icon == categories[3].pin || loc.icon == categories[4].pin || loc.icon == categories[5].pin) {
			addMarker(loc);
		}
	}

	document.getElementById("cat_all").src = icons.cat_all_selected;

    markers.forEach(addClickListener);
}

function filterFriendSelectAll(){
    changeCategorySelectAll();
    for (var key in id_dict) {
        if (!(id_dict[key] in friend_filter)){
            friend_filter[id_dict[key]] = true;
        }
    }

    var friend_icons = document.getElementById("friends_icon");
    for (i = 0; i < friend_icons.childNodes.length/2-1; i++) {
        friend_icons.childNodes[i*2+1].style.filter = 'drop-shadow(2px 2px 0 #644B7A) drop-shadow(-2px -2px 0  #644B7A) drop-shadow(-2px 2px 0  #644B7A) drop-shadow(2px -2px 0  #644B7A)';
    }

    friend_icons = document.getElementById("friends_icon2");
    for (var i = 0; i < friend_icons.childNodes.length/2-1; i++) {
        friend_icons.childNodes[i*2+1].style.filter = 'drop-shadow(2px 2px 0 #644B7A) drop-shadow(-2px -2px 0  #644B7A) drop-shadow(-2px 2px 0  #644B7A) drop-shadow(2px -2px 0  #644B7A)';
    }

    updatePostWithFriendFilter();
}

function filterFriendUnselectAll(){
    friend_filter = {};

    var friend_icons = document.getElementById("friends_icon");
    for (i = 0; i < friend_icons.childNodes.length/2-1; i++) {
        friend_icons.childNodes[i*2+1].style.filter = '';
    }

    friend_icons = document.getElementById("friends_icon2");
    for (var i = 0; i < friend_icons.childNodes.length/2-1; i++) {
        friend_icons.childNodes[i*2+1].style.filter = '';
    }

    updatePostWithFriendFilter();
}

function friendSeeMore(){
    document.getElementById("friend_modal").style.display = "block";
}

function closeFriendModal(id){
    document.getElementById(id).style.display = "none";
}
function initializePostsOwner() {
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
    //geocoding
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


    // Bias the SearchBox results towards current map's viewport.
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
    var modal = document.getElementById("pin-modal");
    marker.addListener('click', function() {
        document.getElementById("location_name").innerHTML = marker.title;
        for(var key in locations) {
            var loc = locations[key];
            if(loc.name == marker.title) {
                document.getElementById("location_address").innerHTML = loc.address;
                document.getElementById("location_category").src = loc.category;
                document.getElementById("score").src = loc.score;
                document.getElementById("pic1").src = loc.pic1;
                document.getElementById("pic2").src = loc.pic2;
                document.getElementById("pic3").src = loc.pic3;
                document.getElementById("pic4").src = loc.pic4;
                document.getElementById("location_friends_stats").innerHTML = loc.friendsStats + " friends have been here";
                document.getElementById("post_pic1").src = loc.post1.src;
                document.getElementById("post_pic2").src = loc.post2.src;
                document.getElementById("post_owner1").innerHTML = "@" + loc.post1.name;
                document.getElementById("post_owner2").innerHTML = "@" + loc.post2.name;
                document.getElementById("price").innerHTML = loc.price;
                document.getElementById("hours").innerHTML = loc.hours;
                document.getElementById("website").href = loc.website;
                document.getElementById("phone").innerHTML = loc.phone;
                document.getElementById("user1").innerHTML = loc.user1;
                document.getElementById("user2").innerHTML = loc.user2;
                document.getElementById("review1").innerHTML = loc.review1;
                document.getElementById("review2").innerHTML = loc.review2;
                document.getElementById("review1_score").src = loc.review1_score;
                document.getElementById("review2_score").src = loc.review2_score;

                break;
            }
        }

        modal.style.display = "block";
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

function changeCategory(category, id) { //("all", "cat_all")
    document.getElementById("cat_all").src = icons.cat_all;
    document.getElementById("cat1").src = categories[1].icon;
    document.getElementById("cat2").src = categories[2].icon;
    document.getElementById("cat3").src = categories[3].icon;
    document.getElementById("cat4").src = categories[4].icon;
    document.getElementById("cat5").src = categories[5].icon;
	
	document.getElementById("cat1").title = categories[1].title;
	document.getElementById("cat2").title = categories[2].title;
	document.getElementById("cat3").title = categories[3].title;
	document.getElementById("cat4").title = categories[4].title;
	document.getElementById("cat5").title = categories[5].title;

    markers.forEach(removeMarkers);
	if(category.selected) {
		category.selected = false;
	} else {
		category.selected = true;
	}
    if(category == 'all') {
		for(var i = 1; i <= 5; i++) {
			categories[i].selected = false;
		}
        for(var key in locations) {
            var loc = locations[key];
            if(loc.icon == categories[1].pin || loc.icon == categories[2].pin || loc.icon == categories[3].pin || loc.icon == categories[4].pin || loc.icon == categories[5].pin) {
                addMarker(loc);
            }
        }
        category_filter = {};
        updatePost();
        document.getElementById(id).src = icons.cat_all_selected;
    } else {
		for(var i = 1; i <= 5; i++) {
			for(var key in locations) {
				var loc = locations[key];
				if(loc.icon === categories[i].pin) {
                    if (categories[i].selected) {
                        addMarker(loc);
                        category_filter[id_dict[loc['post1']['name']]] = true;
                        category_filter[id_dict[loc['post2']['name']]] = true;
                        document.getElementById(categories[i].id).src = categories[i].icon_selected;
                    }
                    else{
                        delete category_filter[id_dict[loc['post1']['name']]];
                        delete category_filter[id_dict[loc['post2']['name']]];
                    }
                }
			}
		}
    }
    markers.forEach(addClickListener);

    updatePostWithCategoryFilter();
}

function updatePostWithCategoryFilter(){
    // update posts
    $('#instafeed').empty();
    // set up the Instagram api
    var feed = new Instafeed({
        get: 'user',
        tagName: 'awesome',
        accessToken: '6419152996.166bd80.3f5e1392db904047832daf97129569e4',
        userId:'6419152996',
        template: '<div class="post"><p id ={{id}} class="owner"></p> <div onclick="changeStarColor(this)" class = "like_container"> <p id="star" > &#9733;</p> <p id="add" >Add to favorite</p> </div> <div class="post_content" onclick="open_post_modal(this)"> <div class="post_info"> <p>{{caption}}</p> <div id="comment_like"> <span class="likes"><i class="icon ion-heart"></i> {{likes}}</span><span class="comments"><i class="icon ion-chatbubble"></i> {{comments}}</span></div> </div> <div> <img id ="post_image" src="{{image}}" alt="" class="img-responsive"> </div> </div> </div>',
        resolution: 'standard_resolution',
        sortBy: "least-recent",
        filter: function(image){
            return image.id in category_filter
        }
    });
    feed.run();
}

function updatePostWithFriendFilter(){
    // update posts
    $('#instafeed').empty();
    // set up the Instagram api
    var feed = new Instafeed({
        get: 'user',
        tagName: 'awesome',
        accessToken: '6419152996.166bd80.3f5e1392db904047832daf97129569e4',
        userId:'6419152996',
        template: '<div class="post"><p id ={{id}} class="owner"></p> <div onclick="changeStarColor(this)" class = "like_container"> <p id="star" > &#9733;</p> <p id="add" >Add to favorite</p> </div> <div class="post_content" onclick="open_post_modal(this)"> <div class="post_info"> <p>{{caption}}</p> <div id="comment_like"> <span class="likes"><i class="icon ion-heart"></i> {{likes}}</span><span class="comments"><i class="icon ion-chatbubble"></i> {{comments}}</span></div> </div> <div> <img id ="post_image" src="{{image}}" alt="" class="img-responsive"> </div> </div> </div>',
        resolution: 'standard_resolution',
        sortBy: "least-recent",
        filter: function(image){
            return image.id in friend_filter
        }
    });
    feed.run();
}

function updatePost(){
    // update posts
    $('#instafeed').empty();
    // set up the Instagram api
    var feed = new Instafeed({
        get: 'user',
        tagName: 'awesome',
        accessToken: '6419152996.166bd80.3f5e1392db904047832daf97129569e4',
        userId:'6419152996',
        template: '<div class="post"><p id ={{id}} class="owner"></p> <div onclick="changeStarColor(this)" class = "like_container"> <p id="star" > &#9733;</p> <p id="add" >Add to favorite</p> </div> <div class="post_content" onclick="open_post_modal(this)"> <div class="post_info"> <p>{{caption}}</p> <div id="comment_like"> <span class="likes"><i class="icon ion-heart"></i> {{likes}}</span><span class="comments"><i class="icon ion-chatbubble"></i> {{comments}}</span></div> </div> <div> <img id ="post_image" src="{{image}}" alt="" class="img-responsive"> </div> </div> </div>',
        resolution: 'standard_resolution',
        sortBy: "least-recent"
    });
    feed.run();
}

function catSeeMore() {
    document.getElementById("cat_modal").style.display = "block";
}

function selectCategory(category) {
    if(!category.selected && num_selected === 5) {
        document.getElementById("cat-error").innerHTML = "Cannot select more than 5 categories.";
        document.getElementById("cat-error").style.color = "red";
    } else if(category.selected) {
        num_selected = num_selected - 1;
        category.selected = false;
        document.getElementById(category.id).src = category.icon;
    } else if(!category.selected) {
        num_selected = num_selected + 1;
        category.selected = true;
        document.getElementById(category.id).src = category.icon_check;
    }
    if(num_selected === 5) {
        for(var key in category_selection) {
            var cat = category_selection[key];
            if(!cat.selected) {
                document.getElementById(cat.id).src = cat.icon_gray;
            }
        }
    } else {
        for(var key in category_selection) {
            var cat = category_selection[key];
            if(!cat.selected) {
                document.getElementById(cat.id).src = cat.icon;
            }
        }
    }
}

function closeCatModal(id) {
    if(num_selected === 5) {
        document.getElementById("cat-error").style.color = "black";
        document.getElementById("cat-error").innerHTML = "Choose 5 categories";
        document.getElementById(id).style.display = "none";
        count = 1;
        for(var key in category_selection) {
            var cat = category_selection[key];
            if(cat.selected) {
                categories[count].icon = cat.icon;
                categories[count].icon_selected = cat.icon_selected;
                categories[count].pin = cat.pin;
				categories[count].title = cat.title;
                count++;
            }
        }
        changeCategorySelectAll();
        updatePost();
    } else {
        document.getElementById("cat-error").style.color = "red";
        document.getElementById("cat-error").innerHTML = "Choose 5 categories.";
    }
}