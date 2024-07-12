import ItemsList from './ItemsList';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';



const ItemsContainer = () => {
    const [itemList, setItemList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [isToken, setIsToken] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)
 
        const token = localStorage.getItem('token')

        if(token) {
            setIsToken(token)
        } else {
            return
        }

        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const url = 'https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/items'
        
        try {

            const response = await fetch(url, options)

            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }

            const data = await response.json();

            const items = data.items.map((item) => {
                const newItems = {
                    item: item
                }
                return newItems
            })
            // console.log(items)
            setItemList(items)
    
        } catch (error) {
            setIsError(error)
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }


    const deleteItem = async (item_id) => {

        const token = localStorage.getItem('token')
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const url = `https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/items/${item_id}`

        try {

            const response = await fetch(url, options)

            console.log("response =>>", response.ok)

            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }

            fetchData()
            
    
        } catch (error) {
            setIsError(error)
            // console.log(error.message)
            return null;
        } finally {
            setIsLoading(false)
        }
    }

    const removeItem = (id) => {
        const updatedList = itemList.filter(
            removeItem => removeItem.id !== id
        )

        const deletedList = itemList.filter(
            remItem => remItem.item._id === id
        )

        // console.log("deleteList => ",deletedList[0].item._id)
        const del_id = deletedList[0].item._id
        deleteItem(del_id)

        setItemList(updatedList)

    }

    useEffect(() => {
        fetchData()
    }, [isToken])

    return(
        <>
        
            {
                isToken ? (
                    <div>
                        <button><Link to="/newItem">Create new item</Link></button>
                        
                        {isError && <p>Something went wrong ...</p>}
                            {isLoading ? <div>Loading ...</div> :
                            (
                                <ItemsList 
                                    itemList={itemList} 
                                    onRemoveItems={removeItem}
                                />
                            )
                            }
                    </div>
                    
                    
                ) : (
                    <div>
                    <h1>Items</h1>
                        You must be authorized
                    </div>
                ) 
            }

        </>
    )
}

export default ItemsContainer