"use client"

import { challengeOptions, challenges } from "@/db/schema"
import { useState } from "react";
import { Header } from "./header";

type Props = {
    initailPercentage: number;
    initailHearts: number;
    initaiLLessonId: number;
    initaiLLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any; // Todo: Replace with subscript DB type
}
const Quiz = ({initaiLLessonChallenges,initaiLLessonId,initailHearts,initailPercentage,userSubscription}: Props) =>
{
    const [hearts, setHearts] = useState(initailHearts);
    const [percentage, setPercentage] = useState(initailPercentage)
    return <>
        <Header
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubscription?.isActive}
        />
    </>
}

export default Quiz;