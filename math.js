

Math.rsqd = function(xArray, yArray){

    /*
      Calculates the Pearson correlation coefficient of determination
      for two equally sized arrays
    */

    if(!Math.hasOwnProperty('average')){
        Math.average = function(array){
            if(Object.prototype.toString.call(array) === '[object Array]'){
                var summation = array.reduce(function(a, b){
                  return a + b;
                });

                return summation / array.length;
            }
            else{
                throw new Error('array must be type array');
            }
        };      
    }

    var type = Object.prototype.toString;

    if(type.call(xArray) === '[object Array]' && type.call(yArray) === '[object Array]'){
        if(yArray.length === xArray.length){
            var yhat        = Math.average(yArray);
            var xhat        = Math.average(xArray);
            var numerator   = 0;
            var denominator = {
                x : 0,
                y : 0
            };

            yArray.forEach(function(y, index){
                x = xArray[index];
                y = (y - yhat);
                x = (x - xhat);
                numerator += (x * y);
                denominator.y += Math.pow(y, 2);
                denominator.x += Math.pow(x, 2);
            });

            denominator = Math.sqrt(denominator.x * denominator.y);

            return numerator / denominator;
        }
        else{
            throw new Error('xArray length must be equal to yArray length');
        }
    }
    else{
        throw new Error('xArray and yArray must be type Array');
    }
};

/*
var r = Math.rsqd([1, 2, 3, 4, 5, 6, 7], [2, 4, 6, 8, 10, 12, 20]);

console.log(r);
*/