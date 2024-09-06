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

async function main(){

	customersList = await fetchCustomers()
        setCustomersInList(customersList);
        setCustomersInList(customersList);
        setCustomersInList(customersList);

}



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
