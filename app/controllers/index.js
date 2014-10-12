var items = [];

//CUSTOM FUNCTION TO DEFINE WHAT HAPPENS WHEN AN ITEM IN THE GRID IS CLICKED
var showGridItemInfo = function(e){

	var download = require('downloadMp3');
	var progresBar = $.pb;
	download.downloadMp3(e.source.data.title,e.source.data.id, function(progress){
		progresBar.show();
		progresBar.setValue(progress * 100);
		
	}, function(e){
		progresBar.setValue(0);
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
//createSampleData();


// EXAMPLE OF HOW TO USE TIFLEXIGRID IN iOS & ANDROID
// WITH DIFFERENT LAYOUTS IN ORIENTATION CHANGES
/*Ti.Gesture.addEventListener('orientationchange', function(e){

    var orientation = e.orientation;
    var nColumn,nSpace;
    
    if(OS_ANDROID){
    	if (orientation < 1 || orientation > 4){
	    	return;
	    }
	    else if (orientation == 1){
	    	nColumn = 3;
			nSpace = 5;
	    }
	    else if (orientation == 2) {
	    	nColumn = 5;
			nSpace = 7;
	    }
    }
    else{
    	if (orientation < 1 || orientation > 4){
	    	return;
	    }
		else if (orientation == 1 || orientation == 2){
			nColumn = 3;
			nSpace = 5;
	    }
	    else if (orientation == 3 || orientation == 4) {
	    	nColumn = 5;
			nSpace = 7;
	    }
    }	
	
    $.fg.clearGrid();
    $.fg.init({
		columns:nColumn,
		space:nSpace,
		gridBackgroundColor:'#fff',
		itemHeightDelta: 0,
		itemBackgroundColor:'#eee',
		itemBorderColor:'transparent',
		itemBorderWidth:0,
		itemBorderRadius:0,
		onItemClick: showGridItemInfo
	});
    createSampleData();  
});*/






//this is the main app window
var win = $.index;//Titanium.UI.currentWindow;
//this creates a spinning widget we can display while the user waits

var toolActInd = Titanium.UI.createActivityIndicator();
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

var xhr = Ti.Network.createHTTPClient();


/*function showHTMLContent(wTitle, wUrl, wHTMLContent)
{
	//store the link for later use
	currentLink = wUrl;
	
	//create the window to hold the web view
	webModal = Ti.UI.createWindow({});
	
	//set the orientation modes for basically any which way
	webModal.orientationModes = [
		Titanium.UI.PORTRAIT,
		Titanium.UI.LANDSCAPE_LEFT,
		Titanium.UI.LANDSCAPE_RIGHT
	];
	
	//create the webview aka the embedded web browser (webkit/safari)
	webModalView = Ti.UI.createWebView();
	webModalView.scalesPageToFit = true;
	
	//add the web video to the modal window
	webModal.add(webModalView);
	
	//set the title of the window
	webModal.title = wTitle;
	
	//if you are using a tab UI in the app, this will open the window
	Titanium.UI.currentTab.open(webModal,{animated:true});
	
	//set the HTML to display to the markup passed into the function
	webModalView.html = wHTMLContent;

};*/


function doYouTubeSearch (channel, searchTerm)
{
	//first show a "loading" spinning indicator to the user
	toolActInd.message = 'Loading videos…';
	
	//win.setToolbar([toolActInd],{animated:true});
	
	toolActInd.show();
	//create the YouTube API search URL from the function parameters
	//var searchUrl = 'http://gdata.youtube.com/feeds/api/videos?alt=rss&author=' + escape(channel) + '&q=' + escape(searchTerm) + "&orderby=published&max-results=25&v=2";
	
	var searchUrl = 'http://gdata.youtube.com/feeds/api/videos?' +
					'q=' + escape(searchTerm) + 
					'&alt=json';// +
					//'&orderby=published';
	
	//use the xhr http client object to do an HTTP GET request to the URL
	xhr.open("GET",searchUrl);
	xhr.send();
}

xhr.onload = function()
{
	try
	{
		//the doc object holds the response structure
		
		var doc;
		
		//check whether the data coming back is in XML format or not
		Ti.API.info("Titulo: " +this.responseText);
		var data = JSON.parse(this.responseText);
		var returnArray = [];
		for(var i=0; i<data.feed.entry.length; i++) {
	       var title = data.feed.entry[i].title.$t; // title
	       var url = data.feed.entry[i].link[0].href; // description
	       var id = data.feed.entry[i].id.$t.split('/').reverse()[0];	       
	       var t = data.feed.entry[i].media$group.media$thumbnail[0].url; // description	
	       var times = data.feed.entry[i].media$group.yt$duration.seconds.toString();
	                
	       returnArray.push({title:title, image: t, url: url, id: id, times: times});	       
	    }
	    createSampleData(returnArray);
		
	}
	catch(E)
	{
		//if anything bad happens, show the error to the user and log it
	
		Titanium.API.debug(E);
		Titanium.UI.createAlertDialog({title:'NY Senate', message:'No videos were found for this search.'}).show();
	
	}
	
	//hide the spinning 'loading' widget
	toolActInd.hide();
	//win.setToolbar(null,{animated:true});
};

function searchYoutube() {    
	doYouTubeSearch('',$.textField.value);          
}

$.index.open();