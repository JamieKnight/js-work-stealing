// Cracking settings
var workerId;

function primeFactorization(num){

	var root = Math.sqrt(num),  
	result = arguments[1] || [],  //get unnamed paremeter from recursive calls
	x = 2; 
	
	if(num % x){//if not divisible by 2 
	x = 3;//assign first odd
	while((num % x) && ((x = x + 2) < root)){}//iterate odds
	}
	//if no factor found then num is prime
	x = (x <= root) ? x : num;
	result.push(x);//push latest prime factor
	
	//if num isn't prime factor make recursive call
	
	
	return (x === num) ? result : primeFactorization(num/x, result) ;
}

this.addEventListener('message', function(e) {

  switch (e.data.cmd) {
    case "setWorkerId":
      workerId = e.data.data
      break
      
    case "performFactor":
      this.postMessage({ cmd: "result", data: {result:  primeFactorization(e.data.data), count: e.data.count}, id: workerId });
      break

    default:
      this.postMessage({ cmd: "log", data: "Worker doesn't understand command " + e.data.cmd })
      break

  }
})
