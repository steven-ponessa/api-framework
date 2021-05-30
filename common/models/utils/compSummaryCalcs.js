module.exports.ptsEvenOddCheck = function (pts) {
  if (pts < 0)
    pts = pts * -1;
  return pts;
}

module.exports.mtmStatus = function (mtm) {
  var status;
  if(mtm > 0){
    status = "up";
  }else if (mtm < 0){
    status = "down";
  }else if(mtm == 0){
    status = "right"
  }

  return status;
}

module.exports.wwColor = function (ww, highThrshld, lowThrshld) {
  var color;

  var numWw = parseFloat(ww);
  var numHighThrshld = parseFloat(highThrshld);
  var numLowThrshld = parseFloat(lowThrshld);
 
  if(numHighThrshld === 0 && numLowThrshld === 0){
    color = "gray";
  } else if(numWw >= numHighThrshld){
    color = "green";
  } else if(numWw < numHighThrshld && numWw > numLowThrshld){
    color = "yellow";
  } else if (numWw <= numLowThrshld) {
    color = "red";
  }

  return color;
}

module.exports.wwColor1 = function (ww, highThrshld, lowThrshld, msrmtDir) {
  var color;

  var numWw = parseFloat(ww);
  var numHighThrshld = parseFloat(highThrshld);
  var numLowThrshld = parseFloat(lowThrshld);
 
  if(numHighThrshld === 0 && numLowThrshld === 0){
    color = "gray";
  } else if(msrmtDir == -1){
		if(numWw >= numLowThrshld){
		color = "red";
	  } else if(numWw > numHighThrshld && numWw < numLowThrshld){
		color = "yellow";
	  } else if (numWw <= numHighThrshld) {
		color = "green";
	  }
  } else {
		if(numWw >= numHighThrshld){
		color = "green";
	  } else if(numWw < numHighThrshld && numWw > numLowThrshld){
		color = "yellow";
	  } else if (numWw <= numLowThrshld) {
		color = "red";
	  }
  }

  return color;
}
