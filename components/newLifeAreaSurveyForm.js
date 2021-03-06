import {lasList} from "../lib/lasList";
import {labelMap} from "../lib/serviceLabelsMap";
import Toggle from "./toggle";

function NewLifeAreaSurveyForm({activeDomain, setAnswered, answered, domains, setDomains, setScore}) {

    function getScore() {
        let score = 0
        for (const key in answered) {
            score += answered[key].selection
        }
        return score
    }

    return (
        <div className={"p-0 md:p-4"}>
            <div className={"md:flex justify-between"}>
                <div className={""}>
                    <h2 className={"uppercase text-orange-600 text-xl font-serif"}>{labelMap[activeDomain]}</h2>
                </div>
                <div>
                    <span className={"text-sm text-red-600 mr-4"}>Set as a priority life area</span>
                    <Toggle domains={domains} setDomains={setDomains} activeDomain={activeDomain}/>
                </div>
            </div>

            <p className={"text-sm mt-7"}>Select the option that best describes your condition in each of the life
                areas. You must select an answer for each life area. If one does not apply to you, then
                select &quot;This does not apply to me.&quot;</p>
            <div className={"mt-8"}>

                <form onChange={async (event) => {
                    await setAnswered(prevState => ({
                        ...prevState,
                        [activeDomain]: {
                            ...prevState[activeDomain],
                            selection: eval(event.target.value),
                            statement: event.target.dataset.statement
                        }
                    }))
                }}>

                    <div className={"flex justify-center align-middle"}>
                        <div className={"flex-1 self-center"}>
                            <input
                                checked={answered[activeDomain] && answered[activeDomain].selection === 0}
                                value={0} className={"hidden peer"} type={"radio"} id={activeDomain + "-0"}
                                data-statement={"This does not apply to me."}
                                name={activeDomain}/>
                            <label
                                className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300 mb-2 border text-sm"}
                                htmlFor={activeDomain + "-0"}>This does not apply to me.</label>
                        </div>
                        <div className={"flex justify-center items-center mb-2 bg-orange-600 text-white w-[50px]"}>
                            <div className={"text-2xl"}>0</div>
                        </div>
                    </div>


                    <div className={"flex justify-center align-middle"}>
                        <div className={"flex-1 self-center"}>
                            <input checked={answered[activeDomain] && answered[activeDomain].selection === 1} value={1}
                                   className={"hidden peer"} type={"radio"} id={activeDomain + "-1"}
                                   data-statement={lasList[activeDomain].statements[1]}
                                   name={activeDomain}/>
                            <label
                                className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300 mb-2 border text-sm"}
                                htmlFor={activeDomain + "-1"}>{lasList[activeDomain].statements[1]}</label>
                        </div>
                        <div className={"flex justify-center items-center mb-2 bg-orange-600 text-white w-[50px]"}>
                            <div className={"text-2xl"}>1</div>
                        </div>
                    </div>

                    <div className={"flex justify-center align-middle"}>
                        <div className={"flex-1 self-center"}>
                        <input checked={answered[activeDomain] && answered[activeDomain].selection === 2} value={2}
                               className={"hidden peer"} type={"radio"} id={activeDomain + "-2"}
                               data-statement={lasList[activeDomain].statements[2]}
                               name={activeDomain}/>
                        <label className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300  mb-2 border text-sm"}
                               htmlFor={activeDomain + "-2"}>{lasList[activeDomain].statements[2]}</label>
                        </div>
                        <div className={"flex justify-center items-center mb-2 bg-orange-600 text-white w-[50px]"}>
                            <div className={"text-2xl"}>2</div>
                        </div>
                    </div>

                    <div className={"flex justify-center align-middle"}>
                        <div className={"flex-1 self-center"}>
                        <input checked={answered[activeDomain] && answered[activeDomain].selection === 3} value={3}
                               className={"hidden peer"} type={"radio"} id={activeDomain + "-3"}
                               data-statement={lasList[activeDomain].statements[3]}
                               name={activeDomain}/>
                        <label className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300  mb-2 border text-sm"}
                               htmlFor={activeDomain + "-3"}>{lasList[activeDomain].statements[3]}</label>
                        </div>
                        <div className={"flex justify-center items-center mb-2 bg-orange-600 text-white w-[50px]"}>
                            <div className={"text-2xl"}>3</div>
                        </div>
                    </div>

                    <div className={"flex justify-center align-middle"}>
                        <div className={"flex-1 self-center"}>
                        <input checked={answered[activeDomain] && answered[activeDomain].selection === 4} value={4}
                               className={"hidden peer"} type={"radio"} id={activeDomain + "-4"}
                               data-statement={lasList[activeDomain].statements[4]}
                               name={activeDomain}/>
                        <label className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300  mb-2 border text-sm"}
                               htmlFor={activeDomain + "-4"}>{lasList[activeDomain].statements[4]}</label>
                        </div>
                        <div className={"flex justify-center items-center mb-2 bg-orange-600 text-white w-[50px]"}>
                            <div className={"text-2xl"}>4</div>
                        </div>
                    </div>

                    <div className={"flex justify-center align-middle"}>
                        <div className={"flex-1 self-center"}>
                        <input checked={answered[activeDomain] && answered[activeDomain].selection === 5} value={5}
                               className={"hidden peer"} type={"radio"} id={activeDomain + "-5"}
                               data-statement={lasList[activeDomain].statements[5]}
                               name={activeDomain}/>
                        <label className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300  mb-2 border text-sm"}
                               htmlFor={activeDomain + "-5"}>{lasList[activeDomain].statements[5]}</label>
                        </div>
                        <div className={"flex justify-center items-center mb-2 bg-orange-600 text-white w-[50px]"}>
                            <div className={"text-2xl"}>5</div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default NewLifeAreaSurveyForm;
