//Woo Choi
//gistScript.js

/* not required... couldn't get through.
var Python = false;
var JSON = false;
var JS = false;
var SQL = false;

function langPyth(check){
	if (check.checked == true){lPython = true;}
	else {Python == false};	
}

function langJSON(check){
	if (check.checked == true){lJSON = true;}
	else {JSON == false};	
}

function langJS(check){
	if (check.checked == true){lJS = true;}
	else {JS == false};	
}

function langSQL(check){
	if (check.checked == true){lSQL = true;}
	else {SQL == false};	
}
*/


function getList() {
  //clean the page if there are stuff already on it
  //became unnecessary due to few code in the printRes(), but left it 'cause why not.
  cleanPage();
  
  
  var req = new XMLHttpRequest();
  if(!req){
    throw 'Unable to create HttpRequest.';
  }

  //pages
  var pageNum = document.getElementById("pgSelect").value;
  var fileNum
  //deciding the number of files to show on page.
  if (pageNum == 1)
    fileNum = 30;
  else if (pageNum == 2)
    fileNum = 60;
  else if (pageNum == 3)
    fileNum = 90;
  else if (pageNum == 4)
    fileNum = 120;
  else 
    fileNum = 150;
	
  //ignore
  //printing number of files requested   took it out.
  //document.getElementById("fileNumber").innerHTML += "<p>" + fileNum + "<\p>";
  
  
  //setting up url to show the # of files requested.
  var url = "https://api.github.com/gists/public?per_page=" + fileNum;

  //testing
  document.getElementById("results").innerHTML += "<p>" + "INITIALIZING :P" + "<\p>";
  req.onreadystatechange = function() {
      //readyState 4: request finished and response is ready
	  //status 200 : OK
	  if (req.readyState === 4 && req.status === 200){  
		var result = JSON.parse(req.responseText);
		printRes(result);
	  }
  }
 // document.getElementById("favorites").innerHTML += "<p>" + result[0].description + "<\p>"; //ignore
  req.open("GET", url);
  req.send();
  
}


/** Print Function **/
//Takes in result from getList()
//Prints out a list of results from gist
//Help from Millerla
function printRes(result){
  var resultNum = result.length;
  //var fileNumList = document.getElementById("fileNumber");      ignore
  var resultList = document.getElementById("results");
  var favList = document.getElementById("favorites");
  //favList.innerHTML += "<p>" + result[0].html_url + "<\p>";     ignore
  var ul;
  var btn;
  var description; 
  
 //ignore
 // for (var i= fileNumList.childNodes.length -1; i >=0; i--){
 //   fileNumList.removeChild(fileNumList.childNodes[i]);
  //}
   
  
  //refresh
  for (var i= resultList.childNodes.length -1; i >= 0; i--){
    resultList.removeChild(resultList.childNodes[i]);
  }
  for (var i= favList.childNodes.length -1; i >=0; i--){
    favList.removeChild(favList.childNodes[i]);
  }
  
  for (var i=0; i< result.length; i++){
    ul = document.createElement("ul");
	//description = document.createTextNode(result[i].description);
	description = document.createElement("a");
	description.href = result[i].html_url;
	
	//if no description, set link as LINK
	if (!result[i].description)
		description.innerHTML = "LINK";
	else
		description.innerHTML = result[i].description;

	
	btn = document.createElement("button");
	btn.innerHTML = "add/remove";
	btn.setAttribute("address", result[i].html_url);
	//if result is in local storage
	if (localStorage.getItem(result[i].html_url)){
	  //remove from favorite once btn clicked
	  btn.onclick = function() {
	    
	    localStorage.removeItem(this.getAttribute("address"));  
		//reprint 
		printRes(result);
	  }
	} else {
	  btn.onclick = function() {
		//adds to favorite and set local storage
	    localStorage.setItem(this.getAttribute("address"), this.getAttribute("address"));
	    //reprint
		printRes(result);
	  }
	}
	//append the button
	ul.appendChild(btn);
	//append the link with description
	ul.appendChild(description);
	
	//if found in local storage, print on favList, else on resultList
	
	if (localStorage.getItem(result[i].html_url))
	  favList.appendChild(ul)
	else
	  resultList.appendChild(ul);
  }
  
}
//cleaning page, decided to use something else more refined under printRes()
function cleanPage(){
  var x = document.getElementById("results");
  while (x.hasChildNodes()){
    x.removeChild(x.firstChild);
  }
}