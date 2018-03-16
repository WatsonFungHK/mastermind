const colorSet = ['#00534e', '#ff9900', '#ffdf55', '#0088b2', '#810000', '#8265a1'];

const gameDifficulty = {
	"isEasy": colorSet.length * 2.5, 
	"isStandard": colorSet.length * 2,
	"isChallenge": colorSet.length * 1.5,
	"isMaster": colorSet.length / 2 + 2 + 1
};

const pegs = 4;

const game = {
	// rows: [],
	anwser: ['colorhex * pegs'],

	start: (difficulty) => {
		game.generateCodePegs()
		game.UIsetup(difficulty || gameDifficulty.isChallenge)
		game.activateGameControl()
	},

	restart: () => game.start(gameDifficulty.isChallenge),

	generateCodePegs: () => {
		var rowsHTML = `<div class="row"`;
		for (var i = 0; i < pegs; i++){
			rowsHTML += `<span class="box codePeg" color=${game.randColor()} id="codePegBox${i}"></span>`
		}
		rowsHTML += '</div>'
		$('#codePegsContainer').append(rowsHTML)
		$('#codePegsContainer').hide()
		game.answer = game.randColor(times = 4)
		game.setColorForCodePegs()
	},

	UIsetup: (difficulty) => {
		game.buildInstruction()
		game.addRows(difficulty)
	},

	buildInstruction: () => {
		$('#instruction').html('')
		var html = `<div>`
		colorSet.forEach((color) => {
			html += `<div class="box" style="background-color: ${color}" draggable="true"> </div>`
		})
		html += `</div>`
		$('#instruction').append(html)
	},

	addRows: (difficulty) => {
		var rowsHTML
		var rows = difficulty
		$('#rowContainer').html('')
		for (var i = 0; i < rows; i++){
			rowsHTML = '<div class=row>';
			for(var j = 0; j < pegs; j++){
				rowsHTML += `<span class="box row${i} enable" id="row${i}box${j}"></span>`;
			}
			rowsHTML += 
				`	<div id=row${i}btnContainer style="width: 40px;heigth: 40px">
						<button class=submitBtn id=row${i}>
							Check
						</button>
					</div>
				</div>`
			$('#rowContainer').append(rowsHTML)
		}
	},

	randColor: (times) => {
		var res = []
		for (var i = 0; i < times; i++) {
			var hexCode = Math.floor(Math.random() * colorSet.length)
			if (!colorSet[hexCode]) throw new Error ('cannot generate color for code pegs')
			res.push(colorSet[hexCode])
		}
		return res
	},

	setColorForCodePegs: () => {
		for (var i = 0; i < pegs; i++){
			$(`#codePegBox${i}`).css("background-color", $(`#codePegBox${i}`).attr('color'))
		}
	},

	activateGameControl:  () => {
		game.boxChangeColor()
		game.check()
		game.restart()
		
	},

	boxChangeColor: () => {
		$(".enable").on('click', function() {
			var boxId = $(this).attr('id')
			var currColor = colorSet.indexOf(rgb2hex($('#'+boxId).css("background-color")))
			var newColor = colorSet[(currColor + 1 ) % colorSet.length]
			$('#'+boxId).css("background-color", newColor)
		})
	},

	check: () => {
		$('.submitBtn').on('click', function() {
			var rowID = $(this).attr('id')
			game.checkingColorMatchOf(rowID)
			game.disableRow(rowID)
		})
	},

	disableRow: (rowID) => {
		if (!rowID) 
			throw new Error('disableRow does not receive row id')
		$(`.${rowID}`)
			.removeClass('enable')
			.addClass('disable')
	},

	restart: () => {
		$('#reset').on('click', function() {
			game.start()
		})
	},

	checkingColorMatchOf: (rowID) => {
		if (!rowID)
			throw new Error('checkingColorMatchOf does not receive row id')
		var correctColorOnCorrectPosition = 0
		var corrColorOnly = 0
		var submittedRow = []
		// fetch submission
		for (var i = 0; i < pegs; i++) {
			submittedRow.push(rgb2hex($(`#${rowID}box${i}`).css("background-color")))
		}

		var submittedRowLeft = []
		var codePegsLeft = [];
		for (var i = 0; i < pegs; i++) {
			if(submittedRow[i] == game.answer[i]) {
				correctColorOnCorrectPosition += 1
			}else{
				submittedRowLeft.push(submittedRow[i])
				codePegsLeft.push(game.answer[i])
			}
		}

		for (var i = 0; i < submittedRowLeft.length; i++) {
			var index = codePegsLeft.indexOf(submittedRowLeft[i])
			if (index > -1) {
				corrColorOnly += 1
				codePegsLeft.splice(index, 1)
			}
		}
		game.checkWinningStatus(correctColorOnCorrectPosition, corrColorOnly, rowID)
	},

	checkWinningStatus: (correctColorOnCorrectPosition, corrColorOnly, rowID) => {
		if (isNaN(correctColorOnCorrectPosition) || isNaN(corrColorOnly))
			throw new Error ('checkWinningStatus does not receive number-typed checked result')
		if (correctColorOnCorrectPosition == pegs) {
			alert('You win!')
			$('#codePegsContainer').modal('show')
		} else {
			alert('Correct Color on corret position: ' + correctColorOnCorrectPosition + ' | correct color on wrong position: ' + corrColorOnly)
			$(`#${rowID}btnContainer`).html(`<strong>${correctColorOnCorrectPosition}</strong> | <strong>${corrColorOnly}</strong> `)
		}
	}


};

$(document).ready(() => {
	game.start(gameDifficulty.isChallenge);
});