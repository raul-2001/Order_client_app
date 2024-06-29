import { Link } from 'react-router-dom'
const ListOrder = ({order, onGetOrder, onUpdateOrder, onRemoveOrder}) => {

    const handleEditClick = (order) => {  
        onGetOrder(order)
    }

    const handleRemoveClick = () => {
        onRemoveOrder(order.order._id)
    }


    return(
        <>
            <li
                key={order.order._id} 
            >
                <span>{order.order.orderNumber}</span>
                <br />
                <span>{order.order._id}</span>
                <br />
                <span>{order.order.orderStatus}</span>
                <br />
                <button
                    type='button'
                    onClick={() => handleEditClick(order)}
                >
                    <Link key={order.order._id} to="#">
                        Edit
                    </Link>
                    
                </button>
                <button
                    type='button'
                    onClick={handleRemoveClick}
                >
                    Remove
                </button>
                
            </li>
        </>
    )
}

export default ListOrder