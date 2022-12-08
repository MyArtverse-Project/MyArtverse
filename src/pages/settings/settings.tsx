import Container from "@/components/Layouts/Container"
import styles from "./Settings.module.scss"
import { useState } from "react"

export default function SettingsPage() {
  const [setting, setSetting] = useState("account")
  return (
    <Container>
      <div id={styles["settings"]}>
        <div id={styles["sidemenu"]}>
          <button>Account Info</button>
          <button>Linked Accounts</button>
          <button>Privacy</button>
          <button>Manage Characters</button>
          <button>API Keys</button>
        </div>
        <div id={styles["settingsContent"]}>
          <div id={styles["settingsHeader"]}>
            <h1>Settings</h1>
            <p>Manage your account settings and set preferences.</p>
          </div>
          {setting === "account" && (
            <div id={styles["account"]}>
              <h2>Account Info</h2>
              <p>Change your account information.</p>
              <div id={styles["account-info"]}>
                <div id={styles["account-section"]}>
                  <div id={styles["account-info-item"]}>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value="Ozzy"
                    />
                  </div>
                  <div id={styles["account-info-item"]}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value=""
                      placeholder="Enter your email"
                    />
                  </div>
                  <button>Save Changes</button>
                </div>
                <div id={styles["account-section"]}>
                  <h2>Change Password</h2>
                  <div id={styles["account-info-item"]}>
                    <label htmlFor="email">New Password</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value=""
                      placeholder="Enter new password"
                    />
                  </div>
                  <div id={styles["account-info-item"]}>
                    <label htmlFor="email">Confirm Password</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value=""
                      placeholder="Confirm Password"
                    />
                  </div>
                  <button>Change Password</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
