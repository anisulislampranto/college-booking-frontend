'use client';

import { AuthContext } from '@/context/AuthContext';
import React, {useContext} from 'react'
import Loader from './Loader';

export default function GlobalLoader({children}) {
    const {loading} = useContext(AuthContext)

   return loading ?  <Loader /> : <> {children} </>
}
