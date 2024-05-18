import { useState } from "react";
import { IoIosMenu } from "react-icons/io/index";

export default function Menu() {
	const [isActive, setIsActive] = useState(false);

	const handleClick = (event: any) => {
		setIsActive((current) => !current);
	};

	return (
		<>
			<button
				aria-label="Menu Button"
				className={
					(isActive ? "bg-transparent" : "") + " " + "group peer z-10"
				}
				onClick={handleClick}
			>
				<div className="flex gap-2">
					<IoIosMenu className="opacity-100 h-7 w-7"></IoIosMenu>
					<span className="md:visible invisible">Menu</span>
				</div>
			</button>
			<div
				className={
					(isActive ? "bg-transparent" : "") +
					" " +
					"absolute top-0 left-0 hidden h-screen w-screen peer-[.bg-transparent]:block"
				}
				onClick={handleClick}
			></div>
			<div className="ease-in-out duration-500 fixed top-0 -left-48 md:-left-72 flex h-screen w-48 md:w-72 justify-center bg-gradient-to-b from-black/80 py-40 peer-[.bg-transparent]:translate-x-full">
				<ul className="flex flex-col text-right text-sm md:text-lg gap-3 md:gap-8 text-white font-sans font-medium">
					<li className="hover:-translate-x-3 duration-200">
						<a href="/">Home</a>
					</li>
					<li className="hover:-translate-x-3 duration-200">
						<a href="/about">About</a>
					</li>
					<li className="hover:-translate-x-3 duration-200">
						<a href="/ourteam">Our Team</a>
					</li>
					<li className="hover:-translate-x-3 duration-200">
						<a href="/mrxEE">mrxEE</a>
					</li>
					<li className="hover:-translate-x-3 duration-200">
						<a href="/innovation">Innovation</a>
					</li>
					<li className="hover:-translate-x-3 duration-200">
						<a href="https://docs.murexrobotics.com">Docs</a>
					</li>
				</ul>
			</div>
		</>
	);
}
