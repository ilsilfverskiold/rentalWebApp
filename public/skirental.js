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
}

async function retrieveLS (key) {
				const LSKey = JSON.parse(window.localStorage.getItem(key));
				const product = LSKey.product;
				const desc = LSKey.desc;
				const price1 = LSKey.price1;
				const price2 = LSKey.price2;
				const p = LSKey.people;
				const d = LSKey.days;
				const total = LSKey.total;
				if(container.classList.contains("checkoutPage")) {
					checkoutProducts (product, desc, price1, price2, p, d, total, key);
				}
				if(container.classList.contains("home")) {
					cartProducts(product,total,p,d,key);
				}
}


// FUNCTION - ADD PRODUCT TO CART
async function cartProducts(productName,total,p,d,itemName) {

	// add items to the visual cart
	addedItems += 1;
	cartBadge.innerHTML = addedItems;
	console.log(addedItems);

	// change the subtotal
	subtotal += total;

		// show the items in the cart by appending a new figure 
		const figure = document.createElement('figure');
		figure.className = "itemside mb-3";
		figure.innerHTML = "<figcaption class='info align-self-center' id='" + itemName + "'>" +
								"<p class='title'>" + productName + "</p>" +
								"<i class='fa fa-trash float-right removeFromCart'></i>" +
								"<div class='price'>" + p + " people for " + d + " days (<span class='totalForItem'>" + total +"<span>€)</div>" + "</figcaption>";
		cartProductList.appendChild(figure);
		subtotalCart.innerHTML = subtotal + "€";
}

// FUNCTION - ADD PRODUCT TO CART
async function checkoutProducts (product, desc, price1, price2, p, d, total, LSKey) {

	// change the subtotal
	subtotal += total;
	console.log(subtotal);
	subtotalCheckOut.innerHTML = "<strong>€" + subtotal + "</strong>";

		// // show the items in the cart by appending a new figure 
		const figureTR = document.createElement('tr');
	
		// // create selected P element
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
	
		// // create selected D element
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
		
		figureTR.id = LSKey;
		// // insert product figure for each items
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
		// // append figure
		productsVisualCheckOut.appendChild(figureTR);
}



// FUNCTION - ADD PRODUCT TO LS
async function addToLocal(productName,total,p,d,desc,price1,price2) {
	
	// check if itemName exists before adding it as a key
	let itemName;
	const itemNameP = "item" + addedItems;
	
	if(localStorage.getItem(itemNameP)===null){
		itemName = itemNameP;
	} if(localStorage.getItem(itemNameP)!==null) {
		itemName = itemNameP + 1;
	}
	// add it to local storage (check if exsists first)
	const item = {
    product: productName,
	desc: desc,
	price1: price1,
	price2: price2,
    people: p,
    days: d,
    total: total
	}

	window.localStorage.setItem(itemName, JSON.stringify(item));
	if(container.classList.contains("home")) {
		// ADD PRODUCT TO VISUAL CART
	cartProducts(productName,total,p,d,itemName);
	}
	
}

// FUNCTION - REMOVE PRODUCT FROM LS
async function removeFromCal(item,itemName,totalNumb) {
			subtotal -= totalNumb;
			addedItems -= 1;
				if(container.classList.contains("home")) { 
					subtotalCart.innerHTML = subtotal + "€";
					cartBadge.innerHTML = addedItems;
				}
				if(container.classList.contains("checkoutPage")) { 
					subtotalCheckOut.innerHTML = "<strong>€" + subtotal + "</strong>";
				}
			item.remove();
			window.localStorage.removeItem(itemName);
}

// FUNCTION - UPDATE LOCAL
async function updateLocal(element, key, p, d) {
	
	const LSKey = JSON.parse(window.localStorage.getItem(key));
	const product = LSKey.product;
	const productSmall = product.toLowerCase();
	const desc = LSKey.desc;
	const price1 = LSKey.price1;
	const price2 = LSKey.price2;
	const oldtotal = LSKey.total;
	
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
	
	checkoutProducts (product, desc, price1, price2, p, d, newtotal, key);
	
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
    	}
	
		// CLICK: send to reception
		if (target.className.match(/sendToReception/)) {
			const target = e.target.parentNode.children[0].children[0].children[1].value;
			const nameGuest = e.target.parentNode.children[0].children[0].children[1].value;
			const nameEmployee = e.target.parentNode.children[0].children[1].children[1].value;
			const roomNumber = e.target.parentNode.children[0].children[2].children[1].value;
			console.log(target);
			console.log(nameEmployee);
			console.log(roomNumber);
			
			// add person data it to local storage
			
			if(nameGuest == null || nameGuest == "", nameEmployee == null || nameEmployee == "", roomNumber == null || roomNumber == "") {
				checkOutWarning.style.display = "block";
			} else {
				e.target.parentNode.children[0].children[1].children[1].disabled = "disabled";
				e.target.parentNode.children[0].children[0].children[1].disabled = "disabled";
				e.target.parentNode.children[0].children[2].children[1].disabled = "disabled";
				checkOutWarning.style.display = "none";
				checkOutSuccess.style.display = "block";
				sendToReceptionButton.classList.add("disabled");
				backToShopTwoButton.classList.add("disabled");
				productsVisualCheckOut.classList.add("disabled2");
				// send info to db or other alt here
				setTimeout(function(){ 
					localStorage.clear();
					window.location.href = "/";
				}, 5000);
			}
    	}
	
}

// CLICK lISTENER
if (document.body.addEventListener){
    document.body.addEventListener('click',clickHandler,false);
} else {
    document.body.attachEvent('onclick',clickHandler); //  IE
}