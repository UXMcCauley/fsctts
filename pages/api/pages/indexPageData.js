import {connectToDatabase} from "../../../lib/dbConnect";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {

    const userQuery = {
        email: req.query.userId
    }
    const UID = {
        userId: req.query.userId
    }

    const {db} = await connectToDatabase()

    const user = await db.collection("users").findOne(userQuery)

    const dreamsCursor = await db.collection("dreams").find(UID)
    const dreams = await dreamsCursor.toArray()
    await dreamsCursor.close()

    const surveysCursor = await db.collection("lifeAreaSurveys").find(UID)
    const surveys = await dreamsCursor.toArray()
    await surveysCursor.close()

    const referralsCursor = await db.collection("referrals").find(UID).sort("domain")
    const referrals = await referralsCursor.toArray()
    await referralsCursor.close()

    const tasksCursor = await db.collection("todos").find(UID)
    const tasks = await tasksCursor.toArray()
    await tasksCursor.close()

    const notesCursor = await db.collection("notes").find(UID)
    const notes = await notesCursor.toArray()
    await notesCursor.close()

    const clientReferralsCursor = await db.collection("referrals").find({ userId: req.query.clientId })
    const clientReferrals = await clientReferralsCursor.toArray()
    await clientReferralsCursor.close()

    res.json({user, dreams, surveys, referrals, tasks, notes, clientReferrals})

}
