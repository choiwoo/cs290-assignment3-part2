//Woo Choi
//gistScript.js

function getList() {
  //clean the page if there are stuff already on it
  cleanPage();
  
  
  var req = new XMLHttpRequest();
  if(!req){
    throw 'Unable to create HttpRequest.';
  }

  //pages
  var pageNum = document.getElementById("pgSelect").value;
  //setting up page object to pass onto urlStringify
  var url = "https://api.github.com/gists/public" + '?' + pageNum;

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
 // document.getElementById("favorites").innerHTML += "<p>" + result[0].description + "<\p>";
  req.open("GET", url);
  req.send();
  
}


/** Print Function **/
//Takes in result from getList()
//Prints out a list of results from gist
//Help from Millerla
function printRes(result){
  var resultNum = result.length;
  var resultList = document.getElementById("results")
  var favList = document.getElementById("favorites")
  //favList.innerHTML += "<p>" + result[0].html_url + "<\p>";
  
  var ul;
  var btn;
  var description; 
  
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
	if (localStorage.getItem(result[i].html_url)){
	  //remove from favorite once btn clicked
	  btn.onclick = function() {
	    
	    localStorage.removeItem(this.getAttribute("address"));  
		//refresh
		printRes(result);
	  }
	} else {
	  btn.onclick = function() {
		//adds to favorite and set local storage
	    localStorage.setItem(this.getAttribute("address"), this.getAttribute("address"));
	    //refresh
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

function cleanPage(){
  var x = document.getElementById("results");
  while (x.hasChildNodes()){
    x.removeChild(x.firstChild);
  }
}