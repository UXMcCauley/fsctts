import {labelMap} from "../lib/serviceLabelsMap";
import {CheckCircle, Circle, Flag} from "phosphor-react";

export default function SurveyDomainListItem({item, activeDomain, setActiveDomain, answered, domains, setOpen}) {
    console.log(item)
    return (
        <div
            className={`${activeDomain === item ? "border-l-6" : ""} py-2 px-4 flex justify-between cursor-pointer w-full hover:border-l-4 hover:border-indigo-500`}
            key={item} onClick={() => {
            setActiveDomain(item)
            setOpen(false)
        }}>
            <div className={"self-center text-sm mr-3"}>{labelMap[item]}</div>
            <div className={"flex justify-end"}>
                <div className={"mr-1"}>
                    {domains.indexOf(item) > -1 ? <Flag size={20} color={"red"}/> : null}
                </div>
                <div>
                    {answered.hasOwnProperty(item) ? <CheckCircle size={20} color={"green"}/> :
                        <Circle size={20} weight="thin" color={"#b3b3b3"}/>}
                </div>
            </div>
        </div>
    )
}
