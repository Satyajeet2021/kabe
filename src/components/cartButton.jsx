import { useNavigate } from "react-router-dom"

const CartButton = () => {
    const navigate = useNavigate();

    return(
        <>
            <button onClick={() => navigate("/cart")} class="btn-login" >Cart</button>
        </>
    )
}

export default CartButton