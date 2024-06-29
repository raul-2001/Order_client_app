import React, {useState, useEffect, useCallback} from 'react'
import AsyncSelect from 'react-select/async';
import {Link} from 'react-router-dom'
import Select from 'react-select'

const CreateNewOrder = () => {

    // const [formData, setFormData] = useState({
    //     itemNumber: '',
    //     itemName: '',
    //     price: '',
    //     quantity: '',
    //     madeIn: '',
    // })
    const [formData, setFormData] = useState([])
    const [orderList, setOrderList] = useState({
        "items": [],
        "orderTotal": "",

    })
    const [sum, setSum] = useState(0)
    const [isError, setIsError] = useState(false)
    const [showElement, setShowElement] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([])

    const handleChange = async (event) => {
        const value = event.target.value
        setOrderList({...orderList, [event.target.name]: value})

        console.log("orderList  ==>>",orderList)
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
        const url = 'https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/orders'
        console.log(url)
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
            return data
    
        } catch (error) {
            setIsError(error)
            console.log(error.message)
            setShowElement(false)
        } 
    }


    const handleCreateOrder = useCallback((event) => {
        event.preventDefault()

        const records = orderList;

        try {

            postData(records)

            setShowElement(true)
        } catch (error) {
            setIsError(error)
            setShowElement(false)
        }

        setOrderList({
            "items": [""],
            "orderTotal": "",
        })
    })


    // this function uses normal callBack function. Beacause Asynselect is unable use async-await fetching. 
    // it loads data into select-option.
    const loadOptions =  (inputValue, callBack) => {

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
                    <h1>Created by: {orderList.createdBy}</h1>
                    <p>
                        <Link to='/orders'>GO into Orders</Link>
                    </p>
                </div>
            ) : (
                <form onSubmit={handleCreateOrder}>
                    {/* <label htmlFor='orderNumber'>Order number</label>
                    <input id="orderNumber" name="orderNumber" type='text' onChange={handleChange} value={orderList.orderNumber}/> */}
                    {/* <label htmlFor='orderStatus'>Order status</label>
                    <input id='orderStatus' name="orderStatus" type='text'  onChange={handleChange} value={""}/> */}
                    <label htmlFor='orderTotal'>Order sum</label>
                    <input id='orderTotal' name="orderTotal" type='text'  onChange={handleChange} value={orderList.orderTotal = sum}/>
                    <label htmlFor="item">Select Item:</label>
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