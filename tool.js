//2维数组数组的indexOf
var indexOfDaulArray=function(array,item){
	for(var i=0;i<array.length;i++){
		if(array[i][0]==item[0]&&array[i][1]==item[1]){
			return true;
		}
	}
	return false;
}