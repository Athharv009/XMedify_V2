import styles from "./FAQs.module.css"

export default function FAQs () {
    return (
        <div >
            <div className={styles.headerText}>
                <p>Get Your Answer</p>
                <h1>Frequently Asked Questions</h1>
            </div>
            <div className={styles.mainDivContent}> 
            <div className={styles.content}>
                <div className={styles.happyDiv}>
                    <img src={require("../../../assets/happyEmoji.png")} alt="Emoji" height={"44px"} width={"44px"}/>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h3 style={{marginTop:"5px", marginBottom: "5px"}}>84k+</h3>
                        <span>Happy Patients</span>
                    </div>
                </div>
                <img src={require("../../../assets/FAQsPhoto.png")} alt="FAQs" className={styles.mainImg}/>
                <div className={styles.iconDiv}>
                    <img src={require("../../../assets/FAQsmallHandpic.png")} alt="icon" height={"40px"} width={"80px"}/>
                </div>
            </div>
            <div className={styles.contentFAQs}>
                <div className={styles.accordion} >
                    <p className={styles.quetion}>Why choose our medical for your family?</p>
                    <p className={styles.sign}>+</p>
                </div>
                <div className={styles.accordion}>
                    <p className={styles.quetion}>Why we are different from others?</p>
                    <p className={styles.sign}>+</p>
                </div>
                <div className={styles.accordion}>
                    <p className={styles.quetion}>Trusted & experience senior care & love</p>
                    <p className={styles.sign}>+</p>
                </div>
                <div className={styles.accordion}>
                    <p className={styles.quetion}>How to get appointment for emergency cases?</p>
                    <p className={styles.sign}>+</p>
                </div>
            </div>
            </div>
        </div>
    )
} 