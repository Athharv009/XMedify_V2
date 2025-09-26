import styles from "./SmsForm.module.css"

export default function SmsForm () {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.mainDiv}>
                <span style={{
                    height: "47px", 
                    width: "55.38px", 
                    borderRight: "1px solid #B4B4BE4D", 
                    fontWeight: "700",
                    fontSize: "14px",
                    lineHeight: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}>+91</span>
                <span className={styles.inputBoxSpan}>
                    <input type="number" placeholder="Enter phone number" className={styles.inputBox}/>
                </span>
            </div>
            <button style={{width: "121px", height: "50px", borderRadius: "8px", background: "#2AA8FF", border: "none", font: "popins, sans serif", fontSize: "16px", lineHeight: "100%", letterSpacing: "2%", fontWeight: "500", color: "white"}}>Send SMS</button>
        </div>
    )
} 