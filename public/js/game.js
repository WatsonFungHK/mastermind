const colorSet = ['#00534e', '#ff9900', '#ffdf55', '#0088b2', '#810000', '#8265a1'];

const gameDifficulty = {
	"isEasy": colorSet.length * 2.5, 
	"isStandard": colorSet.length * 2,
	"isChallenge": colorSet.length * 1.5,
	"isMaster": colorSet.length / 2 + 2 + 1
};

const pegs = 4;

const game = {


	start: (difficulty) => {
		game.generateCodePegs()
		game.addRows(difficulty || gameDifficulty.isChallenge)
		game.play()
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
		game.setColorForCodePegs()
	},

	addRows: (difficulty) => {
		var rowsHTML
		var rows = difficulty
		for (var i = 0; i < rows; i++){
			rowsHTML = '<div class=row>';
			for(var j = 0; j < pegs; j++){
				rowsHTML += `<span class="box enable row${i}" id="row${i}box${j}"></span>`;
			}
			rowsHTML += `<div id=row${i}btnContainer style="width: 40px;heigth: 40px"><button class=submitBtn id=row${i}>Check</button> </div></div>`
			$('#rowContainer').append(rowsHTML)
		}
	},

	randColor: () => {
		var hexCode = Math.floor(Math.random() * colorSet.length)
		if (!colorSet[hexCode]) throw new Error ('cannot generate color for code pegs')
		return colorSet[hexCode]
	},

	setColorForCodePegs: () => {
		for (var i = 0; i < pegs; i++){
			$(`#codePegBox${i}`).css("background-color", $(`#codePegBox${i}`).attr('color'))
		}
	},

	play:  () => {
		// box change color on click
		$(".box.enable").click( function() {
			var boxId = $(this).attr('id')
			var currColor = colorSet.indexOf(rgb2hex($('#'+boxId).css("background-color")))
			// if (!currColor) console.log("failed to access current color of "+boxId );
			var newColor = colorSet[(currColor + 1 ) % colorSet.length]
			// if (!newColor) console.log("failed to get next color");
			$('#'+boxId).css("background-color", newColor)
		})

		
	}	

};

$(document).ready(() => {
	game.start(gameDifficulty.isChallenge);
});