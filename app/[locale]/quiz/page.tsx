import { QuizWrapper } from "@/components/quiz/quiz-wrapper";
import { useTranslations } from "next-intl";

export default function QuizPage() {
  const t = useTranslations();
  return (
    <main className="m-container my-6">
      <QuizWrapper
        t={{
          change: t("quiz.change"),
          send: t("quiz.send"),
          phoneNumber: t("quiz.phoneNumber"),
          inputPhone: t("quiz.inputPhone"),
          whichIsBelowCorrect: t("quiz.whichIsBelowCorrect"),
          getPrize: t("quiz.getPrize"),
          finish: t("quiz.finish"),
          nextQuestion: t("quiz.nextQuestion"),
          confirm: t("quiz.confirm"),
          areYouSure: t("quiz.areYouSure"),
          answer: t("quiz.answer"),
          congratulations: t("result.congratulations"),
          desc1: t("result.desc1"),
          desc2: t("result.desc2"),
          goHome: t("result.goHome"),
          kaspi: t("donate.kaspi"),
          saved: t('quiz.saved'),
          close: t('quiz.close'),
        }}
      />
    </main>
  );
}
