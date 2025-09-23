import BlogCard from "./BlogCard";
import styles from "./Blogs.module.css";

export default function Blogs() {
  return (
    <div style={{paddingTop: "5px", paddingBottom: "5px"}}>
      <div className={styles.headingPage}>
        <p>Blog & News</p>
        <h1>Read Our Latest News</h1>
      </div>
      <div>
        <BlogCard />
      </div>
    </div>
  );
}
