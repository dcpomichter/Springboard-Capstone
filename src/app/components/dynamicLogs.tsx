// "use client"
// import { NextRequest } from "next/server";
// import "../globals.css";
// import Link from "next/link";
// import { getDataFromToken } from "@/helpers/getDataFromToken";


// export default function LogoutLogin(request: NextRequest) {

//     const token = getDataFromToken()

//     return (
//         token ? <Link className="flex-col items-right justify-center p-1 m-2 bg-white-300" style={{ color: "var(--bums-dark-blue)" }} href={'/logout'}>Logout</Link> :
//             <>
//                 <Link className="flex-col items-right justify-center p-1 m-2 bg-white-300" style={{ color: "var(--bums-dark-blue)" }} href={'/login'}>Login</Link>
//                 <Link className="flex-col items-right justify-center p-1 m-2 bg-white-300" style={{ color: "var(--bums-dark-blue)" }} href={'/signup'}>Sign Up</Link>
//             </>
//     )


// }
