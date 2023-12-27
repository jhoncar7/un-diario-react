import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";


export const JournalApp = () => {

    console.log(process.env.NODE_ENV);

    return (
        <AppTheme>
            <AppRouter />
        </AppTheme>
    )
}
