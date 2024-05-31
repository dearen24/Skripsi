"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const GoogleSignInButton = () => {
    const router = useRouter();

    const handleClick = () => {
        signIn("google");
    };

    return(
        <>  
            <button className="btn" onClick={handleClick} >
                <img src="web_light_rd_SI.svg"/>
            </button>
        </>
    )
}

export default GoogleSignInButton;