exports.calCounts = (Access, target_date) => {
    var sum=0;
    Access.forEach(access => {
      if(Date.parse(access.accessDate) > target_date){
        sum = sum+access.cnt;
      }
    })
    return sum
  }

 exports.getColorFromTimesofAccess = (times,max) => {
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