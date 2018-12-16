import { environmentVariable } from "./Commons/Constants"
import startup from "./Startup"

const port = +(process.env[environmentVariable.PORT] as string)

startup.listen(port, (error: any) => {
    if (error) {
        return console.log(error)
    }
    return console.log(`Server is running on port: ${port}`)
})
