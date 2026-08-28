"use client";
import Link from "next/link"
import { useEffect, useState } from "react";

const Footer = () => {
    const [footerLink, setFooterLink] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/layout-data')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setFooterLink(data?.footerLink)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <footer>
            <div className="bg-paleSlate dark:bg-smokyBlack/40 py-6 sm:py-10">
                <div className="container">
                    <div className="flex flex-col sm:flex-row gap-2 items-center justify-between text-center sm:text-left">
                        <p>
                            © <Link href={"/"} className="hover:text-primary">docsta</Link>. All rights reserved Created by
                            <Link href={"https://getnextjstemplates.com/"} target="_blank" className="hover:text-primary"> Getnextjstemplates.com</Link>
                            {" "}• Distributed by
                            <Link href={"https://themewagon.com/"} target="_blank" className="hover:text-primary"> ThemeWagon</Link>
                            </p>
                        <div className="flex flex-wrap items-center row-gap-2 gap-x-5 justify-center">
                            {footerLink?.map((value: any, index: any) => {
                                return (
                                    <Link href={value?.link} key={index} className="hover:text-primary">
                                        {value?.title}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer