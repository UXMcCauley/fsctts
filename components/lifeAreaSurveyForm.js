import {useState} from "react";
import { lasList } from "../lib/lasList"
import Link from "next/link";

export default function LifeAreaSurveyForm() {

    const createLASRecord = async () => {
        const record = await fetch("/api/create-las-record", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                user: localStorage.getItem("userId"),

            })
        })
        const sentRecord = record.json()
    }

    const [data, setData] = useState(lasList)
    const [priority, setPriority] = useState([])
    const [food, setFood] = useState([0, ""])
    const [money, setMoney] = useState([0, ""])
    const [substances, setSubstances] = useState([0, ""])
    const [mentalHealth, setMentalHealth] = useState([0, ""])
    const [safety, setSafety] = useState([0, ""])
    const [healthInsurance, setHealthInsurance] = useState([0, ""])
    const [transportation, setTransportation] = useState([0, ""])
    const [disabilities, setDisabilities] = useState([0, ""])
    const [lifeSkills, setLifSkills] = useState([0, ""])
    const [work, setWork] = useState([0, ""])
    const [legal, setLegal] = useState([0, ""])
    const [childcare, setChildcare] = useState([0, ""])
    const [adultEducation, setAdultEducation] = useState([0, ""])
    const [parentingSkills, setParentingSkills] = useState([0, ""])
    const [childrensEducation, setChildrensEducation] = useState([0, ""])
    const [communityInvolvement, setCommunityInvolvement] = useState([0, ""])
    const [familyFriendsSupport, setFamilyFriendsSupport] = useState([0, ""])
    const [budgeting, setBudgeting] = useState([0, ""])
    const [racismBigotry, setRacismBigotry] = useState([0, ""])
    const [internetAccess, setInternetAccess] = useState([0, ""])
    const [housing, setHousing] = useState([0, ""])



    const checkPriority = (value) => {
        if (priority.indexOf(value) === -1) {
            setPriority(prevState => [...prevState, value])
        } else {
            setPriority(prevState => prevState.filter(item => item !== value))
        }
    }

    const keys = Object.keys(data)
    return (
        <div className={""}>
            <div>
                <div className={"uppercase text-gray-500 mb-4"}>Priority Areas</div>
                <div>
                    {priority.map((priority, i) => {
                        return <div
                            onClick={() => {
                                setPriority(prevState => prevState.filter(item => item !== priority))
                                document.getElementById(priority).checked = false
                            }}
                            className={"inline border-2 border-cyan-500 px-3 py-1 text-xs rounded mr-2 cursor-pointer"}
                            key={i}><span className={"capitalize"}>{priority}</span><span className={"ml-2"}>X</span>
                        </div>
                    })}
                </div>
            </div>
            {keys.map((key) => {
                return (
                    <div key={key}>
                        <div
                            className={`flex justify-between align-middle p-3 mt-5 mb-2  text-lg font-bold bg-gray-200 ${eval(key)[1] !== "" ? "bg-green-300" : ""}`}>
                            <div className={"self-center w-1/3"}>
                                {lasList[key].label}
                            </div>
                            <div className={"self-center w-1/3 text-center"}>
                                <span className={"text-xs"}>Score: {eval(key)[0]}</span>
                            </div>
                            <div className={"self-center w-1/3 text-right"}>
                                <span className={"text-xs"}> Make priority </span>
                                <input onChange={(e) => {
                                    checkPriority(e.target.value)
                                }} type={"checkbox"} id={key} value={key}/>
                            </div>
                        </div>
                        <form onChange={(event) => {
                            console.log(event.target.dataset.statement)
                            switch (key) {
                                case "food":
                                    setFood([event.target.value, event.target.dataset.statement])
                                    break;
                                case "money":
                                    setMoney([event.target.value, event.target.dataset.statement])
                                    break;
                                case "substances":
                                    setSubstances([event.target.value, event.target.dataset.statement])
                                    break;
                                case "mentalHealth":
                                    setMentalHealth([event.target.value, event.target.dataset.statement])
                                    break;
                                case "safety":
                                    setSafety([event.target.value, event.target.dataset.statement])
                                    break;
                                case "healthInsurance":
                                    setHealthInsurance([event.target.value, event.target.dataset.statement])
                                    break;
                                case "transportation":
                                    setTransportation([event.target.value, event.target.dataset.statement])
                                    break;
                                case "disabilities":
                                    setDisabilities([event.target.value, event.target.dataset.statement])
                                    break;
                                case "lifeSkills":
                                    setLifSkills([event.target.value, event.target.dataset.statement])
                                    break;
                                case "work":
                                    setWork([event.target.value, event.target.dataset.statement])
                                    break;
                                case "legal":
                                    setLegal([event.target.value, event.target.dataset.statement])
                                    break;
                                case "childcare":
                                    setChildcare([event.target.value, event.target.dataset.statement])
                                    break;
                                case "adultEducation":
                                    setAdultEducation([event.target.value, event.target.dataset.statement])
                                    break;
                                case "parentingSkills":
                                    setParentingSkills([event.target.value, event.target.dataset.statement])
                                    break;
                                case "childrensEducation":
                                    setChildrensEducation([event.target.value, event.target.dataset.statement])
                                    break;
                                case "communityInvolvement":
                                    setCommunityInvolvement([event.target.value, event.target.dataset.statement])
                                    break;
                                case "budgeting":
                                    setBudgeting([event.target.value, event.target.dataset.statement])
                                    break;
                                case "familyFriendsSupport":
                                    setFamilyFriendsSupport([event.target.value, event.target.dataset.statement])
                                    break;
                                case "racismBigotry":
                                    setRacismBigotry([event.target.value, event.target.dataset.statement])
                                    break;
                                case "internetAccess":
                                    setInternetAccess([event.target.value, event.target.dataset.statement])
                                    break;
                                case "housing":
                                    setHousing([event.target.value, event.target.dataset.statement])
                                    break;
                            }
                        }}>
                            <div className={"flex columns-6"}>
                                {data[key].statements.map((statement, i) => {
                                    return (
                                        <div key={key + i} className={"w-1/6 p-1 m-1 border rounded"}>
                                            <input className={"hidden peer"} type={"radio"} name={key} id={key + i}
                                                   value={i} data-statement={statement}/>
                                            <label
                                                className={"text-xs block p-2 peer-checked:bg-gray-300 h-full rounded"}
                                                htmlFor={key + i}>{statement}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </form>
                    </div>
                )
            })}

            <div className={"mt-20 flex justify-between"}>
                <div className={""}>
                    <Link href={"/workbook/life-area-survey-2"}>
                        <a className={"px-8 py-3 rounded border border-orange-600"}>Back</a>
                    </Link>
                </div>
                <div className={""}>
                    <a href={"/workbook/life-area-survey-4"}
                       className={"px-8 py-3 rounded border bg-orange-600 text-white"}>Next</a>

                </div>
            </div>
        </div>
    )
}
