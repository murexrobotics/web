import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const images = [
	{src: "/images/gallery1.jpg", desc: "Mechanical Lead Adam Tang drilling holes for a prototype arm.", date: "March 2023"},
	{src: "/images/gallery2.jpg", desc: "Electrical Member Max Liu solders thruster connections.", date: "March 2023"},
	{src: "/images/gallery3.jpg", desc: "Progress update of the MUREX Integration PCB.", date: "April 2023"},
	{src: "/images/gallery4.jpg", desc: "Photoshoot of the MUREX electrical enclosure", date: "April 2023"},
	{src: "/images/gallery5.jpg", desc: "Captain and Electrical Lead Byran Huang holds up the MUREX electrical enclosure.", date: "April 2023"},
	{src: "/images/gallery6.jpg", desc: "MUREX 2022-23 Team Photo", date: "April 2023"},
	{src: "/images/gallery7.jpg", desc: "MUREX Pool Testing", date: "April 2023"},
	{src: "/images/gallery8.jpg", desc: "ROV operating in the pool during MATE New England Regionals.", date: "April 2023"},
	{src: "/images/gallery9.jpg", desc: "The team wrapping up its first run.", date: "April 2023"},
	{src: "/images/gallery10.jpg", desc: "Team Captain Ethan Cheng watches the robot being deployed during its first run.", date: "April 2023"},
	{src: "/images/gallery11.jpg", desc: "Live stream capture from the pool floor of the MUREX ROV being deployed.", date: "April 2023"},
	{src: "/images/gallery12.jpg", desc: "Live stream capture of the pool floor of the MUREX ROV as it maneuvers into position", date: "April 2023"},
	{src: "/images/gallery13.jpg", desc: "Electrical Member Max Liu checks cable connections to the MUREX electrical enclosure during competition", date: "April 2023"},
	{src: "/images/gallery14.jpg", desc: "Team Members take a selfie during the 2023 New England Regionals", date: "April 2023"},
];

export default function ImageGallery() {
	return (
		<div className="w-screen px-4 md:px-10 2xl:w-3/4 h-full">
			<ResponsiveMasonry
				columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
			>
				<Masonry>
					{images.map((image, i) => (
						<div className="p-1 lg:p-4 relative group" key={i}>
							<img
								src={image.src}
								className="w-full block transition-all duration-150 ease-in-out"
								alt="MUREX Image Gallery Image"
							/>
                            <div className="absolute w-full h-full transition-all duration-200 ease-in-out bg-gradient-to-t from-neutral-950 to-transparent opacity-0 top-0 bottom-0 left-0 right-0 group-hover:opacity-50"></div>
                            <div className="absolute p-6 md:p-8 2xl:p-12 flex flex-col justify-end items-start w-full h-full transition-all duration-200 ease-in-out opacity-0 top-0 bottom-0 left-0 right-0 group-hover:opacity-100">
								<p className="text-white text-sm xl:text-3xl font-bold font-hype">{image.date}</p>
								<p className="text-white text-xs xl:text-base font-normal font-hype">{image.desc}</p>
							</div>
						</div>
					))}
				</Masonry>
			</ResponsiveMasonry>
		</div>
	);
}
