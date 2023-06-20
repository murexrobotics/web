import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
    "/images/gallery7.jpg",
    "/images/gallery8.jpg",
    "/images/gallery9.jpg",
    "/images/gallery10.jpg",
    "/images/gallery11.jpg",
    "/images/gallery12.jpg",
    "/images/gallery13.jpg",
    "/images/gallery14.jpg",
]

export default function ImageGallery() {
    return (
        <div className="w-3/4">
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                    <Masonry>
                        {images.map((image, i) => (
                                    <img
                                        key={i}
                                        src={image}
                                        className="w-full p-4 block hover:scale-105 hover:z-40 scale-100 transition-all duration-150 ease-in-out"
                                        alt=""
                                    />
                                ))}
                    </Masonry>
            </ResponsiveMasonry>
        </div>
    );
}