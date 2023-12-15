import { Box, Toolbar } from "@mui/material"
import { SideBar } from "../components/SideBar";
import { NavBar } from "../components/NavBar";

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>

            <NavBar drawerWidth={drawerWidth} />

            <SideBar drawerWidth={drawerWidth} />


            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}>

                <Toolbar />

                {children}

            </Box>
        </Box>
    )
}
