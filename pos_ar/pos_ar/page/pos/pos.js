frappe.pages['pos'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'POS',
		single_column: true
	});

	$(frappe.render_template("pos" , {} )).appendTo(page.body);

	main()
}


let customersList = []
let itemGroupList = []
let itemList = []

async function main(){

	customersList = await fetchCustomers()
	itemGroupList = await fetchItemGroups()
	itemList      = await fetchItems()

	console.log("customersList : " , customersList )
	console.log("itemGroupList : " , itemGroupList )
	console.log("itemList : "      , itemList )

	setCustomersInList();
	setItemGroupsInList();
	setItemInFlow();
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



function setItemInFlow(){
	const itemsContainer_html = document.getElementById("itemsContainer");
	itemsContainer_html.innerHTML = "";

	itemList.forEach(item =>{
		const itemBox = document.createElement("div");
		itemBox.classList.add("itemBox");
		itemBox.classList.add("columnBox");
		itemBox.classList.add("C_A_Center");


		const itemImage = document.createElement("img");
		itemImage.classList.add("itemImage");
		itemBox.appendChild(itemImage);

		const itemName = document.createElement("h5");
		itemName.textContent = item.name ;
		itemName.classList.add("itemTitle");
		itemBox.appendChild(itemName);

		itemsContainer_html.appendChild(itemBox);
	});

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
			fields: ['name', 'item_name' , 'image' ],
    			filters: {}
		})

    } catch (error) {
        console.error('Error fetching Item Group :', error);
	return []
    }
}
