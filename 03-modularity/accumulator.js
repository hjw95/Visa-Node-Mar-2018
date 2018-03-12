function accmulatorFactory(){
	var result = 0;

	var accmulator = {
		add : function(x){
			result += x;
		},
		subtract : function(x){
			result -= x;
		},
		multiply : function(x){
			result *= x;
		},
		divide : function(x){
			result /= x;
		},
		getResult : function(){
			return result;
		}
	}

	return accmulator;
}

module.exports = accmulatorFactory;