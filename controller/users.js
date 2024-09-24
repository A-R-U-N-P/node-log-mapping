import sequelize from "../db.js";
import { logger } from "../logger.js";

export async function getUsers(request, response) {
    try {
        const result = await sequelize.query("SELECT * FROM users limit 8", { type: sequelize.QueryTypes.SELECT }, {});
        // console.log(result);
        logger(`user data fetched. ${!!result.length}`, { });
        response.status(200).send({ data: result })
    } catch (error) {
        console.log("ERROR", error);

        logger("An error occurred", { error });
        response.status(500).send("An error occurred.");
    }
}