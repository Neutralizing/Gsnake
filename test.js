function Mine(tr,td,mineNum) {
	this.tr=tr;
	this.td=td;
	this.mineNum=mineNum;

	this.squares=[];//2维数组,行和列的方式排放
	this.tds=[]; //单元格存储对象
	this.surplusMine=mineNum;
	this.allRight=false;

	this.parent=document.getElementById("gameBox");
	
};

Mine.prototype.init=function(){
	var rn=this.randomNum();
	var n=0;
	for(var i=0;i<this.tr;i++){
		this.squares[i]=[];
		for(j=0;j<this.td;j++){
			n++;
			if(rn.indexOf(n)!=-1){
			this.squares[i][j]={type:"mine",x:j,y:i};	
			}else{
				this.squares[i][j]={type:"number",x:j,y:i,value:0};
			}
			
		}
	}

	this.updateNum();
	this.createDom();
	this.parent.oncontextmenu=function(){
		return false;
	}
	this.mineNumDom=document.getElementById('tips');
	this.mineNumDom.innerHTML=this.surplusMine;
};

Mine.prototype.getAround1=function(square){
	var x=square.x;
	var y=square.y;
	var result1=[];
	for(i=x-1;i<=x+1;i++){
		for(j=y-1;j<=y+1;j++){
			if(
				i<0||
				j<0||
				i>this.td-1||
				j>this.tr-1||
				(i==x&&j==y))
			{
				
				continue;
			}
			result1.push([j,i]);//返回行和列的方式

		}
	}

	return result1;

}

Mine.prototype.getAround=function(square){
	var x=square.x;
	var y=square.y;
	var result=[];//2数组,坐标
	for(i=x-1;i<=x+1;i++){
		for(j=y-1;j<=y+1;j++){
			if(
				i<0||
				j<0||
				i>this.td-1||
				j>this.tr-1||
				(i==x&&j==y)||
				this.squares[j][i].type=="mine")
			{
				
				continue;
			}
			result.push([j,i]);//返回行和列的方式

		}
	}

	return result;
};

Mine.prototype.updateNum=function(){
	for(var i=0;i<this.tr;i++){
		for(var j=0;j<this.td;j++){
			if(this.squares[i][j].type=="number"){

				continue;
			}
			// console.log(1);
			var num=this.getAround(this.squares[i][j]);
			for(var k=0;k<num.length;k++){
				this.squares[num[k][0]][num[k][1]].value += 1;
			}
		}
	}
};


Mine.prototype.randomNum=function(){
	var square=new Array(this.tr*this.td);
	for(var i=0;i<square.length;i++){
		square[i]=i;
	}
	square.sort(function(){return 0.5-Math.random()});
	// console.log(square.slice(0,this.mineNum));
	return square.slice(0,this.mineNum);
};

Mine.prototype.play=function(ev,obj){
	var This=this;
	var curSquare=This.squares[obj.pos[0]][obj.pos[1]];
	setTimeout(function(){
		if(timer.length==0){
			return false;
		}
		if(timer.length==1){
			if(timer[0]==1){
				//zuojian
				
				
				if(curSquare.type=="number"){

					obj.innerHTML=curSquare.value;
					obj.className=cl[curSquare.value];

					if(curSquare.value==0){
						obj.innerHTML="";

						function getAllZero(square){
							var around=This.getAround(square);

							for(var i=0;i<around.length;i++){

								var x=around[i][0];
								var y=around[i][1];
								This.tds[x][y].className=cl[This.squares[x][y].value];
								if(This.squares[x][y].value==0){
									if(!This.tds[x][y].check){
										This.tds[x][y].check=true;
										getAllZero(This.squares[x][y]);
									}
								}else{
									This.tds[x][y].innerHTML=This.squares[x][y].value;
								}
							}
						}
						getAllZero(curSquare);
					}
				}else{
					This.gameOver(obj);
				}	

			}else{
				//youjian
				if(obj.className&&obj.className!='flag'){
					return;
				}
				obj.className=obj.className=='flag'?'':'flag';
				if(This.squares[obj.pos[0]][obj.pos[1]].type=='mine'){
					This.allRight=true;

				}else{
					This.allRight=false;
				}
				if(obj.className=='flag'){
					This.mineNumDom.innerHTML=--This.surplusMine;

				}else{
					This.mineNumDom.innerHTML=++This.surplusMine;
				}
				if(This.surplusMine==0){
					if(This.allRight){
						alert('太棒了!你过关了!')
					}else{
						This.gameOver();
					}
				}
			}
		}if(timer.length==2){
			//双击如果边上的雷已经找出,则显示周围的数字
			//只要看那个没有被翻面的是否为雷
			var around1=This.getAround1(curSquare);
			console.log(around1);
			for(var i=0;i<around1.length;i++){
				//判断className是空的是否为数字
				
				var x=around1[i][0];
				var y=around1[i][1];
				if(This.tds[x][y].className==""){
					console.log(This.tds[x][y]);
					
					if(This.squares[x][y].type=="mine"){
						This.gameOver();
					}else{
						if(This.squares[x][y].value!=0){
						This.tds[x][y].className=cl[This.squares[x][y].value];
						This.tds[x][y].innerHTML=This.squares[x][y].value;
						}else{
						This.tds[x][y].className=cl[This.squares[x][y].value];
						This.tds[x][y].innerHTML="";
						}
					}

				}
			}
		

			
		}
		timer.length=0;

	},200);
};

Mine.prototype.gameOver=function(clickTd){
	for(var i=0;i<this.tr;i++){
		for(var j=0;j<this.td;j++){
			if(this.squares[i][j].type=="mine"){
				this.tds[i][j].className="mine";
			}
			this.tds[i][j].onmousedown=null;
		}
	}
	if(clickTd){
		clickTd.style.backgroundColor="#f00";
	}

}

Mine.prototype.createDom=function(){
	var This=this;
	var table=document.createElement("table");
	for(i=0;i<this.tr;i++){
		var domTr=document.createElement("tr");
		this.tds[i]=[];

		for(j=0;j<this.td;j++){
			var domTd=document.createElement("td");
			domTd.pos=[i,j];
			domTd.onmousedown=function(){
				timer.push(event.which);
				This.play(event,this);//This指实例对象,this指点击的那个td
			}
			// domTd.innerHTML=0;
			this.tds[i][j]=domTd;
			// if(this.squares[i][j].type=="mine"){
			// 	domTd.className="mine";
			// }
			// if(this.squares[i][j].type=="number"){
			// 	domTd.innerHTML=this.squares[i][j].value;
			// }

			domTr.appendChild(domTd);
		}
		table.appendChild(domTr);
	}
	this.parent.innerHTML='';
	this.parent.appendChild(table);
};


var btns=document.getElementsByTagName("button");
var cl=['zero','one','two','three','four','five','six','seven','eight']
var timer=[];
var mine=null;
var ln=0;
var arr=[[9,9,10],[16,16,40],[28,28,99]];
for(let i=0; i<btns.length-1;i++){
	btns[i].onclick=function(){
		
		btns[ln].className="";
		this.className="active";
		mine=new Mine(...arr[i]);
		mine.init();
		ln=i;

	}

}
btns[0].onclick();
btns[3].onclick=function(){
	mine.init();
}
// var mine= new Mine(28,28,99);
// mine.init();
// console.log(mine.getAround(mine.squares[1][2]));
