import ListOrder from './ListOrder'

const OrdersList = ({orderList, onGetOrder, onUpdateOrder, onRemoveOrder}) => {

    // console.log("orderList ==>>",orderList.order)
    return(
        <>
            <h1>Orders</h1>
            <ul>
                {
                    orderList.map((order) => {
                        return(
                            <>
                                <li
                                    key={order._id} 
                                >
                                    <ListOrder 
                                        order={order}
                                        onGetOrder={onGetOrder}
                                        onUpdateOrder={onUpdateOrder}
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