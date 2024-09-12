// Copyright (c) 2016, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.query_reports["New Serial No Ledger"] = {
	filters: [
		{
			label: __("Item Code"),
			fieldtype: "Link",
			fieldname: "item_code",
			options: "Item",
			get_query: function () {
				return {
					filters: {
						has_serial_no: 1,
					},
				};
			},
		},
		{
			label: __("Warehouse"),
			fieldtype: "Link",
			fieldname: "warehouse",
			options: "Warehouse",
			get_query: function () {
				let company = frappe.query_report.get_filter_value("company");

				if (company) {
					return {
						filters: {
							company: company,
						},
					};
				}
			},
		},
		{
			label: __("Serial No"),
			fieldtype: "Link",
			fieldname: "serial_no",
			options: "Serial No",
		
		},
		{
			label: __("As On Date"),
			fieldtype: "Date",
			fieldname: "posting_date",
			default: frappe.datetime.get_today(),
		},
		{
			label: __("Posting Time"),
			fieldtype: "Time",
			fieldname: "posting_time",
			default: frappe.datetime.get_time(),
		},
		{
			label: __("Party Type"),
			fieldtype: "Link",
			fieldname: "party_type",
			options: "DocType",
			get_query: function () {
	
					return {
						filters: {
							name:["IN",[ "Supplier","Customer"]],
						},
					};
				
			},
		},
		{
			label: __("Party"),
			fieldtype: "Dynamic Link",
			fieldname: "party",
			options: "party_type",
		},
	],
};

