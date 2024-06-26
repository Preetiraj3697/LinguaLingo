"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useAudio } from "react-use";

import { QuestionBubble } from "./question-button";
import { Header } from "./header";
import { Footer } from "./footer";
import { Challenge } from "./challenge";

import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { challengeOptions, challenges } from "@/db/schema";
import { reduceHearts } from "@/actions/user-progress";

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
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio,_i,incorrectControls] = useAudio({ src: "/incorrect.wav" });
  
  const [pending, startTransition] = useTransition();
  const [hearts, setHearts] = useState(initailHearts);
  const [percentage, setPercentage] = useState(initailPercentage);
  const [challenges] = useState(initaiLLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };
  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };
  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    if (status == "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find((option) => option.correct);

    if (!correctOption) {
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              console.log("Missing Hearts");
              return;
            }
            correctControls.play()
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);
            if (initailPercentage == 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => {
            toast.error("Something went wrong. Please try again!");
          });
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              console.log("Missing hearts");
              return;
            }
            incorrectControls.play();
            setStatus("wrong");
            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again!"));
      });
    }
  };
  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;
  
  
  
  
  return (
    <>
      {incorrectAudio}
      {correctAudio}
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
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};

export default Quiz;
