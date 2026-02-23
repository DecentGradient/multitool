#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager, GlobalShortcutManager, ClipboardManager};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Setup global shortcut
            let mut shortcut_manager = app.global_shortcut_manager();
            let app_handle = app.handle();
            let _ = shortcut_manager.register("CmdOrCtrl+Shift+M", move || {
                if let Some(window) = app_handle.get_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                }
            });

            // Clipboard polling loop
            let app_handle_clone = app.handle();
            std::thread::spawn(move || {
                let mut last_clipboard = String::new();
                loop {
                    std::thread::sleep(std::time::Duration::from_millis(500));
                    let mut clipboard_manager = app_handle_clone.clipboard_manager();
                    if let Ok(Some(current)) = clipboard_manager.read_text() {
                        if current != last_clipboard && !current.is_empty() {
                            last_clipboard = current.clone();
                            let _ = app_handle_clone.emit_all("clipboard://text-changed", current);
                        }
                    }
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
