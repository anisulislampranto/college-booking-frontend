'use client'

import { AuthContext } from "@/context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {
    const router = useRouter();
    const { user, setUser, userType } = useContext(AuthContext);

	console.log('user', user);


	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/auth/google?code=${authResult.code}&type=${userType}`);
				const data =  await result.json();

				console.log('res', result);
				console.log('data', data);

				if (result.ok) {
					localStorage.setItem('token', data.token)
					localStorage.setItem('user', JSON.stringify({token: data.token, ...data.user}))
					setUser({token: data.token, ...data.user});
					router.push('/profile');
				}
                
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

    useEffect(() => {
        if (user?.email) {
          router.back();
        }
      }, [user?.email]);

	return (
		<button onClick={googleLogin} className="relative inline-block px-4 py-2 font-medium group w-full mt-5">
			<span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
			<span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
			<span className="relative text-black group-hover:text-white flex justify-center gap-3 items-center">
				<FaGoogle className=" w-5 h-5" />
				<span className="text-sm font-semibold leading-6">Google</span>
			</span>
		</button>
	);
};

export default GoogleLogin;