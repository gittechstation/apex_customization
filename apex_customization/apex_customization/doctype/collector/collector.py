# Copyright (c) 2024, Amr Basha and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Collector(Document):
	@frappe.whitelist()
	def collect(self):
		if self.payment_entry:
			frappe.db.set_value("Payment Entry",self.payment_entry,{'custom_collect_status':'Collected',
			'custom_actual_collector':frappe.session.user,'custom_actual_collection_date':frappe.utils.now()})
			frappe.msgprint("Collect Done")

	@frappe.whitelist()
	def not_collected(self):
		if self.payment_entry:
			frappe.db.set_value("Payment Entry",self.payment_entry,{'custom_collect_status':'Not Collected',
			'custom_actual_collector':frappe.session.user,
			'custom_actual_collection_date':frappe.utils.now(),'custom_reason':self.reason})
			frappe.msgprint("Not Collected")

	@frappe.whitelist()
	def set_payment_references(self):
		self.set("payment_references", [])
		payment_references_data = frappe.get_doc("Payment Entry", self.payment_entry)

		for data in payment_references_data.references:
			self.append(
				"payment_references",
				{"reference_doctype": data.reference_doctype, "reference_name": data.reference_name,
	 			"total_amount": data.total_amount,"outstanding_amount": data.outstanding_amount,
				"allocated_amount": data.allocated_amount},
			)
		return self