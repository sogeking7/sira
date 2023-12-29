import { Quiz } from "@/components/quiz/quiz";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("quiz");
  return (
    <main className="m-container my-6">
      <Quiz t={{}} />
    </main>
  );
}
