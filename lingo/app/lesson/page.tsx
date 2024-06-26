import { getLesson, getuserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "./quiz";

const LessonPage = async () =>
{
    const lessonData = getLesson();
    const userProgressData = getuserProgress();
    const [lesson, userProgress] = await Promise.all([lessonData, userProgressData]);

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
            userSubscription={null}
        />
    )
}

export default LessonPage;