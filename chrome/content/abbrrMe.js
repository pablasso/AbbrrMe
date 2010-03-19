window.addEventListener("load", function(e) { init_ext(e); }, false);

function init_ext(e)
{
	document.getElementById("contentAreaContextMenu")
            .addEventListener("popupshowing", function(e) { showContextMenu(e); }, false);
}

function showContextMenu() {    
    document.getElementById("abbrrme-link").hidden = !gContextMenu.onLink;
  }

function abbrrMe()
{
	var current = gBrowser.getBrowserForTab(gBrowser.mCurrentTab);
	var url = current.currentURI.spec; 
	var abbrred = abbrrMeRequest(url);
	abbrrMeToClipboard(abbrred);
}

function abbrrLink()
{
	var url = gContextMenu.linkURL;
	var abbrred = abbrrMeRequest(url);
	abbrrMeToClipboard(abbrred);
}

function abbrrMeRequest(url)
{
	var abbrr_url = "http://api.abbrr.com/api.php?out=link&url=" + url;
	var ajax = new XMLHttpRequest();
	ajax.open("GET", abbrr_url, false);
	ajax.send(null);
	return ajax.responseText;
}

function abbrrMeToClipboard(copytext)
{
	var str = Components.classes["@mozilla.org/supports-string;1"].
                       createInstance(Components.interfaces.nsISupportsString);
	
	str.data = copytext;
	
	var trans = Components.classes["@mozilla.org/widget/transferable;1"].
                       createInstance(Components.interfaces.nsITransferable);
	
	trans.addDataFlavor("text/unicode");
	trans.setTransferData("text/unicode", str, copytext.length * 2);
	var clipid = Components.interfaces.nsIClipboard;
	var clip   = Components.classes["@mozilla.org/widget/clipboard;1"].getService(clipid);
	clip.setData(trans, null, clipid.kGlobalClipboard);
}
