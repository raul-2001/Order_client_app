import { Link } from 'react-router-dom'
import EditOrder from './EditOrder'
import { useEffect } from 'react'



const ListOrder = ({order, onRemoveOrder}) => {

    const {_id, orderNumber, orderStatus, items} = order.order
    
    const handleRemoveClick = () => {
        onRemoveOrder(_id)
    }


    return(
        <>
            <li
                key={_id} 
            >
                <span>{orderNumber}--</span>
                <br />
                <span>{_id}--</span>
                <br />
                <span>{orderStatus}--</span>
                <br />
                
                {/* <span>{items}--</span> */}
                <button
                    type='button'
                >
                    <Link key={_id}  to={{pathname: `/editOrder/${_id}`}}>
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