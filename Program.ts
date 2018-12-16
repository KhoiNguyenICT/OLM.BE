import startup from "./Startup"
import { environmentVariable } from "./Commons/Constants"

const port = +(process.env[environmentVariable.PORT] as string);

startup.listen(port, error => {
    if (error) {
        return console.log(error);
    }
    return console.log(`Server is running on port: ${port}`);
})