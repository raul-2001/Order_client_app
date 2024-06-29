import React, {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'

const CreateNewItem = () => {

    const [itemList, setItemList] = useState({
        "itemNumber": "",
        "itemName": "",
        "price": "",
        "quantity": "",
        "madeIn": "",

    })
    const [isError, setIsError] = useState(false)
    const [showElemet, setShowElement] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value
        setItemList({...itemList, [event.target.name]: value})
    }



    const postData = async (records) => {

        if(records.length === 0) {
            return
        }
        // const d = JSON.stringify(records)



        const token = localStorage.getItem('token')
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            
            body: JSON.stringify(records)
        }

        const url = `https://order-api-a70z.onrender.com/api/v1/items`

        try {

            const response = await fetch(url, options)

            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }
            // console.log("response =>>", response)

            const data = await response.json();

            // console.log("data =>>", data)
            setItemList(data.item)
            return data
    
        } catch (error) {
            setIsError(error)
            console.log(error.message)
            setShowElement(false)
        } 
    }


    const handleCreateItem = useCallback((event) => {
        event.preventDefault()
        const records = itemList;

        try {

            postData(records)
            setShowElement(true)
        } catch (error) {
            setIsError(error)
            setShowElement(false)
        }

        setItemList({
            "itemNumber": "",
            "itemName": "",
            "price": "",
            "quantity": "",
            "madeIn": "",
        })
    })

    return(
        <div>
            
            {showElemet ? (
                <div>
                    <h1>Success</h1>
                    <h1>Created item: {itemList.itemName}</h1>
                    <p>
                        <Link to='/items'>GO into Items</Link>
                    </p>
                </div>
            ) : (
                <form onSubmit={handleCreateItem}>
                    <label htmlFor='itemNumber'>Item number</label>
                    <input id="itemNumber" name="itemNumber" type='text' onChange={handleChange} value={itemList.itemNumber}/>
                    <label htmlFor='itemName'>Item name</label>
                    <input id='itemName' name="itemName" type='text'  onChange={handleChange} value={itemList.itemName}/>
                    <label htmlFor='price'>Price</label>
                    <input id='price' name="price" type='text'  onChange={handleChange} value={itemList.price}/>
                    <label htmlFor='quantity'>Quantity</label>
                    <input id='quantity' name="quantity" type='text'  onChange={handleChange} value={itemList.quantity}/>
                    <label htmlFor='madeIn'>Made in</label>
                    <input id='madeIn' name="madeIn" type='text'  onChange={handleChange} value={itemList.madeIn}/>
                    <button type="submit">Create item</button>
                </form>
            )}
        </div>
    )
}

export default CreateNewItem