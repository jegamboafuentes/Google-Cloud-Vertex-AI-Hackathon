chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "translate",
      title: "Translate to Slang by Gus",
      contexts: ["selection"],
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translate") {
      const selectedText = info.selectionText;
      console.log("Hola Mundo Gus");
      // Aquí necesitas implementar la lógica para llamar a Google Palm 2 y traducir el texto.
      // Después de recibir la traducción, puedes usar Google Text to Speech para leer el texto traducido.
    }
  });
  