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
            productName: post?.productName || "",
            productInfo: post?.productInfo || "",
            slug: post?.slug || "",
            price: post?.price || "0",
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
            if (name === "productName") {
                setValue("slug", slugTransform(value.productName), {shouldValidate: true})
            }
        }) 
    }, [watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(submit)}
        className="flex justify-center"
        >
            <div className="w-2/3 px-2  ">
                <Input
                label="Product Name"
                placeholder="Product Name"
                className="mb-4"
                {...register("productName", {required: true})}
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
                    label="Product Info: "
                    name="productInfo"
                    control={control}
                    defaultValue={getValues("productInfo")}
                />
            </div>
            <div className="1/3 px-2 pt-5  ">
                <Input
                label="Featured Image"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg"
                {...register("image", {required: !post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteSerice.filePreview(post.featuredImage)} alt={post.productName}
                        className="rounded-lg"
                        />
                    </div>
                )}
                <Input
                label="Price"
                placeholder="price"
                className="mb-4"
                {...register("price", {required: true})}
                />
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
                >{post ? "Update": "Add Product"}</Button>
            </div>
        </form>
    )
}
