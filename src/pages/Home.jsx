import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { Navigate } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-slate-900">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full bg-slate-900 flex flex-wrap'>
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

export default Home