import { getLesson, getuserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "./quiz";

const LessonPage = async () =>
{
    const lessonData = getLesson();
    const userProgressData = getuserProgress();
    const userSubscriptionData = getUserSubscription();
    const [lesson, userProgress,userSubscription] = await Promise.all([lessonData, userProgressData,userSubscriptionData]);

    if (!lesson || !userProgress)
    {
        redirect("/learn")
    }
    const initailPercentage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100;
    return (
        <Quiz
            initaiLLessonId={lesson.id}
            initaiLLessonChallenges={lesson.challenges}
            initailHearts={userProgress.hearts}
            initailPercentage={initailPercentage}
            userSubscription={userSubscription}
        />
    )
}

export default LessonPage;