import React , {useState ,useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import authService from '../appwrite/auth'
import {useSelector } from "react-redux"
import loader from '../assets/loader.svg'


function MyPost() {
    const userData = useSelector((state) => state.auth.userData)
    const [posts, setPosts] = useState([])


    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [userData])
            
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='w-full flex flex-wrap p-2  justify-around'>
                {posts.map((post) => { 
                    if(post.userId == userData.$id){
                        return <div key={post.$id} className='p-2 m-5 w-80'>
                            <PostCard {...post} />
                        </div>
                    }
                })}
            </div>
            </Container>
    </div>
  )
}

export default MyPost
