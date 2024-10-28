'use client'

import { AuthContext } from "@/context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {
    const router = useRouter();
    const { user, setUser } = useContext(AuthContext);

	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				const result = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/auth/google?code=${authResult.code}`);
				const data =  await result.json();

				console.log('res', result);

				localStorage.setItem('user',JSON.stringify(data.user));
				localStorage.setItem('token',JSON.stringify(data.token));
                setUser(data.user);
                router.push('/profile');
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
        if (user) {
          router.back();
        }
      }, [user, router]);

	return (
		<button
            onClick={googleLogin}
            className=" mt-5 flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
        >
            <FaGoogle className=" w-5 h-5" />
            <span className="text-sm font-semibold leading-6">Google</span>
        </button>
	);
};

export default GoogleLogin;