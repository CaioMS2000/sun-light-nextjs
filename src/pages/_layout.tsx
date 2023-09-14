import { ReactNode, useContext, useEffect } from 'react';

import NavBar from '@/components/navBar';
import { Footer } from '@/components/footer';
import Head from './_head';
import { useColorMode } from '@chakra-ui/react';
import Debug from '@/components/Debug';
import { DebugContext } from '@/context/Debug';

const Layout = ({children, title = 'Sun Light'}: {children: ReactNode, title?: string}) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const {debugging} = useContext(DebugContext)

    useEffect(() => {
        if(colorMode !== 'light')
            toggleColorMode()
        
    }, [])

    useEffect(() => {
        if(colorMode !== 'light')
            toggleColorMode()
        
    }, [colorMode])

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <NavBar/>
            {children}
            {debugging && <Debug/>}
            <Footer/>
        </>
    )
}

export default Layout