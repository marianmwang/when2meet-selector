/**
 * Inject internal script specified by file into the window.
 *
 * @param {type} file Local path of the script to be injected.
 * @param {type} node Where to append the script.
 */
function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.setAttribute("src", file);
  th.appendChild(s);
}
injectScript(chrome.runtime.getURL("menu.js"), "body");