import ItemsList from './ItemsList';
import React, {useState, useEffect} from 'react'
import { Link, Route, Router } from 'react-router-dom';
import CreateNewItem from './NewItem';
import EditItem from './EditItemList'


const ItemsContainer = () => {
    const [itemList, setItemList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)

        const token = localStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const url = 'https://order-api-a70z.onrender.com/api/v1/items'
        
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
            console.log(items)
            setItemList(items)
    
        } catch (error) {
            setIsError(error)
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }



    const getItem = async (id) => {
        console.log(id)
        // return(
        //     <>
        //         <Link 
        //             to={{pathname: '/editItem/param-data',
        //             state: {stateParam: item}
        //             }} >
        //         </Link>
        //     </>
        // )
    }

    const EditItem = async (id) => {
        const token = localStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        

        const url = `https://order-api-a70z.onrender.com/api/v1/items/${id}`

        try {

            const response = await fetch(url, options)

            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }

            const data = await response.json();


        } catch (error) {
            setIsError(error)
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }


    const updateItem = async (item_id, data) => {
        
        const token = localStorage.getItem('token')
        const options = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },

        }

        const url = `https://order-api-a70z.onrender.com/api/v1/items/${item_id}`

        try {

            const response = await fetch(url, options)

            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }

            const data = await response.json();

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

        const url = `https://order-api-a70z.onrender.com/api/v1/items/${item_id}`

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

    const createNewItem = async (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <>
            <button>
                <Link to="/newItem">Create new item</Link>
            </button>
            {isError && <p>Something went wrong ...</p>}
                {isLoading ? <div>Loading ...</div> :
                (
                    <ItemsList 
                        itemList={itemList} 
                        onGetItems={getItem}

                        onEditItems={EditItem}
                        onUpdateItems={updateItem}
                        onRemoveItems={removeItem}
                    />
                )
                }
        </>
    )
}

export default ItemsContainer