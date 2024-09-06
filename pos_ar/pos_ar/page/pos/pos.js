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

async function main(){

	customersList = await fetchCustomers()
	itemGroupList = await fetchItemGroups()

	console.log("customersList : " , customersList )
	console.log("itemGroupList : " , itemGroupList )

	setCustomersInList(customersList);
	setItemGroupsInList(itemGroupList);
}










/******************************  update the UI ***********************************/

function setCustomersInList(customers){

	const customerList_html = document.getElementById("CustomerList");
	customerList_html.innerHTML = "" ;

	customers.forEach(customer =>{
		const option = document.createElement("option");
		option.value = customer.name;
		option.textContent = customer.customer_name;
		customerList_html.appendChild(option);
	})
}

function setItemGroupsInList(group_items){

	const groupItemList_html = document.getElementById("ItemGroupList");
	groupItemList_html.innerHTML = "" ;

	console.log("in function itemGroupList : " , itemGroupList )

	group_items.forEach(group_item =>{
		console.log("item : " , group_item )

		const option = document.createElement("option");
		option.value = group_item.name;
		option.textContent = group_item.customer_name;
		groupItemList_html.appendChild(option);
	})

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
			fields: ['name', 'item_name' ],
    			filters: {}
		})

    } catch (error) {
        console.error('Error fetching Item Group :', error);
	return []
    }
}
