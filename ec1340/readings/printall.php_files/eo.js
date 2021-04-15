/*
	Global Earth Observatory javascript
*/
function getElement(id) {
	if(document.getElementById) {
		return document.getElementById(id);
	}
	return document.layers[id];
}

function showElement(element_ref) {
	var element = (typeof element_ref == "string") ? getElement(element_ref) : element_ref;
	
	if(document.getElementById) {
		element.style.display = 'block';
	} else if(document.layers) {
		element.display = 'block';
	}
}

function hideElement(element_ref) {
	var element = (typeof element_ref == "string") ? getElement(element_ref) : element_ref;

	if(document.getElementById) {
		element.style.display = 'none';
	} else if(document.layers) {
		element.display = 'none';
	}
}