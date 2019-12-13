Snake=function(tr,td){
	this.tr=tr;
	this.td=td;
	this.level=level;

	this.tds=[];//行与列的DOM对象
	this.gameTable=document.getElementById('gameTable');
	
    
    

}

//2维数组的indexof索引的方法
Snake.prototype.indexOfDualArray=function(array,item){
	for(var i=0;i<array.length;i++){
		if(array[i][0]==item[0]&&array[i][1]==item[1]){
			return true;
		}
	}
	return false;
}

Snake.prototype.gameOver=function(){
	
	alert('Oh.Wo.....gameOver!!');
	clearInterval(timer);
}


Snake.prototype.goAndEat=function(train){
	var This=this;
	var head=[];
	
	head[0]=train[0][0]+vc[0];
	head[1]=train[0][1]+vc[1];
	

	if(head[0]<0||head[0]>this.tr||head[1]<0||head[1]>this.td||(this.indexOfDualArray(train,head))){
		This.gameOver();

	}else if(head[0]==food[0]&&head[1]==food[1]){
		train.unshift(head);
		this.createFood();

	}else{
		if(train.length==1){
			// console.log("step one");
			This.tds[train[0][1]][train[0][0]].className="";
			train[0]=head;
		}
		for(var i=train.length-1;i>0;i--){
			// console.log("step two");
			This.tds[train[i][1]][train[i][0]].className="";
			train[i]=train[i-1];
		}
		train[0]=head;
	}
	
	snakeTrian=train;
	this.createSnake(train);
	return snakeTrian;
	
	
}

Snake.prototype.velocity=function(event){
	// var a=0;
	if(vc[0]==0){
		//
		if(event.keyCode==37){
			vc.reverse();
		}
		if(event.keyCode==39){
			vc.reverse();
			vc[0]=-vc[0];

		}
	}else{
		if(event.keyCode==37){
			vc.reverse();
			vc[1]=-vc[1];

		}
		if(event.keyCode==39){
			vc.reverse();
		}
	}
	return vc;
	
}

Snake.prototype.createDom=function(){
	var table=document.createElement('table');

	for(var i=0;i<this.tr;i++){
		var domTr=document.createElement('tr');
		this.tds[i]=[];
		for(var j=0;j<this.td;j++){
			var domTd=document.createElement('td');
			this.tds[i][j]=domTd;
			domTr.appendChild(domTd);
		}
		table.appendChild(domTr);
	}
	this.gameTable.innerHTML="";
	this.gameTable.appendChild(table);
}

Snake.prototype.createSnake=function(train){
	for(var i=0;i<train.length;i++){
		this.tds[train[i][1]][train[i][0]].className='snake';
	}
	// console.log('渲染');
}



Snake.prototype.createFood=function(){
	var This=this;
	var x=parseInt(this.td*Math.random());
	var y=parseInt(this.tr*Math.random());
	food=[x,y];
	if(this.indexOfDualArray(snakeTrian,food)){

		This.createFood();
	}
	
	this.tds[y][x].className='food';
	return food;
	
}

Snake.prototype.init=function(){
	this.createDom();
	this.createFood();
	snakeTrian[0]=[20,20];
	vc=[1,0];

}


var btn=document.getElementsByTagName('button');
var levelClass=[1,2,4];
var level=1;
var ln=0;
var vc=[1,0];
var snakeTrian=new Array();
snakeTrian[0]=new Array();
var timer=null;
var food=[];
for(let i=0;i<btn.length-1;i++){
	btn[i].onclick=function(){
		btn[ln].className="";
		this.className="active";
		level=levelClass[i];
		ln=i;
		clearInterval(timer);
		timer=setInterval("snake.goAndEat(snakeTrian)",400/level);
	
	}	
}
btn[3]=onclick=function(){
	clearInterval(timer);

	snake.init();
	timer=setInterval("snake.goAndEat(snakeTrian)",400/level);
}
var snake=new Snake(40,40);
snake.init();
window.addEventListener("keydown",snake.velocity);
timer=setInterval("snake.goAndEat(snakeTrian)",400);







