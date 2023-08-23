import { Paper, PaperProps, useMediaQuery } from "@mui/material";
import theme from "../theme";


type PBCardProps = {
    children: React.ReactNode
}

export const PBCard = (props: PBCardProps & PaperProps) => {
    const isSmallScreen: boolean = useMediaQuery(theme.breakpoints.down('sm'));
    
    return <Paper 
        {...props} 
        elevation={3} 
        sx={{ backgroundColor:'var(--theme-background-color)', display: 'flex', alignItems: 'center', margin: theme.spacing(isSmallScreen?0.5:1), ...props.sx }}>
            {props.children}
    </Paper>
}