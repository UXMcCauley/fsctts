import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";

export default function Login() {
    const { data: session } = useSession()
    const router = useRouter()

    if (session) {
        router.push("/").then()
        return (
            <div className={"h-screen w-screen bg-gray-700 flex align-middle justify-center"}>
                <div className={"bg-white max-h-[300px] self-center p-4 text-center rounded shadow"}>
                    <div className={"self-center"}>
                        <div className={""}>Signed in as {session.user.email}</div>
                        <button className={"rounded bg-gray-700 text-white p-3 mt-3"} onClick={() => signOut()}>Sign out</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={"h-screen w-screen bg-gray-700 flex align-middle justify-center"}>
            <Head>
                <title>TTS / Login</title>
            </Head>
            <div className={"bg-white max-h-[300px] self-center p-4 text-center rounded shadow"}>
                <div className={"self-center"}>
                    <div className={""}>Not signed in</div>
                    <p>
                        <button className={"rounded bg-green-700 text-white p-3 mt-3"}
                                onClick={() => signIn("google")}>Sign in with Google
                        </button>
                    </p>
                    <button className={"rounded bg-gray-700 text-white p-3 mt-3"} onClick={() => signIn("email")}>Sign in with Email</button>
                </div>
            </div>
        </div>
    )
}
