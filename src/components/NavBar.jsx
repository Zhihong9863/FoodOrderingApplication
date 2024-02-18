// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Image, HStack, Box, useToast} from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";
import { useDataProvider } from "../components/dataProvider"
import { TiShoppingCart, TiUser } from "react-icons/ti";

export function NavBar() {
    const { lines, user, setUserAccount } = useDataProvider();
    const navigate = useNavigate();
    const toast = useToast();
    const hasCartItems = lines.length > 0;

    const logout = () => {
        setUserAccount(null); 
    
        toast({
            title: "Logged out successfully.",
            position: 'top',
            status: 'success',
            isClosable: true,
        });
    
        navigate("/");
    }


    return (
        <nav className="nav">      

            <Image className="photo"  src='src\assets\divine-delicacies2.png' alt='logo' />

            <ul>
                <li><Link to="/"> Home </Link></li>
                {/* <li><Link to="/item"> Menu </Link></li> */}
                <li><Link to="/contact"> Contact Us </Link></li>
                <li><Link to="/menu"> Order </Link></li>
                <li > 
                    {user ? (
                        <Box pt='0.25rem' as='button' onClick={logout} > Logout </Box>
                    ) : (
                        <Link to="/login"> Login </Link> 
                    ) }
                </li>
                <HStack spacing='1.5rem'>
                    <li > 
                        {user ? (
                            <Link to="/profile"> <TiUser/> </Link>
                        ) : (
                            <TiUser style={{visibility: "hidden"}} />
                        ) }
                    </li>
                    <li>
                        {hasCartItems ? (
                            <Link to="/cart"> <TiShoppingCart /> </Link>
                        ) : (
                            <TiShoppingCart style={{ opacity: 0.5, cursor: "not-allowed" }} />
                        )}
                    </li>
                </HStack>
                {/* <li><Link to="/info"> OurInfo </Link></li> */}
            </ul>
        </nav>
    );
}
//redo this
//can add modal directly to this page, if we want to remove the login page
