import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate  } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { layer } from '@fortawesome/fontawesome-svg-core';



const EditOrder = () => {
    const [orderList, setOrderList] = useState({
        "items": [],
        "orderTotal": "",

    })
    const [isError, setIsError] = useState(false)
    const [sum, setSum] = useState(0)
    const [showElement, setShowElement] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([])
    const [selectedStatus, setSelectedStatus] = useState("")
    const [items, setItems] = useState([])


    const {id} = useParams();
    const navigate = useNavigate();

    // returns items from the orders
    const fetchItems = async (id) => {

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
            return data
            // setItemList(data.item)
          
        } catch (error) {
            setIsError(error)
            console.log(error.message)
        }
    } 
  
    const handleChange = async (event) => {
        const value = event.target.value
        setOrderList({...orderList, [event.target.name]: value})
    }


    const editMyOrder = async (order_id) => {

        const token = localStorage.getItem('token')
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
           
        const url = `https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/orders/${order_id}`
    
        try {
            const response = await fetch(url, options)
            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }
    
            const data = await response.json();
            // getItems(data.order.items)
            setOrderList(data.order)
            

        } catch (error) {
            setIsError(error)
            console.log(error.message)
        }
    }

    useEffect(() => {
        editMyOrder(id)
        

    }, [id])

    const getItems = () => {

        const items = orderList.items.map((item) => {
            const newItemList = 
            {
                value: item._id, label: item.itemName
            }
            return newItemList
            
        })

        const a = []

        setItems(items)
        setSelectedOptions(items)

       
        // fetchItems()
    }


    useEffect(() => {
        getItems()
    }, [orderList])



    const updateOrder = async () => {

        const {_id, orderStatus, orderTotal, items} = orderList;
        if (!orderStatus) {
            
            return
        }
    
        const body = JSON.stringify({orderTotal:  orderTotal, items: items, orderStatus: orderStatus})
        console.log(body)
        const token = localStorage.getItem('token')
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: body
        }

        

        const url = `https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/orders/${_id}`

        try {

            const response = await fetch(url, options)
            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }

            const data = await response.json();
            navigate("/orders")
        } catch (error) {
            setIsError(error)
            console.log(error.message)
        }
    }




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

        const url = 'https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/items'
        
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



    const handleSelectChange = (opt, state) => {

        if (state !== "load") {
            
            const arr = []
            let sum = 0
            
            const s = opt.map((item) => {
                arr.push(item.value)
                sum += item.price
            })
            setSum(sum)

            setSelectedOptions(arr)  
            // console.log("selectedOptions>>>", selectedOptions)
            orderList.orderTotal = sum
            orderList.items = arr    
        } else {
            
            setSelectedOptions(opt)  
            orderList.items = opt    
        }
    }



    const statusOptions = [
        {value: "inProcess", label: "inProcess"},
        {value: "declined", label: "declined"},
        {value: "completed", label: "completed"},
    ]


    const handleSelectStatus = (opt, state) => {
        if (state !== "load") {

            const status = {
                value: opt.value, label: opt.value
            }
            setSelectedStatus(status)  
            orderList.orderStatus = opt.value

            

        } else {
            
            setSelectedStatus(opt)  
            orderList.items = opt    
        }

    }


    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        try {
            updateOrder()
            setShowElement(true)
        } catch (error) {
            setIsError(error)
            setShowElement(false)
        }

        setOrderList({
            "items": [],
            "orderTotal": "",
        })

    }, [orderList])

    // const a = [
    //     { value: "668f5a05529ca600435f1917", label: "TV LG 100L" },
    //     { value: "668f5943529ca600435f1914", label: "TV Samsung GMTK" },
    //     { value: "667eaa93cb11dc0043a2bd0a", label: "table" },
    //     { value: "667cd32f9f74da004414f22d", label: "alma" },
    //     { value: "667cd1909f74da004414f22b", label: "playstation5" },
    //     { value: "667cce3e1fa16f0043ce6d37", label: "playstation2" },
    // ]

    // console.log("selectedOptions>>>", typeof a)

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='createdAt'>Create date</label>
                <input id='createdAt' name="orderTotal" type='text' value={orderList.createdAt}/>
                <label htmlFor='orderNumber'>Order number</label>
                <input id='orderNumber' name="orderNumber" type='text' value={orderList.orderNumber}/>
                <label htmlFor='orderTotal'>Order sum</label>
                <input id='orderTotal' name="orderTotal" type='text'  onChange={handleChange} value={orderList.orderTotal = sum}/>
                {/* <label htmlFor='orderStatus'>Order status</label>
                <input id='orderStatus' name="orderStatus" type='text'  onChange={handleChange} value={orderList.orderStatus}/> */}
                <div>
                    <br />
                    <label htmlFor='orderStatus'>Order status</label>
                    <Select 
                        id="orderStatus"
                        defaultValue={selectedStatus}
                        options={statusOptions}
                        onChange={handleSelectStatus}
                    />
                </div>

                <label htmlFor="items">Select Item:</label>
                <AsyncSelect
                        name='items'
                        // defaultValue={a}
                        defaultValue={selectedOptions}
                        isMulti
                        cacheOptions
                        defaultOptions
                        loadOptions={loadOptions}
                        onChange={handleSelectChange}

                />

                <label htmlFor='updatedAt'>Update date</label>
                <input id='updatedAt' name="updatedAt" type='text'  value={orderList.updatedAt} />    
                <button type="submit">Update Order</button>
            </form>
        </>
    )

}

export default EditOrder