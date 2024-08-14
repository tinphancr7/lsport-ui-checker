import Image from "next/image";

function AuthLayout({ children }: { children: React.ReactNode }) {
    return ( 
        <div className="h-screen max-h-screen grid grid-cols-12 px-[10%] max-md:px-0 relative">
            <div className="col-span-6 relative h-screen w-full max-md:col-span-12">
                <Image 
                    src="/imgs/auth-banner.png"
                    alt=""
                    fill
                />
            </div>
            <div className="col-span-6 max-md:col-span-12 max-md:absolute max-md:top-1/2 max-md:left-1 max-md:right-1 max-md:-translate-y-[50%] max-md:bg-slate-100/90">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;