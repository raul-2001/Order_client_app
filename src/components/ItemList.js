import { Link } from 'react-router-dom'
import styles from './ListItems.module.css'


const ItemList = ({item, onRemoveItems}) => {

    const handleRemoveClick = () => {
        onRemoveItems(item._id)
    }

    return(
        <>
            <li 
                className={styles.ListItem }
                
            >
                <div>
                    {item._id}
                    ---
                </div>
                <hr />
                {item.itemName}
                <button
                    type='button'
                    
                >
                    <Link to={{pathname: `/editItem/${item._id}`,
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