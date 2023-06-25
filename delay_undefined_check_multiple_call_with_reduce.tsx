import React, { useCallback } from "react";


export default function DelayUndefinedMC(): JSX.Element {

    async function MultipleCallWithReduce() {
        const delay = (ms:any) => new Promise(resolve => setTimeout(resolve, ms));

        const retryGetMembersOfTeam = async (teamKey:any, retries = 3, delayMS = 1000) => {
            for (let i = 0; i < retries; i++) {
                try {
                    const result = await GetMembersOfTeam(teamKey);
                    if (result) return result;
                        throw new Error('Result was null or undefined');
                } catch (error) {
                    
                    console.error(`Attempt ${i+1} failed for GetMembersOfTeam with key ${teamKey}. Error: ${error}`);
                    if (i < retries - 1) await delay(delayMS);
                    else throw error;
                }
            }
        };

        const allMembers = await teamArray.reduce(async (previousPromise, team) => {
            const accumulator = await previousPromise;
            const members = await retryGetMembersOfTeam(team.key);

            if (!members) {
                console.error(`Failed to get members for team: ${team.key}`);
                return accumulator;
            }

            return [...accumulator, ...(members || [])];
        }, Promise.resolve([]));
    }

    return (
        <>

        </>


    )   

}