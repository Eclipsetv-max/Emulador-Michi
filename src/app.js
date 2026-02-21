const form = document.getElementById('config-form');
const exportBtn = document.getElementById('exportBtn');
const templateBtn = document.getElementById('templateBtn');
const templateOutput = document.getElementById('folder-template');

const launchForm = document.getElementById('launch-form');
const buildCommandBtn = document.getElementById('buildCommandBtn');
const copyCommandBtn = document.getElementById('copyCommandBtn');
const launchCommandOutput = document.getElementById('launch-command');

const STORAGE_KEY = 'michiLauncherConfig';

const defaultConfig = {
  emulatorPath: '',
  dllPath: '',
  gamesPath: '',
  keysPath: '',
  firmwarePath: '',
  graphicsBackend: 'Vulkan',
  profile: 'default',
  createdBy: 'Michi Switch Launcher',
};

function setFormValues(config) {
  Object.entries(config).forEach(([key, value]) => {
    const field = document.getElementById(key);
    if (field) field.value = value;
  });
}

function getFormValues() {
  const data = new FormData(form);
  return {
    ...defaultConfig,
    emulatorPath: data.get('emulatorPath')?.trim(),
    dllPath: data.get('dllPath')?.trim(),
    gamesPath: data.get('gamesPath')?.trim(),
    keysPath: data.get('keysPath')?.trim(),
    firmwarePath: data.get('firmwarePath')?.trim(),
    graphicsBackend: data.get('graphicsBackend') || 'Vulkan',
    updatedAt: new Date().toISOString(),
  };
}

function saveConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config, null, 2));
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function quoteWindowsPath(path) {
  return `"${path.replace(/"/g, '')}"`;
}

function renderLaunchCommand() {
  const config = getFormValues();
  const launchData = new FormData(launchForm);
  const gameFilePath = launchData.get('gameFilePath')?.trim() || '';

  if (!config.emulatorPath || !gameFilePath) {
    launchCommandOutput.textContent = '(faltan rutas de emulador o juego)';
    return;
  }

  const command = `${quoteWindowsPath(config.emulatorPath)} ${quoteWindowsPath(gameFilePath)}`;
  launchCommandOutput.textContent = command;
}

function copyLaunchCommand() {
  const command = launchCommandOutput.textContent || '';
  if (!command || command.startsWith('(')) {
    alert('Primero genera un comando válido.');
    return;
  }

  navigator.clipboard.writeText(command)
    .then(() => alert('Comando copiado al portapapeles.'))
    .catch(() => alert('No se pudo copiar automáticamente. Cópialo manualmente.'));
}

function renderTemplate(config) {
  const root = 'MichiSwitch/';
  const template = `${root}
├── MichiLauncher.exe
├── bin/
│   ├── emulator-core.dll
│   ├── graphics-backend.dll
│   └── audio-backend.dll
├── config/
│   └── launcher-config.json
├── system/
│   ├── prod.keys           # pega aquí tus keys propias
│   └── title.keys          # opcional
├── firmware/
│   └── switch_firmware.zip # pega aquí tu firmware propio
├── games/
│   ├── *.nsp
│   └── *.xci
└── logs/

Actual:
- Emulator EXE: ${config.emulatorPath || '(sin configurar)'}
- DLL folder: ${config.dllPath || '(sin configurar)'}
- Games path: ${config.gamesPath || '(sin configurar)'}
- Keys: ${config.keysPath || '(sin configurar)'}
- Firmware: ${config.firmwarePath || '(sin configurar)'}
- Backend: ${config.graphicsBackend}`;

  templateOutput.textContent = template;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const config = getFormValues();
  saveConfig(config);
  renderTemplate(config);
  renderLaunchCommand();
  alert('Configuración guardada localmente.');
});

exportBtn.addEventListener('click', () => {
  const config = getFormValues();
  saveConfig(config);
  downloadFile('launcher-config.json', JSON.stringify(config, null, 2));
});

templateBtn.addEventListener('click', () => {
  const config = getFormValues();
  renderTemplate(config);
});

buildCommandBtn.addEventListener('click', renderLaunchCommand);
copyCommandBtn.addEventListener('click', copyLaunchCommand);
launchForm.addEventListener('submit', (event) => event.preventDefault());

const cachedConfig = localStorage.getItem(STORAGE_KEY);
const parsed = cachedConfig ? JSON.parse(cachedConfig) : defaultConfig;
setFormValues(parsed);
renderTemplate(parsed);
renderLaunchCommand();
