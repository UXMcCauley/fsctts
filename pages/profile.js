import Layout from "../components/layout";
import {getSession} from "next-auth/react";

export default function Dreams({custom}) {
    return (
        <Layout title={"Profile"} session={custom}>
            Content
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    // console.log(session)
    //redirect
    if (!session) return {redirect: {destination: "/login", permanent: false}}

    return {
        props: {
            custom: session
        }
    }

}

