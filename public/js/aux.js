function rgb2colorName(rgb){
	return hex2colorName(rgb2hex(rgb))
}

//Function to convert rgb color to hex format
const hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

function rgb2hex(rgb) {
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

function hex2colorName(hex){
	switch(hex){
		case '#00534e':
			return 'green'
			break
		case '#ff9900':
			return 'orange'
			break
		case '#ffdf55':
			return 'yellow'
			break
		case '#0088b2':
			return 'blue'
			break
		case '#810000':
			return 'brown'
			break
		case '#8265a1':
			return 'purple'
			break
		default:
			return 'white'
	}
}