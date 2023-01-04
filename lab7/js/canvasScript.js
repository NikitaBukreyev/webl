var canvWidthReduction
var canvHeightReduction
var rectSideLen
var stepIncrease
var bgPath
var closeButtonText
var startButtonText
var stopButtonText
var reloadButtonText
var msgInit
var msgCanvasClosed
var msgAniStart
var msgBorder
var msgAniStop
var msgReload

async function readJSON() {
	const response = await fetch("config.json")
	const json = await response.json()

	canvWidthReduction = json['canvWidthReduction']
	canvHeightReduction = json['canvHeightReduction']
	rectSideLen = json['rectSideLen']
	stepIncrease = json['stepIncrease']
	
	bgPath = json['bgPath']
	
	closeButtonText = json['closeButtonText']
	startButtonText = json['startButtonText']
	stopButtonText = json['stopButtonText']
	reloadButtonText = json['reloadButtonText']
	
	msgInit = json['msgInit']
	msgCanvasClosed = json['msgCanvasClosed']
	msgAniStart = json['msgAniStart']
	msgBorder = json['msgBorder']
	msgAniStop = json['msgAniStop']
	msgReload = json['msgReload']
}
readJSON()

const storage = window.localStorage
storage.clear()

// saving old div elements for future
const divOne = document.getElementById("one")
var oldDivOneChilds = []
for (var i = 0; i < divOne.children.length; i++) {
	oldDivOneChilds.push(divOne.children[i])
}

function playButtonFunc () {
	// removing elements from first div
	while (divOne.lastChild) {
		divOne.removeChild(divOne.lastChild)
	}

	// creating shit
	var work = document.createElement("div")
	work.id = "work"
	divOne.append(work)

	var controls = document.createElement("div")
	controls.id = "controls"
	controls.width = work.offsetWidth
	controls.style.height = `${canvHeightReduction}px`
	work.append(controls)

	var textBox = document.createElement("a")
	textBox.id = "textBox"
	textBox.innerHTML = msgInit
	controls.append(textBox)

	var current = new Date()
	storage.setItem(`${storage.length}`, `${msgInit} at ${current.toLocaleString()}`)

	var buttonList = document.createElement("ul")
	buttonList.id = "buttonList"
	controls.append(buttonList)

	var liOne = document.createElement("li")
	buttonList.appendChild(liOne)
	var closeButton = document.createElement("button")
	closeButton.id = "closeButton"
	closeButton.classList.add("controlButton")
	closeButton.onclick = closeButtonFunc
	closeButton.innerHTML = closeButtonText
	liOne.appendChild(closeButton)

	var liTwo = document.createElement("li")
	liTwo.id = "liTwo"
	buttonList.appendChild(liTwo)
	var startButton = document.createElement("button")
	startButton.id = "startButton"
	startButton.classList.add("controlButton")
	startButton.onclick = startButtonFunc
	startButton.innerHTML = startButtonText
	liTwo.appendChild(startButton)

	var canvas = document.createElement("canvas")
	canvas.id = "anim"
	canvas.width = work.offsetWidth - canvWidthReduction
	canvas.height = work.offsetHeight - canvHeightReduction
	canvas.style.margin = "auto"
	canvas.style.border = "5px solid green"
	canvas.style.backgroundImage = `url(${bgPath})`
	canvas.style.backgroundPosition = "center center"
	work.append(canvas)
	
	rectX = canvas.width/2-rectSideLen/2
	rectY = canvas.height/2-rectSideLen/2

	var ctx = canvas.getContext("2d")
	ctx.fillStyle = "blue"
	ctx.fillRect(rectX, rectY, rectSideLen, rectSideLen)
}

function closeButtonFunc() {
	while (divOne.lastChild) {
		divOne.removeChild(divOne.lastChild)
	}
	for (var i = 0; i < oldDivOneChilds.length; i++) {
		divOne.append(oldDivOneChilds[i])
	}
	var current = new Date()
	storage.setItem(`${storage.length}`, `${msgCanvasClosed} at ${current.toLocaleString()}`)
	var tmpLog = ""
	for (var i = 0; i < storage.length; i++) {
		tmpLog += `${storage.getItem(i)}<br>`
	}
	document.getElementById("log").innerHTML = tmpLog
}

var maxDistance = 1
var distanceMoved = 0
var rectX = 0
var rectY = 0
var rectDir = "r"
var stopPressed = false
var reloadPressed = false
function startButtonFunc() {
	document.getElementById("liTwo").remove()

	var liTwo = document.createElement("li")
	liTwo.id = "liTwo"
	document.getElementById("buttonList").appendChild(liTwo)

	var stopButton = document.createElement("button")
	stopButton.id = "stopButton"
	stopButton.classList.add("controlButton")
	stopButton.onclick = stopButtonFunc
	stopButton.innerHTML = stopButtonText
	document.getElementById("liTwo").appendChild(stopButton)
	
	document.getElementById("textBox").innerHTML = msgAniStart
	var current = new Date()
	storage.setItem(`${storage.length}`, `${msgAniStart} at ${current.toLocaleString()}`)
	
	var canvas = document.getElementById("anim")
	var ctx = canvas.getContext("2d")

	if (reloadPressed) {
		rectX = canvas.width/2-rectSideLen/2
		rectY = canvas.height/2-rectSideLen/2
		maxDistance = 1
		distanceMoved = 0
		rectDir = "r"
	}
	stopPressed = false
	reloadPressed = false
	function move() {
		setTimeout(() => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			switch (rectDir) {
				case "r":
					rectX += 1
					ctx.fillRect(rectX, rectY, rectSideLen, rectSideLen)
					break
				case "d":
					rectY -= 1
					ctx.fillRect(rectX, rectY, rectSideLen, rectSideLen)
					break
				case "l":
					rectX -= 1
					ctx.fillRect(rectX, rectY, rectSideLen, rectSideLen)
					break
				case "u":
					rectY += 1
					ctx.fillRect(rectX, rectY, rectSideLen, rectSideLen)
					break
				}
			distanceMoved += 1
			if (distanceMoved >= maxDistance) {
				if (rectDir == "r") {rectDir = "d"}
				else if (rectDir == "d") {rectDir = "l"}
				else if (rectDir == "l") {rectDir = "u"}
				else if (rectDir == "u") {rectDir = "r"}
				maxDistance += stepIncrease
				distanceMoved = 0
			}
			if (rectY < canvas.height && rectY > -rectSideLen && !stopPressed && !reloadPressed) {move()}
			if (!(document.getElementById("reloadButton")) && 
				!(rectY+rectSideLen < canvas.height && rectY > 0)) {
					document.getElementById("textBox").innerHTML = msgBorder
					var current = new Date()
					storage.setItem(`${storage.length}`, `${msgBorder} at ${current.toLocaleString()}`)
					document.getElementById("liTwo").remove()

					var liTwo = document.createElement("li")
					liTwo.id = "liTwo"
					document.getElementById("buttonList").appendChild(liTwo)

					var reloadButton = document.createElement("button")
					reloadButton.id = "reloadButton"
					reloadButton.classList.add("controlButton")
					reloadButton.onclick = reloadButtonFunc
					reloadButton.innerHTML = reloadButtonText
					liTwo.appendChild(reloadButton)
				}
		}, 0)
	}
	move()
}

function stopButtonFunc() {
	stopPressed = true
	document.getElementById("textBox").innerHTML = msgAniStop
	var current = new Date()
	storage.setItem(`${storage.length}`, `${msgAniStop} at ${current.toLocaleString()}`)
	document.getElementById("liTwo").remove()

	var liTwo = document.createElement("li")
	liTwo.id = "liTwo"
	document.getElementById("buttonList").appendChild(liTwo)

	var startButton = document.createElement("button")
	startButton.id = "startButton"
	startButton.classList.add("controlButton")
	startButton.onclick = startButtonFunc
	startButton.innerHTML = startButtonText
	liTwo.appendChild(startButton)
}

function reloadButtonFunc() {
	reloadPressed = true
	setTimeout(() => {
		document.getElementById("liTwo").remove()

		var liTwo = document.createElement("li")
		liTwo.id = "liTwo"
		document.getElementById("buttonList").appendChild(liTwo)

		var startButton = document.createElement("button")
		startButton.id = "startButton"
		startButton.classList.add("controlButton")
		startButton.onclick = startButtonFunc
		startButton.innerHTML = startButtonText
		liTwo.appendChild(startButton)
		
		var canvas = document.getElementById("anim")
		var ctx = canvas.getContext("2d")
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.fillRect(canvas.width/2-rectSideLen/2, canvas.height/2-rectSideLen/2, rectSideLen, rectSideLen)
		document.getElementById("textBox").innerHTML = msgReload
		var current = new Date()
		storage.setItem(`${storage.length}`, `${msgReload} at ${current.toLocaleString()}`)
	}, 100)
}