import {useRouter} from "next/router";
import {useState} from "react";
import {XCircle} from "phosphor-react";

function ProfilePrograms({user}) {
    const router = useRouter()

    const [programs, setPrograms] = useState(user.programs ? user.programs : [])
    const [programsUpdated, setProgramsUpdated] = useState(false)

    async function savePrograms () {
        await fetch("/api/save-programs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                programs,
                userId: user._id
            })
        })
        router.reload()
    }
    return (
        <>
            <div className={"flex flex-col"}>
                <div className={""}>
                    <h2 className={"uppercase text-gray-600 font-light mb-3"}>Available Programs</h2>
                    <select className={"h-[240px] w-full"} multiple onChange={(e) => {
                        setPrograms(prevState => {
                            if (programs.indexOf(e.target.value) === -1) {
                                return [...prevState, e.target.value]
                            } else {
                                return prevState
                            }
                        })
                        setProgramsUpdated(true)
                    }}>
                        <option>FoodShare, Employment, and Training (FSET)</option>
                        <option>Jobs for America&apos;s Graduates (JAG)</option>
                        <option>Transportation Alliance for New Solutions (TrANS)</option>
                        <option>Road to Livelihood</option>
                        <option>Upward Bound Math Science (UBMS)</option>
                        <option>Upward Bound (UB)</option>
                        <option>Wheels to Work</option>
                        <option>WIOA Adult and Dislocated Worker</option>
                        <option>WIOA Youth</option>
                        <option>Wisconsin Employment Transportation Assistance Program (WETAP)</option>
                        <option>Wisconsin Works (W-2)</option>
                    </select>
                </div>
                <div className={""}>
                    <h2 className={"uppercase text-gray-600 font-light mb-3"}>Your Selected Programs</h2>
                    <div>
                        {programs.map(program => (
                            <div className={"cursor-pointer rounded border py-1 px-2 min-h-8 mr-2 mb-2 flex justify-between align-middle text-sm"} key={program}
                                 onClick={() => {
                                     setPrograms(prevState => prevState.filter(item => item !== program))
                                     setProgramsUpdated(true)
                                 }}>
                                <div className={"inline-block"}>{program}</div>
                                <div className={"inline-block"}><XCircle size={20} weight="thin" color={"red"}/></div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className={"w-full"}>
                <button className={"p-2 bg-indigo-600 text-white rounded mt-4 disabled:bg-gray-500 cursor-pointer text-sm"} onClick={() => {
                    if(programsUpdated){
                        savePrograms()
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                    }

                }} disabled={!programsUpdated}>Update programs
                </button>
            </div>
        </>
    );
}

export default ProfilePrograms;
