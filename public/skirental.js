// SET PRICES
// Boots are the first product and professional7 the last. Make sure you don't mess up the order
// FIX THIS W/ DATABASE INSTEAD
const boots = 6,
	helmet = 5,
	googles = 5,
	poles = 3,
	sShoes = 10,
	crampoons = 5,
	bike = 25,
	climbing = 15,
	abs = 5,
	economy1 = 16,
	economy7 = 70,
	performance1 = 30,
	performance7 = 110,
	professional1 = 40,
	professional7 = 165;

const prices = [boots,helmet,googles,poles,sShoes,crampoons,bike,climbing,abs,economy1,economy7,performance1,performance7,professional1,professional7];

// SET VARIABLES
let addedItems = 0;
let itemsInCart = 0;
let subtotal = 0;
let products = [];

// PICK UP DOM ELEMENTS
const container = document.querySelector(".container");
const cartBadge = document.querySelector(".badge-pill");
const cartProductList = document.querySelector(".productListInCart");
const productsVisualCheckOut = document.querySelector(".productsHereCheckOut");
const subtotalCart = document.querySelector(".subtotalCart");
const subtotalCheckOut = document.querySelector(".totalPrice");
const addToCart = document.querySelectorAll(".addToCart");
const nextCheckOutStep = document.querySelector(".nextStepCheckOut");
const contCheckOutButton = document.querySelector(".continueCheckout");
const backToShopOneButton = document.querySelector(".backToShopOne");
const checkOutWarning = document.querySelector(".alert-warning");
const checkOutSuccess = document.querySelector(".alert-success");
const sendToReceptionButton = document.querySelector(".sendToReception");
const backToShopTwoButton = document.querySelector(".backToShopTwo");
const sendForm = document.querySelector("#sendItems");
const firstInput = document.querySelector("#firstInput");

// HOME
if(container.classList.contains("home")) {
	
	// SET COSTS - VISUALLY
	for(let j = 0; j < prices.length; j++) {
	const priceTag = document.querySelectorAll(".productPrice")[j];
	priceTag.innerHTML = prices[j] + "€";
	}
	
	// CHECK LOCAL STORAGE
	window.addEventListener('load', (event) => {
  		console.log('page is fully loaded');
  			const arrayOfKeys = Object.keys(localStorage);
				for(let a = 0; a < arrayOfKeys.length; a++) {
					console.log(arrayOfKeys[a]);
					const key = arrayOfKeys[a];
					retrieveLS(key);
				}
	});
}

// CHECKOUT
if(container.classList.contains("checkoutPage")) {
	
	// WINDOW LOAD
	window.addEventListener('load', (event) => {
		
		// CHECK LS
		const arrayOfKeys = Object.keys(localStorage);
			for(let a = 0; a < arrayOfKeys.length; a++) {
				const key = arrayOfKeys[a];
				retrieveLS(key);
			}
	});
	
	// IF FORM SUBMITTED
	sendForm.addEventListener("submit", function() {
		
		// DISABLE ALL ELEMENTS
		checkOutWarning.style.display = "none";
		checkOutSuccess.style.display = "block";
		sendToReceptionButton.classList.add("disabled");
		backToShopTwoButton.classList.add("disabled");
		productsVisualCheckOut.classList.add("disabled2");
		
			// WAIT 5 SEC AND THEN CLEAR LS/REDIRECT BACK TO INDEX
			setTimeout(function(){ 
				localStorage.clear();
				window.location.href = "/";
			}, 5000);
		
	}, false);
}

// FUNCTION RETRIEVE LS DATA
async function retrieveLS (key) {
	
	// GET VALUES
	const LSKey = JSON.parse(window.localStorage.getItem(key)),
	product = LSKey.product,
	desc = LSKey.desc,
	price1 = LSKey.price1,
	price2 = LSKey.price2,
	p = LSKey.people,
	d = LSKey.days,
	total = LSKey.total;
	
		// DO SOMETHING WITH VALUES
		if(container.classList.contains("checkoutPage") && !(productsVisualCheckOut.classList.contains("disabled2"))) {
			checkoutProducts (product, desc, price1, price2, p, d, total, key);
		}
		if(container.classList.contains("home")) {
			cartProducts(product,total,p,d,key);
		}
		if(productsVisualCheckOut.classList.contains("disabled2")) {
			appendInputs(key,LSKey);
		}
}

// FUNCTION APPEND HIDDEN INPUTS TO END FORM
function appendInputs(key,LSKey) {
	const newInput = document.createElement('input');
	newInput.type = "hidden";
	newInput.name = key;
	newInput.value = JSON.stringify(LSKey);
	sendForm.prepend(newInput);
}


// FUNCTION - ADD PRODUCT TO CART
async function cartProducts(productName,total,p,d,itemName) {

	// ADD TO BADGE
	addedItems += 1;
	cartBadge.innerHTML = addedItems;
	console.log(addedItems);

	// CHANGE SUBTOTAL
	subtotal += total;

	// APPEND FIGURE TO CART 
	const figure = document.createElement('figure');
	figure.className = "itemside mb-3";
	figure.innerHTML = "<figcaption class='info align-self-center' id='" + itemName + "'>" +
								"<p class='title'>" + productName + "</p>" +
								"<i class='fa fa-trash float-right removeFromCart'></i>" +
								"<div class='price'>" + p + " people for " + d + " days (<span class='totalForItem'>" + total +"<span>€)</div>" + "</figcaption>";
	cartProductList.appendChild(figure);
	subtotalCart.innerHTML = subtotal + "€";
}

// FUNCTION - ADD PRODUCT TO VISUAL CHECKOUT TABLE
async function checkoutProducts (product, desc, price1, price2, p, d, total, LSKey) {

	// CHANGE SUBTOTAL BY ADDING ON THE PRODUCT TOTAL
	subtotal += total;
	console.log(subtotal);
	subtotalCheckOut.innerHTML = "<strong>€" + subtotal + "</strong>";
	
	// APPEND PRODUCT ITEM IN VISUAL CHECKOUT TABLE
	const figureTR = document.createElement('tr');
	
		// CREATE P ELEMENT
		let selectP = "<select class='form-control' id='p'>";
		for(let k = 1; k < 6; k++) {
			if(k===6) {
				selectP = selectP + "<option value='" + k + "'>" + k + "</option>" + "</select>";
			}
			if(k===Number(p)) {
			 	selectP = selectP + "<option selected value='" + k + "'>" + k + "</option>";
			} else {
				selectP = selectP + "<option value='" + k + "'>" + k + "</option>";
			}
		}
	
		// CREATE D ELEMENT
		let selectD = "<select class='form-control' id='d'>";
		for(let t = 1; t < 12; t++) {
			if(t===12) {
				selectD = selectD + "<option value='" + t + "'>" + t + "</option>" + "</select>";
			}
			if(t===Number(d)) {
			 	selectD = selectD + "<option selected value='" + t + "'>" + t + "</option>";
			} else {
				selectD = selectD + "<option value='" + t + "'>" + t + "</option>";
			}
		}
		
		// SET ID TO THE ELEMENT - SO IT CAN BE IDENTIFIED AND MATCHED WITH LS KEYS
		figureTR.id = LSKey;
		figureTR.innerHTML = "<td>" +
									"<figure class='itemside align-items-center'>" +
										"<figcaption class='info'>" +
										"<a href='#' class='title text-dark'>"+ product +"</a>" +
										"<p class='text-muted small'>"+ desc +"</p>" +
										"</figcaption>" +
									"</figure>" +
								"</td>" +
								"<td>" +
									selectP +
								"</td>" +
								"<td>" +
									selectD +
								"</td>" +
								"<td>" +
									"<p class='alignCenter'><i class='fas fa-sync-alt updateCheckOut'></i></p>" +
								"</td>" +
								"<td>" +
									"<div class='price-wrap'>" +
										"<var class='price'>€" + total + "</var><br>" +
										"<small class='text-muted'> "+ total/p +" x " + p + "</small>" +
									"</div> <!-- price-wrap .// -->" +
								"</td>" +
								"<td class='text-right d-none d-md-block'>" +
									"<a href='#' class='btn btn-light removeFromCheckout'> Remove</a>" +
								"</td>";
		// APPEND THE ELEMENT TO THE TABLE
		productsVisualCheckOut.appendChild(figureTR);
}



// FUNCTION - ADD PRODUCT TO LS
async function addToLocal(productName,total,p,d,desc,price1,price2) {
	
	let itemName;
	const itemNameP = "item" + addedItems;
	
		// CHECK IF THE KEY NAME ALREADY EXSIST 
		if(localStorage.getItem(itemNameP)===null){
			itemName = itemNameP;
		} if(localStorage.getItem(itemNameP)!==null) {
			itemName = itemNameP + 1;
		}
	
	// SET ITEM
	const item = {
		product: productName,
		desc: desc,
		price1: price1,
		price2: price2,
		people: p,
		days: d,
		total: total
	}
	
	// SEND ITEM TO LS 
	window.localStorage.setItem(itemName, JSON.stringify(item));
	
	// IF AT INDEX PAGE
	if(container.classList.contains("home")) {
		// ALSO ADD PRODUCT TO VISUAL CART
		cartProducts(productName,total,p,d,itemName);
	}
	
}

// FUNCTION - REMOVE PRODUCT FROM LS
async function removeFromCal(item,itemName,totalNumb) {
	
	// CHANGE SUBTOTAL AND HOW MANY ITEMS HAVE BEEN ADDED 
	subtotal -= totalNumb;
	addedItems -= 1;
	
		// DIFFERENT ACTIONS ON DIFFERENT PAGES
		if(container.classList.contains("home")) { 
			subtotalCart.innerHTML = subtotal + "€";
			cartBadge.innerHTML = addedItems;
		}
	
		if(container.classList.contains("checkoutPage")) { 
			subtotalCheckOut.innerHTML = "<strong>€" + subtotal + "</strong>";
		}
	
		// ALWAYS REMOVE ITEM AND ROW FROM LOCAL STORAGE
		item.remove();
		window.localStorage.removeItem(itemName);
}

// FUNCTION - UPDATE LS
async function updateLocal(element, key, p, d) {
	
	const LSKey = JSON.parse(window.localStorage.getItem(key)),
	product = LSKey.product,
	productSmall = product.toLowerCase(),
	desc = LSKey.desc,
	price1 = LSKey.price1,
	price2 = LSKey.price2,
	oldtotal = LSKey.total;
	
	element.remove();
	subtotal -= oldtotal;
	subtotalCheckOut.innerHTML = "<strong>€" + subtotal + "</strong>";
	
	// New variable with total
	let newtotal;
	
	// if ski set look for two product prices
		if(productSmall.includes("ski set")) {
			if(d > 5) {
				const rest = d%6;
				const first = price2*p;
				const second = rest*price1*p;
				newtotal =  Number(first) + Number(second);
			} else {
				newtotal = price1*d*p;
			}
			// just look for one price but multiply the second one by 6
		} else {
			newtotal = p*d*price1;
		}
	
	// add it to local storage
	const item = {
		product: product,
		desc: desc,
		price1: price1,
		price2: price2,
		people: p,
		days: d,
		total: newtotal
	}

	window.localStorage.setItem(key, JSON.stringify(item));
	
	if(container.classList.contains("checkoutPage")) { 
			checkoutProducts (product, desc, price1, price2, p, d, newtotal, key);
	}
	
	
}

// FUNCTION - CLICK HANDLER
function clickHandler(e){

	// pick up target click event
    e = e || window.event;
    const target = e.target || e.srcElement;

    	// CLICK: addToCart
    	if (target.className.match(/addToCart/)) {
			
	        const target = e.target;
	        // get product name / desc
	        const product = target.parentNode.childNodes[1].textContent
			const productSmall = product.toLowerCase();
			const desc = target.parentNode.childNodes[3].textContent;
			// declare variables
			let total;
			let price1;
			let price2;

			// pick up people and days input values
			const p = target.parentNode.childNodes[5].value;
			const d = target.parentNode.childNodes[7].value;

			// if ski set look for two product prices
			if(productSmall.includes("ski set")) {
				const textPrice1 = target.parentNode.childNodes[3].firstChild.firstChild.textContent;
				price1 = textPrice1.match(/(\d+)/)[0]; 
				const textPrice2 = target.parentNode.childNodes[3].firstChild.childNodes[2].textContent;
				price2 = textPrice2.match(/(\d+)/)[0];
				if(d > 5) {
					const rest = d%6;
					const first = price2*p;
					const second = rest*price1*p;
					total =  Number(first) + Number(second);
				} else {
					total = price1*d*p;
				}
			// just look for one price but multiply the second one by 6
			} else {
				const textPrice = target.parentNode.childNodes[3].firstChild.firstChild.textContent;
				price1 = textPrice.match(/(\d+)/)[0];
				price2 = price1*6;
				total = p*d*price1;
			}

			// check if they inserted numbers or not
			if(isNaN(p) || isNaN(d)) {
				alert("Please choose for the number of people and the days they will rent for. P = People, D = Days.");

			// if everything is picked up alright you can use the values here
			} else {
				addToLocal(product,total,p,d,desc,price1,price2);
			}
    	}

    	// CLICK: trash can in cart
    	if (target.className.match(/removeFromCart/)) {
	        const item = e.target.parentNode;
	        const itemName = item.id;
	  		const getTotal = e.target.parentNode.childNodes[2].childNodes[1].textContent;
	  		const totalNumb = getTotal.match(/(\d+)/)[0];
			removeFromCal(item,itemName,totalNumb);
    	}

		// CLICK: remove from checkout
    	if (target.className.match(/removeFromCheckout/)) {
	        const item = e.target.parentNode.parentNode;
	        const itemName = item.id;
			const itemTotal = Number(e.target.parentNode.parentNode.childNodes[4].childNodes[0].childNodes[0].textContent.match(/(\d+)/)[0]);
				// change the subtotal
			removeFromCal(item,itemName,itemTotal)
    	}

    	// CLICK: update price in checkout
    	if (target.className.match(/updateCheckOut/)) {
			const item = e.target.parentNode.parentNode.parentNode;
	        const itemName = item.id;
			const p = e.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].value;
			const d = e.target.parentNode.parentNode.parentNode.childNodes[2].childNodes[0].value;
			if(itemName.includes("item")) {
				updateLocal(item, itemName, p, d);
			}
    	}
		
		// CLICK: continue checkout
		if (target.className.match(/continueCheckout/)) {
			nextCheckOutStep.style.display = "block";
			backToShopOneButton.classList.add("disabled");
			contCheckOutButton.classList.add("disabled");
			productsVisualCheckOut.classList.add("disabled2");
			const arrayOfKeys = Object.keys(localStorage);
				for(let a = 0; a < arrayOfKeys.length; a++) {
					console.log(arrayOfKeys[a]);
					const key = arrayOfKeys[a];
					const LSKey = JSON.parse(window.localStorage.getItem(key));
					const product = LSKey.product;
					products.push(product);
					retrieveLS(key);
				}
			setTimeout(function(){ 
				appendInputs("Subtotal",subtotal);
				appendInputs("Products",products);
			}, 2000);
			
    	}
	
}

// CLICK lISTENER
if (document.body.addEventListener){
    document.body.addEventListener('click',clickHandler,false);
} else {
    document.body.attachEvent('onclick',clickHandler); //  IE
}