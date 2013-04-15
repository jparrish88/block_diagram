document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('moreblocks');
    // onClick's logic below:
    link.addEventListener('click', function() {
        moreboxes(0);
		//getpdf();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('moreperiphs');
    // onClick's logic below:
    link.addEventListener('click', function() {
        moreboxes(1);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('Drag_Canvas');
    // onClick's logic below:
    link.addEventListener('click', function() {
        drag_canvas();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('closewindow');
    // onClick's logic below:
    link.addEventListener('click', function() {
        window.close();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('maxwindow');
    // onClick's logic below:
    link.addEventListener('click', function() {
		$("#maxwindow").hide();
		$("#reswindow").show();
        window.moveTo(0,0);
		window.resizeTo(screen.availWidth,screen.availHeight);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('reswindow');
    // onClick's logic below:
    link.addEventListener('click', function() {
		$("#reswindow").hide();
		$("#maxwindow").show();
		window.resizeTo(1024,768);
		window.moveTo(screen.availWidth/2-512,screen.availHeight/2-384);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('savejpg');
    // onClick's logic below:
    link.addEventListener('click', function() {
        var blobit = getAsJPEGBlob(shapesLayer);
		saveFileJPG(blobit);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('saveimage');
    // onClick's logic below:
    link.addEventListener('click', function() {
        stage.toDataURL({
		callback: function(dataUrl) {
		  window.open(dataUrl);
		}
		});
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('cssmenu');
    // onClick's logic below:
    link.addEventListener('mousedown',function(evt){
		// Record where the window started
		
		var winX = window.top.screenX,
			winY = window.top.screenY;

		// Record where the mouse started
		var mX = evt.clientX,
			mY = evt.clientY;

		// When moving anywhere on the page, drag the window
		// …until the mouse button comes up
		document.body.addEventListener('mousemove',drag,false);
		document.body.addEventListener('mouseup',function(){
		  document.body.removeEventListener('mousemove',drag,false);
		},false);

		// Every time the mouse moves, we do the following 
		function drag(evt){
		  // Add difference between where the mouse is now
		  // versus where it was last to the original positions
		  X2 = winX + evt.clientX-mX;
		  Y2 = winY + evt.clientY-mY;
		  window.moveTo(X2,Y2);
		};
	},false);
});

$(window).resize(function() {
	stage.setSize($(window).width()-2, $(window).height()-56);
});

var shapesLayer;
var jsontxt;
var jsonrect;
var stage;
var divClone;
var pdfdata;

window.onload = function() 
{		
	divClone = $("#container").clone();

	stage = new Kinetic.Stage({
	  container: "container",
	  width: $(window).width()-2,
	  height: $(window).height()-56,
	});
	
	
	shapesLayer = new Kinetic.Layer();
	stage.add(shapesLayer);
};



$(document).ready(function () {
	var colors = colorret();
	$( "#dialog-form > #color" ).html(colors);
	
	$( "#dialog-form > #color" ).colourPicker({
	ico:    'images/jquery.colourPicker.gif',
	title:  false
	});
	
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
        
      }
    });
});

function beforemodalopen(name)
{
	var info = getblockattr(name);
	loadmodal(info,name);
	$( "#dialog-form" ).dialog( "open" );
};

function loadmodal(info,name)
{
	$( "#dialog-form > #name" ).val(name);
	$( "#dialog-form > #type" ).val(info[1]);
	$( "#dialog-form > #subtype" ).val(info[2]);
	$( "#dialog-form > #manu" ).val(info[3]);
	$( "#dialog-form > #part" ).val(info[4]);
	$( "#dialog-form > #width" ).val(info[5]);
	$( "#dialog-form > #height" ).val(info[6]);
	$( "#dialog-form > #color" ).val(info[7]);
	$( "#dialog-form > #color" ).css('background-color',info[7] );
	

	// Based on type of block 
	if (info[0]=='block')
	{
		//hide extra info only pertinent to periphs
		$( "#dialog-form > #extra" ).hide();
	}
	else
	{
		// show periph info
		$( "#dialog-form > #line" ).val(info[8]);
		$( "#dialog-form > #length" ).val(info[9]);
		$( "#dialog-form > #orient" ).val(info[10]);
		$( "#dialog-form > #extra" ).show();
	}
	
};

function executemodal()
{
	var name = $( "#dialog-form > #name" ).val();
	var x = "dialog-form > #";
	
	
	var re1='((?:[a-z][a-z]+))';	// Word 1
    var re2='(\\d+)';				// Integer Number 1

    var p = new RegExp(re1+re2,["i"]);
	var m = p.exec(name);
	
	if (m != null)
	{
		var word1=m[1];
		if (word1=='block')
		{
			//update block
			// null for input that does not matter
			update('#' + name,$('#' + x +'type').val(),$('#' + x +'subtype').val(),$('#' + x +'manu').val(),$('#' + x +'part').val(),null,null,null,$('#' + x +'color').val(),$('#' + x +'width').val(),$('#' + x +'height').val(),0);
		}
		else
		{
			//update periph
			update('#' + name,$('#' + x +'type').val(),$('#' + x +'subtype').val(),$('#' + x +'manu').val(),$('#' + x +'part').val(),$('#' + x +'extra > #line').val(),$('#' + x +'extra > #length').val(),$('#' + x +'extra > #orient').val(),$('#' + x +'color').val(),$('#' + x +'width').val(),$('#' + x +'height').val(),1);
		} 
	}
};

function getblockattr(box)
{
	var name =box;
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
	var parttext=part.attrs.text;
	var widthint = box.getWidth();
	var heightint = box.getHeight();
	var color = box.attrs.fill;
	
	//Choose if box = block or periph
	var re1='((?:[a-z][a-z]+))';	// Word 1
    var re2='(\\d+)';	// Integer Number 1

    var p = new RegExp(re1+re2,["i"]);
	var m = p.exec(name);
	
	if (m != null)
	{
		var word1=m[1];
		if (word1=='block')
		{
			var info = new Array(word1, typetext, subtypetext, manutext, parttext, widthint, heightint, color);
		}
		else
		{
			var line = shape.get('.line')[0];
			var linetext=line.partialText;
			var orient = shape.get('.orient')[0];
			if (orient.attrs.points[0].x - orient.attrs.points[1].x == 0)
			{
				// line is either up or down
				if (orient.attrs.points[0].y > orient.attrs.points[1].y)
				{
					var orientval = 0;
					var length = orient.attrs.points[0].y - orient.attrs.points[1].y;
				}
				else
				{
					var orientval = 2;
					var length = orient.attrs.points[1].y - orient.attrs.points[0].y;
				}
				
			}
			else
			{
				// line is either up or down
				if (orient.attrs.points[0].x > orient.attrs.points[1].x)
				{
					var orientval = 3;
					var length = orient.attrs.points[0].x - orient.attrs.points[1].x;
				}
				else
				{
					var orientval = 1;
					var length = orient.attrs.points[1].x - orient.attrs.points[0].x;
				}
			}
			var info = new Array(word1, typetext, subtypetext, manutext, parttext, widthint, heightint, color, linetext, length, orientval);
		}
	}
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


function highlightbox()
{
	
	block.setAttrs(
	{
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: 10,
		shadowOpacity: 0.6
	});

	layer.draw();
};


function boxmake(name,str0,str1,str2,str3,str4,x,y,width,height,lined)
{  

	var rcolor = new RColor;
	var color = rcolor.get(true, 0.3, 0.99);
	
	
	var group = new Kinetic.Group({
	  x: 50,
	  y: 50,
	  draggable:1,
	  id:name,
	  offset: [width/2, height/2],
	});
	var box = new Kinetic.Rect({
		x: x,
		y: y,
		stroke: 'black',
		strokeWidth: 1,
		width: width,
		height: height,
		cornerRadius: 10,
		fill:color,
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: 8,
		shadowOpacity: 0.5,
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
	
	// Do this for peripherals
	if(lined)
	{
		var linex = 0;
		var liney = 0;
		var linestretch = 100;
		var textdir = 0;
		var x1 = 0;
		var y1 = 0;
		var x2 = 0;
		var y2 = 0;
		
		x1 = x + linestretch;
		y1 = y + 060;
		x2 = x + 100 + linestretch;
		y2 = y + 060;
		textdir = 0;
		linex = 125;
		liney = 30;
		
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
			shadowColor: 'black',
			shadowBlur: 10,
			shadowOffset: 1,
			shadowOpacity: 0.5,
		});
		
		group.add(line);
		group.add(linetext);
	}
	
	
	
	
	group.on("mouseover touchstart", function() {
		document.body.style.cursor = "pointer";
		this.setOpacity(.3);
		box.setAttrs(
		{
			shadowOffset: 0,
		});
		shapesLayer.draw();
	});
	group.on("mouseout touchend", function() {
		document.body.style.cursor = "default";
		
		box.attrs.shadowOpacity=0.6;
		this.setOpacity(1);
		box.setAttrs(
		{
			shadowOffset: 8,
		});
		shapesLayer.draw();
	});
	group.on("dblclick", function() {
		beforemodalopen(name);
	});
	group.on("highlight", function() {
		setTimeout(function() {
			group.transitionTo(
			{
			  rotation: Math.PI * 2,
			  duration: 1,
			  easing: 'elastic-ease-out',
			  callback: function() 
			  {
				//if needed
			  }
			});
      }, 0)
	});
	group.add(box);
	group.add(typetext);
	group.add(subtypetext);
	group.add(manutext);
	group.add(parttext);
	shapesLayer.add(group);
	shapesLayer.draw();
	group.fire('highlight');
	
};		

function update(box,str0,str1,str2,str3,str4,length,dir,color,width,height,lined)
{
	var width = parseInt(width);
	var height = parseInt(height);
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
	
	box.setAttrs(
	{
		width:width,
		height:height,
		fill:color,
	});
	
	// Do this for peripherals
	if (lined)
	{
		var linex = 0;
		var liney = 0;
		var linestretch = parseInt(length);
		var textdir = 0;
		var x1 = 0;
		var y1 = 0;
		var x2 = 0;
		var y2 = 0;
		
		if (dir == 0) // up
		{
			x1 = x + width/2;
			y1 = y - 000;
			x2 = x + width/2;
			y2 = y - linestretch;
			textdir = 90;
			linex = x1 + 13;
			liney = y2 + 2;
		}
		else if (dir == 1) // right
		{
			x1 = x + width;
			y1 = y + height/2;
			x2 = x + width + linestretch;
			y2 = y + height/2;
			textdir = 0;
			linex = x2 - str4.length*8;
			liney = y2-13;
		}
		else if (dir == 2) // down
		{
			x1 = x + width/2;
			y1 = y + height;
			x2 = x + width/2;
			y2 = y + height + linestretch;
			textdir = 90;
			linex = x1 + 13;
			liney = y2 - str4.length*8;
		}
		else if (dir == 3) //left
		{
			x1 = x + 000;
			y1 = y + height/2;
			x2 = x - linestretch;
			y2 = y + height/2;
			textdir = 0;
			linex = x2+2;
			liney = y2-13;
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
	}
	
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
	var group = shapesLayer.get('#' + box)[0];
	group.hide();
	shapesLayer.draw();
}

var count =0;
var bcount =0;
function moreboxes(type)
{
	if(type==0)
	{
		x = 'block'+bcount;
		boxmake(x,'Type','SubType','Manufacturer','Part Number','',0,0,100,100,0);
		bcount=bcount+1;
	}
	else
	{
		x = 'pher'+count;
		boxmake(x,'Type','SubType','Manufacturer','Part Number','',0,0,100,100,1);
		count=count+1;
	}
	colorget('#'+x);
	shapesLayer.draw();
};
function htmlloader(div,str)
{
	$(div).append(str);
}
/// This function is not used
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

function getpdf(imgdata)
{
	var doc = new jsPDF();
	doc.setFontSize(40);
	doc.addImage(imgData, 'JPEG', 15, 40, 180, 180);
	pdfdata = doc.output('datauristring');
	window.open(pdfdata);

};


function dataURItoBlob(dataURI, callback) {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs

	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0) {
		byteString = atob(dataURI.split(',')[1]);
	} else {
		byteString = unescape(dataURI.split(',')[1]);
	}

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// write the bytes of the string to an ArrayBuffer
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob, and you're done
	window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
                     window.MozBlobBuilder || window.MSBlobBuilder;
	var bb = new BlobBuilder();
	bb.append(ab);
	return bb.getBlob(mimeString);
}

function getAsJPEGBlob(canvas) {
	if(canvas.mozGetAsFile) {
		return canvas.mozGetAsFile("foo.jpg", "image/jpeg");
	} else {
		var data = canvas.toDataURL("image/jpeg");
		var blob = dataURItoBlob(data);
		return blob;
		//return data;
	}
}
