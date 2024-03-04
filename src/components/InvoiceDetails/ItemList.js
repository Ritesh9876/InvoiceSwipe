import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

const ItemList = (props) => {
    var itemTable = props.items?.map(function (item) {
        return (
            <ItemRow 
            item={item}
            key={item.id}
            />
        )
    });
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>QTY</th>
                        <th>PRICE/RATE</th>
                    </tr>
                </thead>
                <tbody>
                    {itemTable}
                </tbody>
            </Table>
        </div>
    )
}

const ItemRow = (props) => {
 

    return (
        <tr>
            <td style={{ width: '100%' }}>
            <div className="my-1 flex-nowrap">
        
        <p>Name: {props.item.name}</p>
      </div>

      <div className="my-1 flex-nowrap">

        <p>Description: {props.item.description}</p>
      </div>
            </td>
            <td style={{ minWidth: '70px' }}>
                
            <div className="my-1 flex-nowrap">
      
        <p>{props.item.quantity}</p>
      </div>

            </td>
            <td style={{ minWidth: '130px' }}>
               

            <div className="my-1 flex-nowrap">
        
        {props.item.price}
      </div>

            </td>
        </tr>
    )
}

export default ItemList