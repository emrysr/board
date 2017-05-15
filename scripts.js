$(function(){
	$('#input1,#input2').keyup(function(){
		input1 = $('#input1').val().toLowerCase().split('').filter(function(v){return v!==' '});
		input2 = $('#input2').val().toLowerCase().split('').filter(function(v){return v!==' '});
		remove = getLettersToRemove(input1,input2);
    add = getLettersToAdd(input1,input2);
    $('#output1').text(add.join());
    $('#output2').text(remove.join());
	});
  function countOccurance(letter,text){
    var re = new RegExp(letter, 'g');
    text.match(re);
    ("str1,str2,str3,str4".match(/,/g) || []).length
  }
  function getLettersToRemove(input1,input2){
    $.grep(input2, function(el) {
      output = [];
      if (jQuery.inArray(el, input1) == -1){
        output.push(el);
      }
    });
    return output;
  }
  function getLettersToAdd(input1,input2){
    letters=$.merge(input1,input2);
    return letters;
  }
  $('#loadFeed2').on('click',function(e){
    getShows2();
    e.preventDefault();
  });
  $('#loadFeed').on('click',function(e){
    getShows2();
    e.preventDefault();
  });
  
  
  
  initLetters();
  textAnimation = setInterval(function(){
    animateTitle();
  },10000);
  
  function initLetters(){
    $.each($('.letter-board'),function(){
        $title = $(this);
        text = $.trim($title.text());
        newtext = "";
        $.each(text.split(''),function(i,v){
            className=Math.round(Math.random())==1?'flip':'';
            newtext+="<span class='"+className+"'>"+v+"</span>";
        })
        $title.html(newtext);
    });    
  }
  function animateTitle(){
    $title = $('.letter-board');
    $.each($title.find('span'),function(i,v){
       Math.round(Math.random())==1?$(this).toggleClass('flip'):'';
    })
  }
  
});



var camera = document.getElementById('camera');
var image = document.getElementById('frame');
var input1 = document.getElementById('input1');
var myInterval;
var count = 0;
camera.addEventListener('change', function(e) {
  var file = e.target.files[0]; 
  // Do something with the image file.
  blob = URL.createObjectURL(file);
  image.src = blob;
  image.parentNode.href=image.src;
  showImage();
  showLoader("Reading Image...");
  input1.value = '';
  /*OCRAD(image, {filter:['number','letters','same_height']}, function(text){
    //text = text.replace(/[\-\_\,\;\:]/g, '');
    //text = text.replace(/\W\W/g,'');
    message = "";
    if (text.length>0){
      document.getElementById('input1').value=text;
    }else{
      message = "Not found";
    }
    hideImage();
    hideLoader(message);
  });
  */
  setTimeout(function(){
    document.getElementById('input1').value=OCRAD(image,{filter:'alpha'});
    hideImage();
    hideLoader();
  },800);
});

function showLoader(text){
  output = !text?'':text;
  document.getElementById('loader').innerHTML = output;
}
function hideLoader(text){
  output = !text?'':text;
  document.getElementById('loader').innerHTML = output;
}
function hideImage(){
  console.log(document.getElementById('frame').classList);
  document.getElementById('frame').classList.add('small');
}
function showImage(){
  document.getElementById('frame').classList.remove('small');
}

/*
  var player = document.getElementById('player');

  var handleSuccess = function(stream) {
    player.srcObject = stream;
  };

  navigator.mediaDevices.getUserMedia({video: true})
      .then(handleSuccess);
*/
function getShows(){
  $.ajax({
    type: "GET",
    dataType: 'xml',
    url: "https://cellb.ticketsolve.com/shows.xml",
    url: "https://codepen.io/emrys/pen/pPVZLV.html",
    contentType: "application/xhtml+xml",
    crossDomain: true,
    cors: true,
    error: function(xhr,status,error){
      alert(status,error);
    },
    success: function (xml) {
      alert('success');
      // Parse the xml file and get data
      var xmlDoc = $.parseXML(xml),
          $xml = $(xmlDoc);
      $xml.find('venue shows show').each(function () {
        $("#titles").append($(this).text() + "<br />");
      });
    }
  });
  e.preventDefault();
    //return false;
}
function getShows2(){
var xhrObject = new XMLHttpRequest();

xhrObject.onreadystatechange = function() {
  if (xhrObject.readyState === 4) {
    if (xhrObject.status === 200 || xhrObject.status === 304) {
      // Success! Do stuff with data.
      var oParser = new DOMParser();
      var xml = oParser.parseFromString(xhrObject.responseText, "text/xml");
      venues = xml.getElementsByTagName("venue");
      console.log(xml);
    }
  }
};

xhrObject.open(
  "GET", 
  "https://codepen.io/emrys/pen/pPVZLV.html", 
  true
);
xhrObject.send();
}