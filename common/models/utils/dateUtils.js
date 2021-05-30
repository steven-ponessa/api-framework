var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var monthAbb = ["Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

module.exports.getMonthName = (monthNumber) => monthNames[monthNumber - 1];
module.exports.getMonthAbb = (monthNumber) => monthAbb[monthNumber - 1];

module.exports.formatQuarterYear = function (yrQtrKey) {
  if (yrQtrKey!= null) {

    if ( yrQtrKey == '0000Q1' || yrQtrKey == '0001Q1' ) {
      return 'All';
    } else 
      if ( yrQtrKey == '9999Q4' ) {
        return 'PCW';
      } else {
        var year = yrQtrKey.slice(0, 4);      
        var quarter = yrQtrKey.slice(4, 6);
        return quarter + ", " + year;
    } 
  } else {
    return "--";
  }
};
