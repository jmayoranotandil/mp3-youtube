var items = [];

//CUSTOM FUNCTION TO DEFINE WHAT HAPPENS WHEN AN ITEM IN THE GRID IS CLICKED
var showGridItemInfo = function(e){
	
	//alert(e.source.data.title);
	//alert(e.source.data.url);
	var download = require('downloadMp3');
	download.downloadMp3(e.source.data.title,e.source.data.url, function(progress){
		$.pb.show();
		$.pb.setValue(progress);
	}, function(e){
		$.pb.setVisible(false);
	});
	//downloadMp3(e.source.data.title,e.source.data.url);
	//alert('Title is: ' + e.source.data.title + '. Image is: ' + e.source.data.image);
	//Alloy.createController('webplayer').getView().open();
	//Alloy.createWidget('ytPlayer').play('HBfpr5Ye35c');
};

//INITIALIZE TIFLEXIGRID
$.fg.init({
	columns:3,
	space:5,
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
		{title:'sample 1', image:'http://www.lorempixel.com/700/600/'},
		{title:'sample 2', image:'http://www.lorempixel.com/900/1200/'},
		{title:'sample 3', image:'http://www.lorempixel.com/400/300/'},
		{title:'sample 4', image:'http://www.lorempixel.com/600/600/'},
		{title:'sample 5', image:'http://www.lorempixel.com/400/310/'},
		{title:'sample 6', image:'http://www.lorempixel.com/410/300/'},
		{title:'sample 7', image:'http://www.lorempixel.com/500/300/'},
		{title:'sample 8', image:'http://www.lorempixel.com/300/300/'},
		{title:'sample 9', image:'http://www.lorempixel.com/450/320/'},
		{title:'sample 10', image:'http://www.lorempixel.com/523/424/'},
		{title:'sample 11', image:'http://www.lorempixel.com/610/320/'},
		{title:'sample 12', image:'http://www.lorempixel.com/450/450/'},
		{title:'sample 13', image:'http://www.lorempixel.com/620/420/'},
		{title:'sample 14', image:'http://www.lorempixel.com/710/410/'},
		{title:'sample 15', image:'http://www.lorempixel.com/500/500/'}
	];
	
	if(OS_ANDROID){
		sample_data = [
			{title:'sample 1', image:'http://static.ibnlive.in.com/ibnlive/pix/sitepix/06_2014/messi_getty_260614.jpg'},
			{title:'sample 2', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 3', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 4', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 5', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 6', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 7', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 8', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 9', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 10', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 11', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 12', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 13', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 14', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'},
			{title:'sample 15', image:'http://dummyimage.com/500x500/cccccc/999999.jpg'}
		];
		
		sample_data = data;
	}
	
	for (var x=0;x<sample_data.length;x++){
	
		//CREATES A VIEW WITH OUR CUSTOM LAYOUT
		var view = Alloy.createController('item_gallery',{
			image:sample_data[x].image,
			width:$.fg.getItemWidth(),
			height:$.fg.getItemHeight()
		}).getView();
		
		//THIS IS THE DATA THAT WE WANT AVAILABLE FOR THIS ITEM WHEN onItemClick OCCURS
		var values = {
			title: sample_data[x].title,
			image: sample_data[x].image,
			url: sample_data[x].url
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


function playYouTube (vtitle, vguid)
{
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var ytVideoSrc = "http://www.youtube.com/v/" + vguid;
		var thumbPlayer = '<html><head><style type="text/css"> body { background-color: black;color: white;} </style></head><body style="margin:0″><br/><br/><center><embed id="yt" src="' + ytVideoSrc + '" type="application/x-shockwave-flash" width="100%" height="75%"></embed></center></body></html>';
		showHTMLContent(vtitle,'http://www.youtube.com/watch?v=' + vguid,thumbPlayer);
	}
	else //on android
	{
		//this call to openURL hands off the link to the operating
		//system, and starts any player that supports youtube.com
		Titanium.Platform.openURL('http://www.youtube.com/watch?v=' + vguid);
	}
}

function showHTMLContent(wTitle, wUrl, wHTMLContent)
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

};


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
					'&alt=json' +
					'&orderby=published';
	/*http://gdata.youtube.com/feeds/api/videos?
    q=football+-soccer
    &orderby=published
    &start-index=11
    &max-results=10
    &v=2*/
	
	
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
		//alert(this.responseXML);
		Ti.API.info("Titulo: " +this.responseText);
		var data = JSON.parse(this.responseText);
		var returnArray = [];
		for(var i=0; i<data.feed.entry.length; i++) {
	       var title = data.feed.entry[i].title.$t; // title
	       var url = data.feed.entry[i].link[0].href; // description
	       var t = data.feed.entry[i].media$group.media$thumbnail[0].url; // description
	       //var t = 'http://static.ibnlive.in.com/ibnlive/pix/sitepix/06_2014/messi_getty_260614.jpg';
	       returnArray.push({title:title, image: t, url: url});
	       //Ti.API.info(data.feed.entry[i].media$thumbnail[0].url); // description
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










function downloadMp3(title,url){
	/*Ti.API.info("URL: " + 'http://youtubeinmp3.com/fetch/?video=' + url);
	get_remote_file(
    	title, 
    	'http://youtubeinmp3.com/fetch/?video=' + url, //https://www.youtube.com/watch?v=ZasFsBrUQKQ', 
    	function(fileobj) {
    		
    		alert('finalizamos de bajar el video');
	        /*Ti.API.info(fileobj.path);
	        
	        //var file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'Music','music124.mp3');
	        var file = Ti.Filesystem.getFile(Ti.Filesystem.getExternalStorageDirectory(),"Music",'music12456.mp3');
	        var player = Ti.Media.createSound({url:file.nativePath});
			player.play();*/
	  /*  }, 
    	function(progress) {
        	Ti.API.info(progress);
	});	*/
}	












function searchYoutube() {
    
	doYouTubeSearch('',$.textField.value);
    
    
    
    
}

$.index.open();


/*var get_remote_file = function(filename, url, fn_end, fn_progress) {
    var file_obj = {
        file : filename,
        url : url,
        path : null
    };
    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
    if ( file.exists() == true ) {
		file.deleteFile();
	}
    if(file.exists()) {
        file_obj.path = Titanium.Filesystem.applicationDataDirectory + Titanium.Filesystem.separator;
        alert(file_obj.path);
        fn_end(file_obj);
    } else {
 
        if(Titanium.Network.online) {
            var c = Titanium.Network.createHTTPClient();
 
            c.setTimeout(10000);
            c.onload = function() {
 
                if(c.status == 200) {
 
                    var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
                    f.write(this.responseData);
                    file_obj.path = Titanium.Filesystem.applicationDataDirectory + Titanium.Filesystem.separator;
                    
                    
                    //if ( Ti.Filesystem.isExternalStoragePresent == true ) {
					    var fromFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,filename);
					    
					    var toFile = Ti.Filesystem.getFile(Ti.Filesystem.getExternalStorageDirectory(),"Music",filename);
					    if ( toFile.exists() == true ) {
					        toFile.deleteFile();
					    }
					    toFile.write(fromFile.read());
					    //alert("escribimos");
					//}
                } else {
                    file_obj.error = 'file not found';
                    // to set some errors codes
                }
                fn_end(file_obj);
 
            };
            c.ondatastream = function(e) {
 
                if(fn_progress)
                    fn_progress(e.progress);
            };
            c.error = function(e) {
 
                file_obj.error = e.error;
                fn_end(file_obj);
            };
            c.open('GET', url);
            c.send();
        } else {
            file_obj.error = 'no internet';
            fn_end(file_obj);
        }
 
    }
};




//get_remote_file("filename.txt", "http://yoururl.com/filename.txt", callback_to_end(), callback_to_progress())
/*function get_remote_file(filename, url, fn_end, fn_progress ) {
 
 
   Ti.API.info("[filename]" + filename);
   Ti.API.info("[url]" + url);
 
    var file_obj = {file:filename, url:url, path: null};
 
    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
    if ( !file.exists() ) {
    	    
        file_obj.path = Titanium.Filesystem.applicationDataDirectory+Titanium.Filesystem.separator;
        

        
        
        //fn_end(file_obj);
        Ti.API.info("arquivo existe");
        var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
        f.write(this.responseData);
        var fcontent = f.read();
        Ti.API.info('[CONTENT] = ' + fcontent.text);
    }
    else {
 
        if ( Titanium.Network.online ) {
            var c = Titanium.Network.createHTTPClient();
 
            c.setTimeout(10000);
            c.onload = function()
            {
 
                if (c.status == 200 ) {
 
		   Ti.API.info("Ok");
 					
                    var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
                    
                    f.write(this.responseData);
                    var fcontent = f.read();
                    Ti.API.info('[CONTENT] = ' + fcontent.text);
                    file_obj.path = Titanium.Filesystem.applicationDataDirectory + Titanium.Filesystem.separator;
                    
                    
                }
 
                else {
                    file_obj.error = 'file not found'; // to set some errors codes
		    Ti.API.info("error");
                    
                }
               // fn_end(file_obj);
 
            };
            c.ondatastream = function(e)
            {
 
                if ( fn_progress ) fn_progress(e.progress);
            };
            c.error = function(e)
            {
 
                file_obj.error = e.error;
               // fn_end(file_obj);
            };
            c.open('GET',url);
            c.send();           
        }
        else {
            file_obj.error = 'no internet';
            //fn_end(file_obj);
        }
 
 
    }
};*/
 