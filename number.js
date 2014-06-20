var postnumber = document.getElementById('postnumber')
var address;
var eki;
var point_x;
var point_y;
var search;
var result;
var e = document.getElementById('place');

function func1(json) {
	if(json.response.error){
	address = "正しい郵便番号を入力してください。";
	point_x = "正しい郵便番号を入力してください。";
	point_y = "正しい郵便番号を入力してください。";
	search = 0;}
	else{
 　address = json.response.location[0].prefecture + json.response.location[0].city + json.response.location[0].town;
   point_x = json.response.location[0].x;
   point_y = json.response.location[0].y;
   search = json.response.location[0].prefecture + json.response.location[0].city}
   var q = document.createElement("script");
      q.setAttribute("src","http://search.yahooapis.jp/BlogSearchService/V1/blogSearch?appid=dj0zaiZpPVh1QTE1aWRrY2k2SyZkPVlXazlRMnAwZFVKUk5uVW1jR285TUEtLSZzPWNvbnN1bWVyc2VjcmV0Jng9N2Y-&query="+ search +"&output=json&callback=func3")
	 e.appendChild(q);
	}
	
function func2(json) {
	 if (json.response.error){
		eki = "最寄り駅がありません。"}
		else{
  eki = json.response.station[0].line+json.response.station[0].name + "駅"}
   }
   
function func3(json){
	if (search == 0){result = "正しい郵便番号を入力してください"}
	else {
	result =json.Result[0].Title + "(" +json.Result[0].RssUrl + ")<br>内容；" +json.Result[0].Description}
	}
   
   function getFrompostnumber() {
  var o = document.createElement("script");
      o.setAttribute("src","http://geoapi.heartrails.com/api/json?method=searchByPostal&postal="+postnumber.value+"&jsonp=func1")
	  e.appendChild(o);
  var p = document.createElement("script");
      p.setAttribute("src","http://geoapi.heartrails.com/api/json?method=getStations&postal="+postnumber.value+"&jsonp=func2")
	  e.appendChild(p);
	   setTimeout(
	  function write(){
   e.innerHTML = "";
	e.innerHTML +="場所：" + address + "<br>" + "最寄り駅：" + eki + "<br>" + "経度：" + point_x + "<br>" + "緯度：" + point_y + "<br>" + "ブログ：" + result + "<br>";//JSONの結果を書く
	
	var latlng = new google.maps.LatLng(point_y,point_x);
	var myOptions = {
	zoom: 17,
	center: latlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),
	myOptions);
	},1000);
	 }

</script>
