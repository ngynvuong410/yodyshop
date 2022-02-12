import React from 'react'
import { useForm } from 'react-hook-form';
import {firebase} from '../store/FireBase'
import { faceBookProvider,googleProvider } from '../store/LoginService';
import Button from '../components/Button'
export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();



    const handelLoginFacebook = () => {
        firebase.auth().signInWithPopup(faceBookProvider)
            .then((res) => {
                console.log(res);
            })
            .catch(err => console.log(err))
    }
    const handelLoginGoogle = () =>{
        firebase.auth().signInWithPopup(googleProvider)
        .then((res) => {
            console.log(res);
        })
        .catch(err => console.log(err))
    }
    const handelSignInNormal = (data)=>{
      firebase.auth().createUserWithEmailAndPassword(data.email,data.password)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
    }
    return (
        <form className="user__utility" onSubmit={handleSubmit(handelSignInNormal)}>
            <div className="user__utility__wrap">
                <h3>LOGIN  MEMBER</h3>
                <div className="user__utility__group">
                    <input type='email' placeholder={!errors.password ? 'Email number ...' : 'Email  is not valid!!'}
                        {...register("email", { required: true, pattern: '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/' })}
                    />

                </div>
                <div className="user__utility__group">
                    <input type='password' placeholder={!errors.password ? 'Password ...' : 'Password is requid!!'}
                        {...register("password", { required: true, minLength: 6 })}
                    />

                </div>
              
               
                <button type="submit">LOGIN</button>
                <div className="user__utility__group">
                    <Button
                        onclick={handelLoginFacebook}
                    >
                        Sing in with Facebook
                    </Button>
                    <Button
                        onclick={handelLoginGoogle}
                    >
                        Sing in with Google
                    </Button>

                </div>
            </div>
        </form>
    )

}
