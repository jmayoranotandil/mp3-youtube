var items = [];

// require AdMob
var admob = require('ti.admob');

var interstitial = admob.createInterstitialAd( {
	  	adUnitId: "ca-app-pub-4925332399094667/6329894639",
	  	 //testing: true
	} );
	

//CUSTOM FUNCTION TO DEFINE WHAT HAPPENS WHEN AN ITEM IN THE GRID IS CLICKED
var showGridItemInfo = function(e){
	
	
	//
	var images = [];
	  for(var i=0; i<=9; i++) {
	    var file = '/images/ajax/'+i+'.gif';
	    images.push(file);
	  }


	var download = require('downloadMp3');
	var progresBar = Titanium.UI.createProgressBar({
		top: "10",
		width: "250",
		height: "auto",
		min: "0",
		max: "100",
		value: "0",
		color: "#fff",
		message: "Downloading 0 of 100"
	});
	
	var imageWheel = Titanium.UI.createImageView({
		image: images[2],
    	images: images,
    	duration: 100,
		//image: "/images/ajax-loader.gif",
		width: "250px",
		height: "250px"
	});	
	
	imageWheel.addEventListener('load', function(e) {
		setTimeout(function(e){
			imageWheel.images = images;
			// start animation
			imageWheel.start();
		},500);
	});
	
	var lab = Titanium.UI.createLabel({
		text: "Convirtiendo...",
		font: { fontSize:30 },
	});
	var lab2 = Titanium.UI.createLabel({
		text: "Este proceso puede llevar varios minutos",
		font: { fontSize:15 },
	});
	
	var labTitle = Titanium.UI.createLabel({
		text: e.source.data.title,
		font: { fontSize:20 },
	});
	
	
	var labFinish = Titanium.UI.createLabel({
		text: "Una vez finalizado, busca tu MP3 en la carpeta MUSIC",
		font: { fontSize:15 },
	});
	
	var infoWin = Titanium.UI.createWindow({
		title: "",
		layout: "vertical",
    	backgroundColor: '#FFFFFF',
    	top: 0,
    	left: 0,
    	opacity: 0.8,
    	width: "100%",
    	height: "100%",
    	zIndex: 999998
	});
	
	var adMobView = admob.createView( {
		  publisherId: "ca-app-pub-4925332399094667/4434359036",
		  //testing: true, // default is false
		  //top: 10, //optional
		  //left: 0, // optional
		  //right: 0, // optional
		  bottom: 0, // optional
		  adBackgroundColor: "FF8855", // optional
		  backgroundColorTop: "738000", //optional - Gradient background color at top
		  borderColor: "#000000", // optional - Border color
		  textColor: "#000000", // optional - Text color
		  urlColor: "#00FF00", // optional - URL color
		  linkColor: "#0000FF" //optional -  Link text color
		  //primaryTextColor: "blue", // deprecated -- now maps to textColor
		  //secondaryTextColor: "green" // deprecated -- now maps to linkColor

	} );
	
 	infoWin.add(progresBar);
 	infoWin.add(lab);
 	infoWin.add(lab2);
 	infoWin.add(labTitle);
	infoWin.add(imageWheel);
	infoWin.add(labFinish);
	infoWin.add(adMobView);
	infoWin.open({modal:true});	
	interstitial.displayInterstitial( );
	infoWin.addEventListener('open', function() {
		
 		//<ProgressBar id="pb" top="10" width="250" height="auto" min="0" max="100" value="0" color="#fff" message="Downloading 0 of 100" />
	
		setTimeout(function() {
    		download.downloadMp3(e.source.data.title,e.source.data.id, function(progress){
				//progresBar.show();
				var value = progress * 100;
				
				progresBar.setMessage("Downloading " + Math.floor(value) + " of 100");
				progresBar.setValue(value);
			
		}, function(e){
			progresBar.setValue(0);
			infoWin.close();
			if (e.error == 1){
				alert(e.message);
			}
			
            interstitial = admob.createInterstitialAd( {
			  	adUnitId: "ca-app-pub-4925332399094667/6329894639",
			  	 testing: true
			} );
			$.index.add( interstitial );
		});
		}, 2000);
		
	});
	

	
	
};

//INITIALIZE TIFLEXIGRID
$.fg.init({
	columns:3,
	space:4,
	gridBackgroundColor:'#fff',
	itemHeightDelta: 0,
	itemBackgroundColor:'#eee',
	itemBorderColor:'transparent',
	itemBorderWidth:0,
	itemBorderRadius:0,
	onItemClick: showGridItemInfo
});

//CUSTOM FUNCTION TO CREATE THE ITEMS FOR THE GRID
function createSampleData(data){
	
	items = [];
	
	//SOME DATA FOR A GALLERY LAYOUT SAMPLE
	var sample_data = [
		
	];
	
	if(OS_ANDROID){
		
		
		sample_data = data;
	}
	
	for (var x=0;x<sample_data.length;x++){
	
		//CREATES A VIEW WITH OUR CUSTOM LAYOUT
		var view = Alloy.createController('item_gallery',{
			title: sample_data[x].title,
			image:sample_data[x].image,
			width:$.fg.getItemWidth(),
			height:$.fg.getItemHeight(),
			times: sample_data[x].times,
		}).getView();
		
		//THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
		var values = {			
			title: sample_data[x].title,
			image: sample_data[x].image,
			url: sample_data[x].url,
			id: sample_data[x].id,
		};
		
		//NOW WE PUSH TO THE ARRAY THE VIEW AND THE DATA
		items.push({
			view: view,
			data: values
		});
	};
	
	//ADD ALL THE ITEMS TO THE GRID
	$.fg.addGridItems(items);
	
};


//this is the main app window
var win = $.index;//Titanium.UI.currentWindow;
//this creates a spinning widget we can display while the user waits

//var toolActInd = Titanium.UI.createActivityIndicator();
//this is the table we will load videos into

var tableview;
//and the data array for the table

var data = [];
//the window and webview for displaying youtube player (iOS only)

var webModal;

var webModalView;
//stores the current link being displayed in the web view

var currentLink;
//this is the network request object

var xhr2 = Ti.Network.createHTTPClient();

xhr2.onload = function()
{
	try
	{
		//the doc object holds the response structure
		
		var doc;
		
		//check whether the data coming back is in XML format or not
		//Ti.API.info("Titulo: " +this.responseText);
		var data = JSON.parse(this.responseText);
		var returnArray = [];
		for(var i=0; i<data.feed.entry.length; i++) {
		   var times = data.feed.entry[i].media$group.yt$duration.seconds.toString();
		   //alert(times);
		   //if (parseInt(times) < 3600){
			   var title = data.feed.entry[i].title.$t; // title
		       var url = data.feed.entry[i].link[0].href; // description
		       var id = data.feed.entry[i].id.$t.split('/').reverse()[0];	       
		       var t = data.feed.entry[i].media$group.media$thumbnail[0].url; // description	
		       		               
		       returnArray.push({title:title, image: t, url: url, id: id, times: times});	
		   //}
	       	       
	    }
	    createSampleData(returnArray);
		
	}
	catch(E)
	{
		//if anything bad happens, show the error to the user and log it
	
		Titanium.API.debug(E);
		Titanium.UI.createAlertDialog({title:'NY Senate', message:'No videos were found for this search.'}).show();
	
	}

};

function searchYoutube() {  
	
	var searchTerm = $.textField.value; 
	//doYouTubeSearch('',$.textField.value);
	var searchUrl = 'http://gdata.youtube.com/feeds/api/videos?' +
					'q=' + escape(searchTerm) + 
										
					'&alt=json';
					//'&orderby=duration';
	
	
	
	//use the xhr2 http client object to do an HTTP GET request to the URL
	xhr2.open("GET",searchUrl);
	xhr2.send();          
}

$.index.open();
$.index.add( interstitial );

