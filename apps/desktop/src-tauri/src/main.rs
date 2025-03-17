// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayMenuItem};

fn main() {
    // let brand_name: String = "MyArtverse".to_owned();

    // let main_window_process = app.get_window("main");
    // let window = main_window_process.unwrap();

    // System Tray stuff
    // let toggle_window = CustomMenuItem::new("toggleWindow".to_string(), format!("Hide/Show {brand_name}"));
    // let login_user = CustomMenuItem::new("login".to_string(), format!("Login/Register to {brand_name}"));
    // let logout_user = CustomMenuItem::new("logout".to_string(), "Log out");
    // let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    
    // let tray_menu = SystemTrayMenu::new()
    //     .add_item(toggle_window)
    //     .add_native_item(SystemTrayMenuItem::Separator)
    //     .add_item(login_user)
    //     .add_item(logout_user)
    //     .add_native_item(SystemTrayMenuItem::Separator)
    //     .add_item(quit);

    tauri::Builder::default()
        .run(tauri::generate_context!())
        // System Tray stuff
        // .system_tray(SystemTray::new().with_menu(tray_menu));
        // .on_system_tray_event(|app, event| match event {
        //   SystemTrayEvent::DoubleClick {
        //     position: _,
        //     size: _,
        //     ..
        //   } => {
        //     println!("system tray received a double click");
        //     window.open().unwrap();
        //   }
        //   SystemTrayEvent::MenuItemClick { id, .. } => {
        //     match id.as_str() {
        //       "quit" => {
        //         std::process::exit(0);
        //       }
        //       "hide" => {
        //         window.hide().unwrap();
        //       }
        //       _ => {}
        //     }
        //   }
        //   _ => {}
        // })
        .expect("error while running tauri application");
}
