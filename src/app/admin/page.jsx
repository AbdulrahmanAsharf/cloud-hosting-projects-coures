import { cookies } from 'next/headers'
import AddArticles from './AddArticles'
import { redirect } from 'next/navigation'
import { verifyTokenForPage } from '@/utils/verifyToken'




const admin = () => {
  const token = cookies().get('jwtToken')?.value
  if (!token) redirect("/")

  const payload = verifyTokenForPage(token)
  if (payload?.isAdmin === false) redirect("/")
  return (
    <div className='fix-height  flex items-center justify-center px-5 lg:px20'>
      <div className='shadow w-fll p-4 rounded bg-purple-200'>
        <h2 className='text-xl lg:text-2xl font-semibold text-gray-700 mb-4'>
          Add New Article
        </h2>
        <AddArticles />
      </div>
    </div>
  )
}

export default admin
