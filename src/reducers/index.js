const initialState = {
    invoiceList:[
        {
            id:"1", 
            due_date: "2026-10-11",
            invoice_date: "2021-09-01",
            invoice_number: 1, 
            customer_name:  "John Doe",
            customer_email: "sam@gamil.com", 
            customer_address: "123 Main Street",
            sender_name: "Sam",
            sender_email: "ram@gmail.com", 
            sender_address: "123 Main Street", 
            currency: "USD",
            subTotal: 300, 
            discount: 40, 
            discount_rate:10, 
            tax_rate: 20,
            tax: 40, 
            total: 300, 
            note:"this is you due payment", 
            items:[
                {
                    id: "1",
                    name: "Item 1",
                    quantity: 1,
                    price: 100,
                    description:"rice"
                },
                {
                    id: "2",
                    name: "Item 2",
                    quantity: 2,
                    price: 200,
                    description:"business"
                }
            ]
        },

        {
          id:"2",
          due_date: "2021-10-01",
          invoice_date: "2021-09-01",
          invoice_number: 2,
          customer_name:  "John Doe",
          customer_email: "sam@gamil.com",
          customer_address: "123 Main Street",
          sender_name: "Sam",
          sender_email: "ram@gmail.com",
          sender_address: "123 Main Street",
          currency: "USD",
          subtotal: 300,
          discount: 40,
          discount_rate:10,
          tax_rate: 20,
          tax: 40,
          total: 300,
          note:"require action",
          items:[
              {
                  id: "1",
                  name: "Item 1",
                  quantity: 1,
                  price: 100,
                  description:"cake"
              },
              {
                  id: "2",
                  name: "Item 2",
                  quantity: 2,
                  price: 200,
                  description:"sharp"
              }
          ]
      }
    ]
  };
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_INVOICE":
        return { ...state, invoiceList: state.invoiceList.concat(action.payload) };
      case "EDIT_INVOICE":
        
        return { ...state, 
            invoiceList: 
            state.invoiceList.map((invoice) => 
            invoice.id === action.payload.id ? 
            action.payload : invoice) 
        };
      case "DELETE_INVOICE":
        return { ...state,invoiceList: state.invoiceList.filter((invoice) => invoice.id !== action.payload.id)}
      default:
        return state;
    }
  };
  
  export default counterReducer;