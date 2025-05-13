"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { EnterDoor } from "@/icons/EnterDoor";
import { Button } from "./Button";
import { Close } from "@/icons/Close";
import { MenuBars } from "@/icons/MenuBars";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (href: string) => pathname === href;

    const navLinks = [
        { href: "/", text: "Home" },
        { href: "/about-us", text: "About Us" },
        { href: "/collaboration", text: "Collaboration" },
        { href: "/announcement", text: "Announcement" },
        { href: "/hackathons-events", text: "Hackathon / Events" },
        { href: "/jobs-internships", text: "Jobs & Internships" }
    ];

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-mainBgColor/70 backdrop-blur-md shadow-md' : 'bg-mainBgColor'}`}>
            <div className="flex justify-between items-center py-5 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Logo and company name */}
                <div className="flex items-center">
                    <div onClick={() => router.push("/")} className="cursor-pointer">
                        <Image src="/ApnaCodingHalf.png" alt="CompanyLogo" width={62} height={52} />
                    </div>
                    <div
                        className="text-xl md:text-2xl cursor-pointer font-bold ml-3 text-black relative"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() => router.push("/")}
                    >
                        Apna Coding
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ease-in-out ${isHovering ? 'w-full' : 'w-0'}`}></span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 justify-start ml-6 space-x-6">
                    {navLinks.map((item) => (
                        <div key={item.href} className="relative group">
                            <Link
                                href={item.href}
                                className={`${isActive(item.href) ? 'font-bold text-blue-600' : 'text-black hover:text-blue-600'} transition-colors duration-200`}
                            >
                                {item.text}
                                <span className={`absolute -bottom-1 left-0 h-0.5 ${isActive(item.href) ? 'bg-blue-600 w-full' : 'bg-blue-600 w-0 group-hover:w-full transition-all duration-300'}`}></span>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black">
                        {isMenuOpen ? <Close /> : <MenuBars />}
                    </button>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center">
                    <Button onClick={() => {window.open("https://chat.whatsapp.com/GWTOWtrju9g9eD2Kpozpzr")}} endIcon={<EnterDoor />} variant="blue_variant" text="Join Now" />
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 right-0 bg-mainBgColor/95 backdrop-blur-md z-50 p-4 shadow-lg">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`py-2 px-4 ${isActive(item.href) ? 'font-bold text-blue-600' : 'text-black'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.text}
                                </Link>
                            ))}
                            <Button
                                onClick={() => {window.open("https://chat.whatsapp.com/GWTOWtrju9g9eD2Kpozpzr")}}
                                endIcon={<EnterDoor />}
                                variant="purple_variant"
                                text="Join Now"
                                className="mt-4"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}