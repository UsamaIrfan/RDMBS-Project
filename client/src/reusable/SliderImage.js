import { CInputCheckbox, CFormGroup, CTooltip } from '@coreui/react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react'
import Loader from "./Loader";

function SliderImage({ selections=true ,containerStyles, image, CoverImage, setCoverImage, imageStyles, src, alt, removeProductImage }) {

    console.log("CHECK2", src)

    const [ImageLoading, setImageLoading] = useState(false)

    const imageVariants = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                ease: "easeInOut"
            }
        },
        show: {
            opacity: 1,
            width: "300px",
            transition: {
                ease: "easeInOut"
            }
        }
    }

    return (
        <motion.div variants={imageVariants} initial="hidden" animate="show" exit="hidden" style={containerStyles}>
            {selections && <div>
                <CFormGroup variant="checkbox" className="checkbox">
                    <CTooltip content="Set as cover image.">
                        <CInputCheckbox
                            onChange={() => setCoverImage(image.pathOnly)}
                            checked={CoverImage === image.pathOnly}
                            id="checkbox1"
                            size="md"
                            style={{ top: "15px", right: "50px" }}
                            name="checkbox1"
                            value="option1"
                        />
                    </CTooltip>
                </CFormGroup>
                <i class="fas fa-2x fa-window-close carousel-image-icon" onClick={() => removeProductImage(src)}></i>
            </div>}
            <img style={imageStyles} loading={() => setImageLoading(true)} src={src} alt={alt} onLoad={() => setImageLoading(false)} />
            {ImageLoading && <Loader absolute />}
        </motion.div>
    )
}

export default SliderImage
