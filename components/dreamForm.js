import {useState} from "react";
import {useRouter} from "next/router";

function DreamForm({setSavedDreams, user, setIsLoading}) {
    const [dream, setDream] = useState("")
    const [dreamNeed, setDreamNeed] = useState("")
    const [dreamHelp, setDreamHelp] = useState("")
    const router = useRouter()

    async function saveDream() {
        await fetch("/api/post-dream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dream,
                dreamNeed,
                dreamHelp,
                userId: user.email,
                status: "active"
            })
        })
    }

    return (
        <div className={" shadow-xl overflow-hidden mt-10 md:mt-0"}>
            <h2 className={"font-light uppercase px-4 py-2 bg-gray-700 text-white"}>Define a new dream</h2>

            <div className={"p-4"}>
                <p className={"text-sm text-orange-600"}>Your dream</p>
                <input
                    className={"w-full border-r-0 border-t-0 border-l-0 border-black border-b-[1px] placeholder:text-xs pl-1"}
                    type={"text"}
                    placeholder={"Type your dream here..."}
                    onChange={(e) => {
                        setDream(e.target.value)
                    }} value={dream}/>

                <p className={" mt-5 text-sm text-orange-600"}>What do you need to do to achieve this
                    dream?</p>
                <input
                    className={"w-full border-r-0 border-t-0 border-l-0 border-black border-b-[1px] placeholder:text-xs pl-1"}
                    type={"text"}
                    placeholder={"Type what you need here..."}
                    onChange={(e) => {
                        setDreamNeed(e.target.value)
                    }} value={dreamNeed}/>

                <p className={" mt-5 text-sm text-orange-600"}>Whose help do you need to achieve this
                    dream?</p>
                <input
                    className={"w-full border-r-0 border-t-0 border-l-0 border-black border-b-[1px] placeholder:text-xs pl-1"}
                    type={"text"}
                    placeholder={"Type whose help you need here..."}
                    onChange={(e) => {
                        setDreamHelp(e.target.value)
                    }} value={dreamHelp}/>

                <button
                    className={"p-2 mt-4 text-white text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"}
                    disabled={dream === ""}
                    onClick={async () => {
                        setIsLoading(true)
                        await saveDream().then()
                        setDream("")
                        setDreamNeed("")
                        setDreamHelp("")
                        router.reload()
                    }}>Save dream
                </button>
            </div>
        </div>
    );
}

export default DreamForm;
