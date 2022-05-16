import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import Image from "next/image";

export default function Home({user, dreams}) {
    const stats = [
        { name: 'Dreams', stat: dreams.length },
        { name: 'Life Area Surveys', stat: '5' },
        { name: 'To-do Completion', stat: '24.57%' },
    ]
    return (
        <Layout title={"Dashboard"} session={user}>
            <div className={"text-center w-full"}><Image className={"rounded-full"} src={user.image} width={100}
                                                         height={100}/>
                <div>{user.name}</div>
                <div>{user.email}</div>
            </div>

            <div>
                {/*<h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>*/}
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {stats.map((item) => (
                        <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}
    const {req} = context;

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // set up variables
    const url =  baseUrl + "/api/get-user?email=" + "uxmccauley@gmail.com"

    // fetch data
    const getUser = await fetch(url)

    // cast data to json
    const userJson = await getUser.json()



    //dreams url
    const getUserDreamsUrl = baseUrl + "/api/get-user-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    return {
        props: {
            user: userJson,
            dreams: dreamsJson
        }
    }

}

