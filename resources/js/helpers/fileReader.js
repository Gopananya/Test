module.exports.read = (event) => {
	if(event.target.files && event.target.files[0]){
		let file = event.target.files[0];
		if(file.type === 'text/csv') return readCSV(file);
		if(file.type === 'application/json') return readJSON(file);
		if(file.type === 'text/xml') return readXML(file);
	}
}


function readCSV(file) {
	return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
        	const result = reader.result.split("\n");
			const keys = result[0].split(",");
			result.shift();
			result.pop();
			const output = result.map((line) => {
				const obj = {};
				keys.forEach((key, i) => {
					obj[keys[i].toLowerCase()] = line.split(",")[i]
				})
				console.log(obj);
				return obj;
			})
			resolve(output);
        };
        reader.readAsText(file);
	});
}

function readJSON(file) {
	return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
			resolve(JSON.parse(reader.result));
        };
        reader.readAsText(file);
	});
}

var parseString = require('xml2js').parseString;

function readXML(file) {
	return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
			parseString(reader.result, function (err, result) {
			    const elements = result.root.element;
				const output = elements.map((element, i) => {
			    	// console.log(element)
			    	let keys = Object.keys(element).reverse();
			    	const obj = {};
			    	keys.forEach(key => {
			    		obj[key] = elements[i][key][0];
			    	})
			    	return obj;
			    })
				resolve(output);
			});
        };
        reader.readAsText(file);
	});
}