/*
    (C) 2016 Patrick Traeger
    MIT License
*/

if(!Math.hasOwnProperty('extended')){
    Math.extended = {};

    Math.extended.weightedEuclideanDistance = function(array1, array2, weights){
        if(Object.prototype.toString.call(array) === '[object Array]'){
            if(array1.length === array2.length && array1.length === weights.length){
                var distance = 0;

                array1.forEach(function(value, index){
                    distance += Math.pow(value - array2[index], 2) * weights[index];
                });

                return Math.sqrt(distance);
            }
            else{
                throw new Error('array1, array2 and weights must be equal length arrays')
            }
        }
        else{
            throw new Error('array must be type array');                
        }
    };

    Math.extended.euclideanDistance = function(array1, array2){
        if(Object.prototype.toString.call(array) === '[object Array]'){
            if(array1.length === array2.length){
                var distance = 0;

                array1.forEach(function(value, index){
                    distance += Math.pow(value - array2[index], 2);
                });

                return Math.sqrt(distance);
            }
            else{
                throw new Error('array1 and array2 must be equal length arrays')
            }
        }
        else{
            throw new Error('array must be type array');                
        }
    };

    Math.extended.frequency = function(array){
        if(Object.prototype.toString.call(array) === '[object Array]'){
            var obj = {};

            array.forEach(function(value){
                if(obj.hasOwnProperty('k' + value)){
                    obj['k' + value].count++;
                }
                else{
                    obj['k' + value] = {
                        count : 1,
                        value : value
                    };
                }
            });

            return obj;

        }
        else{
            throw new Error('array must be type array');        
        }
    };

    Math.extended.mode = function(array){
        if(Object.prototype.toString.call(array) === '[object Array]'){

            var obj = Math.extended.frequency(array);

            var keys    = Object.keys(obj);
            var largest = null;
            var value   = null;

            keys.forEach(function(key){
                if(largest !== null && value !== null){
                    if(obj[key].count > largest){
                        largest = obj[key].count;
                        value   = obj[key].value;
                    }
                }
                else{ 
                    largest = obj[key].count;
                    value   = obj[key].value;
                }
            });

            return value;
        }
        else{
            throw new Error('array must be type array');
        }   
    };

    Math.extended.median = function(array){
        if(Object.prototype.toString.call(array) === '[object Array]'){

            array = array.sort(function(a, b){
                return a - b;
            });

            var middle = Math.floor(array.length / 2);

            return array[middle];
        }
        else{
            throw new Error('array must be type array');
        }
    };

    Math.extended.average = function(array){
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

    Math.extended.standardDeviation = function(array, sample){
        if(Object.prototype.toString.call(array) === '[object Array]'){

            sample = sample ? 1 : 0;

            var average             = Math.average(array);      
            var standardDeviation   = 0;
            array.forEach(function(value){
                standardDeviation += Math.pow((value - average), 2);
            });

            return Math.sqrt(((1 / (array.length - sample)) * standardDeviation));

        }
        else{
            throw new Error('normalize parameter must be type array');      
        }
    };


    Math.extended.normalize = function(array, base){
        if(Object.prototype.toString.call(array) === '[object Array]'){

            if(!base){
                base = 1;
            }

            var min     = Math.min.apply(null, array);
            var minMax  = Math.max.apply(null, array) - min;

            return array.map(function(value){
                return ((value - min) / minMax) * base;
            });
        }
        else{
            throw new Error('normalize parameter must be type array');
        }
    };

    Math.extended.rsqd = function(xArray, yArray){

        /*
          Calculates the Pearson correlation coefficient of determination
          for two equally sized arrays
        */

        var type = Object.prototype.toString;

        if(type.call(xArray) === '[object Array]' && type.call(yArray) === '[object Array]'){
            if(yArray.length === xArray.length){
                var yhat        = Math.extended.average(yArray);
                var xhat        = Math.extended.average(xArray);
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

}
