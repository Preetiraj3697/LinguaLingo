"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-button";
import { Challenge } from "./challenge";

type Props = {
  initailPercentage: number;
  initailHearts: number;
  initaiLLessonId: number;
  initaiLLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any; // Todo: Replace with subscript DB type
};
const Quiz = ({
  initaiLLessonChallenges,
  initaiLLessonId,
  initailHearts,
  initailPercentage,
  userSubscription,
}: Props) => {
  const [hearts, setHearts] = useState(initailHearts);
  const [percentage, setPercentage] = useState(initailPercentage);
  const [challenges] = useState(initaiLLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];
  const title =
    challenge.type === "ASSIST"
      ? "Select the correct mearning"
      : challenge.question;
  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:main-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
                          )}
                          <Challenge 
                              options={options}
                              onSelect={() => { }}
                              status="none"
                              selectedOption={undefined}
                              disabled={false}
                              type={challenge.type}

                          />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
