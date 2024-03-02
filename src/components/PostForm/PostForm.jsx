// import React ,{useCallback} from 'react'
// import { useForm } from 'react-hook-form'
// import {Button , Input , Select ,RTE} from '../index'
// import appwriteService from '../../appwrite/config'
// import { useNavigate } from 'react-router-dom'
// import {useSelector } from 'react-redux'

// function PostForm({post}) {

//     const {register ,handleSubmit , watch ,setValue , control , getValues} = useForm({
//         defaultValues:{
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         }
//     })

//     const navigate = useNavigate()
//     const userData = useSelector((state) => state.auth.userData);

//     console.log("userData");
//     console.log(userData);

//     const submit = async (data) => {
//         if (post) {

//             const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            
//             console.log("uploaded img in if statement");
//             if (file) {
//                 appwriteService.deleteFile(post.featuredImg)
//             }
//             const dbPost = await appwriteService.updatePost(post.$id, {
//                 ...data,
//                 featuredImg: file ? file.$id : undefined,
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         }
//         else{
//             console.log(data);
//             const file = await appwriteService.uploadFile(data.image[0]);
//             console.log("uploaded img in else statement");

//             console.log("active");
//             console.log(file.$id);

//             console.log('userId is',userData.$id);

//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredImg = fileId;
//                 console.log("trying posting");
//                 console.log(data.slug);
//                 const dbPost = await appwriteService.createPost({...data, slug: data.slug , userId: userData.$id });
//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     }

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();

//     },[watch , slugTransform , setValue])


//   return (
//      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//             </div>

//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("featuredImg", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={appwriteService.filePreview(post.featuredImg)}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//      </form>
//   )
// }

// export default PostForm






import React, {useCallback} from "react";
import {useForm} from "react-hook-form"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"
import appwriteSerice from "../../appwrite/config"
import {useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"


export default function PostForm({post}){
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "active"

        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async(data) => {
        console.log(data);
        if (post) {
            const file = data.image[0] ? await appwriteSerice.uploadFile(data.image[0]) : null

            if (file) {
                appwriteSerice.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteSerice.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined 
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appwriteSerice.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteSerice.createPost({...data, userId: userData.$id})

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }

    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string") return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, "-")
    }, [])

    React.useEffect(() => {
        watch((value, {name}) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
        }) 
    }, [watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(submit)}
        className="flex flex-wrap"
        >
            <div className="w-2/3 px-2">
                <Input
                label="Title"
                placeholder="Title"
                className="mb-4"
                {...register("title", {required: true})}
                />
                <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {required: true})}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
                />
                <RTE
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues("content")}
                />
            </div>
            <div className="1/3 px-2">
                <Input
                label="Featured Image"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg"
                {...register("image", {required: !post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteSerice.filePreview(post.featuredImage)} alt={post.title}
                        className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", {required: true})}
                />
                <Button
                type="submit"
                bgColor={post ? "bg-green-500": undefined}
                className="w-full"
                >{post ? "Update": "Submit"}</Button>
            </div>
        </form>
    )
}
