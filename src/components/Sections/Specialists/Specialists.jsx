import styles from "./Specialists.module.css"
import SpecialistCard from './SpecialistCard';


export default function Specialists () {

    return (
        <div className={styles.mainDiv}>
            <h1>Our Medical Specialist</h1>
            <SpecialistCard />
        </div>
    );
};

