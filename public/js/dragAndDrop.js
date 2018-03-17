function allowDrop(ev) {
    ev.preventDefault();
}

function dragColor(ev) {
	var color = ev.target.attributes.color.value
	ev.dataTransfer.setData("color", color);
}

function dropColor(ev) {
	ev.preventDefault();
	var targetBox = '#' + ev.target.id
    var color = ev.dataTransfer.getData("color");
	$(targetBox).css('background-color', color)
}