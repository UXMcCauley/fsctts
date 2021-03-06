import React from 'react';

function ReferralSelectsButton({
                                   userReferrals,
                                   currentReferral,
                                   domain,
                                   setCurrentReferral,
                                   router,
                                   clientId,
                                   setUserReferrals,
                                   user,
                                   visible
                               }) {

    async function saveReferral() {
        await fetch("/api/save-referral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dreamId: router.query.dreamId,
                surveyId: router.query.surveyId,
                userId: clientId === undefined ? user.email : clientId,
                dream: router.query.dream,
                domain: currentReferral.domain,
                name: currentReferral.name,
                email: currentReferral.email,
                phone: currentReferral.phone,
                hours: currentReferral.hours,
                requirements: currentReferral.requirements,
                url: currentReferral.url,
                contact: currentReferral.contact,
                needs: currentReferral.needs
            })
        })
    }

    async function getUserReferrals() {
        const id = clientId === undefined ? user.email : clientId
        const referrals = await fetch("/api/get-referrals?userId=" + id)
            .then(res => res.json())
        await setUserReferrals(referrals)
    }


    function checkUserReferrals() {
        return userReferrals.filter(referral => referral.name === currentReferral.name)
    }

    return (
        <button
            disabled={Object.keys(currentReferral).length === 0 || currentReferral.domain !== domain}
            className={`${visible ? "visible" : "hidden"} text-white px-4 py-2 text-xs rounded mt-3 mb-4 bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400`}
            onClick={() => {

                if (checkUserReferrals().length === 0) {
                    // save referral
                    saveReferral().then(() => {
                        getUserReferrals().then()
                    })
                    setCurrentReferral({})
                    document.getElementById(domain).selectedIndex = 0
                    // end save referral
                } else {
                    alert("You have already selected this referral. Please choose another referral.")
                    setCurrentReferral({})
                    document.getElementById(domain).selectedIndex = 0
                }

            }}>+ Save
        </button>
    );
}

export default ReferralSelectsButton;
