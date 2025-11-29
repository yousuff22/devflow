import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

interface HomeProps {
  searchParams: {
    query?: string;
    filter?: string;
  };
}

const dummyQuestions = [
  { title: "How to use React Hooks?" },
  { title: "What is Next.js server component?" },
  { title: "How to deploy MERN app?" },
];

const Home = ({ searchParams }: HomeProps) => {
  const query = searchParams.query || "";

  const filteredQuestions = dummyQuestions.filter((q) =>
    q.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch
          route="/"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>

      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((q, i) => (
          <p key={i}>{q.title}</p>
        ))}
      </div>
    </>
  );
};

export default Home;
