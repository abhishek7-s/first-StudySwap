import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'
function PostCard({$id , productName , featuredImage , price }) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-slate-800 rounded-xl p-4 h-full'>
            <div className='flex w-full justify-center mb-2 h-60'>
                <img src={appwriteService.filePreview(featuredImage)} alt={productName}
                className='rounded-xl h-full' /> 
            </div>
            <div className='flex flex-col justify-center items-center w-full h-20'>
              <div className='flex justify-around items-center font-bold py-2 w-full'>
                <h2 className='text-xl font-bold w-[50%]'>{productName}</h2>
                <div className='flex justify-end items-center w-[40%]'>
                  <h3 className='text-sm font-bold px-2 line-through text-red-500'>₹ {Number(price)+200}</h3>
                  <h3 className='text-xl font-bold  text-green-400'>₹ {price} </h3>
                </div>
              </div>
            </div>
            <button className='bg-blue-600 p-2 w-[95%] rounded-xl my-2'>Add To Card</button>
            
        </div>
    </Link>
  )
}

export default PostCard
