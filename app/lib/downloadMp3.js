exports.downloadMp3 = function(title,id,progressCallback,endCallback) {
	Ti.API.info("URL: " + '192.168.1.75/videosymfony/web/app_dev.php/youtube/' + id);
	get_remote_file(
    	title + '.mp3', 
    	//'jmayoranotandil.ddns.net/videosymfony/videos/index.php?url=' + url,
    	'192.168.1.75/videosymfony/web/app_dev.php/youtube/' + id,    	
    	//'http://youtubeinmp3.com/fetch/?video=' + url, //https://www.youtube.com/watch?v=ZasFsBrUQKQ', 
    	function(fileobj) {
    		
    		alert('finalizamos de bajar el video');
    		endCallback(fileobj);
	        
	    }, 
    	function(progress) {
    		progressCallback(progress);
        	//Ti.API.info(progress);
	});	
};

var get_remote_file = function(filename, url, fn_end, fn_progress) {
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
 
            c.setTimeout(100000);
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
