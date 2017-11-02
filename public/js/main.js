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
		for(var j = 0; j < pegs; j++){
			rowsHTML += `<span class="box enable row${i}" id="row${i}box${j}"></span>`;
		}
		rowsHTML += `<div id=row${i}btnContainer style="width: 40px;heigth: 40px"><button class=submitBtn id=row${i}>Check</button> </div></div>`
		$('#rowContainer').append(rowsHTML)
	}
}

function generateCodePegs(){
	var rowsHTML = `<div class="row"`;
	for (var i = 0; i < pegs; i++){
		rowsHTML += `<span class="box codePeg" color=${randColor()} id="codePegBox${i}"></span>`
	}
	rowsHTML += '</div>'
	$('#codePegsContainer').append(rowsHTML)
	$('#codePegsContainer').hide()
	setColorForCodePegs()
}

function randColor(){
	var hexCode = Math.floor(Math.random() * colorSet.length)
	if (!colorSet[hexCode]) throw new Error ('cannot generate color for code pegs')
	return colorSet[hexCode]
}

function setColorForCodePegs(){
	for (var i = 0; i < pegs; i++){
		$(`#codePegBox${i}`).css("background-color", $(`#codePegBox${i}`).attr('color'))
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
	var rowID = $(this).attr('id')
	checkingColorMatchOf(rowID)
})

function checkingColorMatchOf(rowID){
	var corrColorAndPos = 0
	var corrColorOnly = 0
	var submittedRow = []
	var codePegs = []
	var submittedRowLeft = []
	var codePegsLeft = [];
	for (var i = 0; i < pegs; i++){
		submittedRow.push(rgb2colorName($(`#${rowID}box${i}`).css("background-color")))
		codePegs.push(rgb2colorName($(`#codePegBox${i}`).css("background-color")))
	}

	for (var i = 0; i < pegs; i++){
		if(submittedRow[i] == codePegs[i]){
			corrColorAndPos += 1
		}else{
			submittedRowLeft.push(submittedRow[i])
			codePegsLeft.push(codePegs[i])
		}
	}
	// console.log('submittedRowLeft: ' + submittedRowLeft + ' | codePegsLeft: ' + codePegsLeft)

	for (var i = 0; i < submittedRowLeft.length; i++){
		var index = codePegsLeft.indexOf(submittedRowLeft[i])
		if (index > -1){
			corrColorOnly += 1
			codePegsLeft.splice(index, 1)
		}
	}

	// console.log('submittedRowLeft: ' + submittedRowLeft + ' | codePegsLeft: ' + codePegsLeft)
	// console.log('corrColorAndPos:' + corrColorAndPos + ' corrColorOnly: ' + corrColorOnly)
	winningStatus(corrColorAndPos, corrColorOnly, rowID)
}

function winningStatus(corrColorAndPos, corrColorOnly, rowID){
	if (corrColorAndPos == pegs){
		alert('You win!')
		$('#codePegsContainer').modal()
	}else{
		alert('fullly correct guess is ' + corrColorAndPos + ' and halfly correct guess is ' + corrColorOnly)
		$(`#${rowID}btnContainer`).html(`<strong>${corrColorAndPos}</strong> | <strong>${corrColorOnly}</strong> `)
	}
}
