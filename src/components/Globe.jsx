import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "@react-spring/web";

export default function Cobe() {
	const canvasRef = useRef();
	const pointerInteracting = useRef(null);
	const pointerInteractionMovement = useRef(0);
	const [{ r }, api] = useSpring(() => ({
		r: 0,
		config: {
			mass: 1,
			tension: 280,
			friction: 40,
			precision: 0.001,
		},
	}));
	useEffect(() => {
		let phi = 0;
		let width = 0;
		let baseColor = 1;
		let glowColor = 0.7;
		let scale = 2;
        let markerSize = 0.08;
		const onResize = () =>
			canvasRef.current && (width = canvasRef.current.offsetWidth);
		window.addEventListener("resize", onResize);
		onResize();
		const globe = createGlobe(canvasRef.current, {
			devicePixelRatio: scale,
			width: width * scale,
			height: width * scale,
			phi: 0,
			theta: 0.3,
			dark: 1,
			diffuse: 6,
			mapSamples: 18000,
			mapBrightness: 1.5,
			opacity: 1,
			baseColor: [baseColor, baseColor, baseColor],
			markerColor: [70 / 255, 130 / 255, 180 / 255],
			glowColor: [glowColor, glowColor, glowColor],
			markers: [
				{ location: [22.3193, 114.1694], size: markerSize }, // Hong Kong
				{ location: [31.2304, 121.4737], size: markerSize }, // Shanghai
				{ location: [19.076, 72.8777], size: markerSize }, // Mumbai
				{ location: [38.9637, 35.2433], size: markerSize }, // Turkey
				{ location: [13.7563, 100.5018], size: markerSize }, // Bangkok
				{ location: [43.1939, -71.5724], size: markerSize }, // New Hampshire
				{ location: [36.7783, -119.4179], size: markerSize }, // California
				{ location: [40.7128, -74.006], size: markerSize }, // New York
				{ location: [39.9042, 116.4074], size: markerSize }, // Beijing
				{ location: [44.3148, -85.6024], size: markerSize }, // Michigan
				{ location: [40.0583, -74.4057], size: markerSize }, // New Jersey
			],
			onRender: (state) => {
				// This prevents rotation while dragging
				if (!pointerInteracting.current) {
					// Called on every animation frame.
					// `state` will be an empty object, return updated params.
					phi += 0.003;
				}
				state.phi = phi + r.get();
				state.width = width * scale;
				state.height = width * scale;
			},
		});
		setTimeout(() => (canvasRef.current.style.opacity = "1"));
		return () => {
			globe.destroy();
			window.removeEventListener("resize", onResize);
		};
	}, []);
	return (
		<div
			style={{
				width: "100%",
				maxWidth: "35vw",
                minWidth: 600,
				aspectRatio: 1,
				margin: "auto",
				position: "relative",
				opacity: 0.85,
			}}
		>
			<canvas
				ref={canvasRef}
				onPointerDown={(e) => {
					pointerInteracting.current =
						e.clientX - pointerInteractionMovement.current;
					canvasRef.current.style.cursor = "grabbing";
				}}
				onPointerUp={() => {
					pointerInteracting.current = null;
					canvasRef.current.style.cursor = "grab";
				}}
				onPointerOut={() => {
					pointerInteracting.current = null;
					canvasRef.current.style.cursor = "grab";
				}}
				onMouseMove={(e) => {
					if (pointerInteracting.current !== null) {
						const delta = e.clientX - pointerInteracting.current;
						pointerInteractionMovement.current = delta;
						api.start({
							r: delta / 200,
						});
					}
				}}
				onTouchMove={(e) => {
					if (pointerInteracting.current !== null && e.touches[0]) {
						const delta =
							e.touches[0].clientX - pointerInteracting.current;
						pointerInteractionMovement.current = delta;
						api.start({
							r: delta / 100,
						});
					}
				}}
				style={{
					width: "100%",
					height: "100%",
					cursor: "grab",
					contain: "layout paint size",
					opacity: 0,
					transition: "opacity 1s ease",
				}}
			/>
		</div>
	);
}
