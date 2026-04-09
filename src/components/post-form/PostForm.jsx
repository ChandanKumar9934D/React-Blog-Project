import React from 'react'
import { useForm } from 'react-hook-form'
import{Input,Select,RTE} from '../index'
import appWriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const navigate=useNavigate()
    const userData=useSelector(state=>state.auth.userData)
    const {register,handleSubmit,watch,setValue,getValues,control}=useForm({
        defaultValues:{
            title: post?.title ||" ",
            slug : post?.slug  ||" ",
            content: post?.content ||" ",
            status: post?.status ||"active",
            
        }
    })

    const submit=async(data)=>{
        if (post) {
            const file=data?.image[0] ? appWriteService.uploadFile(data.image[0]):null
          
            if (file) {
                appWriteService.deleteFile(post?.feturedImage)
                
            }
            const dbPost=await appWriteService.updatePost(post.$id,{
                ...data,
                featuredImage:file ?file.$id :undefined
            })
            if (dbPost) {
                navigate(`/post/${post.$id}`)
            }
        }else{
             const file=data?.image[0] ? appWriteService.uploadFile(data.image[0]):null
             if (file) {
                
                 const createPost= await appWriteService.createPost(
                   {
                       ...data,
                       featuredImage:file?file.$id:undefined,
                       userId:userData.$id
                   }
                 )
                 if (createPost) {
                //    navigate('/posts')
                   navigate(`/post/${createPost.$id}`)
                   
                 }
             }
        }

    }
  return (
    <div>
      
    </div>
  )
}

export default PostForm
