import React,{useEffect, useState} from 'react'
import { connect} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import useQuery from '../../Utils/query';
import ItemList from './ItemList';
import InvoiceModal from '../InvoiceModal.js'


function InvoiceDetails({invoiceList,deleteInvoice}) {
    const navigate = useNavigate();
    const [invoiceDetails, setInvoiceDetails] = useState([]);
    const [isOpen,setIsOpen]=useState(false)
    const query= useQuery()
    const invoiceId=query.get("id");

    useEffect(() =>{
        if(invoiceId){
            [...invoiceList].forEach((invoice) =>{
             if(invoice.id===invoiceId)
             {
                 setInvoiceDetails({...invoice})
             }
            })
         }
    },[invoiceId])

    const handleInvoiceDelete = () =>{
        deleteInvoice({id:invoiceId})
        navigate("/")
    }
    const openModal = (event) => {
        event.preventDefault()
        setIsOpen(true)
      };
    const  closeModal = (event) => setIsOpen(false);
  return (
    <div>
        <Row>
            <Col md={8} lg={9}>
                <Card className="p-4 p-xl-5 my-3 my-xl-4">
                    <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-column">
                                {/* <div className="mb-2">
                                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                                    <span className="current-date">{new Date().toLocaleDateString()}</span>
                                </div> */}
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>

                                <p>{invoiceDetails.due_date}</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                            <p>{invoiceDetails.invoice_number}</p>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <Row className="mb-5">
                        <Col>
                        <span className="fw-bold me-2">Bill To:</span>

                            <p>Name: { invoiceDetails.customer_name}</p>
                            <p>Email: {invoiceDetails.customer_email}</p>
                            <p>Address: {invoiceDetails.customer_address}</p>
                          
                        </Col>
                        <Col>
                        <span className="fw-bold me-2">Bill From:</span>

                        <p>Name: { invoiceDetails.sender_name}</p>
                        <p>Email: {invoiceDetails.sender_email}</p>
                        <p>Address: {invoiceDetails.sender_address}</p>

                        </Col>
                    </Row>
                    <ItemList
                        items={invoiceDetails.items}
                    />
                    <Row className="mt-4 justify-content-end">
                        <Col lg={6}>
                            <div className="d-flex flex-row align-items-start justify-content-between">
                                <span className="fw-bold">Subtotal:
                                </span>
                                <span>{invoiceDetails.currency}
                                    {invoiceDetails.subTotal}</span>
                            </div>
                            <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                <span className="fw-bold">Discount:</span>
                                <span>
                                    <span className="small ">({invoiceDetails.discount_rate || 0}%)</span>
                                    {invoiceDetails.currency}
                                    {invoiceDetails.discount || 0}</span>
                            </div>
                            <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                <span className="fw-bold">Tax:
                                </span>
                                <span>
                                    <span className="small ">({invoiceDetails.tax_rate || 0}%)</span>
                                    {invoiceDetails.currency}
                                    {invoiceDetails.tax || 0}</span>
                            </div>
                            <hr />
                            <div className="d-flex flex-row align-items-start justify-content-between" style={{
                                fontSize: '1.125rem'
                            }}>
                                <span className="fw-bold">Total:
                                </span>
                                <span className="fw-bold">{invoiceDetails.currency}
                                    {invoiceDetails.total || 0}</span>
                            </div>
                        </Col>
                    </Row>
                    <hr className="my-4" />
                    <span className="fw-bold me-2">Note:</span>

                    <p>{ invoiceDetails.note}</p>
                </Card>
            </Col>
            <Col md={4} lg={3}>
            <InvoiceModal showModal={isOpen} 
            closeModal={closeModal} 
            info={invoiceDetails} 
            items={invoiceDetails.items} 
            currency={invoiceDetails.currency} 
            subTotal={invoiceDetails.subTotal} 
            taxAmmount={invoiceDetails.tax} 
            discountAmmount={invoiceDetails.discount} 
            total={invoiceDetails.total}/>

                <div className="sticky-top pt-md-3 pt-xl-4">
                    <Button
                     variant="primary" className="d-block w-100"
                    onClick={e => {openModal(e)}}
                    >
                            Download Invoice
                    </Button>
                <Link  to={`/edit?id=${invoiceDetails.id}`}>
                    <Button variant="primary" className="d-block w-100 mt-10">Edit Invoice</Button>
                    </Link>
                    <Button variant="primary"  
                    onClick={() =>{handleInvoiceDelete()}}

                    className="btn-danger d-block w-100 mt-10">Delete Invoice</Button>

                    

                    <p className="mt-40"><span className="fw-bold me-2">Currency:</span> { invoiceDetails.currency}</p>
                   

                    <p className="mt-20"><span className="fw-bold me-2">Tax Rate:</span> { invoiceDetails.tax_rate}</p>
                    <p className="mt-10"><span className="fw-bold me-2">Discount Rate:</span> { invoiceDetails.discount_rate}</p>

                </div>
            </Col>
        </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({
    invoiceList: state.invoiceList
  });
  
  const mapDispatchToProps = (dispatch) => ({
    deleteInvoice : (params) => dispatch({type: "DELETE_INVOICE", payload: params})
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetails);