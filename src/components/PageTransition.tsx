import { motion } from "framer-motion";

// const animationConfiguration = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1 },
//     exit: { opacity: 0 },
// }

// const spring = {
//     type: "spring",
//     damping: 10,
//     stiffness: 100
// }

interface IPageTransitionProps {
    children?: any
}

const PageTransition: React.FC<IPageTransitionProps> = (props) => {
    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
    >
        {props.children}
    </motion.div>
};

export default PageTransition;
