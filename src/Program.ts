import startup from "./Startup";
import { EnvironmentVariable } from "./Configurations/EnvironmentVariable";

const port = EnvironmentVariable.PORT;

startup.listen(port, (error: any) => {
    if (error) {
        return console.log(error);
    }
    return console.log(`Server is running on port: ${port}`);
});
