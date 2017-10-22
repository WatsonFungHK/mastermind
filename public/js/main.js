// Contents
// 0: const assignment and call functions to init game
// 1: building UI
// 2: ingame action
// 3: winning

// 0: const assignment and call functions to init game
const colorSet = ['#00534e', '#ff9900', '#ffdf55', '#0088b2', '#810000', '#8265a1']
const difficulty = {"isEasy": colorSet.length * 2.5, "isStandard": colorSet.length * 2,"isChallenge": colorSet.length * 1.5,"isMaster": colorSet.length / 2 + 2 + 1}
const pegs = 4

setupGameFor(difficulty.isChallenge)

function setupGameFor(difficulty){
	generateCodePegs()
	addRows(difficulty)
}

// 1: Building UI
function addRows(rows){
	var rowsHTML
	for (var i = 0; i < rows; i++){
		rowsHTML = '<div class=row>';
		for(var j = 0; j < 4; j++){
			rowsHTML += `<span class="box enable row${i+1}" id="row${i+1}box${j+1}"></span>`;
		}
		rowsHTML += `<button class=submitBtn id=row${i+1}>Check</button> </div>`
		$('#rowContainer').append(rowsHTML)
	}
}

function generateCodePegs(){
	var rowsHTML = '<div class=row>';
	for (var i = 0; i < pegs; i++){
		rowsHTML += `<span class="box codePeg" color=${randColor()} id="codePegBox${i+1}"></span>`
	}
	rowsHTML += '</div>'
	$('#codePegsContainer').append(rowsHTML)
	setColorForCodePegs()
}

function randColor(){
	var hexCode = Math.floor(Math.random() * colorSet.length)
	if (!colorSet[hexCode]) throw new Error ('cannot generate color for code pegs')
	return colorSet[hexCode]
}

function setColorForCodePegs(){
	for (var i = 0; i < pegs; i++){
		$(`#codePegBox${i+1}`).css("background-color", $(`#codePegBox${i+1}`).attr('color'))
	}
}


// 2: ingame action
// including click to change color and submit button
$(function boxChangeColor(){
	$(".box.enable").click(function(){
		var boxId = $(this).attr('id')
		var currColor = colorSet.indexOf(rgb2hex($('#'+boxId).css("background-color")))
		// if (!currColor) console.log("failed to access current color of "+boxId );
		var newColor = colorSet[(currColor + 1 ) % colorSet.length]
		// if (!newColor) console.log("failed to get next color");
		$('#'+boxId).css("background-color", newColor)
	})
})


// 3: winning status
// checkingColorMatch
$('.submitBtn').on('click', function(){
	var row = $(this).attr('id')
	checkingColorMatchOf(row)
})

function checkingColorMatchOf(row){
	var corrColorAndPos = 0
	var corrColorOnly = 0
	var submittedRow = []
	var codePegs = [];
	for (var i = 0; i < pegs; i++){
		submittedRow.push($(`#${row}box${i}`).css("background-color"))
		codePegs.push($(`#codePegBox${i}`).css("background-color"))
	}
	console.log(submittedRow + codePegs)
	for (var i = 0; i < pegs; i++){
		if(submittedRow[i] == codePegs[i]){
			corrColorAndPos += 1
			submittedRow.shift()
			codePegs.shift()
		}
	}
	var boxesLeft = submittedRow.length
	for (var i = 0; i < boxesLeft; i++){
		if (codePegs.indexOf(submittedRow[i]) == submittedRow.indexOf(submittedRow[i])){
			corrColorOnly += 1
			submittedRow.shift()
			codePegs.shift()
		}
	}
	console.log(submittedRow + codePegs)
	console.log('corrColorAndPos:' + corrColorAndPos + ' corrColorOnly: ' + corrColorOnly)
	winning(corrColorAndPos)
}

function winning(corrColorAndPos){
	if (corrColorAndPos == 4)
		alert ('You win!')
}
