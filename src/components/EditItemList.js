import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate  } from "react-router-dom";

const EditItem = () => {

    const [itemList, setItemList] = useState([])
    const [isError, setIsError] = useState(false)

    const {id} = useParams();
    const navigate = useNavigate();
    // console.log("useParams ==>>", id)



    const editMyItem = async () => {

        const token = localStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
           
        const url = `https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/items/${id}`
    
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
        }
    }

    useEffect(() => {
        editMyItem()
    }, [id])

    const handleInputChange = ((e) => {
        const value = e.target.value
        setItemList({...itemList, [e.target.name]: value})
    })
    

    const updateItem = async () => {

        const {_id, price, itemName, quantity, madeIn} = itemList
        const body = JSON.stringify({price, itemName, quantity, madeIn}) 

        const token = localStorage.getItem('token')
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: body
        }

        // console.log("update item list ", price)
        const url = `https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/items/${_id}`

        try {

            const response = await fetch(url, options)
            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }

            const data = await response.json();
            // console.log("data", data)
            navigate("/items")
        } catch (error) {
            setIsError(error)
            console.log(error.message)
        }
    }


    const handleUpdate = useCallback((e) => {

        e.preventDefault()
        
        try {
            
            updateItem()
        } catch (error) {
            setIsError(error)
        }
        setItemList({
            "itemNumber": "",
            "itemName": "",
            "price": "",
            "quantity": "",
            "madeIn": "",
        })

    })

    const {itemName, price, quantity, madeIn} = itemList

    return(
        <div>
            <form onSubmit={handleUpdate} >
            <h1>Edit Items here:  </h1>
            <label htmlFor='itemName' >Item name</label>
            <input id='itemName' name='itemName' type="text" value={itemName} onChange={handleInputChange}/>
            <label htmlFor='price'>Price</label>
            <input id='price' type="text" name='price' value={price} onChange={handleInputChange}/>
            <label htmlFor='quantity'>Quantity</label>
            <input id='quantity' type="text" name='quantity' value={quantity} onChange={handleInputChange}/>
            <label htmlFor='madeIn'>Made in</label>
            <input id='madeIn' type="text" name='madeIn' value={madeIn} onChange={handleInputChange}/>
            <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default EditItem