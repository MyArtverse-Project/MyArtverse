import React from "react";
import styles from "../styles/Header.module.scss";

export default function Header() {
    return (
        <header>
            <div id={styles.wrapper}>
                <strong className={styles.logo}>MyFursona</strong>
                <div id={styles["search-box-wrapper"]}>
                    <div id={styles["search-box"]}>
                        <input type="search" placeholder="Search fursonas..."/>
                    </div>
                </div>
                <div id={styles["user-actions"]}>
                    {/* SVG logos here for logged in users */}

                    {/* Display somemthing here for logged out users */}
                    <button>Login</button>
                </div>
            </div>
        </header>
    );
}
