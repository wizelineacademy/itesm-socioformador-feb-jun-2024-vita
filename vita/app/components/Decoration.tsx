import React, { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Props interface for the Decoration component
 */
interface DecorationProps {
  pathname: string; // Pathname of the route
}

/**
 * Object containing route information and corresponding images
 */
const routes: Record<string, { image: string; image2: string }> = {
  "/home": {
    image: "/DE_Home.svg",
    image2: "/DE_Home2.svg",
  },
  "/nutrition": {
    image: "/DE_Nutrition.svg",
    image2: "/DE_Nutrition2.svg",
  },
  // Add more routes as needed
};

/**
 * Loading component to display while images are loading
 */
const Loading = () => (
  <div></div>
);

/**
 * Decoration component responsible for displaying images based on route
 * @param {DecorationProps} props - Props for the Decoration component
 */
const Decoration: React.FC<DecorationProps> = ({ pathname }) => {
  const [images, setImages] = useState<{ image: string; image2: string }>({
    image: '',
    image2: '',
  });
  const [loading, setLoading] = useState(true);

  // Extract the root route from the pathname
  const rootRoute = pathname.split('/')[1]; 

  useEffect(() => {
    const route = routes[`/${rootRoute}`];
    if (route) {
      setImages(route);
      setLoading(false); 
    } else {
      console.error(`No se encontró una imagen para la ruta ${rootRoute}`);
    }
  }, [pathname, rootRoute]);

  return (
    <> 
      {loading && <Loading />}
      {!loading && (
        <>
          <div className="hidden md:block absolute right-0">
            <Image src={images.image} alt="Imagen 1" width={180} height={160} />
          </div>
          <div className="hidden md:block lg:hidden absolute right-0">
            <Image src={images.image2} alt="Imagen 2" width={140} height={120} />
          </div>
          <div className="hidden lg:block absolute right-0">
            <Image src={images.image} alt="Imagen 1" width={400} height={320} />
          </div>
          <div className="hidden lg:block absolute right-0">
            <Image src={images.image2} alt="Imagen 2" width={360} height={280} />
          </div>
        </>
      )}
    </>
  );
};

export default Decoration;
