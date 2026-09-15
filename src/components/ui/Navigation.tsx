"use client";
import Link from "next/link";

export function Navigation() {
  return <nav className="site-nav"><Link href="/en" className="brand">AB</Link><div><a href="#projects">PROJECTS</a><a href="#contact">CONTACT</a></div></nav>;
}
