import React , {useState , useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPost() {
    const [posts, setPosts] = useState([])
    console.log(posts);
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='w-full flex flex-wrap p-2  justify-around'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 m-5 w-80'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPost
