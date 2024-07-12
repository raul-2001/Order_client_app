import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Logout = () => {

    const navigate = useNavigate()
    const tok = localStorage.removeItem("token")
    useEffect(() => {
        navigate('/')
        console.log("logout")
    }, [tok])
}

export default Logout