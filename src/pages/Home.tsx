import { Box } from '@mui/material'
import JsonUrlInput from '../components/JsonUrlInput'

function Home() {
    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <JsonUrlInput />
        </Box>
    )
}

export default Home