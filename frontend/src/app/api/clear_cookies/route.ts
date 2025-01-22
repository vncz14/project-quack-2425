import {NextRequest, NextResponse} from "next/server";
import { cookies } from 'next/headers'
import { permanentRedirect, redirect } from 'next/navigation'

export async function GET(request: NextRequest) {

    const response = NextResponse.next()

    response.cookies.delete('csrftoken');
    response.cookies.delete('user');
    return response;
}
