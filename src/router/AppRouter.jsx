import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { useDispatch, useSelector } from "react-redux"
import { ChekingAuth } from "../ui/components/ChekingAuth"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store/auth/authSlice"
import { useCheckAuth } from "../hooks/useCheckAuth"


export const AppRouter = () => {

    const { status } = useCheckAuth();


    if (status === 'checking')
        return <ChekingAuth />

    return (
        <Routes>

            {
                status === 'authenticated'
                    ? <Route path="/*" element={<JournalRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            <Route path="/*" element={<Navigate to='/auth/login' />} />

            {/* <Route path="/auth/*" element={<AuthRoutes />} /> */}
            {/* <Route path="/*" element={<JournalRoutes />} /> */}

        </Routes>
    )
}
