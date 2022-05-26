import {connectToDatabase} from "../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    let q
    if(req.query.surveyId === undefined){
        q = {
            userId: req.query.userId,
        }
    }else{
        q = {
            userId: req.query.userId,
            surveyId: req.query.surveyId
        }
    }

    const {db} = await connectToDatabase()
    const dreams = await db
        .collection("referrals")
        .find(q)
        .toArray()


    res.json(dreams)

}
