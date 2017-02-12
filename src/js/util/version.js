const publishVersion = 1.0;
const currentVersion = localStorage['version'] ? parseFloat(localStorage['version']) : 0;

// reset localstorage when new version published
if (currentVersion != parseFloat(publishVersion)) {
	localStorage.removeItem('todolistStorekeeper');
	localStorage.version = parseFloat(publishVersion);
}