function newCarousel() {
	// Get amount of existing carousels
	var olAmount = document.querySelectorAll(".carousel ol").length

	// Create <li> and its content
	var li = document.createElement("li")
	li.id = `c${olAmount+1}_slide1`
	li.tabIndex = "0"
	li.classList.add("c_slide")

	var a = document.createElement("a")
	a.classList.add("s_text")
	a.textContent = document.getElementById("newText4Slide").value
	li.append(a)

	var div = document.createElement("div")
	div.classList.add("c_snapper")
	li.append(div)

	var a_prev = document.createElement("a")
	a_prev.classList.add("c_prev")
	a_prev.href = `#c${olAmount+1}_slide1`
	li.append(a_prev)

	var a_next = document.createElement("a")
	a_next.classList.add("c_next")
	a_next.href = `#c${olAmount+1}_slide1`
	li.append(a_next)

	// Creale <ol> and append <li> to it
	var ol = document.createElement("ol")
	ol.classList.add("c_viewport")
	ol.appendChild(li)

	// Create <selection> and append <ol> to it
	var selection = document.createElement("selection")
	selection.id = "carousel"
	selection.classList.add("carousel")
	selection.ariaLabel = "Gallery"
	selection.append(ol)

	// Append <selection>
	document.getElementById("four").append(selection)
}

function addSlide() {
	// Get initial data
	var olId = parseInt( document.getElementById("addCarouselId").value )
	var ol = document.querySelectorAll(".carousel ol")[olId]
	var olLen = parseInt( ol.getElementsByTagName("li").length)

	// Create <li> and its content
	var li = document.createElement("li")
	li.id = `c${olId+1}_slide${olLen+1}`
	li.tabIndex = "0"
	li.classList.add("c_slide")

	var a = document.createElement("a")
	a.classList.add("s_text")
	a.textContent = document.getElementById("addText4slide").value
	li.append(a)

	var div = document.createElement("div")
	div.classList.add("c_snapper")
	li.append(div)

	var a_prev = document.createElement("a")
	a_prev.classList.add("c_prev")
	a_prev.href = `#c${olId+1}_slide${olLen}`
	li.append(a_prev)

	var a_next = document.createElement("a")
	a_next.classList.add("c_next")
	a_next.href = `#c${olId+1}_slide1`
	li.append(a_next)

	// Append <li>
	ol.appendChild(li)

	// Edit links between slides
	ol.getElementsByTagName("li")[0].getElementsByTagName("a")[1].href = `#c${olId+1}_slide${olLen+1}`
	ol.getElementsByTagName("li")[olLen-1].getElementsByTagName("a")[2].href = `#c${olId+1}_slide${olLen+1}`
}

function editSlide() {
	var olId = document.getElementById("editCarouselId").value
	var ol = document.querySelectorAll(".carousel ol")[olId]
	var liId = document.getElementById("editSlideId").value

	ol.getElementsByTagName("li")[liId].getElementsByTagName("a")[0].innerHTML = document.getElementById("editText4slide").value
	// <ol> -> get needed <li> -> get needed <a> -> update <a> with needed <input> text
}

function deleteSlide() {
	var olId = parseInt( document.getElementById("deleteCarouselId").value )
	var ol = document.querySelectorAll(".carousel ol")[olId]
	var liIdDeleted = parseInt( document.getElementById("deleteSlideId").value )

	if (ol.getElementsByTagName("li").length == 1) {
		document.querySelectorAll(".carousel")[olId].remove()
		return
	}
	ol.getElementsByTagName("li")[liIdDeleted].remove()
	
	ol = document.querySelectorAll(".carousel ol")[olId]
	var liList = ol.getElementsByTagName("li")
	var liLen = ol.getElementsByTagName("li").length

	// BREAKS IF DELETE ID = 0, LILEN = 3

	if (liIdDeleted == 0) {
		for (var c = 0; c < liLen; c++) {
			if (c == 0) {
				liList[c].id = `c${olId+1}_slide1`
				liList[c].getElementsByTagName("a")[1].href = `#c${olId+1}_slide${liLen}`
				liList[c].getElementsByTagName("a")[2].href = `#c${olId+1}_slide2`
			} else {
				liList[c].id = `c${olId+1}_slide${c+1}`
				liList[c].getElementsByTagName("a")[1].href = `#c${olId+1}_slide${c}`
				liList[c].getElementsByTagName("a")[2].href = `#c${olId+1}_slide${c+2}`
			}
		}
	}

	else if (liIdDeleted == liLen) {
		liList[liLen-1].getElementsByTagName("a")[2].href = `#c${olId+1}_slide1`
		liList[0].getElementsByTagName("a")[1].href = `#c${olId+1}_slide${liLen}`
	} 

	else if (liIdDeleted < liLen-1) {
		console.log("in if")
		for (var c = liIdDeleted; c < liLen; c++) {
			console.log(`c = ${c}`)
			liList[c].id = `c_slide${c+1}`
			liList[c].getElementsByTagName("a")[1].href = `#c${olId+1}_slide${c}`
			liList[c].getElementsByTagName("a")[2].href = `#c${olId+1}_slide${c+2}`
		}
		liList[liLen-1].getElementsByTagName("a")[2].href = `#c${olId+1}_slide1`
		liList[0].getElementsByTagName("a")[1].href = `#c${olId+1}_slide${liLen}`
	}
}

function deleteCarousel() {
	var carId = document.getElementById("carouselId").value
	document.querySelectorAll(".carousel")[carId].remove()
}



function saveChanges() {
	var xhr = new XMLHttpRequest()
	xhr.open("POST", "http://crypto.local/save.php", true)

	var fd = new FormData()
	var carousels = document.querySelectorAll(".carousel ol")

	for (var cId = 0; cId < carousels.length; cId++) {
		for (var slideId = 0; slideId < carousels[cId].getElementsByTagName("li").length; slideId++) {
			var text = carousels[cId].getElementsByTagName("li")[slideId].getElementsByTagName("a")[0].innerHTML
			fd.append(`${cId}_${slideId}`, text)
		}
	}

	xhr.send(fd)
}