import DownloadApp from "../Sections/DownloadApp/DownloadApp";
import styles from "./Footer.module.css"
import FooterLink from "./FooterLink";

export default function Footer () {
    return (
        <div className={styles.main}>
            <div className={styles.mainAppDiv}>
                <div className={styles.mobileMain}>
                <div className={styles.mobile1}>
                    <img src={require("../../assets/mobile2.png")} alt="mobile2" className={styles.mobileBody1} />
                    <div >
                        <img src={require("../../assets/mobile1.png")} alt="mobile1" className={styles.mobilePage1} />
                    </div>
                </div>
                <div className={styles.mobile2}>
                    <img src={require("../../assets/mobile2.png")} alt="mobile2" className={styles.mobileBody2} />
                    <div >
                        <img src={require("../../assets/mobile1.png")} alt="mobile1" className={styles.mobilePage2} />
                    </div>
                </div>
                </div>
                <div><DownloadApp /></div>
            </div>


            <div className={styles.footerSection}>
                <FooterLink />
            </div>
        </div>
    )
}