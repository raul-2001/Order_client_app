import ItemList from './ItemList'
import styles from './ListItems.module.css'

const ItemsList = ({itemList, onGetItems, onEditItems,onUpdateItems, onRemoveItems}) => {

    return(
        <>
            <h1>Items</h1>
            <ul className={styles.ul}>
                {itemList.map((item) => {
                    return(
                        <>  
                            <li
                                
                                key={item.item._id}
                            >
                                <ItemList 
                                    item={item.item}
                                    onGetItems={onGetItems}
                                    onEditItems={onEditItems}
                                    onUpdateItems={onUpdateItems}
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