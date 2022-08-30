import {useRouter} from "next/router";
import {labelMap} from "../lib/serviceLabelsMap";
import moment from "moment";
import {ListNumbers} from "phosphor-react";

function LasCurrent({surveys, user, isClientSurvey, clientId}) {

    const router = useRouter()

    return (
        <div className={"grid grid-cols-1 lg:grid-cols-2"}>
            {surveys.sort((a, b) => new Date(b.datestamp) - new Date(a.datestamp)).map((survey, i) => {
                if (i === 0) {
                    return (
                        <div
                            className={"rounded shadow mr-5 mb-5 text-sm overflow-hidden relative flex flex-col justify-between"}
                            key={survey._id}>
                            <div>
                                <div className={"bg-gray-700 p-3 truncate font-light text-white flex justify-start"}>
                                    <div><ListNumbers size={22}/></div>
                                    <div className={"ml-2 truncate"}>{survey.dream}</div>
                                </div>
                                <div
                                    className={"bg-gray-100 p-2 text-xs"}>{moment(survey.datestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
                            </div>

                            <div className={"flex flex-wrap"}>
                                <div className={"flex-grow p-3"}>
                                    <div className={"my-2"}>
                                        <p className={"text-xs text-gray-600"}>Priority domains:</p>
                                        <ul className={"list-disc pl-5"}>
                                            {survey.priority.map((item, i) => {
                                                return <li key={i}>{labelMap[item]}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={"bg-gray-400 flex text-center text-white text-xs"}>
                                <div
                                    className={"p-3 flex-1 cursor-pointer bg-orange-600 hover:bg-orange-500"}
                                    onClick={() => {
                                        if (isClientSurvey) {
                                            router.push({
                                                pathname: "/map-of-my-dreams",
                                                query: {
                                                    dreamId: survey.dreamId,
                                                    dream: survey.dream,
                                                    surveyId: survey._id,
                                                    county: user.county,
                                                    domain: survey.priority,
                                                    clientId: clientId
                                                }
                                            }).then()
                                        } else {
                                            router.push({
                                                pathname: "/map-of-my-dreams",
                                                query: {
                                                    dreamId: survey.dreamId,
                                                    dream: survey.dream,
                                                    surveyId: survey._id,
                                                    county: user.county,
                                                    domain: survey.priority
                                                }
                                            }).then()
                                        }

                                    }}>Map your priorities
                                </div>
                                <div
                                    className={"p-3 flex-1 cursor-pointer bg-green-600 hover:bg-green-500"}
                                    onClick={() => {
                                        if (isClientSurvey) {
                                            router.push("/client/survey/" + survey._id).then()
                                        } else {
                                            router.push("/surveys/" + survey._id).then()
                                        }

                                    }}>Review
                                </div>
                                {
                                    (new Date() - new Date(survey.datestamp)) / (1000 * 60 * 60) < 12 ?
                                        <div className={"bg-gray-600 p-3 flex-1 cursor-pointer hover:bg-gray-500"}
                                             onClick={() => {
                                                 router.push("/new-life-area-survey?dreamName=" + survey.dream + "&dreamId=" + survey.dreamId + "&surveyId=" + survey._id).then()
                                             }}>Edit
                                        </div> : null
                                }

                            </div>
                        </div>
                    )
                }

            })}
        </div>
    );
}

export default LasCurrent;
