import logo4 from "../assets/images/SearchLogo2.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavbarCart = () => {
    const navigate = useNavigate();
    
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <a class="navbar-brand" href="/"><img src={logo4} /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="surprise-me foot-sur">
                        <div class="surprise-me" style={{ paddingRight: "5px" }}>
                            <Button onClick={() => navigate("/")} class="btn-login" style={{ marginRight: "5px" }}>Home</Button>
                        </div>
                        <div class="surprise-me">
                            <Button onClick={() => navigate("/results")} class="btn-login">Back</Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavbarCart