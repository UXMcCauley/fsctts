import Layout from "../components/layout";
import {getSession} from "next-auth/react";

export default function Dreams({user, dreams, surveys}) {
    return (
        <Layout title={"Care Plans"} session={user}>
            Content
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}
    const {req} = context;

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // set up variables
    const url =  baseUrl + "/api/get-user?email=" + session.user.email

    // fetch data
    const getUser = await fetch(url)

    // cast data to json
    const userJson = await getUser.json()

    //dreams url
    const getUserDreamsUrl = baseUrl + "/api/get-user-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    //surveys url
    const getUserSurveysUrl = baseUrl + "/api/get-user-surveys?userId=" + userJson._id
    const getSurveys = await fetch(getUserSurveysUrl)
    const surveysJson = await getSurveys.json()

    return {
        props: {
            user: userJson,
            dreams: dreamsJson,
            surveys: surveysJson
        }
    }

}

