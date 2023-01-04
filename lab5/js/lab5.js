// Задание 1
const blockX = document.getElementById('x_header');
const blockY = document.getElementById('y_header');

function swapBlockInfo (block1, block2) {
    let tmp = block2.textContent
    block2.textContent = block1.textContent
    block1.textContent = tmp
}

blockX.onclick = () => swapBlockInfo(blockX,blockY)
blockY.onclick = () => swapBlockInfo(blockX,blockY)


// Задание 2
const a = 9;
const b = 10;
const text = document.getElementById('four_text');
text.textContent = a+" * "+b

text.onclick = () => {
	let area = a * b;
	let tmp = ' = ' + area.toString()
	if (!text.textContent.endsWith(tmp)) text.textContent += tmp
}


// Задание 3
document.getElementById('calculate').onclick = () => findMin();
if (document.cookie) hasCookies();

function findMin() {
	let form = document.forms.calculator;	// <form name="calculator"> element
	let elem = form.elements.numbers;		// <input name="numbers"> element
	let arr = elem.value.split(",").map(Number);
	let minNumber = Number.MAX_VALUE
	let maxNumber = 0
	
	for (i = 0; i < arr.length;i++) {		
		if (arr[i] < minNumber) minNumber=arr[i]
		if (arr[i] > maxNumber) maxNumber=arr[i]
	}
	
	alert(
		"Min: " + minNumber +"\n"+
		"Max: " + maxNumber
	);

	document.cookie = "Min=" + minNumber.toString();
	document.cookie = "Max=" + maxNumber.toString();
}

function hasCookies() {
	if (confirm(document.cookie + "\n" + "Save?")) {
		alert("Cookies are saved");
		let form = document.forms.calculator;	// <form name="calculator"> element
		form.elements.numbers.style.visibility = 'hidden'
		form.elements.calculate.style.visibility = 'hidden'
		// form.elements.numbers.remove()
		// form.elements.calculate.remove()
	} else {
		let cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			let eqPos = cookie.indexOf("=");
			let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
			document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}
}


// Задание 4
document.getElementsByTagName('body')[0].onload = () => {

    document.getElementById('five').style.fontWeight = localStorage.getItem("fontWeight")
    document.getElementById("checker").checked = (localStorage.getItem("radio") === 'true' )

    const cssStyles = localStorage.getItem('CSS-Styles')
    if (cssStyles === null) {
        localStorage.setItem('CSS-Styles','')
        return
    }
    const styles = cssStyles.split('$')
    for (let counter = 0; counter < styles.length; counter++) {
        if (styles[counter] === "null" || styles[counter].length < 2) {
            continue
        }
        const arr = styles[counter].split(';')
		const id =  arr[0]
		const style =  arr[1]
		const setting =  arr[2]
		addCssSetting(id,style,setting)
		alert(style)
	}
};

document.getElementById("save").onclick = () => {
   if (document.getElementById("checker").checked) {
       localStorage.setItem("fontWeight", 'bold');
       localStorage.setItem("radio", 'true');
       document.getElementById('five').style.fontWeight = 'bold'
	}
    else {
       document.getElementById('five').style.fontWeight = 'normal'
       localStorage.setItem("fontWeight", 'normal');
       localStorage.setItem("radio", 'false');
	}
}

document.getElementById("numbers").addEventListener('focus', event => {
	document.getElementById('five').style.fontWeight = 'bold'
} )


// Задание 5
let newForm = document.createElement('form')
newForm.innerHTML =
	'<br> String: <input id="string_text"> <br>'+
	'<button id="save" type="button">Apply</button>'
let table = document.createElement('table')
document.getElementById('four').append(table)

let gg = document.getElementById('gg');
gg.onclick = () => document.getElementById('two').append(newForm)

newForm[1].onclick = () => {
	const textString = newForm[0].value;
	addField(textString)
}

index = 0
function addField(textString) {
	let row = table.insertRow(index)
	let cell = row.insertCell(0)

	let textField = document.createTextNode(textString)
	cell.appendChild(textField)

	let saveButton = document.createElement('button')
	cell.appendChild(saveButton)
	saveButton.textContent = 'Save'
	saveButton.style.marginTop = '5px'
	saveButton.onclick = () => {
		const hist = '$'+ textString
		let dumpy = localStorage.getItem('text') + hist
		localStorage.setItem('text',dumpy);
	}
	index++
}