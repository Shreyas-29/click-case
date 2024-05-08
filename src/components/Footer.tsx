import React from 'react'
import Wrapper from "./utils/Wrapper";
import { Button } from "./ui/Button";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="relative h-20 bg-background">
            <Wrapper>
                <div className="h-full border-t border-border">

                    <div className="flex flex-col items-center justify-center h-full md:flex-row md:justify-between">
                        <div className="pb-2 text-center md:text-left md:pb-0">
                            <p className="text-sm text-muted-foreground">
                                &copy; {new Date().getFullYear()} All rights reserved
                            </p>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="flex space-x-4">
                                <Button variant="ghost">
                                    <Link href="#">
                                        Terms
                                    </Link>
                                </Button>
                                <Button variant="ghost">
                                    <Link href="#">
                                        Privacy Policy
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </Wrapper>
        </footer>
    )
};

export default Footer
