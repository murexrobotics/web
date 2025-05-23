import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const images = [
	{src: "/images/gallery40.jpg", desc: "A. Sivarasa, F. Liu and A. Chen test the 3DOF claw.", date: "April 2025"},
	{src: "/images/gallery41.jpg", desc: "V. Asavathiratham directs pool deck members on ROV calibration.", date: "March 2025"},
	{src: "/images/gallery38.jpg", desc: "Attempt the impossible.", date: "Worlds 2024"},
	{src: "/images/gallery37.jpg", desc: "M. Liu, Y. Shah, and V. Asavathiratham deploying the ROV.", date: "Worlds 2024"},
	{src: "/images/gallery36.jpg", desc: "Crane Lee and the team listening to the engineering presentation questions.", date: "Worlds 2024"},
	{src: "/images/gallery35.jpg", desc: "Marvin Shim presents software design rationale.", date: "Worlds 2024"},
	{src: "/images/gallery34.jpg", desc: "MUREX meets Filip and Piotr from CPSdrone to discuss underwater robotics!", date: "June 2024"},
	// {src: "/images/gallery32.jpg", desc: "PID and Thruster Tune Up", date: "May 2024"},
	{src: "/images/gallery33.jpg", desc: "Underwater Footage of the MUREX ROV V3.5", date: "May 2024"},
	{src: "/images/gallery30.jpg", desc: "MATE ROV NE Regionals Team Photo! See you at Kingsport!", date: "May 2024"},
	{src: "/images/gallery29.jpg", desc: "M. Liu and Y. Shah deploy the MUREX ROV V3.5 during MATE ROV NE Regionals", date: "May 2024"},
	{src: "/images/gallery31.jpg", desc: "The 2024 MUREX Electrical System", date: "May 2024"},
	{src: "/images/gallery27.png", desc: "MUREX meets mathematician and creator 3Blue1Brown!", date: "April 2024"},
	{src: "/images/gallery28.png", desc: "CEO Byran Huang discusses EE with Mr. Jordan Aceto of Cornell's Ornithology Lab", date: "February 2024"},
	// {src: "/images/gallery26.jpg", desc: "Doing it right...", date: "February 2024"},
	{src: "/images/gallery25.jpg", desc: "Attempting the impossible...", date: "February 2024"},
	{src: "/images/gallery27.jpg", desc: "MUREX EE Update", date: "December 2023"},
	// {src: "/images/gallery17.png", desc: "Altan and Max showing the new MUREX NFC Business Cards", date: "September 2023"},
	{src: "/images/gallery24.png", desc: "Byran and Max test Carrier + Power Board integration", date: "September 2023"},
	// {src: "/images/gallery23.png", desc: "First in-person meeting of the 2024 season!", date: "September 2023"},
	// {src: "/images/gallery22.png", desc: "3D render of the MUREX Power Board", date: "September 2023"},
	// {src: "/images/gallery21.png", desc: "3D render of the MUREX ESC Carrier Board", date: "September 2023"},
	// {src: "/images/gallery19.png", desc: "Max assembling the MUREX Power Board", date: "September 2023"},
	// {src: "/images/gallery18.png", desc: "Altan and Max making the MUREX NFC Business Cards", date: "September 2023"},
	// {src: "/images/gallery16.png", desc: "Photograph of initial MUREX Carrier Board testing", date: "August 2023"},
	// {src: "/images/gallery15.jpg", desc: "3D render of the MUREX Carrier Board", date: "August 2023"},
	// {src: "/images/gallery20.png", desc: "Byran stress testing the RP2040 SoC", date: "July 2023"},
	{src: "/images/gallery14.jpg", desc: "Team Members take a selfie during the 2023 New England Regionals", date: "April 2023"},
	{src: "/images/gallery13.jpg", desc: "Electrical Member Max Liu checks cable connections to the MUREX electrical enclosure during competition", date: "April 2023"},
	// {src: "/images/gallery12.jpg", desc: "Live stream capture of the pool floor of the MUREX ROV as it maneuvers into position", date: "April 2023"},
	// {src: "/images/gallery11.jpg", desc: "Live stream capture from the pool floor of the MUREX ROV being deployed.", date: "April 2023"},
	// {src: "/images/gallery10.jpg", desc: "Team Captain Ethan Cheng watches the robot being deployed during its first run.", date: "April 2023"},
	// {src: "/images/gallery9.jpg", desc: "The team wrapping up its first run.", date: "April 2023"},
	// {src: "/images/gallery8.jpg", desc: "ROV operating in the pool during MATE New England Regionals.", date: "April 2023"},
	// {src: "/images/gallery7.jpg", desc: "MUREX Pool Testing", date: "April 2023"},
	// {src: "/images/gallery6.jpg", desc: "MUREX 2022-23 Team Photo", date: "April 2023"},
	// {src: "/images/gallery5.jpg", desc: "Captain and Electrical Lead Byran Huang holds up the MUREX electrical enclosure.", date: "April 2023"},
	// {src: "/images/gallery4.jpg", desc: "Photoshoot of the MUREX electrical enclosure", date: "April 2023"},
	// {src: "/images/gallery3.jpg", desc: "Progress update of the MUREX Integration PCB.", date: "April 2023"},
	// {src: "/images/gallery2.jpg", desc: "Electrical Member Max Liu solders thruster connections.", date: "March 2023"},
	// {src: "/images/gallery1.jpg", desc: "Mechanical Lead Adam Tang drilling holes for a prototype arm.", date: "March 2023"},
];

export default function ImageGallery() {
	return (
		<div className="w-screen px-4 md:px-10 2xl:w-3/4 h-full">
			<ResponsiveMasonry
				columnsCountBreakPoints={{ 350: 1, 900: 2, 1200: 3 }}
			>
				<Masonry>
					{images.map((image, i) => (
						<div className="m-1 lg:m-2 relative group" key={i}>
							<img
								src={image.src}
								className="w-full block transition-all duration-150 ease-in-out rounded-xl"
								alt="MUREX Image Gallery Image"
							/>
                            <div className="absolute w-full rounded-xl h-full transition-all duration-200 ease-in-out bg-gradient-to-t from-gray-700 from-1% via-neutral-950 via-20% to-transparent to-60% opacity-0 top-0 bottom-0 left-0 right-0 group-hover:opacity-70"></div>
                            <div className="absolute p-4 lg:p-6 flex flex-col justify-end items-start w-full h-full transition-all duration-200 ease-in-out opacity-0 top-0 bottom-0 left-0 right-0 group-hover:opacity-100">
								<p className="text-gray-200 text-xl xl:text-3xl font-black uppercase font-hype">{image.date}</p>
								<p className="text-gray-200 text-sm xl:text-md font-normal">{image.desc}</p>
							</div>
						</div>
					))}
				</Masonry>
			</ResponsiveMasonry>
		</div>
	);
}
