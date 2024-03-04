import React, {useState,useEffect} from 'react'
import { connect} from "react-redux";
import {useNavigate, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import useQuery from '../../Utils/query';
import InvoiceItem from './invoiceItem';
import InputGroup from 'react-bootstrap/InputGroup';

function EditInvoice({editInvoice,invoiceList,addInvoice}) {
    const navigate = useNavigate();
    const [invoiceDetails,setInvoiceDetails]=useState({
            id:"",
            due_date: "",
            invoice_date: new Date(),
            invoice_number: "",
            customer_name:  "",
            customer_email: "",
            customer_address: "",
            sender_name: "",
            sender_email: "",
            sender_address: "",
            currency: "",
            subTotal: "",
            discount: "",
            discount_rate:0,
            tax_rate: 0,
            tax: 0,
            total: 0,
            note:"",     
            items:[]   
    })
    const query= useQuery()
    const invoiceId=query.get("id");
    const isAdd= query.get("add")
    useEffect(() =>{
        console.log("is add is ", isAdd)
        if(invoiceId){
           [...invoiceList].forEach((invoice) =>{
            if(invoice.id===invoiceId)
            {
                setInvoiceDetails({...invoice,invoice_date: new Date().toLocaleDateString()})
            }
           })
        }
    },[invoiceId])

    const handleRowDel = (current_items) => {
        let temp_details = {...invoiceDetails}
        let index = temp_details.items.indexOf(current_items);
        const new_items= [...temp_details.items]
        new_items.splice(index, 1);
        temp_details.items=[...new_items]
        setInvoiceDetails(temp_details)
    };
    const handleAddEvent = (evt) => {
        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let temp_details = {...invoiceDetails}
        let items = {
            id: id,
            name: '',
            price: 1.00,
            description: '',
            quantity: 1
         }
         temp_details.items.push(items)
        setInvoiceDetails(temp_details)
    }
    const handleCalculateTotal = (curr_invoiceDetails) => {
        let curr_items =[...curr_invoiceDetails.items]
        
        let subTotal = 0;
        curr_items.map(function (temp_items) {
            subTotal = parseFloat(subTotal + (parseFloat(temp_items.price).toFixed(2) * parseInt(temp_items.quantity))).toFixed(2)
        });
        let current_details= {...curr_invoiceDetails} 
        let curr_tax= parseFloat(parseFloat(subTotal) * (current_details.tax_rate / 100)).toFixed(2)
        let curr_discount= parseFloat(parseFloat(subTotal) * (current_details.discount_rate / 100)).toFixed(2)
        let curr_total= ((subTotal - curr_discount) + parseFloat(curr_tax))
        current_details= {
            ...current_details,
            subTotal:parseFloat(subTotal).toFixed(2),
            tax:parseFloat(curr_tax).toFixed(2),
            discount: parseFloat(curr_discount).toFixed(2),
            total: parseFloat(curr_total).toFixed(2)
        }
        setInvoiceDetails(current_details)

    };
    const onItemizedItemEdit = (evt) => {
        const item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        console.log("this is item ",item)
      
      const temp_details= {...invoiceDetails}

        const curr_items= [...temp_details.items];

        let newItems = curr_items.map(function (temp_items) {
            let new_items = {...temp_items}
            for (let key in new_items) {
                if (key === item.name && new_items.id === item.id) {
                    new_items[key] = item.value;
                }
            }
            return new_items;
        });
      
        temp_details.items=[...newItems]
       
        handleCalculateTotal(temp_details);
    };
    const editField = (event) => {
        console.log("change ",event.target.name,event.target.value)
        let curr_invoiceDetails= {...invoiceDetails}
        curr_invoiceDetails={
            ...curr_invoiceDetails,
            [event.target.name]: event.target.value

        }
        handleCalculateTotal(curr_invoiceDetails); 
    };

   

    const onCurrencyChange = (selectedOption) => {
     let current_details= {...invoiceDetails}
     current_details={
        ...current_details,
        currency:selectedOption.currency
     }
     setInvoiceDetails(current_details)
    };

    const openModal = (event) => {
        event.preventDefault()
        if(!isAdd)
        editInvoice({...invoiceDetails},invoiceId)
        else 
        addInvoice({...invoiceDetails,id:( Math.floor(Math.random() * 999999)).toString(36)})
        navigate("/")
    };
    const closeModal = (event) => {
        let curr_invoiceDetails= {...invoiceDetails}
        curr_invoiceDetails={
            ...curr_invoiceDetails,
            isOpen:true

        }
        setInvoiceDetails(curr_invoiceDetails)
    };

    return (<Form onSubmit={openModal}>
        <Row>
            <Col md={8} lg={9}>
                <Card className="p-4 p-xl-5 my-3 my-xl-4">
                    <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-column">
                                <div className="mb-2">
                                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                                    <span className="current-date">{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                                <Form.Control type="date" value={invoiceDetails.due_date} name={"due_date"} onChange={(event) => editField(event)} style={{
                                    maxWidth: '150px'
                                }} required="required" />
                            </div>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                            <Form.Control type="number" value={invoiceDetails.invoice_number} name={"invoice_number"} onChange={(event) => editField(event)} min="1" style={{
                                maxWidth: '70px'
                            }} required="required" />
                        </div>
                    </div>
                    <hr className="my-4" />
                    <Row className="mb-5">
                        <Col>
                            <Form.Label className="fw-bold">Bill to:</Form.Label>
                            <Form.Control
                                placeholder={"Who is this invoice to?"}
                                rows={3} value={invoiceDetails.customer_name}
                                type="text"
                                name="customer_name"
                                className="my-2"
                                onChange={(event) => editField(event)}
                                autoComplete="name"
                                required="required" />

                            <Form.Control 
                            placeholder={"Email address"} 
                            value={invoiceDetails.customer_email} 
                            type="email" 
                            name="customer_email" 
                            className="my-2" 
                            onChange={(event) => editField(event)} 
                            autoComplete="email" required="required" />

                            <Form.Control 
                            placeholder={"Billing address"} 
                            value={invoiceDetails.customer_address} 
                            type="text" 
                            name="customer_address"
                            className="my-2" 
                            autoComplete="address" 
                            onChange={(event) => editField(event)} required="required" />
                        </Col>
                        <Col>
                            <Form.Label className="fw-bold">Bill from:</Form.Label>
                            <Form.Control 
                            placeholder={"Who is this invoice from?"} rows={3} 
                            value={invoiceDetails.sender_name} 
                            type="text" 
                            name="sender_name" className="my-2" 
                            onChange={(event) => editField(event)} 
                            autoComplete="name" required="required" />

                            <Form.Control 
                            placeholder={"Email address"} 
                            value={invoiceDetails.sender_email} 
                            type="email" 
                            name="sender_email" 
                            className="my-2" 
                            onChange={(event) => editField(event)} 
                            autoComplete="email" required="required" />

                            <Form.Control 
                            placeholder={"Billing address"} 
                            value={invoiceDetails.sender_address} 
                            type="text" 
                            name="sender_address" 
                            className="my-2" 
                            autoComplete="address" 
                            onChange={(event) => editField(event)} 
                            required="required" />

                        </Col>
                    </Row>
                    <InvoiceItem onItemizedItemEdit={onItemizedItemEdit} onRowAdd={handleAddEvent} onRowDel={handleRowDel} currency={invoiceDetails.currency} items={invoiceDetails.items} />
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
                    <Form.Label className="fw-bold">Notes:</Form.Label>
                    <Form.Control placeholder="Thanks for your business!" name="note" value={invoiceDetails.note} onChange={(event) => editField(event)} as="textarea" className="my-2" rows={1} />
                </Card>
            </Col>
            <Col md={4} lg={3}>
                <div className="sticky-top pt-md-3 pt-xl-4">
                    {!isAdd ?
                    <>
                            <Button variant="primary" type="submit" className="d-block w-100">Save Changes</Button>

                            <Link  to={`/edit?id=${invoiceDetails.id}&add=true`}>
                            <Button variant="primary"  className="d-block w-100 mt-10">Copy Invoice</Button>
                            </Link>
                            </>
                            :
                            <>
                            <Button variant="primary" type="submit" className="d-block w-100">Add Invoice</Button>

                            </>
                }

                    {/* <InvoiceModal showModal={invoiceDetails.isOpen} closeModal={closeModal} info={invoiceDetails} items={invoiceDetails.items} currency={invoiceDetails.currency} subTotal={invoiceDetails.subTotal} taxAmmount={invoiceDetails.taxAmmount} discountAmmount={invoiceDetails.discountAmmount} total={invoiceDetails.total} /> */}
                    <Form.Group className="mb-3 mt-10">
                        <Form.Label className="fw-bold">Currency:</Form.Label>
                        <Form.Select onChange={event => onCurrencyChange({ currency: event.target.value })} className="btn btn-light my-1" aria-label="Change Currency">
                            <option value="$">USD (United States Dollar)</option>
                            <option value="£">GBP (British Pound Sterling)</option>
                            <option value="¥">JPY (Japanese Yen)</option>
                            <option value="$">CAD (Canadian Dollar)</option>
                            <option value="$">AUD (Australian Dollar)</option>
                            <option value="$">SGD (Signapore Dollar)</option>
                            <option value="¥">CNY (Chinese Renminbi)</option>
                            <option value="₿">BTC (Bitcoin)</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label className="fw-bold">Tax rate:</Form.Label>
                        <InputGroup className="my-1 flex-nowrap">
                            <Form.Control name="tax_rate" type="number" value={invoiceDetails.tax_rate} onChange={(event) => editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00" />
                            <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                %
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label className="fw-bold">Discount rate:</Form.Label>
                        <InputGroup className="my-1 flex-nowrap">
                            <Form.Control 
                            name="discount_rate" 
                            type="number" 
                            value={invoiceDetails.discount_rate} 
                            onChange={(event) => editField(event)} 
                            className="bg-white border" 
                            placeholder="0.0" min="0.00" step="0.01" max="100.00" />
                            <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                %
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </div>
            </Col>
        </Row>
    </Form>)
}


const mapStateToProps = (state) => ({
    invoiceList: state.invoiceList
  });
  
  const mapDispatchToProps = (dispatch) => ({
    editInvoice : (params) => dispatch({type: "EDIT_INVOICE",payload:{...params}}),
    addInvoice : (params) => dispatch({type: "ADD_INVOICE",payload:{...params}})

  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditInvoice);