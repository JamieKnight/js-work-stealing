var running = false;


addEventListenerByClass("test", "click", function(){
	if(running) {
		alert('Test is running, please wait for current test to complete');
	} else {
		running = true;
		var that = this;
		this.innerHTML = "running...";

		runTest(that.dataset, function(time){
			updateTable(that.dataset, time);
			calculateDeltas();
			running = false;
		});	
	}
});

addEventListenerByClass("runall", "click", function(){

	var tests = document.getElementsByClassName('allsuite');
	running = true;

	
	runTestRecursive(tests, 0);
	
	function runTestRecursive(tests, number){
		if(tests[number]) {
			tests[number].innerHTML = "running...";		
			runTest(tests[number].dataset, function(time){
				updateTable(tests[number].dataset, time);
				calculateDeltas();
				runTestRecursive(tests, number+1)
			});
		} else {
			running = false;
		}
	}
})



function updateTable(dataset, time){
	var id = "test-" + dataset.size + "-" + dataset.stealing + "-" + dataset.workers;
	var cell = document.getElementById(id);
	if (cell) {
		cell.innerHTML = time;
	}
	
}

function calculateDeltas(){
	var deltas = document.getElementsByClassName('delta');
	for (var i = 0, len = deltas.length; i < len; i++) {
	
		var slow = document.getElementById(deltas[i].dataset.slow).innerHTML,
			fast = document.getElementById(deltas[i].dataset.fast).innerHTML;

		var d = (slow / fast);
		
		if (!isNaN(d)){
			deltas[i].innerHTML = d.toFixed(2) + "x";
		}
	}
	
}

function addEventListenerByClass(className, event, fn) {
    var list = document.getElementsByClassName(className);
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}