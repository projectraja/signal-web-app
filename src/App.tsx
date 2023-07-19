import Router from "./router";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return <AnimatePresence mode='wait'>
    <Router />
  </AnimatePresence>
}

export default App;
