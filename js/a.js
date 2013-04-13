document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('moreblocks');
    // onClick's logic below:
    link.addEventListener('click', function() {
        moreblocks();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('moreperiphs');
    // onClick's logic below:
    link.addEventListener('click', function() {
        moreperiphs();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('Drag_Canvas');
    // onClick's logic below:
    link.addEventListener('click', function() {
        drag_canvas();
    });
});
$(window).resize(function() {
	stage.setSize($(window).width()-2, $(window).height()-56);
});

var shapesLayer;
var jsontxt;
var stage;
var divClone;

window.onload = function() 
{

	//var scrollDiv = document.createElement("div");
	//scrollDiv.className = "scrollbar-measure";
	//document.body.appendChild(scrollDiv);

	// Get the scrollbar width
	//var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	//console.warn(scrollbarWidth); // Mac:  15

	// Delete the DIV 
	//document.body.removeChild(scrollDiv);
		
	divClone = $("#container").clone();

	var obj;
	stage = new Kinetic.Stage({
	  container: "container",
	  width: $(window).width()-2,
	  height: $(window).height()-56,
	});
	
	
	shapesLayer = new Kinetic.Layer();
	stage.add(shapesLayer);

	
	document.getElementById("saveimage").addEventListener("click", function() {
	  stage.toDataURL({
		callback: function(dataUrl) {
		  window.open(dataUrl);
		}
	  });
	}, false);
};



$(document).ready(function () {
	//$('#loadbutton').hide();
	//$('#main_table').css('width',$(window).width());
	//$('#main_table').css('height',$(window).height());
	var colors = colorret();
	$( "#dialog-form > #color" ).html(colors);
	
	$( "#dialog-form > #color" ).colourPicker({
	ico:    'images/jquery.colourPicker.gif',
	title:  false
	});
	
});


$(function() {
    var name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add( name ).add( email ).add( password ),
      tips = $( ".validateTips" );
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
    $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 500,
      width: 550,
      modal: true,
      buttons: {
        "Delete": function() {
			deleteborp();
			$( this ).dialog( "close" );
        },
		" ^ ": function() {
			zordermove(0);
        },
		" v ": function() {
			zordermove(1);
        },
		"Apply": function() {
			executemodal();
			$( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        allFields.val( "" ).removeClass( "ui-state-error" );
      }
    });
});


function beforemodalopen(name)
{
	//$( "#dialog-form > #type" ).val("hel");
	//var x ='dialog-form > #';
	//var y='';
	//updateb(\'#' + y +'\',$(\'#' + x +'type\').val(),$(\'#' + x +'subtype\').val(),$(\'#' + x +'manu\').val(),$(\'#' + x +'part\').val(),$(\'#' + x +'width\').val(),$(\'#' + x +'height\').val(),$(\'#' + x +'color\').val());
	var info = getblockattr(name);
	loadmodal(info,name);
	$( "#dialog-form" ).dialog( "open" );
};

function loadmodal(info,name)
{
	$( "#dialog-form > #name" ).val(name);
	$( "#dialog-form > #type" ).val(info[0]);
	$( "#dialog-form > #subtype" ).val(info[1]);
	$( "#dialog-form > #manu" ).val(info[2]);
	$( "#dialog-form > #part" ).val(info[3]);
	$( "#dialog-form > #width" ).val(info[4]);
	$( "#dialog-form > #height" ).val(info[5]);
	$( "#dialog-form > #color" ).val(info[6]);
	$( "#dialog-form > #color" ).css('background-color',info[6] );
	

	var re1='((?:[a-z][a-z]+))';	// Word 1
    var re2='(\\d+)';	// Integer Number 1

    var p = new RegExp(re1+re2,["i"]);
	var m = p.exec(name);
	
	if (m != null)
	{
		var word1=m[1];
		if (word1=='block')
		{
			$( "#dialog-form > #line" ).prop('disabled', true);
			$( "#dialog-form > #length" ).prop('disabled', true);
			$( "#dialog-form > #orient" ).prop('disabled', true);
			$( "#dialog-form > #width" ).prop('disabled', false);
			$( "#dialog-form > #height" ).prop('disabled', false);
		}
		else
		{
			$( "#dialog-form > #line" ).prop('disabled', false);
			$( "#dialog-form > #length" ).prop('disabled', false);
			$( "#dialog-form > #orient" ).prop('disabled', false);
			$( "#dialog-form > #width" ).prop('disabled', true);
			$( "#dialog-form > #height" ).prop('disabled', true);
		}
	  
	}
	
};

function executemodal()
{
	var name = $( "#dialog-form > #name" ).val();
	var x = "dialog-form > #";
	
	
	var re1='((?:[a-z][a-z]+))';	// Word 1
    var re2='(\\d+)';	// Integer Number 1

    var p = new RegExp(re1+re2,["i"]);
	var m = p.exec(name);
	
	if (m != null)
	{
		var word1=m[1];
		if (word1=='block')
		{
			updateb('#' + name,$('#' + x +'type').val(),$('#' + x +'subtype').val(),$('#' + x +'manu').val(),$('#' + x +'part').val(),$('#' + x +'width').val(),$('#' + x +'height').val(),$('#' + x +'color').val());

		}
		else
		{
			//update(\'#' + x +'\',$(\'#' + x +'type\').val(),$(\'#' + x +'subtype\').val(),$(\'#' + x +'manu\').val(),$(\'#' + x +'part\').val(),$(\'#' + x +'line\').val(),$(\'#' + x +'length\').val(),$(\'#' + x +'orient\').val(),$(\'#' + x +'color\').val());
			update('#' + name,$('#' + x +'type').val(),$('#' + x +'subtype').val(),$('#' + x +'manu').val(),$('#' + x +'part').val(),$('#' + x +'line').val(),$('#' + x +'length').val(),$('#' + x +'orient').val(),$('#' + x +'color').val());
		}
	  
	}
	
	
};

function getblockattr(box)
{
	box = '#'+box;
	var shape = shapesLayer.get(box)[0];

	
	var box = shape.get('.box')[0];
	var x=0;
	var y=0;
	x = box.getX();
	y = box.getY();
	var type = shape.get('.type')[0];
	var typetext=type.partialText;
	var subtype = shape.get('.subtype')[0];
	var subtypetext=subtype.partialText;
	var manu = shape.get('.manu')[0];
	var manutext=manu.partialText;
	var part = shape.get('.part')[0];
	var parttext=part.partialText;
	var widthint = box.getWidth();
	var heightint = box.getHeight();
	var color = box.attrs.fill;
	var info = new Array(typetext, subtypetext, manutext, parttext, widthint, heightint, color);
	return info;
	
};



function loadnewstage(txt)
{
	$("#container").replaceWith(divClone);
	shapesLayer = new Kinetic.Layer();
	stage = Kinetic.Node.create(txt, 'container');
	shapesLayer = stage.children[0];
	stage.draw();
	shapesLayer.draw();
	var numgroups=shapesLayer.children.length;
	for (var i=0;i<numgroups;i++)
	{
		addeventtogroup(i);
	}
};

function addeventtogroup(i)
{
    var name = shapesLayer.children[i].attrs.id;
	var group = shapesLayer.children[i];
    group.on("dblclick", function() {
		beforemodalopen(name);
	});
}

function drag_canvas()
{
	var stagedrag = stage.attrs.draggable;
	if (stagedrag == true)
	{
		stage.setAttrs(
		{
			draggable: false
		});
		$('#Drag_Canvas > a').text('Canvas Drag is Off');
	}
	else{
		stage.setAttrs(
		{
			draggable: true
		});
		$('#Drag_Canvas > a').text('Canvas Drag is On');
	}
}


function paintb(layer,block,stat)
{
	if (stat == 1)
	{
		block.setAttrs(
		{
			alpha:0.3,
		});
	}
	else
	{
		block.setAttrs(
		{
			alpha:1,
		});
	}
	layer.draw();
};
function savefile()
{
	
	uriContent = "data:application/octet-stream;filename=block.txt," + encodeURIComponent(jsontxt);
	newWindow=window.open(uriContent, 'block.txt');
}

function boxmake(name,str0,str1,str2,str3,shapesLayer,x,y,width,height)
{  
	var rcolor = new RColor;
	var color = rcolor.get(true, 0.3, 0.99);
	
	var group = new Kinetic.Group({
	  x: 0,
	  y: 0,
	  draggable:1,
	  id:name,
	});
	
	var box = new Kinetic.Rect({
	  x: x,
	  y: y,
	  stroke: 'black',
	  strokeWidth: 1,
	  width: width,
	  height: height,
	  cornerRadius: 10,
	  
	  shadow: {
		color: 'black',
		blur: 10,
		offset: [5, 5],
		opacity: 0.6
	  },
	  fill:color,
	  name:'box',
	});
	
	var typetext = new Kinetic.Text({
	  x: x+10,
	  y: y+10,
	  text: str0,
	  fontSize: 14,
	  fontStyle: 'bold',
	  fontFamily: 'Calibri',
	  Fill: 'black',
	  name:'type',
	});
	var subtypetext = new Kinetic.Text({
	  x: x+10,
	  y: y+26,
	  text: str1,
	  fontSize: 8,
	  fontFamily: 'Calibri',
	  Fill: 'black',
	  name:'subtype',
	});
	var manutext = new Kinetic.Text({
	  x: x+10,
	  y: y+48,
	  text: str2,
	  fontSize: 12,
	  fontFamily: 'Calibri',
	  Fill: 'black',
	  name:'manu',
	});
	var parttext = new Kinetic.Text({
	  x: x+10,
	  y: y+60,
	  text: str3,
	  fontSize: 12,
	  fontFamily: 'Calibri',
	  Fill: 'black',
	  name:'part',
	});
	
	
	group.on("mouseover touchstart", function() {
	  document.body.style.cursor = "pointer";
	  paintb(shapesLayer,box,1);
	});
	group.on("mouseout touchend", function() {
	  document.body.style.cursor = "default";
	  paintb(shapesLayer,box,0);
	});
	group.on("dblclick", function() {
		beforemodalopen(name);
	});
	
	group.add(box);
	group.add(typetext);
	group.add(subtypetext);
	group.add(manutext);
	group.add(parttext);
	shapesLayer.add(group);
};  
function periphmake(name,str0,str1,str2,str3,str4,shapesLayer,x,y,dir)
{  

	var rcolor = new RColor;
	var color = rcolor.get(true, 0.3, 0.99);
	
	var linex = 0;
	var liney = 0;
	var linestretch = 100;
	var textdir = 0;
	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	
	if (dir == 0)
	{
		x1 = x + 060;
		y1 = y - 000;
		x2 = x + 060;
		y2 = y - linestretch;
		textdir = 90;
		linex = 0;
		liney = 0;
	}
	else if (dir == 1)
	{
		x1 = x + linestretch;
		y1 = y + 060;
		x2 = x + 100 + linestretch;
		y2 = y + 060;
		textdir = 0;
		linex = 125;
		liney = 30;
	}
	else if (dir == 2)
	{
		x1 = x + 060;
		y1 = y + linestretch;
		x2 = x + 060;
		y2 = y + 100 + linestretch;
		textdir = 90;
		linex = 0;
		liney = 0;
	}
	else if (dir == 3)
	{
		x1 = x + 000;
		y1 = y + 060;
		x2 = x - linestretch;
		y2 = y + 060;
		textdir = 0;
		linex = -25;
		liney = 30;
	}
	
	var group = new Kinetic.Group({
	  x: 0,
	  y: 0,
	  draggable:1,
	  id:name,
	});
	
	var box = new Kinetic.Rect({
	  x: x,
	  y: y,
	  stroke: 'black',
	  strokeWidth: 1,
	  width: 100,
	  height: 100,
	  cornerRadius: 10,
	  
	  shadow: {
		color: 'black',
		blur: 10,
		offset: [5, 5],
		opacity: 0.6
	  },
	  fill:color,
	  name:'box',
	});
	
	var typetext = new Kinetic.Text({
	  x: x+10,
	  y: y+10,
	  text: str0,
	  fontSize: 14,
	  fontStyle: 'bold',
	  fontFamily: 'Calibri',
	  Fill: 'black',
	  name:'type',
	});
	var subtypetext = new Kinetic.Text({
	  x: x+10,
	  y: y+26,
	  text: str1,
	  fontSize: 8,
	  fontFamily: 'Calibri',
	  Fill: 'black',
	  name:'subtype',
	});
	var manutext = new Kinetic.Text({
	  x: x+10,
	  y: y+48,
	  text: str2,
	  fontSize: 12,
	  fontFamily: 'Calibri',
	  Fill: 'black',
	  name:'manu',
	});
	
	var parttext = new Kinetic.Text({
	  x: x+10,
	  y: y+60, 
	  text: str3,
	  fontSize: 12,
	  fontFamily: 'Calibri',
	  Fill: 'black',
	  name:'part',
	});
	
	var linetext = new Kinetic.Text({
	  x: x+linex,
	  y: y+liney, 
	  text: str4,
	  fontSize: 12,
	  fontFamily: 'Calibri',
	  Fill: 'black',
	  rotationDeg: textdir,
	  name:'line',
	});
	
	var line = new Kinetic.Line({
	  points: [x1, y1, x2, y2],
	  stroke: "black",
	  strokeWidth: 2,  
	  name:'orient',
	  shadow: {
		color: 'black',
		blur: 10,
		offset: [1, 1],
		opacity: 0.1
	  },
	});
	
	group.on("mouseover touchstart", function() {
	  document.body.style.cursor = "pointer";
	  paintb(shapesLayer,box,1);
	});
	group.on("mouseout touchend", function() {
	  document.body.style.cursor = "default";
	  paintb(shapesLayer,box,0);
	});
	group.on("dblclick", function() {
		beforemodalopen(name);
	});
	
	group.add(box);
	group.add(typetext);
	group.add(subtypetext);
	group.add(manutext);
	group.add(parttext);
	group.add(line);
	group.add(linetext);
	shapesLayer.add(group);
	shapesLayer.draw();
};		

function update(box,str0,str1,str2,str3,str4,length,dir,color)
{
	var shape = shapesLayer.get(box)[0];
	var box = shape.get('.box')[0];
	var x=0;
	var y=0;
	x = box.getX();
	y = box.getY();
	
	var type = shape.get('.type')[0];
	type.setAttrs(
	{
		text:str0,
	});
	var subtype = shape.get('.subtype')[0];
	subtype.setAttrs(
	{
		text:str1,
	});
	var manu = shape.get('.manu')[0];
	manu.setAttrs(
	{
		text:str2,
	});
	var part = shape.get('.part')[0];
	if (str3.length > 11)
	{
		var parttextsize = 11;
		var strtemp1 = str3.substr(0, 11);
		var strtemp2 = str3.substr(11,str3.length);
		str3 = strtemp1 + '\n' + strtemp2;
	}
	else
		var parttextsize = 12;
	part.setAttrs(
	{
		fontSize: parttextsize,
		text:str3,
	});
	
	
	
	
	var linex = 0;
	var liney = 0;
	var linestretch = parseInt(length);
	var textdir = 0;
	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	
	if (dir == 0)
	{
		x1 = x + 060;
		y1 = y - 000;
		x2 = x + 060;
		y2 = y - linestretch;
		textdir = 90;
		linex = x1 + 15;
		liney = y2 + 20;
	}
	else if (dir == 1)
	{
		x1 = x + 100;
		y1 = y + 060;
		x2 = x + 100 + linestretch;
		y2 = y + 060;
		textdir = 0;
		linex = x2 - 50;
		liney = 30;
	}
	else if (dir == 2)
	{
		x1 = x + 060;
		y1 = y + 100;
		x2 = x + 060;
		y2 = y + 100 + linestretch;
		textdir = 90;
		linex = x1 + 15;
		liney = y2 - 30;
	}
	else if (dir == 3)
	{
		x1 = x + 000;
		y1 = y + 060;
		x2 = x - linestretch;
		y2 = y + 060;
		textdir = 0;
		linex = x2+10;
		liney = y2;
	}
	
	var orient = shape.get('.orient')[0];
	orient.setAttrs(
	{
		points: [x1, y1, x2, y2],
	});
	
	var line = shape.get('.line')[0];
	line.setAttrs(
	{
		text:str4,
		x: x+linex,
		y: y+liney,
		rotationDeg: textdir,
	});
	
	box.setAttrs(
	{
		fill:color,
	});
	
	shapesLayer.draw();
};

function updateb(box,str0,str1,str2,str3,width,height,color)
{
	
	var shape = shapesLayer.get(box)[0];
	var box = shape.get('.box')[0];
	var x=0;
	var y=0;
	x = box.getX();
	y = box.getY();
	
	var type = shape.get('.type')[0];
	type.setAttrs(
	{
		text:str0,
	});
	var subtype = shape.get('.subtype')[0];
	subtype.setAttrs(
	{
		text:str1,
	});
	var manu = shape.get('.manu')[0];
	manu.setAttrs(
	{
		text:str2,
	});
	var part = shape.get('.part')[0];
	if (str3.length > 11)
	{
		var parttextsize = 11;
		var strtemp1 = str3.substr(0, 11);
		var strtemp2 = str3.substr(11,str3.length);
		str3 = strtemp1 + '\n' + strtemp2;
	}
	else
		var parttextsize = 12;
	part.setAttrs(
	{
		fontSize: parttextsize,
		text:str3,
	});
	
	var widthint = parseInt(width);
	var heightint = parseInt(height);
	
	box.setAttrs(
	{
		width:widthint,
		height:heightint,
		fill:color,
	});

	shapesLayer.draw();
};
function zordermove(upordown)
{
	var box = $( "#dialog-form > #name" ).val();
	var shape = shapesLayer.get('#'+box)[0];
	if (upordown == 0)
		shape.moveUp();
	else
		shape.moveDown();
	shapesLayer.draw();
}
function colorget(box)
{
	var str ='';
	var name = box + 'color';
	var shape = shapesLayer.get(box)[0];
	var box = shape.get('.box')[0];
	str = box.attrs.fill;
	
	$(name).val(str);
	$(name).css('background-color',str )
};
function tooglehide(box)
{
	var group = shapesLayer.get(box)[0];
	var vis = group.attrs.visible;
	if (vis == false)
		group.show();
	else
		group.hide();
	shapesLayer.draw();
}

function deleteborp()
{
	var box = $( "#dialog-form > #name" ).val();
	var group = shapesLayer.get(box)[0];
	var vis = group.attrs.visible;
	group.hide();	// Hide box
	//$(box).hide();
	
	shapesLayer.draw();
}

var count =0;
function moreperiphs()
{
	
	var htmlstr ='';
	x = 'pher'+count;
	/*
	htmlstr += '<div id=' + x + '>';
	htmlstr += '<b><div id="' + x + 'title">New Peripheral</div></b>';
	htmlstr += 'Type: <input type="text" onkeyup="$(\'#'+ x +'title\').html($(\'#'+ x +'type\').val());" id="' + x +'type"/>';
	htmlstr += 'Subtype: <input type="text" onblur="$(\'#'+ x +'title\').append(\':\' + $(\'#'+ x +'subtype\').val());" id="' + x +'subtype"/>';
	htmlstr += 'Manufacturer: <input type="text" id="' + x +'manu"/>';
	htmlstr += 'Part: <input type="text" id="' + x +'part"/>';
	htmlstr += 'Intf: <input type="text" id="' + x +'line"/>';
	htmlstr += 'Length: <select id="' + x +'length"><option value="100" selected>100</option><option value="200">200</option><option value="300">300</option><option value="400">400</option></select>';
	htmlstr += 'Orient: <select id="' + x +'orient"><option value="0">Up</option><option value="1" selected>Right</option><option value="2">Down</option><option value="3">Left</option></select>';
	var colors = colorret();
	
	htmlstr += '<select name="color" id="' + x +'color">' + colors + '</select>';
	htmlstr += '<button id="" onclick="update(\'#' + x +'\',$(\'#' + x +'type\').val(),$(\'#' + x +'subtype\').val(),$(\'#' + x +'manu\').val(),$(\'#' + x +'part\').val(),$(\'#' + x +'line\').val(),$(\'#' + x +'length\').val(),$(\'#' + x +'orient\').val(),$(\'#' + x +'color\').val());">Update</button>';
	htmlstr += '<button id="" onclick="tooglehide(\'#' + x +'\');">Toggle Vis</button>';
	htmlstr += '<button id="" onclick="deleteborp(\'#' + x +'\');">Delete</button>';
	htmlstr += '<button id="" onclick="zordermove(\'#' + x +'\',0);"> ^ </button>';
	htmlstr += '<button id="" onclick="zordermove(\'#' + x +'\',1);"> v </button>';
	htmlstr += '<div>';
	htmlloader('#New_Peripherals',htmlstr);
	colorfunc(x);
	*/
	periphmake('pher'+count,'Type','SubType','Manufacturer','Part Number','',shapesLayer,0,0,1);
	colorget('#'+x);
	
	shapesLayer.draw();
	count=count+1;
};


var bcount =0;
function moreblocks()
{
	
	var htmlstr ='';
	x = 'block'+bcount;
	/*
	htmlstr += '<div id="' + x + '">';
	htmlstr += '<b><div id="' + x + 'title">New Block</div></b>';
	htmlstr += 'Type: <input type="text" onkeyup="$(\'#'+ x +'title\').html($(\'#'+ x +'type\').val());" id="' + x +'type"/>';
	htmlstr += 'Subtype: <input type="text" onblur="$(\'#'+ x +'title\').append(\':\' + $(\'#'+ x +'subtype\').val());" id="' + x +'subtype"/>';
	htmlstr += 'Manufacturer: <input type="text" id="' + x +'manu"/>';
	htmlstr += 'Part: <input type="text" id="' + x +'part"/>';
	htmlstr += 'Width: <select id="' + x +'width"><option value="100" selected>100</option><option value="200">200</option><option value="300">300</option><option value="400">400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option><option value="800">800</option></select>';
	htmlstr += 'Height: <select id="' + x +'height"><option value="100">100</option><option value="200">200</option><option value="300">300</option><option value="400" selected>400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option><option value="800">800</option></select>';
	var colors = colorret();
	htmlstr += '<select name="color" id="' + x +'color">' + colors + '</select>';
	htmlstr += '<button id="" onclick="updateb(\'#' + x +'\',$(\'#' + x +'type\').val(),$(\'#' + x +'subtype\').val(),$(\'#' + x +'manu\').val(),$(\'#' + x +'part\').val(),$(\'#' + x +'width\').val(),$(\'#' + x +'height\').val(),$(\'#' + x +'color\').val());">Update</button>';
	htmlstr += '<button id="" onclick="tooglehide(\'#' + x +'\');">Toggle Vis</button>';
	htmlstr += '<button id="" onclick="deleteborp(\'#' + x +'\');">Delete</button>';
	htmlstr += '<button id="" onclick="zordermove(\'#' + x +'\',0);"> ^ </button>';
	htmlstr += '<button id="" onclick="zordermove(\'#' + x +'\',1);"> v </button>';
	htmlstr += '<div>';
	htmlloader('#New_Blocks',htmlstr);
	colorfunc(x);
	*/
	
	boxmake('block'+bcount,'Type','SubType','Manufacturer','Part Number',shapesLayer,0,0,100,100);
	colorget('#'+x);
	
	shapesLayer.draw();
	bcount=bcount+1;
};


function htmlloader(div,str)
{
	$(div).append(str);
}

function gwsc() 
{
	var coloropt='';
	var i=0, k=0, j=0;
	var cs = new Array('00', '33', '66', '99', 'CC', 'FF');
	var c ='';
	for(i=0; i<6; i++) {
		for(j=0; j<6; j++) {
			for(k=0; k<6; k++) {
				c += cs[i];
				c += cs[j];
				c += cs[k];
				coloropt += '<option value=\"' + c + '\">#' + c + '</option>';
				c='';
			}
		}
	}
	return coloropt;
}

function colorfunc(x)
{
	var name = '#' + x + 'color';
	$(name).colourPicker({
	ico:    'jquery.colourPicker.gif',
	title:  false
	});
}
function colorret()
{
	var str;
	str =  '' + gwsc();
	return str;
}
function parseobj(object)
{
	var rects, i = 0, j=0;
	var name,type,subtype,manu,model,width,height,color,orient,line;
	
	rects = object.children[0].children;
	for (i in rects)
	{
		if (rects[i].children.length == 5)
		{
			// Group
			name = rects[i].attrs.id;
		
		
			// object 1
			width = rects[i].children[0].attrs.width;
			height = rects[i].children[0].attrs.height;
			color = rects[i].children[0].attrs.fill;
			
			
			// object 2
			type = rects[i].children[1].attrs.text;
			
			// object 3
			subtype = rects[i].children[2].attrs.text;
			
			// object 4
			manu = rects[i].children[3].attrs.text;
			
			// object 4
			model = rects[i].children[4].attrs.text;
			
			
			var htmlstr ='';
			x = name;
			htmlstr += '<div id=' + x + '>';
			htmlstr += '<b>New Block</b></br>';
			htmlstr += 'Type: <input type="text" id="' + x +'type" value="' + type +'"/>';
			htmlstr += 'Subtype: <input type="text" id="' + x +'subtype" value="' + subtype +'"/>';
			htmlstr += 'Manufacturer: <input type="text" id="' + x +'manu" value="' + manu +'"/>';
			htmlstr += 'Part: <input type="text" id="' + x +'part" value="' + model +'"/>';
			htmlstr += 'Width: <select id="' + x +'width"><option value="100" selected>100</option><option value="200">200</option><option value="300">300</option><option value="400">400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option><option value="800">800</option></select>';
			htmlstr += 'Height: <select id="' + x +'height"><option value="100">100</option><option value="200">200</option><option value="300">300</option><option value="400" selected>400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option><option value="800">800</option></select>';
			var colors = colorret();
			htmlstr += '<select name="color" id="' + x +'color">' + colors + '</select>';
			htmlstr += '<button id="" onclick="updateb(\'#' + x +'\',$(\'#' + x +'type\').val(),$(\'#' + x +'subtype\').val(),$(\'#' + x +'manu\').val(),$(\'#' + x +'part\').val(),$(\'#' + x +'width\').val(),$(\'#' + x +'height\').val(),$(\'#' + x +'color\').val());">Update</button>';
			htmlstr += '<button id="" onclick="tooglehide(\'#' + x +'\');">Toggle Vis</button>';
			htmlstr += '<button id="" onclick="deleteborp(\'#' + x +'\');">Delete</button>';
			htmlstr += '<div>';
			htmlloader('#New_Blocks',htmlstr);
			colorfunc(x);
			colorget('#'+x);
			bcount=bcount+1;
			
		}
		else
		{
			// Group
			name = rects[i].attrs.id;
		
		
			// object 1
			width = rects[i].children[0].attrs.width;
			height = rects[i].children[0].attrs.height;
			color = rects[i].children[0].attrs.fill;
			
			
			// object 2
			type = rects[i].children[1].attrs.text;
			
			// object 3
			subtype = rects[i].children[2].attrs.text;
			
			// object 4
			manu = rects[i].children[3].attrs.text;
			
			// object 4
			model = rects[i].children[4].attrs.text;
			
			// object 5
			//orient = rects[i].children[5].attrs.;
			
			// object 6
			line = rects[i].children[6].attrs.text;
			
			var htmlstr ='';
			x = name;
			htmlstr += '<div id=' + x + '>';
			htmlstr += '<b>New Block</b></br>';
			htmlstr += 'Type: <input type="text" id="' + x +'type" value="' + type +'"/>';
			htmlstr += 'Subtype: <input type="text" id="' + x +'subtype" value="' + subtype +'"/>';
			htmlstr += 'Manufacturer: <input type="text" id="' + x +'manu" value="' + manu +'"/>';
			htmlstr += 'Part: <input type="text" id="' + x +'part" value="' + model +'"/>';
			htmlstr += 'Intf: <input type="text" id="' + x +'line" value="' + line +'"/>';
			htmlstr += 'Length: <select id="' + x +'length"><option value="100" selected>100</option><option value="200">200</option><option value="300">300</option><option value="400">400</option></select>';
			htmlstr += 'Orient: <select id="' + x +'orient"><option value="0">Up</option><option value="1" selected>Right</option><option value="2">Down</option><option value="3">Left</option></select>';
			var colors = colorret();
			htmlstr += '<select name="color" id="' + x +'color">' + colors + '</select>';
			htmlstr += '<button id="" onclick="update(\'#' + x +'\',$(\'#' + x +'type\').val(),$(\'#' + x +'subtype\').val(),$(\'#' + x +'manu\').val(),$(\'#' + x +'part\').val(),$(\'#' + x +'line\').val(),$(\'#' + x +'length\').val(),$(\'#' + x +'orient\').val(),$(\'#' + x +'color\').val());">Update</button>';
			htmlstr += '<button id="" onclick="tooglehide(\'#' + x +'\');">Toggle Vis</button>';
			htmlstr += '<button id="" onclick="deleteborp(\'#' + x +'\');">Delete</button>';
			htmlstr += '<div>';
			htmlloader('#New_Peripherals',htmlstr);
			colorfunc(x);
			colorget('#'+x);
			count=count+1;
		}
	}
	
}
	


function loadFile() 
{
	var input, file, fr;

	if (typeof window.FileReader !== 'function') {
		bodyAppend("p", "The file API isn't supported on this browser yet.");
		return;
	}

	input = document.getElementById('fileinput');
	if (!input) {
		alert('Um, couldn\'t find the fileinput element.');
	}
	else if (!input.files) {
		alert('This browser doesn\'t seem to support file inputs.');
	}
	else if (!input.files[0]) {
		alert('Please select a file before clicking Load.');
	}
	else 
	{
		file = input.files[0];
		fr = new FileReader();
		fr.onload = receivedText;
		fr.readAsText(file);
	}
	
	function receivedText() 
	{
		showResult(fr, "Text");
	}
}

function showResult(fr, label)
{
	var result;
	result = fr.result;
	$('#jsonfile').val(result);
	$('#formToSubmit').submit();
	
}

function bodyAppend(tagName, innerHTML) 
{
	var elm;
	
	elm = document.createElement(tagName);
	elm.innerHTML = innerHTML;
	document.body.appendChild(elm);
}
var bphideshow = 1;
function bptoggle()
{
	$('#New_Blocks').toggle();
	$('#New_Peripherals').toggle();
	if (bphideshow == 0)
	{
		$('#blocks_show').html('Hide B/P Config');
		bphideshow = 1;
	}
	else
	{
		$('#blocks_show').html('Show B/P Config');
		bphideshow = 0;
	}
}  

function ensureevents()
{}