import Layout from "../components/layout";
import {getSession} from "next-auth/react";

import LifeAreaSurveyForm from "../components/lifeAreaSurveyForm";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import CompletedLifeAreaSurveys from "../components/completedLifeAreaSurveys";
import Head from "next/head";

export default function LifeAreaSurveys({pageDataJson, incomingDream}) {

    const {user, dreams, surveys} = pageDataJson
    const [currentDream, setCurrentDream] = useState("")
    const [currentDreamId, setCurrentDreamId] = useState("")
    const [currentTab, setCurrentTab] = useState(incomingDream.hasDream ? "tab2" : "tab1")
    const [surveysList, setSurveysList] = useState(surveys)

    useEffect(() => {
        if (incomingDream.hasDream) {
            setCurrentDream(incomingDream.dream)
            setCurrentDreamId(incomingDream.dreamId)
        }
    }, [])


    const hasCurrentDreamJSX = () => {
        return (
            <div className={""}>
                <div className={"bg-gray-600 p-4 uppercase text-white rounded shadow font-light text-2xl text-center mb-7"}>
                    {currentDream}
                </div>
                <LifeAreaSurveyForm user={user} currentDream={currentDream} currentDreamId={currentDreamId}/>
            </div>
        )
    }

    const dreamOptionsJSX = () => {
        return (
            dreams.length > 0 ?
                <>
                    <select onChange={(e) => {
                        setCurrentDream(e.target.value)
                        setCurrentDreamId(e.target[e.target.selectedIndex].dataset.id)
                    }}>
                        <option>Select a dream...</option>
                        {dreams.map((dream, i) => (
                            <option key={i} value={dream.dream} data-id={dream._id}>{dream.dream}</option>
                        ))}
                    </select>
                    <LifeAreaSurveyForm user={user} currentDream={currentDream}/>
                </>
                :
                <p>You need to enter at least 1 dream to proceed <Link href={"/dreams"} passhref>
                    <a className={"text-indigo-600 underline"}>
                        Click here to enter a dream.
                    </a>
                </Link>
                </p>

        )
    }

    return (
        <Layout title={"Life Area Surveys"} session={user}>
            <Head>
                <title>TTS / Life Area Surveys</title>
            </Head>
            <div className={"mb-5 border-b-2 border-b-gray-500-300"}>
                <div
                    className={`cursor-pointer inline-block px-6 py-2 ${currentTab === "tab1" ? "border-b-2 border-b-orange-500" : ""}`}
                    onClick={() => {
                        setCurrentTab("tab1")
                    }}>Completed Life Area Surveys
                </div>
                <div
                    className={`cursor-pointer inline-block px-6 py-2 ${currentTab === "tab2" ? "border-b-2 border-b-orange-500" : ""}`}
                    onClick={() => {
                        setCurrentTab("tab2")
                    }}>New Life Area Survey
                </div>
            </div>

            <div className={`${currentTab === "tab1" ? "visible" : "hidden"}`}>
                <h2 className={"uppercase text-gray-500 mb-5"}>Completed Life Area Surveys</h2>
                <CompletedLifeAreaSurveys user={user} surveys={surveysList} setSurveys={setSurveysList} dreamId={currentDreamId} dream={currentDream}/>
            </div>

            <div className={`${currentTab === "tab2" ? "visible" : "hidden"}`}>
                {incomingDream.hasDream ?
                    hasCurrentDreamJSX()
                    :
                    dreamOptionsJSX()
                }
            </div>

        </Layout>
    )
}

export async function getServerSideProps(context) {

    let dream, dreamId
    if (context.query.dream !== undefined) {
        dream = context.query.dream
        dreamId = context.query.dreamId
    } else {
        dream = ""
        dreamId = ""
    }

    // session check and possible redirect
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}

    // dynamic url setup
    const {req} = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // page data
    const pageDataUrl = baseUrl + "/api/pages/indexPageData?userId=" + session.user.email
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()

    return {
        props: {
            pageDataJson,
            incomingDream: {
                hasDream: context.query.dream !== undefined,
                dream: dream,
                dreamId: dreamId
            }
        }
    }

}

