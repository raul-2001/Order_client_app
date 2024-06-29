import { Link } from 'react-router-dom'
import styles from './ListItems.module.css'


const ItemList = ({item, onGetItems, onEditItems,onUpdateItems, onRemoveItems}) => {

    const handleEditClick = (item) => {
        onGetItems(item._id)
        onEditItems(item._id)
    }

    const handleRemoveClick = () => {
        onRemoveItems(item._id)
    }

    const itemId = "667eaa93cb11dc0043a2bd0a"

    return(
        <>
            <li 
                className={styles.ListItem }
                key={item._id}
            >
                {item.itemName}
                <button
                    type='button'
                    onClick={() => handleEditClick(item)}
                >
                    <Link to={{pathname: `/editItem/${itemId}`,
                        state: {stateParam: item}
                        }} >
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

export default ItemList