import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

    const {db} = await connectToDatabase()
    const cursor = await db.collection("todos").find({userId: req.query.userId})
    const records = await cursor.toArray()
    await cursor.close()

    res.json(records)
}
