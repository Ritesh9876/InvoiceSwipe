import React from 'react'
import './displayInvoices.css'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

function DisplayInvoices({invoiceList}) {

	return (
			
		<div className="invoiceTable-container d-flex flex-column align-items-center justify-content-center mt-50">
			<div className="d-flex invoiceTable-header ml-10">
			<Link  to={`/edit?add=true`}>
			<Button className="fw-bold">New Invoice</Button>
			</Link>
			</div>
			<table className="invoiceTable-table">
				<thead className="invoiceTable-table-head">
					<tr className="invoice-table-row">
						<th className="font_16_600 justify-content-left">Invoice No.</th>
						<th className="font_16_600 d-flex justify-content-left">Name</th>
						<th className="font_16_600 d-flex justify-content-left">Due Date</th>
						<th className="font_16_600 d-flex justify-content-left" >Client</th>
						<th className="font_16_600 d-flex justify-content-left">Price</th>
						<th className="font_16_600 d-flex justify-content-center" >
							<p>View</p>
						</th>
						{/* <th className="font_16_600 d-flex justify-content-center" >
							<p>Edit</p>
						</th> */}
					</tr>
				</thead>
				<tbody >
					{
						[...invoiceList].map((currentInvoice, rowIndex) => {
							return (
								<tr
									key={"row" + rowIndex}
									className="invoice-table-row mt-20">
									<td className="d-flex justify-content-start align-items-center">
										<div 
										>
											{currentInvoice.invoice_number}
										</div>
									</td>
									<td className="d-flex justify-content-start align-items-center">
										<p className="font_14_600 invoice-table-row-title">Name: </p>
										<p className="font_14_400">{" "}{currentInvoice.customer_name}</p>
									</td>
									<td className="d-flex justify-content-start align-items-center">
										<p className="font_14_400">
										{currentInvoice.due_date}
										</p>
									</td>
									<td className="d-flex justify-content-start align-items-center">
										<p className="font_14_400">
											{currentInvoice.customer_email}
										</p>
									</td>
									<td className=" d-flex justify-content-start align-items-center">
										<p className="font_14_400">
											{currentInvoice.currency} {currentInvoice.total}
										</p>
									</td>
									{/* <td className="font_14_400 d-flex justify-content-start align-items-center">
										
									</td> */}
									<td className="font_14_400 d-flex justify-content-center align-items-center">
									<Link  to={`/view?id=${currentInvoice.id}`}>
									<button
									className="btn btn-primary"
									>
										
										Details
									</button>
									</Link>
									</td>

									{/* <td className="font_14_400 d-flex justify-content-center align-items-center">
									<Link  to={`/edit?id=${currentInvoice.id}`}>
									<button
									className="btn btn-primary"
									>
										
										Edit
									</button>
									</Link>
									</td> */}
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}


const mapStateToProps = (state) => ({
    invoiceList: state.invoiceList
  });
  
  const mapDispatchToProps = (dispatch) => ({
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(DisplayInvoices);