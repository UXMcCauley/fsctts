import {connectToDatabase} from "../../lib/dbConnect";
import {ObjectId} from "mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res) => {
    const record = {
        dream: req.body.dream,
        totalScore: req.body.totalScore,
        priority: req.body.priority,
        food: req.body.food,
        money: req.body.money,
        substances: req.body.substances,
        mentalHealth: req.body.mentalHealth,
        safety: req.body.safety,
        healthInsurance: req.body.healthInsurance,
        transportation: req.body.transportation,
        disabilities: req.body.disabilities,
        lifeSkills: req.body.lifeSkills,
        work: req.body.work,
        legal: req.body.legal,
        childcare: req.body.childcare,
        adultEducation: req.body.adultEducation,
        parentingSkills: req.body.parentingSkills,
        childrensEducation: req.body.childrensEducation,
        communityInvolvement: req.body.communityInvolvement,
        familyFriendsSupport: req.body.familyFriendsSupport,
        budgeting: req.body.budgeting,
        racismBigotry: req.body.racismBigotry,
        internetAccess: req.body.internetAccess,
        housing: req.body.housing,
        userId: ObjectId(req.body.userId),
        datestamp: new Date()
    }

    const {db} = await connectToDatabase()
    const user = await db
        .collection("lifeAreaSurveys")
        .insertOne(record)

    res.json(user)

}
