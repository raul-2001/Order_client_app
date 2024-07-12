import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import OrdersList from './OrdersList';

const OrderContainer = () => {

    const [orderList, setOrderList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [isToken, setIsToken] = useState(false)

    /// fetches all orders
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

        const url = 'https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/orders'
        
        try {

            const response = await fetch(url, options)

            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }

            const data = await response.json();
            // console.log(data)
            const orders = data.orders.map((order) => {
                const newOrders = {
                    order: order
                }
                return newOrders
            })

            
            setOrderList(orders)
    
        } catch (error) {
            setIsError(error)

            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }


    const deleteOrder = async (order_id) => {
        const token = localStorage.getItem('token')
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        
        const url = `https://zero6-jobs-api-giraffe-3.onrender.com/api/v1/orders/${order_id}`
        

        try {

            const response = await fetch(url, options)

            console.log("response =>>", response.ok)

            if(!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }

            // const data = await response.json();

            // console.log("data =>>", data)

            fetchData()
            
    
        } catch (error) {
            setIsError(error)
            console.log(error.message)
            return null;
        } finally {
            setIsLoading(false)
        }
    }

    const removeOrder = (id) => {

        // console.log(id)
        const updatedList = orderList.filter(
            removeOrder => removeOrder.id !== id
        )

        const deletedList = orderList.filter(
            remOrder => remOrder.order._id === id
        )

        console.log("deleteList => ",deletedList)
        const del_id = deletedList[0].order._id
        deleteOrder(del_id)

        setOrderList(updatedList)
    }


    useEffect(() => {
        fetchData()

        
    }, [isToken])




    


    return(
        <>
            {
                isToken ? (
                    <div>
                        <button><Link to="/newOrder">Create new order</Link></button>

                        {isError ? (<p>Something went wrong ...</p>) :
                        (
                            <div>
                                {isLoading ? <div>Loading ...</div> :
                                (
                                    <OrdersList 
                                        orderList={orderList}
                                        onRemoveOrder={removeOrder}
                                       
                                    />
                                )
                                }
                            </div>
                        ) 
            }
                    </div>

                    
                ) : (
                    <div>
                    <h1>Order list</h1>
                        You must be authorized

                    </div>
                ) 
            }
            {/* {isError && <p>Something went wrong ...</p>} */}
            {/* {isError ? (<p>Something went wrong ...</p>) :
            (
                <div>
                    {isLoading ? <div>Loading ...</div> :
                    (
                        <OrdersList 
                            orderList={orderList}
                            onRemoveOrder={removeOrder}
                        />
                    )
                    }
                </div>
            ) 
            } */}


        </>
    )
}


export default OrderContainer