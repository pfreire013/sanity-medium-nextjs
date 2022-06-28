import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity.js'
import { Post } from '../typings'

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }) => {
  console.log({ posts });
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <Header />
     <Banner />
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6'>
      {posts.map(post => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className='group cursor-pointer border rounded-lg overflow-hidden'>
            <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.mainImage).url()!} alt="" />
            <div className='flex justify-between p-5 bg-white'>
              <div className=''>
                <p className='text-lg font-bold'>{post.title}</p>
                <p>{post.description} by {post.author.name}</p>
              </div>

              <img className='h-12 w-12 rounded-full object-cover' src={urlFor(post.author.image).url()!} alt="" />
            </div>
          </div>
        </Link>
      ))}
     </div>

    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title,
    slug,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts
    }
  }
}

export default Home