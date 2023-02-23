import { AppBar, Grid } from "@mui/material";
import {ReactComponent as PBLogo} from "./pblogo-whiteborder.svg"
import { useTranslation } from 'react-i18next';
import { ChangeLanguageButton } from "./ChangeLanguageButton";

export const Header = () => {
    const { t } = useTranslation("header");
    
    
    return <AppBar position="fixed">
            <Grid container justifyContent="space-between">
                <PBLogo height="50px"/>
                <div>{t('title')}</div>
                <ChangeLanguageButton/>
            </Grid>
        </AppBar>
}


