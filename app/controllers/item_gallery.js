var args = arguments[0]||{};

var the_time = args.times || '';
var the_image = args.image || '';
var the_title = args.title || '';
var item_width = args.width || '95%';
var item_height = args.height -23 || '90%';


$.lblTitle.text = the_title.substring(0, 25);
$.lblTime.text = convertTime(the_time);
$.thumb.image = the_image;
$.thumb.width = item_width;
$.thumb.height = item_height;

$.imgContainer.width = item_width;
$.imgContainer.height = item_height;


function convertTime(time){
	

	seconds = time;
	
	minutes = seconds / 60;
	
	seconds %= 60;
	
	hours = minutes / 60;
	
	minutes %= 60;
	
	//days = hours / 24;
	
	hours %= 24;
	
	hours = Math.floor(hours);
	minutes = Math.floor(minutes).toString().length == 1 ? "0"+ Math.floor(minutes).toString() : Math.floor(minutes).toString();
	seconds = Math.floor(seconds).toString().length == 1 ? "0"+ Math.floor(seconds).toString() : Math.floor(seconds).toString();
	return hours + ":" + minutes + ":" + seconds;
}
