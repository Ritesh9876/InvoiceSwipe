import React,{useState} from 'react'
import './displayInvoices.css'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

function DisplayInvoices({invoiceList}) {
//	const {allInvoices}= UseInVoiceStore()

	

	return (
		<div className="invoiceTable-container d-flex justify-content-center mt-50">
			{/* <InvoiceDetailsDrawer
				open={invoiceDetailsDrawerOpen}
				toggleDrawer={handleInvoiceDetailsDrawer}
				invoiceDetailsDrawerData={invoiceList[activeInvoiceIndex]}
				index={activeInvoiceIndex}
			/> */}
			<table className="invoiceTable-table">
				<thead className="invoiceTable-table-head">
					<tr className="invoice-table-row">
						<th className="font_16_600 justify-content-left">Invoice No.</th>
						<th className="font_16_600 d-flex justify-content-left">Name</th>
						<th className="font_16_600 d-flex justify-content-left">Due Date</th>
						<th className="font_16_600 d-flex justify-content-left" >Client</th>
						<th className="font_16_600 d-flex justify-content-left">Price</th>
						{/* <th className="font_16_600 d-flex justify-content-left" >Status</th> */}
						<th className="font_16_600 d-flex justify-content-center" >
							<p>View</p>
						</th>
						<th className="font_16_600 d-flex justify-content-center" >
							<p>Edit</p>
						</th>
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
										//className="mr-10"
										>
											{/* <ArticleOutlinedIcon /> */}
											{currentInvoice.invoice_number}
										</div>
									</td>
									<td className="d-flex justify-content-start align-items-center">
										<p className="font_14_600 invoice-table-row-title">Name: </p>
										<p className="font_14_400">{" "}{currentInvoice.customer_name}</p>
									</td>
									<td className="d-flex justify-content-start align-items-center">
										<p className="font_14_400">
											{/* {currentInvoice.date["$D"]}/{currentInvoice.date["$M"]}/{currentInvoice.date["$y"]} */}
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

									<td className="font_14_400 d-flex justify-content-center align-items-center">
									<Link  to={`/edit?id=${currentInvoice.id}`}>
									<button
									className="btn btn-primary"
									>
										
										Edit
									</button>
									</Link>
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

//export default DisplayInvoices;



const mapStateToProps = (state) => ({
    invoiceList: state.invoiceList
    //  Use 'counter: state.counter.counter' and replace the above line if you are using combineReducers to ensure that 'counter' matches the correct key in your store.
  });
  
  const mapDispatchToProps = (dispatch) => ({
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" })
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(DisplayInvoices);