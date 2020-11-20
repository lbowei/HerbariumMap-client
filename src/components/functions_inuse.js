function findTime() {
  var target_date = new Date();
  target_date.setMonth(target_date.getMonth() - 6);  
  document.getElementById("time_button").innerHTML = "Showing records in the past six month";
  return target_date
}

function calCounts(Access, target_date){
  var sum=0;
  Access.forEach(access => {
    if(Date.parse(access.accessDate) > target_date){
      sum = sum+access.cnt;
    }
  })
}

  
function getColorFromTimesofAccess(times,max){
  if(times !==0){
    if(times<Math.round(max*0.2)){
      return "blue"
    } else if (times<Math.round(max*0.5)) {
      return "yellow"
    } else if (times < Math.round(max*0.8)) {
      return "orange"
    } else {
      return "red"
    }
  }
}

function dataToReport(data){
  var id_access=[];
  var temp={};
  for(let i = 0; i < data.length; i++){
    temp={
      'occid':data.occid,
      'count':data.sum_count,
    }
    id_access.push(temp);
  }
  return id_access;
}

function createTable(data){
	var tableNode=document.createElement("table");
  tableNode.setAttribute("id","table");
  var id_access=dataToReport(data);
	var row=id_access.lenghth();
	if(row<=0 || isNaN(row) ){
		alert("Data Error!");
    return;
	}
	for(var i=0;i<row;i++){
		var trNode=tableNode.insertRow();
		for(var j=0;j<2;j++){
      var tdNode=trNode.insertCell();
      if(j===0){
        tdNode.innerHTML=id_access[i].occid;
      }else{
        tdNode.innerHTML=id_access[i].count;
      }
		}
	}
	document.getElementById("report").appendChild(tableNode);
}

export {findTime, calCounts, getColorFromTimesofAccess,dataToReport,createTable};