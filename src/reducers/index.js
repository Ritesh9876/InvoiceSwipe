const initialState = {
    invoiceList:[
        {
            id:"1", // done
            due_date: "2026-10-11", //done
            invoice_date: "2021-09-01",
            invoice_number: 1, //done
            customer_name:  "John Doe", // done
            customer_email: "sam@gamil.com", // done
            customer_address: "123 Main Street", //done
            sender_name: "Sam",// done
            sender_email: "ram@gmail.com", // done
            sender_address: "123 Main Street", // done
            currency: "USD",
            subTotal: 300, //done
            discount: 40, // done
            discount_rate:10, // done
            tax_rate: 20, // done
            tax: 40, //done
            total: 300, // done
            note:"this is my money", // done
            items:[
                {
                    id: "1",
                    name: "Item 1",
                    quantity: 1,
                    price: 100,
                    description:"he needed this rice"
                },
                {
                    id: "2",
                    name: "Item 2",
                    quantity: 2,
                    price: 200,
                    description:"None of your business"
                }
            ]
        },

        {
          id:"2",
          due_date: "2021-10-01",
          invoice_date: "2021-09-01",
          invoice_number: "INV-0001",
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
          note:"this is my money",
          items:[
              {
                  id: "1",
                  name: "Item 1",
                  quantity: 1,
                  price: 100,
                  description:"he needed this rice"
              },
              {
                  id: "2",
                  name: "Item 2",
                  quantity: 2,
                  price: 200,
                  description:"None of your business"
              }
          ]
      }
    ]
  };
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
    //   case "INCREMENT":
    //     return { ...state, counter: state.counter + 1 };
    //   case "DECREMENT":
    //     return { ...state, counter: state.counter - 1 };
      case "ADD_INVOICE":
        return { ...state, invoiceList: state.invoiceList.concat(action.payload) };
      case "EDIT_INVOICE":
        console.log(action)
        return { ...state, 
            invoiceList: 
            state.invoiceList.map((invoice) => 
            invoice.id === action.payload.id ? 
            action.payload : invoice) 
        };
      case "DELETE_INVOICE":
        return { ...state,invoiceList: state.invoiceList.filter((invoice) => invoice.id !== action.payload)}
      default:
        return state;
    }
  };
  
  export default counterReducer;