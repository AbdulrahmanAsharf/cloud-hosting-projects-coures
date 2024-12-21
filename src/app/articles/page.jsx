import ArticleItem from "@/components/Articles/Articles";
import Pagination from "@/components/Articles/Pagination";
import SearchArticleInput from "@/components/Articles/SearchArticleinput";
import { getArticles } from '@/apiCalls/articleApiCall';
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";

const ArticlesPage = async ({ searchParams }) => {
  const { pageNumber } = searchParams;
  const articles = await getArticles(pageNumber);
  const count = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map(item => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages} />
    </section>
  );
};

export default ArticlesPage;

export const metadata = {
  title: 'Articles Page',
  description: 'Articles about programming',
};
