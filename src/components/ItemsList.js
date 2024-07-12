import ItemList from './ItemList'
import styles from './ListItems.module.css'

const ItemsList = ({itemList, onGetItems, onEditItems,onUpdateItems, onRemoveItems}) => {
    return(
        <>
            
            <ul className={styles.ul}>
                {itemList.map((item) => {
                    return(
                        <>  
                            <li
                                
                                key={item.item._id}
                            >
                                <ItemList 
                                    item={item.item}
                                    onRemoveItems={onRemoveItems}
                                />
                            </li>
                        </>
                    )
                })}
            </ul>
        </>
    )
}

export default ItemsList