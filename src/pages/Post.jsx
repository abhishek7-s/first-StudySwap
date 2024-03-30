import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <Container>
            <div className="py-8 flex h-96 justify-center items-center">
                    <div className="w-full h-full flex justify-center mb-4 relative rounded-xl p-2 ">
                    <img
                        src={appwriteService.filePreview(post.featuredImage)}
                        alt={post.productName}
                        className="rounded-xl"
                    />
                    </div>
                    <div className="w-full h-full flex flex-col justify-center items-center mb-6 ">

                        <div className=" w-full p-5">
                            <h1 className="text-3xl font-bold pb-4">{post.productName}</h1>
                            {parse(post.productInfo)}
                        </div>
                        <div className='flex justify-start items-center w-full p-2'>
                            <h3 className='text-3xl font-bold  text-white'>₹ {post.price} </h3>
                            <h3 className='text-xl font-bold px-2 line-through text-gray-500'>₹ {Number(post.price)+200}</h3>
                        </div>
                        {isAuthor && (
                        <div className="w-full">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 w-[45%]">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className="w-[45%]" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                        )}

                        {!isAuthor && (
                            <div>
                                <button className='bg-blue-600 p-2 w-[95%] rounded-xl my-2'>Add To Card</button>
                                <button className='bg-green-600 p-2 w-[95%] rounded-xl my-2'>Buy Now</button>
                            </div>
                        )}
                    </div>

            </div>
        </Container>
    ) : null;
}