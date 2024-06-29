import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'





const EditItem = (props) => {

    const [itemList, setItemList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const {id} = useParams();
    const {state} = useLocation();

    console.log("useParams ==>>", id)
    console.log("location ==>>", state)

    const editMyItem = async () => {



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

            setItemList(data.item)
          
        } catch (error) {
            setIsError(error)
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    console.log(itemList.itemName)

    useEffect(() => {
        editMyItem()
    }, [id])



    // const {itemNumber, itemName, price, quantity, madeIn} = item;
    return(
        <div>
            <h1>Edit Items here:  </h1>
            <label htmlFor='itemName'>Item name</label>
            <input id='itemName' value={itemList.itemName}/>
            <label htmlFor='price'>Price</label>
            <input id='price'/>
            <label htmlFor='quantity'>Quantity</label>
            <input id='quantity'/>

        </div>
    )
}

export default EditItem