import { useEffect, useState } from "react"


const Items = ({selectedOptions}) => {

    const [isError, setIsError] = useState(false)
    const [item, setItem] = useState([])
    const [itemId, setItemId] = useState('')



    console.log("selectedOptions >>",selectedOptions)

    

    const editItem = async (id) => {

        if (id.length === 0) {
            return
        }

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
            setItem(data)
            console.log("data >>>", item)

        } catch (error) {
            setIsError(error)
            console.log(error.message)
        }
    }

    useEffect(() => {

        const mapedId =  selectedOptions.map((item) => {
            setItemId(item)
        })

        // console.log("selectedOptions >>>>",selectedOptions) 
        const findedId = selectedOptions.filter((it) => it.id === item)
        // console.log("findedId >>>>",findedId)     
        editItem(item)

    }, [selectedOptions])


    return(
        <div>
            <li key={item._id}>
                <span>{item._id}</span>
                <span>{item.itemName}</span>
                <span>{item.price}</span>
                <span>{item.quantity}</span>
                <span>{item.madeIn}</span>
                <span>item</span>
            </li>    
        </div>
    )

}

export default Items