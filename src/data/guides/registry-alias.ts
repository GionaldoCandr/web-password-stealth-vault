export const registryAliasDetails = {
  title: 'Mekanisme Windows Registry Alias Execution (MyPass)',
  registryPath: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\mypass.exe',
  benefits: [
    'Tanpa ikon desktop atau Start Menu shortcut yang mencolok',
    'Dipanggil instan dalam hitungan detik via shortcut keyboard Win + R',
    'Eksekusi langsung mengalokasikan volatile RAM tanpa jejak log histori',
  ],
  sampleCode: `// Contoh pendaftaran Registry Path di installer Tauri/Rust
use winreg::enums::*;
use winreg::RegKey;

fn register_mypass_alias(exe_path: &str) -> std::io::Result<()> {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let path = "Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\App Paths\\\\mypass.exe";
    let (key, _) = hkcu.create_subkey(path)?;
    key.set_value("", &exe_path)?;
    Ok(())
}`,
};