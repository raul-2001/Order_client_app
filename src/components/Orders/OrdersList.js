import ListOrder from './ListOrder'

const OrdersList = ({orderList, onRemoveOrder}) => {

    return(
        <>
            
            <ul>
                {
                    orderList.map((order) => {
                        return(
                            <>
                                <li
                                    key={order.order._id} 
                                >
                                    <ListOrder 
                                        order={order}
                                        onRemoveOrder={onRemoveOrder}
                                    />
                                </li>
                            </>
                        )
                    })
                    
                }    
            </ul>
            
        </>
    )
}

export default OrdersList