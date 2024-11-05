import { colors } from "../../utils/colors";

export const styles = {
    model: {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '80%', sm: '400px' },
        bgcolor: 'white',
        borderRadius: '8px',
        boxShadow: 24,
        p: 4,
        color: colors.lightBlack,
    },
    input: {
        marginBottom: '20px',
    },
    button: {
        backgroundColor: colors.edit,
        color: colors.darkGreen,
        textTransform: 'none',
        '&:hover': {
            backgroundColor: colors.darkGreen,
            color: 'white',
        },
    },
    card: {
        margin: '20px',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.02)',
        },
    },
    flexContainer: {
        display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '16px'
    }
};