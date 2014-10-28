exports.downloadMp3 = function(title,id,progressCallback,endCallback) {
	//Ti.API.info("URL: " + '192.168.1.75/videosymfony/web/app_dev.php/youtube/' + id);
	get_remote_file(
    	title + '.mp3', 
    	
    	'http://www.theyoutubemp3.com/youtube/index/index/id/' + id,
    	//'192.168.1.75/videosymfony/web/app_dev.php/youtube/' + id,    	
    	//'http://youtubeinmp3.com/fetch/?video=' + url, //https://www.youtube.com/watch?v=ZasFsBrUQKQ', 
    	function(fileobj) {
    		
    		//alert('finalizamos de bajar el video');
    		endCallback(fileobj);
	        
	    }, 
    	function(progress) {
    		progressCallback(progress);
        	//Ti.API.info(progress);
	});	
};


var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  };
 
})();

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

var get_remote_file = function(filename, url, fn_end, fn_progress) {
	filename = replaceAll(":","-",replaceAll("\"","-",normalize(filename)));
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
        //alert(file_obj.path);
        fn_end(file_obj);
    } else {
 
        if(Titanium.Network.online) {
            var c = Titanium.Network.createHTTPClient();
 
            c.setTimeout(1000000);
            c.onload = function() {
 
                if(c.status == 200) {
 
                    var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
                    f.write(this.responseData);
                    file_obj.path = Titanium.Filesystem.applicationDataDirectory + Titanium.Filesystem.separator;
                    
                    //if (Ti.Platform.name == "android" && Ti.Filesystem.isExternalStoragePresent()) {
                    try{
                    	var mkdfs = require('dk.mikkendigital.mkdfs');
                    	
					    var fromFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,filename);
					    
					    var toFile = Ti.Filesystem.getFile('file://' + mkdfs.externalStorageDirectory + "/Music",filename);
					    
					    if ( toFile.exists() == true ) {
					        toFile.deleteFile();
					    }
					    
					    toFile.write(fromFile.read());
                    }catch(err) {
                    	file_obj.error = 1;
                    	file_obj.message = "Sorry,File not supported, please try with other";
					}	
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
 
                //file_obj.error = e.error;
                file_obj.error = 1;
                file_obj.message = "Sorry,File not supported, please try with other";
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
