// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Button, Image,Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useDataProvider } from "../components/dataProvider"
import { MobileNav } from '../components/MobileNav';
import { TiShoppingCart } from "react-icons/ti";
import { useBreakpointValue } from "@chakra-ui/react";
import  { useState } from 'react';
import { CartModal } from '../components/CartModal';
import {
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

export function NavBar() {
 const isSmallScreen = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false }); // Define when to show the icon based on screen size
 const hidden = useBreakpointValue({ base: false, sm: false, md: false, lg: true}); // Define when to show the icon based on screen size

    const { lines } = useDataProvider();
    const hasCartItems = lines.length > 0;
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <nav className="nav"  >
            
            {isSmallScreen ? (
                
                <Link to="/">  
                <Image    
                _hover={{ boxShadow: "0 0 10px 1px tan"}}                     
                w={{ base: '50px', sm: '4em' }}
                maxH={{ base: '40px', sm: '4em'}}
                className="photo" src='src\assets\White-Favicon.png' alt='logo' /></Link> 
                  
                    ) : (
                        <Link to="/">  <Image
                        _hover={{ boxShadow: "0 0 10px 1px tan"}}
                        w={{  md: "18em" }}
                        maxH={{  md: "11em"}}
                        className="photo" src='src\assets\divine-delicacies2.png' alt='logo' /> </Link> 
                    )}
         
            
            <ul >
              
                <li><Link to="/"><Text fontSize={{ base: '0em', sm: '0em', md: "0em", lg: "25px" }}>Home</Text></Link></li>
                {/* <li><Link to="/item"> Menu </Link></li> */}
                <li><Link to="/contact"><Text fontSize={{ base: '0em', sm: '0em', md: "0em", lg: "25px" }}>Contact Us</Text></Link></li>
                <li><Link to="/menu"><Text fontSize={{ base: '0em', sm: '0em', md: "0em", lg: "25px" }}>Order</Text></Link></li>
                <li><Link to="/login"><Text fontSize={{ base: '0em', sm: '0em', md: "0em", lg: "25px" }}>Login</Text></Link></li>
                <li>{isSmallScreen && <MobileNav />}</li>
                <li>
                    {hasCartItems ? (
                        <><Button bg="black" color="white" border="white 2px solid" 
                        w={{ base: '50px', sm: '4em' }}
                        maxH={{ base: '40px', sm: '4em'}}
                        _hover={{ boxShadow: "0 0 10px 1px linen"}}  
                        onClick={onOpen} >
                            <TiShoppingCart  />
                        </Button><CartModal isOpen={isOpen} onClose={onClose} /></>
                        //<Link to="/cart">{hidden && <TiShoppingCart />}</Link>
                    ) : (
                        hidden && <TiShoppingCart style={{ opacity: 0.5, cursor: "not-allowed" }} />
                    )}
                </li>
                {/* <li><Link to="/info"> OurInfo </Link></li> */}
            </ul> 
            
        </nav>
         
    );
}

//redo this
//can add modal directly to this page, if we want to remove the login page