module.exports.formatAmount = function (amount, decimalPlaces = 2) {
  return (amount * 1).toFixed(decimalPlaces);
};

module.exports.formatPercentage = function (amount, decimalPlaces = 1) {
    return amount.toFixed(decimalPlaces);
};

module.exports.formatPercentage100 = function (amount, decimalPlaces = 1) {
  return (amount * 100).toFixed(decimalPlaces);
};

module.exports.calcValue = function (amount, decimalPlaces = 2) {
  return (amount / 1000000).toFixed(decimalPlaces);
};

module.exports.calcX100 = (amount, decimalPlaces = 1) => {
  return (amount * 100).toFixed(decimalPlaces);
};

module.exports.calcPercent = function(numerator, denominator, decimalPlaces = 1) {
  var percentage = 0.0;
  if (denominator != 0) {
    percentage = (numerator / denominator) * 100;
  }

  return percentage.toFixed(decimalPlaces);
};

module.exports.getStatus2 = function(value, valueToCompare) {
  if (value < valueToCompare)
    return "down-red";
  else
    return "up-green";
}

module.exports.getStatusPct = function(valueNumerator, valueDenominator, valueToCompareNumerator, valueToCompareDenominator) {
  var value = 0.0;
  var valueToCompare = 0.0;

  if (valueDenominator != 0)
    value = valueNumerator/valueDenominator;

  if (valueToCompareDenominator != 0)
    valueToCompare = valueToCompareNumerator/valueToCompareDenominator;

  if (value < valueToCompare)
      return "down-red";
    else
      return "up-green";
};


module.exports.getStatus = function(numPm, denPm, numCm, denCm, range) {
  var cm=0.0;
  var pm=0.0;
  if (denCm!=0) cm = numCm/denCm;
  if (denPm!=0) pm = numPm/denPm;
  var variance = pm - cm;
  var status="up-";
  if (variance<0) status="down-";

  var theRange = [-.02, -.04];
  if (typeof range!='undefined') theRange = range;

  if (cm >= theRange[0]) status+="green";
  if (cm < theRange[0] && cm > theRange[1]) status+="yellow";
  if (cm <= theRange[1]) status+="red";

  //console.log("getStatus = function(%s, %s, %s, %s, %s) = variance=%s, cm=%s, status=%s.",numPm, denPm, numCm, denCm, range, variance, cm, status);

  return status;
};

module.exports.getMillionsStatus = function(millCurrMth, millPriMth, pctDen, range) {
  return getVariance(millCurrMth, millPriMth) + "-" + getColor(millCurrMth, pctDen, range);
};

module.exports.getCountStatus = function(countCurrMth, countPriMth, millCurrMth, pctDen, range) {
  return getVariance(countCurrMth, countPriMth) + "-" + getColor(millCurrMth, pctDen, range);
};

function getVariance(monthValue, priorMonthValue) {
  if (monthValue - priorMonthValue < 0)
    return "down";
  else
    return "up";
}

function getColor(num, den, metricRange) {
  var range = [-.02, -.04];
  if (typeof metricRange != 'undefined')
    range = metricRange;

  var pct = 0.0;
  if (den != 0)
    pct = num / den;

  if (pct >= range[0])
    return "green";
  else if (pct < range[0] && pct > range[1])
    return "yellow";
  else if (pct <= range[1])
    return "red";
}

module.exports.getStatusNoColor = function(numPm, denPm, numCm, denCm) {
  var cm = 0.0;
  var pm = 0.0;
  if (denCm != 0) cm = numCm/denCm;
  if (denPm != 0) pm = numPm/denPm;
  var variance = cm - pm;
  var status = "up";
  if (variance < 0) status = "down";

  return status;
};

module.exports.getColorStatus = function(value, range) {

  var theRange = [-0.02, -0.04];
  if (typeof range!='undefined') theRange = range;

  if (value == null)
    return "N/A";
  else if (value >= theRange[0])
    return "green";
  else if (value < theRange[0] && value > theRange[1])
    return "yellow";
  else if (value <= theRange[1])
    return "red";
};

module.exports.removeMinusZero = function(stringNumber) {
  //avoid to return -0. The '==' automatically will do type conversion
  return stringNumber == 0 && stringNumber.charAt(0) == '-' ? stringNumber.substring(1)  : stringNumber;
}
