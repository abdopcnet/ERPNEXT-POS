frappe.pages['pos'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'POS',
		single_column: true
	});

	$(frappe.render_template("pos" , {} )).appendTo(page.body);

	main()
}


let customersList    = []
let itemGroupList    = []
let itemList         = []
let itemPrices       = []
let priceLists       = []
let selectedItemMap = new Map();

async function main(){

	customersList = await fetchCustomers()
	itemGroupList = await fetchItemGroups()
	itemList      = await fetchItems()
	itemPrices    = await fetchItemPrice()
	priceLists    = await fetchPriceList()

	console.log("customersList : " , customersList )
	console.log("itemGroupList : " , itemGroupList )
	console.log("itemList : "      , itemList )
	console.log("itemPrices : "    , itemPrices )
	console.log("priceLists : "    , priceLists )


	setCustomersInList();
	setItemGroupsInList();

	document.getElementById("ItemGroupInput").addEventListener('input' , function(event){
		setItemInFlow(getItemByItemGroup(event.target.value));
	});

}










/******************************  update the UI ***********************************/

function setCustomersInList(){

	const customerList_html = document.getElementById("CustomerList");
	customerList_html.innerHTML = "" ;

	customersList.forEach(customer =>{
		const option = document.createElement("option");
		option.value = customer.name;
		option.textContent = customer.customer_name;
		customerList_html.appendChild(option);
	})
}

function setItemGroupsInList(){

	const groupItemList_html = document.getElementById("ItemGroupList");
	groupItemList_html.innerHTML = "" ;

	itemGroupList.forEach(group_item =>{
		console.log("item : " , group_item )

		const option = document.createElement("option");
		option.value = group_item.name;
		option.textContent = group_item.customer_name;
		groupItemList_html.appendChild(option);
	})

}



function setItemInFlow(filtered_item_list){
	const itemsContainer_html = document.getElementById("itemsContainer");
	itemsContainer_html.innerHTML = "";

	filtered_item_list.forEach(item =>{
		const itemBox = document.createElement("div");
		itemBox.classList.add("itemBox");
		itemBox.classList.add("columnBox");
		itemBox.classList.add("C_A_Center");

		itemBox.addEventListener('click' , function(event){
			itemClick(item);
			setSelectedItem();
		});



		if(item.image){
			const itemImage = document.createElement("img");
			itemImage.classList.add("itemImage");
			itemImage.src = item.image
			itemBox.appendChild(itemImage);
		}
		else{
			const itemImageHolder = document.createElement("div");
			itemImageHolder.classList.add("itemImage");
			itemImageHolder.classList.add("rowBox");
			itemImageHolder.classList.add("centerItem");
			const firstLatter = document.createElement("h1");
			firstLatter.textContent = item.name[0];
			firstLatter.style.color = "#707070";
			itemImageHolder.appendChild(firstLatter);
			itemBox.appendChild(itemImageHolder);
		}

		const itemName = document.createElement("h5");
		itemName.textContent = item.name ;
		itemName.classList.add("itemTitle");
		itemBox.appendChild(itemName);

		itemsContainer_html.appendChild(itemBox);
	});

}

function setSelectedItem(){


	const selectedItemsContainer = document.getElementById("selectedItemsContainer");
	selectedItemsContainer.innerHTML = "";

	selectedItemMap.forEach((item,itemId) =>{
		const itemElement   = document.createElement("div");
		const leftGroup     = document.createElement("div");
		const rightGroup    = document.createElement("div");
		const itemName      = document.createElement("h5") ;
		const itemQuantity  = document.createElement("div") ;
		const itemPrice     = document.createElement("div") ;

		//image
		//check if there is an image or not
		if(item.image){
			const itemImage   = document.createElement("img");
			itemImage.src = item.image ;
			itemImage.classList.add("selectedItemImage");
			leftGroup.appendChild(itemImage);
		}else{
			const itemImageHolder = document.createElement("div");
			const itemImageLatter = document.createElement("h4");

			itemImageHolder.classList.add("selectedItemImage" , "rowBox" , "centerItem");

			itemImageLatter.textContent = item.name[0]
			itemImageLatter.style.padding = "10px 0px 0px 0px"
			itemImageHolder.appendChild(itemImageLatter);
			leftGroup.appendChild(itemImageHolder);
		}

		//name
		itemName.textContent = item.name;
		itemName.classList.add("selectedItemName");
		leftGroup.appendChild(itemName);

		//quantity
		itemQuantity.textContent = item.quantity
		itemQuantity.classList.add("itemQuantity");
		rightGroup.appendChild(itemQuantity);
		//price
		itemPrice.textContent = getItemPrice(item.name) + " DA"
		itemPrice.classList.add("itemPrice");
		rightGroup.appendChild(itemPrice);

		//leftGroup
		leftGroup.classList.add("rowBox" , "row_align_center" , "leftGroup")
		itemElement.appendChild(leftGroup);

		//rightGroup
		rightGroup.classList.add("rowBox" , "row_align_center" , "rightGroup")
		itemElement.appendChild(rightGroup);


		//item
		itemElement.classList.add("rowBox" , "row_align_center" , "row_sbtw" , "ItemElement");

		selectedItemsContainer.appendChild(itemElement);
	})


}







/******************************* Tools  *************************************/


function getItemByItemGroup(item_group){

	let filtredItemList = [];

	console.log("starting getItemByGroup FUN : " , item_group)

	itemList.forEach(item =>{
		if(item.item_group == item_group){
			filtredItemList.push(item);
		}
	})

	return filtredItemList;
}

function getItemPrice(itemId){

	const price = itemPrices.find(itemPrice => itemPrice.item_code == itemId)

	return price ? price.price_list_rate  : 0
}


function itemClick(item){
	const cart = document.getElementById("CartBox");

	if(!selectedItemMap.has(item.name)){
		item.quantity = 1 ;
		selectedItemMap.set( item.name  , item);
	}
	else{
		const existingItem = selectedItemMap.get(item.name);
		existingItem.quantity += 1 ;
		selectedItemMap.set( item.name  , existingItem);
	}

}



/*********************  get data functions ******************************/

async function fetchCustomers() {
    try {
	return await frappe.db.get_list('Customer', {
			fields: ['name', 'customer_name' ],
    			filters: {}
		})

    } catch (error) {
        console.error('Error fetching customers:', error);
	return []
    }
}

async function fetchItemGroups() {
    try {
	return await frappe.db.get_list('Item Group', {
			fields: ['name', 'item_group_name' ],
    			filters: {}
		})

    } catch (error) {
        console.error('Error fetching Item Group :', error);
	return []
    }
}

async function fetchItems() {
    try {
	return await frappe.db.get_list('Item', {
			fields: ['name', 'item_name' , 'image' , 'item_group' ],
    			filters: {}
		})

    } catch (error) {
        console.error('Error fetching Item Group :', error);
	return []
    }
}

async function fetchItemPrice() {
    try {
	return await frappe.db.get_list('Item Price', {
			fields: ['name', 'item_code' , 'item_name' , 'price_list', 'price_list_rate' ],
    			filters: { price_list : "Standard Selling"}
		})

    } catch (error) {
        console.error('Error fetching Item Group :', error);
	return []
    }
}


async function fetchPriceList() {
    try {
	return await frappe.db.get_list('Price List', {
			fields: ['name', 'price_list_name' , 'currency' ],
    			filters: {}
		})

    } catch (error) {
        console.error('Error fetching Item Group :', error);
	return []
    }
}
