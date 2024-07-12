import React, {useState, useEffect, useCallback} from 'react'
import AsyncSelect from 'react-select/async';
import {Link} from 'react-router-dom'
import Select from 'react-select'

const CreateNewOrder = () => {

    const [orderList, setOrderList] = useState({
        "items": [],
        "orderTotal": "",

    })
    const [sum, setSum] = useState(0)
    const [isError, setIsError] = useState(false)
    const [showElement, setShowElement] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([])


    const handleChange = (event) => {
        const value = event.target.value
        setOrderList({...orderList, [event.target.name]: value})
    }



    // creates new order
    const postData = async (records) => {


        
        if(records.length === 0) {
            return
        }

        const token = localStorage.getItem('token')
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            
            body: JSON.stringify(records)
            
        }

        console.log(JSON.stringify(records))
        const url = 'https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/orders'
        
        try {

            const response = await fetch(url, options)

            console.log("response =>>", response)

            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }
            

            const data = await response.json();

            console.log("data =>>", data)
            setOrderList(data.order)
            // console.log("postData")
            setShowElement(true)
            // console.log("postData2")
            return data
    
        } catch (error) {
            setIsError(error)
            console.log(error.message)
            setShowElement(false)
        } 
    }


    const handleCreateOrder = useCallback((event) => {
        event.preventDefault()
        
        try {

            postData(orderList)
            setShowElement(true)

        } catch (error) {
            setIsError(error)
            setShowElement(false)
        }

        setOrderList({
            "items": [""],
            "orderTotal": "",
        })
    }, [orderList])


    // this function uses normal callBack function. Beacause Asynselect is unable use async-await fetching. 
    // it loads data into select-option.
    const loadOptions =  (inputValue, callBack) => {

        console.log("loadOptions")
        const token = localStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        const url = 'https://order-api-a70z.onrender.com/api/v1/items'
        
        try {

            fetch(url, options)
            .then(response => response.json())
            .then(data => {
                const formattedItems = data.items.map(item => (
                    {
                        value: item._id,
                        label: item.itemName,
                        price: item.price,
                        quantity: item.quantity,
                        madeIn: item.madeIn
                    }
                ))
                
                callBack(formattedItems)
                
            })

        } catch (error) {
            setIsError(error)
            console.log(error.message)
            callBack([])
        }
    }   


    const handleSelectChange = (opt) => {

        const arr = []
        let sum = 0
        const s = opt.map((item) => {
            arr.push(item.value)
            sum += item.price
            
        })
        // console.log("handelSelectChange")
        setSum(sum)
        setSelectedOptions(arr)  
        orderList.items = arr    
    }
    

    return(
        <div>
            
            {showElement ? (
                <div>
                    <h1>Success</h1>
                    <h1>Created time: {orderList.createdAt}</h1>
                    <h1>Order number: {orderList.orderNumber}</h1>
                    <h1>Order total: {orderList.orderTotal}</h1>
                    <h1>Created by: {orderList.createdBy}</h1>

                    <p>
                        <Link to='/orders'>GO into Orders</Link>
                    </p>
                </div>
            ) : (
                <form onSubmit={handleCreateOrder}>

                    <label htmlFor='orderTotal'>Order sum</label>
                    <input id='orderTotal' name="orderTotal" type='text'  onChange={handleChange} value={orderList.orderTotal = sum}/>
                    <label htmlFor="items">Select Item:</label>
                    <AsyncSelect 
                        name='items'
                        isMulti
                        cacheOptions
                        defaultOptions
                        loadOptions={loadOptions}
                        onChange={handleSelectChange}
                    />
                    <button type="submit">Create Order</button>
                </form>
            )}
        </div>
    )
}

export default CreateNewOrder