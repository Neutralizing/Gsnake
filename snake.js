Snake=function(tr,td,level){
	this.tr=tr;
	this.td=td;
	this.level=level;

	this.tds=[];//行与列的DOM对象
	this.gameTable=document.getElementById('gameTable');
	this.vc=[1,0];//初始速度向左
	this.food=[]; //坐标形式存储
    this.snakeTrian=new Array(); //用2维数坐标形式组存储蛇
    this.snakeTrian[0]=new Array();
    this.snakeTrian[1]=new Array();
    this.snakeTrian=[[20,20]];
    this.head=[];

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
	// clearInterval(letsgo);
	console.log('Woooo,you eat too much!!!');
}


Snake.prototype.goAndEat=function(){
	var This=this;
	this.head[0]=this.snakeTrian[0][0]+this.vc[0];
	this.head[1]=this.snakeTrian[0][1]+this.vc[1];
	// console.log(this.head);

	// if(this.head[0]<0||this.head[0]>this.tr||this.head[1]<0||this.head[1]>this.td||(this.indexOfDualArray(This.snakeTrian,This.head))){
	// 	This.gameOver();
	// }
	if(this.head[0]==this.food[0]&&this.head[1]==this.food[1]){
		this.snakeTrian.unshift(this.head);
		this.createFood();

	}else{
		for(var i=this.snakeTrian.length-1;i>0;i--){
			this.snakeTrian[i]=this.snakeTrian[i-1];
		}
		this.snakeTrian[0]=this.head;
	}
	// console.log(this.snakeTrian);
	return this.snakeTrian;
	
	
}

Snake.prototype.velocity=function(event){
	// var a=0;
	if(this.vc[0]==0){
		//
		if(event.keyCode==37){
			this.vc.reverse();
		}
		if(event.keyCode==39){
			this.vc.reverse();
			this.vc[0]=-this.vc[0];

		}
	}else{
		if(event.keyCode==37){
			this.vc.reverse();
			this.vc[1]=-this.vc[1];

		}
		if(event.keyCode==39){
			this.vc.reverse();
		}
	}
	return this.vc;
	
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
	this.gameTable.appendChild(table);
}

Snake.prototype.createSnake=function(){
	for(var i=0;i<this.snakeTrian.length;i++){
		this.tds[this.snakeTrian[i][1]][this.snakeTrian[i][0]].className='snake';
	}
	console.log(this.snakeTrian);
}



Snake.prototype.createFood=function(){
	var This=this;
	var x=parseInt(this.td*Math.random());
	var y=parseInt(this.tr*Math.random());
	this.food=[x,y];
	if(this.indexOfDualArray(This.snakeTrian,This.food)){

		This.createFood();
	}
	// console.log(this.snakeTrian);
	// console.log(this.food);
	this.tds[y][x].className='food';
	return this.food;
	//console.log(this.tds[y][x]);
}

Snake.prototype.init=function(){
	this.createDom();
	this.createFood();
	this.createSnake();
}

// var level=[[40,40,2],[40,40,4],[45,45,6]];

// var timer=null;
// var btn=document.getElementsByTagName('button');
// var levelSelect=[];
// for(let i=0;i<btn.length-1;i++){
// 	btn[i].onclick=function(){
// 		for(var j=0;j<btn.length-1;j++){
// 			btn[j].className='';
// 		}
// 		btn[i].className='active';
// 		levelSelect=level.slice(i,i+1);
// 	}	// console.log(levelSelect);
// }

// btn[2].onclick();
// var snake=new Snake(levelSelect[0][0],levelSelect[0][1],levelSelect[0][2]);
var snake=new Snake(40,40,2);

// console.log(snake.snakeTrian);
snake.init();
// console.log(snake.snakeTrian);
// setTimeout("console.log(1)",1000);
snake.goAndEat();
setTimeout(snake.createSnake(),1000);
console.log(1);
setTimeout(snake.goAndEat(),2000);
console.log(2);
setTimeout(snake.createSnake(),3000);
console.log(3);

// timer=setInterval(snake.goAndEat,1000);
