import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import SurveyDomainList from "../components/surveyDomainsList";
import NewLifeAreaSurveyForm from "../components/newLifeAreaSurveyForm";
import {useState} from "react";
import {useRouter} from "next/router";


export default function NewLifeAreaSurvey({pageDataJson}) {

    const {user} = pageDataJson
    const router = useRouter()
    const [activeDomain, setActiveDomain] = useState("food")
    const [answered, setAnswered] = useState({})
    const [domains, setDomains] = useState([])

    async function saveSurvey() {
        await fetch("/api/post-life-area-survey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dreamId: router.query.dreamId,
                dream: router.query.dreamName,
                priority: domains,
                food: [answered.food.selection, answered.food.statement],
                money: [answered.money.selection, answered.money.statement],
                substances: [answered.substances.selection, answered.substances.statement],
                mentalHealth: [answered.mentalHealth.selection, answered.mentalHealth.statement],
                safety: [answered.safety.selection, answered.safety.statement],
                healthInsurance: [answered.healthInsurance.selection, answered.healthInsurance.statement],
                transportation: [answered.transportation.selection, answered.transportation.statement],
                disabilities: [answered.disabilities.selection, answered.disabilities.statement],
                lifeSkills: [answered.lifeSkills.selection, answered.lifeSkills.statement],
                work: [answered.work.selection, answered.work.statement],
                legal: [answered.legal.selection, answered.legal.statement],
                childcare: [answered.childcare.selection, answered.childcare.statement],
                adultEducation: [answered.adultEducation.selection, answered.adultEducation.statement],
                parentingSkills: [answered.parentingSkills.selection, answered.parentingSkills.statement],
                childrensEducation: [answered.childrensEducation.selection, answered.childrensEducation.statement],
                communityInvolvement: [answered.communityInvolvement.selection, answered.communityInvolvement.statement],
                familyFriendsSupport: [answered.familyFriendsSupport.selection, answered.familyFriendsSupport.statement],
                budgeting: [answered.budgeting.selection, answered.budgeting.statement],
                racismBigotry: [answered.racismBigotry.selection, answered.racismBigotry.statement],
                internetAccess: [answered.internetAccess.selection, answered.internetAccess.statement],
                housing: [answered.housing.selection, answered.housing.statement],
                userId: router.query.clientId === undefined ? user.email : router.query.clientId
            })
        })
    }

    return (
        <Layout title={"Life Area Survey"} session={user}>
            <div className={"bg-gray-600 text-center p-2 text-white mb-3 rounded flex justify-around font-light text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}>
                <div>Priorities: <strong>{domains.length}</strong></div>
                <div>Answered: <strong>{Object.keys(answered).length}/21</strong></div>
                <div className={"truncate"}>Dream: {router.query.dreamName}</div>
            </div>
            <div
                className={`bg-red-600 p-2 rounded text-center text-white text-xs mb-2 ${Object.keys(answered).length === 21 ? "hidden" : null}`}>
                You&apos;ve completed {Object.keys(answered).length} of 21 life areas. Keep going!
            </div>
            <div
                className={`bg-red-600 p-2 rounded text-center text-white text-xs mb-6 ${domains.length > 0 ? "hidden" : null}`}>
                Please select at least one life area as a priority by using the toggle.
            </div>
            <div className={"flex"}>
                <div className={"flex-initial"}>
                    <SurveyDomainList setActiveDomain={setActiveDomain} activeDomain={activeDomain}
                                      answered={answered} domains={domains}/>
                </div>
                <div className={"flex-grow"}>
                    <div className={"p-4 bg-gray-200 m-0 md:m-4 my-2 md:my-0"}>
                        <h2>Instructions</h2>
                        <p className={"text-xs"}>Click or tap on each of the life areas and answer the corresponding question.
                        There are 21 total areas, so you may need to scroll down if you&apos;re using a mobile device.</p>
                        <p className={"text-xs"}> Life areas that you have marked as a priority with the toggle will have a red flag in the life areas list.</p>
                    </div>
                    <NewLifeAreaSurveyForm activeDomain={activeDomain} setAnswered={setAnswered} answered={answered}
                                           domains={domains} setDomains={setDomains}/>
                </div>
            </div>
            <div className={"flex justify-end"}>
                <button disabled={domains.length === 0 || Object.keys(answered).length !== 21}
                        className={`text-white text-sm rounded py-2 px-4 mt-5 bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400`}
                        onClick={async () => {
                            await saveSurvey().then()
                            if(router.query.clientId === undefined){
                                router.push("/life-area-surveys").then()
                            }else{
                                router.back()
                            }

                        }}>Save this
                    survey
                </button>
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
