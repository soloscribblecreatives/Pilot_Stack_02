/*Code by android developers start here*/
var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends
var currentContentNSlide ='';

//custom slides changes begins here....

//alert("++++++++++++"+custcomslideflag1+"+++++++custcomslideid+++++++"+custcomslideid1);
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&  localStorage.getItem("currentcustomslideflag") =='true'){
		var custcomslideid1=parseInt(localStorage.getItem("currentcontentcustomslideId"));
		
		//step 2:
		currentContentNSlide = currentContentId+"_"+contentName+"_"+custcomslideid1;
		//step 2 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",custcomslideid1);

	}else{
		//step 3 :
		currentContentNSlide = currentContentId+"_"+contentName+"_"+'1';
		//step 3 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",'1');
	}
	
//custom slides changes ends here....

/* currentContentNSlide = contentName+"_"+'1';
localStorage.setItem("current",currentContentNSlide);
localStorage.setItem("currentslide",'1'); */
checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {

			 if( e.touches.length == 1 ) { // one finger touch
			 	var touch = e.touches[ 0 ];
			 	startLoc = { x : touch.pageX, y : touch.pageY };
			 }

			} else if (e.type == "touchmove") {
				if( startLoc ) {
					var touch = e.touches[ 0 ];

					if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
					{
						e.preventDefault();
					}
					startLoc = null;
				}

			}
		}
		/*Code by android developers ends here*/
		$(document).ready(function(){

			var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";


	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

		$("#main_content").swipe({
	   swipeLeft:function(event, direction, distance, duration, fingerCount) {
		//step 4:-
		console.log("swipeleft"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 4 ends here

		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	  },

	  swipeRight:function(event, direction, distance, duration, fingerCount) {
		//step 5:-
		console.log("swiperight"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 5 ends here 

			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	  } ,

        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});


});


//step 6:-
function toCaptureTime(page_id){
	
	var currentSlideNo = page_id;

	var startTime = Date.now();


	var temp = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	
	if(temp == null){
		
		if (currentSlideNo!=0){



			localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo ,startTime);

			//to capture start time of slide in db format
			var startTimeInDBFormat = currentTimeInDatabaseFormat();
			//alert(startTimeInDBFormat);




			localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+currentSlideNo ,startTimeInDBFormat);
		}
}
else
{
var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
var newTime = Date.now();
var newSlideTime = (newTime - existingTime);
var endTimeInDBFormat = currentTimeInDatabaseFormat();
var EndTimeNext = localStorage.getItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
console.log("++++++++EndTimeNext++++++++"+EndTimeNext+"++++++currentContentId+++"+currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
if(EndTimeNext == null){
localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );

localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);
}

if (typeof(localStorage.getItem('currentslide'))!='undefined' && localStorage.getItem('currentslide')!='' && localStorage.getItem('currentslide')>= currentSlideNo){


	var nextSlideNo = currentSlideNo;

}else{

	var nextSlideNo = currentSlideNo + 1 ;
	
 } 
	if(nextSlideNo <= 1){//number 3 is number of total slides present
	// alert(nextSlideNo);
	var tempNext = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo);

		if(tempNext == null){
			
			if (nextSlideNo!=0)	{
				var nextSlideStartTime =  Date.now();
				localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo ,nextSlideStartTime);
				localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+nextSlideNo ,0);
				//to capture start time of next slide in db format
				var startTimeNextInDBFormat = currentTimeInDatabaseFormat();
				localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+nextSlideNo ,startTimeNextInDBFormat);
			}
		}
	}
}


}
//step 6 ends here ..


function go_nav(direction) {

	
//custom slide changes continues here....
	
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&   localStorage.getItem("currentcustomslideflag") =='true'){

				var custcomslideid=parseInt(localStorage.getItem("currentcontentcustomslideId"));
			
				var page_id =  custcomslideid;
		}else{
			
				var page_id =  parseInt($("#wrapper").attr("rel"));
		}	
		
//custom slide changes ends here....

	//step 7:-
	//toCaptureTime(page_id);
	console.log("swipeleft"+localStorage.getItem("currentslide"));
	localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
	//step 7 ends here 
//localStorage.setItem(contentName+"_slideNo_"+currentSlideNo ,n);
var flag=0;
if(direction == 'b') {

//custom slide changes continues here....

		//alert("+++++bhitor reee +++++++"+custcomslideflag+"+++++++custcomslideid+++++++"+custcomslideid);
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&    localStorage.getItem("currentcustomslideflag") =='true'){
		flag==0
		localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
		window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));


	}else{
	if(page_id == 1){
	localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
	window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));


}else{
	localStorage.setItem("gotoNextPrevBrand" ,0);//if one than next if 2 than prev
}
}
	
//custom slide changes ends here....
}else {
	
//custom slide changes continues here....

	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' && localStorage.getItem("currentcustomslideflag") =='true'){
		flag==0
		localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev

		window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
	}
	
//custom slide changes ends here....
else{
	if(page_id == 1){
	 localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
	 window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
}else{



	localStorage.setItem("gotoNextPrevBrand" ,0);//if one than next if 2 than prev
}
	}
}

//step 8:

currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
//step 8 ends here
localStorage.setItem("current",currentContentNSlide);
localStorage.setItem("currentslide",page_id);

$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
		
	}
	 checkClickThrough();
}

function set_pg_content(pg_id){
//alert("++++++++++set_pg_content++++++++++"+pg_id);
	//step 9:
	if (typeof(localStorage.getItem("previousslide"))!='undefined'){
		//to checked previous slide has god end time...
		var previousslideid=localStorage.getItem("previousslide");
		toCaptureTime(previousslideid);
		
	}
	toCaptureTime(pg_id);
	//step 9 ends here..
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1" onclick="s1()"><img src="slide1/s1.png" width="1024" height="768" alt=""/></div><div class="s2"><img src="slide1/s2.png"/></div><div class="s3"><img src="slide1/s3.png"/></div><div class="s4"><img src="slide1/s4.png"/></div><div class="s5"><img src="slide1/s5.png"/></div><div class="s6" onclick="s6()"><img src="slide1/s6.png"/></div><div class="s7" onclick="s7()"><img src="slide1/s7.png"/></div><div class="s8" onclick="s8()"><img src="slide1/s8.png"/></div><div class="s9" onclick="s9()"><img src="slide1/s9.png"/></div><div class="s2s" onclick="s2()"></div><div class="s3s" onclick="s3()"></div><div class="s4s" onclick="s4()"></div><div class="s5s" onclick="s5()"></div><div class="s10"><img src="slide1/s10.png"/></div><div class="s11"><img src="slide1/s11.png"/></div><div class="s12"><img src="slide1/s12.png"/></div><audio source id="pick" src="slide1/pick.mp3" type="audio/mpeg"></audio><audio source id="pair" src="slide1/pair.mp3" type="audio/mpeg"></audio><audio source id="success" src="slide1/success.mp3" type="audio/mpeg"></audio><audio source id="match" src="slide1/match.mp3" type="audio/mpeg"></audio><audio source id="end" src="slide1/end.mp3" type="audio/mpeg"></audio>';
	break;

}

return content;

}

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
   document.getElementById('welcomeDiv2').style.display = "block";
}

function open_page(url,page_id){
	 // alert(page_id);
	//step 10:
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		//to checked previous slide has god end time...
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);	
	}
	
	// toCaptureTime(page_id);
	 localStorage.setItem("currentslide",page_id);
	 currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	 localStorage.setItem("current",currentContentNSlide);
	//step 10 ends here

	 $("#wrapper").attr("rel",page_id);
	 var content="";
	 var pg_content = set_pg_content(page_id);

	 	$("#main_content").html(pg_content);

	 if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
	 }
	  checkClickThrough();
	}

	function checkClickThrough(){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';

	if(currentslide == 1){
	document.getElementById("click_through").innerHTML='';
		}
    if(currentslide == 2){
	document.getElementById("click_through").innerHTML='';
		}
	}

	function checkBtns(refNum){
		switch(refNum){
			case 1:
			open_page('',1);
            break;
		}
	}

	function currentSlide(){
		var curr_id =  parseInt($("#wrapper").attr("rel"));
		$(".slides").removeClass("active");
		$(".slides:nth-child("+curr_id+")").addClass("active");
	}

	var ln = 0;
	function myconsole(msg){

		var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
		ln++
		$("#myconsole").html(msg+oldMsg);
	}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
		month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

// new js

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})

/*--------------------- animation javascript -----------------------*/

function s2() {
	document.getElementById("pick").play();
	setTimeout(function(){show();}, 1200);  //time 1200 is set higher as "s6s2 etc and no" classes are added at 1000
	//settimout is important to call the show function as it triggers "function s6()" again after other events are executed
	$(".s2").addClass("yes");
	$(".s3,.s4,.s5").removeClass("yes");
	
	if ($(".s2").hasClass("no")){
		$(".s2").removeClass("yes");
	}
	
	if ($(".s2").hasClass("yes") && $(".s6").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s6").addClass("s6s2");
			$(".s2").addClass("no");
			$(".s3s,.s4s,.s5s").css("display","block");
			$(".s2s").css("display","none");
			$(".s2,.s6").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s2").hasClass("yes") && $(".s7").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s7").addClass("s7s2");
			$(".s2").addClass("no");
			$(".s3s,.s4s,.s5s").css("display","block");
			$(".s2s").css("display","none");
			$(".s2,.s7").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s2").hasClass("yes") && $(".s8").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s8").addClass("s8s2");
			$(".s2").addClass("no");
			$(".s3s,.s4s,.s5s").css("display","block");
			$(".s2s").css("display","none");
			$(".s2,.s8").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s2").hasClass("yes") && $(".s9").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s9").addClass("s9s2");
			$(".s2").addClass("no");
			$(".s3s,.s4s,.s5s").css("display","block");
			$(".s2s").css("display","none");
			$(".s2, .s9").removeClass("yes");
		}, 1000);
	}
}

function s3() {
	document.getElementById("pick").play();
	setTimeout(function(){show();}, 1200);  //time 1200 is set higher as "s6s3 etc and no" classes are added at 1000
	//settimout is important to call the show function as it triggers "function s6()" again after other events are executed
	$(".s3").addClass("yes");
	$(".s2,.s4,.s5").removeClass("yes");
	
	if ($(".s3").hasClass("no")){
		$(".s3").removeClass("yes");
	}
	
	if ($(".s3").hasClass("yes") && $(".s6").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s6").addClass("s6s3");
			$(".s3").addClass("no");
			$(".s2s,.s4s,.s5s").css("display","block");
			$(".s3s").css("display","none");
			$(".s3, .s6").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s3").hasClass("yes") && $(".s7").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s7").addClass("s7s3");
			$(".s3").addClass("no");
			$(".s2s,.s4s,.s5s").css("display","block");
			$(".s3s").css("display","none");
			$(".s3, .s7").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s3").hasClass("yes") && $(".s8").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s8").addClass("s8s3");
			$(".s3").addClass("no");
			$(".s2s,.s4s,.s5s").css("display","block");
			$(".s3s").css("display","none");
			$(".s3, .s8").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s3").hasClass("yes") && $(".s9").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s9").addClass("s9s3");
			$(".s2s,.s4s,.s5s").css("display","block");
			$(".s3s").css("display","none");
			$(".s3, .s9").removeClass("yes");
		}, 1000);
	}
}

function s4() {
	document.getElementById("pick").play();
	setTimeout(function(){show();}, 1200);  //time 1200 is set higher as "s6s4 etc and no" classes are added at 1000
	//settimout is important to call the show function as it triggers "function s6()" again after other events are executed
	$(".s4").addClass("yes");
	$(".s3,.s2,.s5").removeClass("yes");
	
	if ($(".s4").hasClass("no")){
		$(".s4").removeClass("yes");
	}
	
	if ($(".s4").hasClass("yes") && $(".s6").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s6").addClass("s6s4");
			$(".s4").addClass("no");
			$(".s2s,.s3s,.s5s").css("display","block");
			$(".s4s").css("display","none");
			$(".s4, .s6").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s4").hasClass("yes") && $(".s7").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s7").addClass("s7s4");
			$(".s4").addClass("no");
			$(".s2s,.s3s,.s5s").css("display","block");
			$(".s4s").css("display","none");
			$(".s4, .s7").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s4").hasClass("yes") && $(".s8").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s8").addClass("s8s4");
			$(".s4").addClass("no");
			$(".s2s,.s3s,.s5s").css("display","block");
			$(".s4s").css("display","none");
			$(".s4, .s8").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s4").hasClass("yes") && $(".s9").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s9").addClass("s9s4");
			$(".s4").addClass("no");
			$(".s2s,.s3s,.s5s").css("display","block");
			$(".s4s").css("display","none");
			$(".s4, .s9").removeClass("yes");
		}, 1000);
	}
}

function s5() {
	document.getElementById("pick").play();
	setTimeout(function(){show();}, 1200);  //time 1200 is set higher as "s6s5 etc and no" classes are added at 1000
	//settimout is important to call the show function as it triggers "function s6()" again after other events are executed
	$(".s5").addClass("yes");
	$(".s3,.s4,.s2").removeClass("yes");
	
	if ($(".s5").hasClass("no")){
		$(".s5").removeClass("yes");
	}
	
	if ($(".s5").hasClass("yes") && $(".s6").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s6").addClass("s6s5");
			$(".s5").addClass("no");
			$(".s2s,.s4s,.s3s").css("display","block");
			$(".s5s").css("display","none");
			$(".s5, .s6").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s5").hasClass("yes") && $(".s7").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s7").addClass("s7s5");
			$(".s5").addClass("no");
			$(".s2s,.s4s,.s3s").css("display","block");
			$(".s5s").css("display","none");
			$(".s5, .s7").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s5").hasClass("yes") && $(".s8").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s8").addClass("s8s5");
			$(".s5").addClass("no");
			$(".s2s,.s4s,.s3s").css("display","block");
			$(".s5s").css("display","none");
			$(".s5, .s8").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s5").hasClass("yes") && $(".s9").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s9").addClass("s9s5");
			$(".s5").addClass("no");
			$(".s2s,.s4s,.s3s").css("display","block");
			$(".s5s").css("display","none");
			$(".s5, .s9").removeClass("yes");
		}, 1000);
	}
}

function s6() {
	document.getElementById("pick").play();
	setTimeout(function(){show();}, 1200);  //time 1200 is set higher as "s6s2 etc and no" classes are added at 1000
	//settimout is important to call the show function as it triggers "function s6()" again after other events are executed
	$(".s6").addClass("yes");
	$(".s7,.s8,.s9").removeClass("yes");
	
	if ($(".s6").hasClass("s6s2") || $(".s6").hasClass("s6s3") || $(".s6").hasClass("s6s4") || $(".s6").hasClass("s6s5")){
		$(".s6").removeClass("yes");
	}
	
	if ($(".s2").hasClass("yes") && $(".s6").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s6").addClass("s6s2");
			$(".s2").addClass("no");
			$(".s3s,.s4s,.s5s").css("display","block");
			$(".s2s").css("display","none");
			$(".s2,.s6").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s3").hasClass("yes") && $(".s6").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s6").addClass("s6s3");
			$(".s3").addClass("no");
			$(".s2s,.s4s,.s5s").css("display","block");
			$(".s3s").css("display","none");
			$(".s3,.s6").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s4").hasClass("yes") && $(".s6").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s6").addClass("s6s4");
			$(".s4").addClass("no");
			$(".s3s,.s2s,.s5s").css("display","block");
			$(".s4s").css("display","none");
			$(".s4,.s6").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s5").hasClass("yes") && $(".s6").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s6").addClass("s6s5");
			$(".s5").addClass("no");
			$(".s3s,.s4s,.s2s").css("display","block");
			$(".s5s").css("display","none");
			$(".s5,.s6").removeClass("yes");
		}, 1000);
	}
}

function s7() {
	document.getElementById("pick").play();
	setTimeout(function(){show();}, 1200);  //time 1200 is set higher as "s7s2 etc and no" classes are added at 1000
	//settimout is important to call the show function as it triggers "function s6()" again after other events are executed
	$(".s7").addClass("yes");
	$(".s6,.s8,.s9").removeClass("yes");
	
	if ($(".s7").hasClass("s7s2") || $(".s7").hasClass("s7s3") || $(".s7").hasClass("s7s4") || $(".s7").hasClass("s7s5")){
		$(".s7").removeClass("yes");
	}
	
	if ($(".s2").hasClass("yes") && $(".s7").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s7").addClass("s7s2");
			$(".s2").addClass("no");
			$(".s3s,.s4s,.s5s").css("display","block");
			$(".s2s").css("display","none");
			$(".s2,.s7").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s3").hasClass("yes") && $(".s7").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s7").addClass("s7s3");
			$(".s3").addClass("no");
			$(".s2s,.s4s,.s5s").css("display","block");
			$(".s3s").css("display","none");
			$(".s3,.s7").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s4").hasClass("yes") && $(".s7").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s7").addClass("s7s4");
			$(".s4").addClass("no");
			$(".s3s,.s2s,.s5s").css("display","block");
			$(".s4s").css("display","none");
			$(".s4,.s7").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s5").hasClass("yes") && $(".s7").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s7").addClass("s7s5");
			$(".s5").addClass("no");
			$(".s3s,.s4s,.s2s").css("display","block");
			$(".s5s").css("display","none");
			$(".s5,.s7").removeClass("yes");
		}, 1000);
	}
}

function s8() {
	document.getElementById("pick").play();
	setTimeout(function(){show();}, 1200);  //time 1200 is set higher as "s8s2 etc and no" classes are added at 1000
	//settimout is important to call the show function as it triggers "function s6()" again after other events are executed
	$(".s8").addClass("yes");
	$(".s6,.s7,.s9").removeClass("yes");
	
	if ($(".s8").hasClass("s8s2") || $(".s8").hasClass("s8s3") || $(".s8").hasClass("s8s4") || $(".s8").hasClass("s8s5")){
		$(".s8").removeClass("yes");
	}
	
	if ($(".s2").hasClass("yes") && $(".s8").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s8").addClass("s8s2");
			$(".s2").addClass("no");
			$(".s3s,.s4s,.s5s").css("display","block");
			$(".s2s").css("display","none");
			$(".s2,.s8").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s3").hasClass("yes") && $(".s8").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s8").addClass("s8s3");
			$(".s3").addClass("no");
			$(".s2s,.s4s,.s5s").css("display","block");
			$(".s3s").css("display","none");
			$(".s3,.s8").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s4").hasClass("yes") && $(".s8").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s8").addClass("s8s4");
			$(".s4").addClass("no");
			$(".s3s,.s2s,.s5s").css("display","block");
			$(".s4s").css("display","none");
			$(".s4,.s8").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s5").hasClass("yes") && $(".s8").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s8").addClass("s8s5");
			$(".s5").addClass("no");
			$(".s3s,.s4s,.s2s").css("display","block");
			$(".s5s").css("display","none");
			$(".s5,.s8").removeClass("yes");
		}, 1000);
	}
}

function s9() {
	document.getElementById("pick").play();
	setTimeout(function(){show();}, 1200);  //time 1200 is set higher as "s9s2 etc and no" classes are added at 1000
	//settimout is important to call the show function as it triggers "function s6()" again after other events are executed
	$(".s9").addClass("yes");
	$(".s6,.s7,.s8").removeClass("yes");
	
	if ($(".s9").hasClass("s9s2") || $(".s9").hasClass("s9s3") || $(".s9").hasClass("s9s4") || $(".s9").hasClass("s9s5")){
		$(".s9").removeClass("yes");
	}
	
	if ($(".s2").hasClass("yes") && $(".s9").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s9").addClass("s9s2");
			$(".s2").addClass("no");
			$(".s3s,.s4s,.s5s").css("display","block");
			$(".s2s").css("display","none");
			$(".s2,.s9").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s3").hasClass("yes") && $(".s9").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s9").addClass("s9s3");
			$(".s3").addClass("no");
			$(".s2s,.s4s,.s5s").css("display","block");
			$(".s3s").css("display","none");
			$(".s3, .s9").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s4").hasClass("yes") && $(".s9").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s9").addClass("s9s4");
			$(".s4").addClass("no");
			$(".s3s,.s2s,.s5s").css("display","block");
			$(".s4s").css("display","none");
			$(".s4, .s9").removeClass("yes");
		}, 1000);
	}
	
	else if ($(".s5").hasClass("yes") && $(".s9").hasClass("yes")){
		setTimeout(function(){
			document.getElementById("pair").play();
			$(".s9").addClass("s9s5");
			$(".s5").addClass("no");
			$(".s3s,.s4s,.s2s").css("display","block");
			$(".s5s").css("display","none");
			$(".s5, .s9").removeClass("yes");
		}, 1000);
	}
}



function show() {
	if (($(".s6").hasClass("s6s2") || $(".s6").hasClass("s6s3") || $(".s6").hasClass("s6s4") || $(".s6").hasClass("s6s5")) && ($(".s7").hasClass("s7s2") || $(".s7").hasClass("s7s3") || $(".s7").hasClass("s7s4") || $(".s7").hasClass("s7s5")) && ($(".s8").hasClass("s8s2") || $(".s8").hasClass("s8s3") || $(".s8").hasClass("s8s4") || $(".s8").hasClass("s8s5")) && ($(".s9").hasClass("s9s2") || $(".s9").hasClass("s9s3") || $(".s9").hasClass("s9s4") || $(".s9").hasClass("s9s5"))){
		console.log("condition successful");
		setTimeout(function(){
			document.getElementById("success").play();
			$(".s10,.s11").css("display","block");
		}, 1000);
		setTimeout(function(){
			document.getElementById("match").play();
			$(".s10,.s11").css("display","none");
			$(".s6").removeClass("s6s3 s6s4 s6s5");
			$(".s7").removeClass("s7s2 s7s4 s7s5");
			$(".s8").removeClass("s8s2 s8s3 s8s5");
			$(".s9").removeClass("s9s2 s9s3 s9s4");
			$(".s6").animate({'top' : '52px','left' : '620px',},1000);
			$(".s7").animate({'top' : '165px','left' : '620px',},1000);
			$(".s8").animate({'top' : '278px','left' : '620px',},1000);
			$(".s9").animate({'top' : '391px','left' : '620px',},1000);
		}, 5000);	
		setTimeout(function(){
			$(".s12").css("display","block");
			setTimeout(function(){document.getElementById("end").play();}, 1000)
		}, 6500);
	}
}