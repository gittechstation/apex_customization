// Copyright (c) 2024, Amr Basha and contributors
// For license information, please see license.txt

frappe.ui.form.on('Collector', {
	refresh: function(frm) {
		frm.disable_save()
		frm.set_query("payment_entry", function() {
			return {
				filters: [
					["Payment Entry","custom_collect_status", "in", ["Waiting Collector", "Not Collected", ""]],
					["Payment Entry","docstatus", "in", ["Draft"]]
				]
			}
		});
	},collected: function(frm) {
		frm.call('collect')
		frm.set_value("payment_entry","")
	},not_collected: function(frm) {
		frm.call('not_collected')
		frm.set_value("payment_entry","")
	}, payment_entry: function (frm) {
		if (frm.doc.payment_entry) {
			frappe.call({
				method: 'set_payment_references',
				doc: frm.doc,
				freeze: true,
				freeze_message: __('Fetching Payment Entry Details'),
				callback: function () {
					refresh_field('payment_references');
				}
			});
		}
	}
});
