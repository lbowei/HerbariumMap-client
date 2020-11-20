exports.calCounts = (Access, target_date) => {
    var sum=0;
    Access.forEach(access => {
      if(Date.parse(access.accessDate) > target_date){
        sum = sum+access.cnt;
      }
    })
    return sum
  }