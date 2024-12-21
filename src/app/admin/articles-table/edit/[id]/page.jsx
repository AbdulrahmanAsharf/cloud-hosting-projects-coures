import { getSingleArticle } from '@/apiCalls/articleApiCall';
import EditArticleForm from './EditArticleFrom';


const EditArticlePage = async ({ params }) => {
    const article = await getSingleArticle(params.id);


  return (
    <section className='fix-height flex items-center justify-center px-5 lg:px-20'>
      <div className='shadow p-4 bg-purple-200 rounded w-full'>
        <h2 className='text-2xl text-green-700 font-semibold mb-4'>
            Edit Article
        </h2>
        <EditArticleForm article={article} />
      </div>
    </section>
  )
}

export default EditArticlePage