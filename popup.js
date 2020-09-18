

document.getElementById("overlay").style.display = "block"
//document.getElementById("profilePicMessage").style.display = "none"
let dstts = document.getElementById("dstts")
var sent = document.getElementById("sent")
var failed = document.getElementById("failed")
dstts.style.display = "none"
dstts.disabled = true

let cp = ""
var cnt = true
var rprt
const storageInstance = getStorageInstance();

storageInstance.gcep()
storageInstance.scnn()
storageInstance.gcm()
storageInstance.gcc()
storageInstance.gcsv()
storageInstance.gd()

document.getElementById("chkd").disabled = true
document.getElementById("atfl").disabled = true
document.getElementById("chkdrldl").disabled = true
document.getElementById("ft").disabled = true
document.getElementById("st").disabled = true
document.getElementById("bpl").disabled = true
document.getElementById("bps").disabled = true
document.getElementById("bcl").disabled = true

//storageInstance.gcnn()
//document.getElementById("no").addEventListener("keypress", soin);
document.getElementById("no").addEventListener("keydown", soin);


document.getElementById("so").addEventListener("input", soit);

document.getElementById("oktu").addEventListener("click", sendMessaged);

document.getElementById("no").addEventListener("paste", paste);

document.getElementById("actvt").addEventListener("click", strt);

dstts.addEventListener("click", downloadReport)

var valves;
var epst = false

function sendMessaged() {



  if (epst) {
    //document.getElementById("bpl").disabled = false
    document.getElementById("bps").disabled = false
    document.getElementById("bcl").disabled = false
  }

  sent.innerHTML = 0
  failed.innerHTML = 0
  dstts.style.display = "none"
  cnt = true
  let su = 'DOMInfo'
  //let n = document.getElementById("no").value
  let ccod = getcc()
  let n = document.getElementsByClassName('spanWrap')
  let nm = []
  let stg = []
  let p = 0;
  let st = document.getElementById("st").value;
  let ft = document.getElementById("ft").value;

  document.getElementById("total").innerHTML = "Sending..."

  /*if(valves) {
    document.getElementById("total").innerHTML = n.length - 1
  }else {
    document.getElementById("total").innerHTML = n.length
  }*/



  let chkdrldl = document.getElementById("chkdrldl");

  let dlftr = ""

  if (chkdrldl.checked) {

    if (!st) {
      st = 3
    }

    if (!ft) {
      ft = 0
    }

    dlftr = ft + "," + st + "," + "yes"


  }

  storageInstance.sd(dlftr)



  while (p < n.length) {
    nm.push(n[p].innerText)
    if (!(n[p].innerText.replace("+", "").match(/[A-Za-z]+/))) {
      stg.push(n[p].innerText)
    }
    p++;
  }

  let s = document.getElementById("so").value

  let chkd = document.getElementById("chkd");

  if (chkd.checked) {
    su = 'sach'
  }

  //storageInstance.spb(stg.join(","))
  //storageInstance.scsv("")
  storageInstance.scm(s)


  if ((!epst) && (s.match(/{{[a-zA-Z0-9]*}}/g))) {
    document.getElementById("pro").style.visibility = "visible"
    return
  } else {
    document.getElementById("pro").style.visibility = "hidden"
  }


  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(tabs[0].id, {
      from: 'popup', subject: su, n: nm, s: s, valves: valves, ccod: ccod, st: st, ft: ft
    });

  })


}




document.getElementById("bps").addEventListener("click", pause)
document.getElementById("bpl").addEventListener("click", play)
document.getElementById("bcl").addEventListener("click", cancel_sends)



function pause() {

  let sub = "psdnrm"

  if (chkd.checked) {
    sub = "psdfl"
  }


  document.getElementById("total").innerHTML = "Paused"
  document.getElementById("bps").disabled = true
  document.getElementById("bpl").disabled = false
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(tabs[0].id, {
      from: 'popup', subject: sub
    });

  })


}


function play() {

  let sub = "psdnrm"

  if (chkd.checked) {
    sub = "psdfl"
  }

  document.getElementById("total").innerHTML = "Sending..."
  document.getElementById("bpl").disabled = true
  document.getElementById("bps").disabled = false
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(tabs[0].id, {
      from: 'popup', subject: sub
    });

  })


}


function cancel_sends() {
  document.getElementById("total").innerHTML = "Cancelled"
  document.getElementById("bpl").disabled = false
  document.getElementById("bps").disabled = false
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(tabs[0].id, {
      from: 'popup', subject: "cncl"
    });

  })


}



chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg === "msgs_sent") {
      //  To do something
      let data = request.data
      sent.innerHTML = data.sent
      failed.innerHTML = data.failed
    } else if (request.msg === "rprt") {

      document.getElementById("total").innerHTML = "Sent"
      let data = request.data
      let s = data.sent
      let f = data.fld
      rprt = f + "\n\n" + s

      dstts.style.display = "inline"

      document.getElementById("bpl").disabled = true
      document.getElementById("bps").disabled = true
      document.getElementById("bcl").disabled = true



    }
  }
);



// Listen for messages from the popup.
/*chrome.runtime.onMessage.addListener(async (m) => {

  // First, validate the message's structure.
  if ((m.from === 'cntnt') && (m.subject === 'ac')) {

    url = "https://us-central1-dlfirst-244317.cloudfunctions.net/chkpro?wmsid=919125887132"

  } 

});*/



document.getElementById("delete").addEventListener("click", dlt);

function dlt() {
  document.getElementById("tagcontainer").innerHTML = ""
  document.getElementById("customized").innerHTML = ""
  //document.getElementById("so").value = ""
  document.getElementById("no").disabled = false
  document.getElementById("countryCode").disabled = false
  document.getElementById("bps").disabled = true
  document.getElementById("bpl").disabled = true
  document.getElementById("bcl").disabled = true
  valves = ""
  storageInstance.scsv("")
  storageInstance.scm("")
}



async function soin(e) {
  if (cnt) {
    storageInstance.spb("")
    storageInstance.scsv("")
    cnt = false
  }
  var charCode = e.which || e.keyCode;

  if (charCode == '9' || e.keyCode === 44 || e.keyCode === 188 || e.keycode === 9 || e.keycode === 50) { // KeyCode For comma is 188

    let vld

    let cc = getcc()
    if (cc === "00") {
      vld = document.getElementById("no").value.replace(/[\s,]/g, "")
        .replace(/([A-Za-z]+,)|(,[A-Z,a-z]+)/g, "").replace(/[-)(]/g, "").replace("+", "")
        .match(/[1-9]{1}[0-9]{8,14}/)
    } else {
      vld = document.getElementById("no").value.replace(/[\s,]/g, "")
        .replace(/([A-Za-z]+,)|(,[A-Z,a-z]+)/g, "").replace(/[-)(]/g, "").replace('+', "")
        .match(/[0-9]{8,10}/)
    }


    if (vld) {
      let vn = vld[0]
      if (cc !== "00") {
        vn = "+" + cc + vld[0]
      }


      let node = document.createElement("Span");
      node.onclick = function () {
        this.parentElement.removeChild(this);
      };
      node.className = "spanWrap"
      let textnode = document.createTextNode(vn);
      node.appendChild(textnode);
      let x = document.createElement("IMG");
      x.setAttribute("src", "close.png");
      x.setAttribute("width", "14");
      x.setAttribute("height", "14");
      node.appendChild(x)
      document.getElementById("tagcontainer").appendChild(node);
      storageInstance.spb(await storageInstance.gpb(false) + "," + vn)
      storageInstance.scsv("")
      document.getElementById("no").value = ""
    } else {
      let node = document.createElement("Span");
      node.onclick = function () {
        this.parentElement.removeChild(this);
      };
      node.className = "spanWrapInvl"
      let textnode = document.createTextNode(document.getElementById("no").value);
      node.appendChild(textnode);
      let x = document.createElement("IMG");
      x.setAttribute("src", "close.png");
      x.setAttribute("width", "14");
      x.setAttribute("height", "14");
      node.appendChild(x)
      document.getElementById("tagcontainer").appendChild(node);
      document.getElementById("no").value = ""

    }


  } else if ((document.getElementById("no").value === "") && (charCode == '8' || charCode == '46')) {
    let list = document.getElementById("tagcontainer")
    list.removeChild(list.lastChild)
  }
  // storageInstance.spb(document.getElementById("tag").value)
  return

}

document.getElementById("demo").addEventListener('click', function () {

  chrome.tabs.create({ url: document.getElementById("demo").href });

})

document.getElementById("dnt").addEventListener('click', function () {

  document.getElementById("prolyt").style.display = "none"
  document.getElementById("actvtlyt").style.display = "block"
  document.getElementById("dntk").style.display = "block"
  //chrome.tabs.create({ url: document.getElementById("dnt").href });

})


document.getElementById("dntk").addEventListener('click', function () {

  chrome.tabs.create({ url: document.getElementById("dnlk").href });

})


document.getElementById("opnWsp").addEventListener('click', function () {

  chrome.tabs.create({ url: "https://web.whatsapp.com" });

})



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function paste(e) {
  var clipboardData, pastedData;

  // Stop data actually being pasted into div
  e.stopPropagation();
  e.preventDefault();

  // Get pasted data via clipboard API
  clipboardData = e.clipboardData || window.clipboardData;
  pastedData = clipboardData.getData('Text');

  // Do whatever with pasteddata
  //alert(pastedData);

  let pastNos = pastedData.split(/[,\n]/)
  //await sleep(300)
  //let pastNos = document.getElementById("no").value.split("\n")

  await sleep(300)
  storageInstance.spb(pastNos.join(","))
  storageInstance.scsv("")
  let loop = 0
  while (loop < pastNos.length) {

    //var charCode = e.which || e.keyCode;

    //if (charCode == '9' || e.keyCode === 44 || e.keyCode === 188 || e.keycode === 9 || e.keycode === 50) { // KeyCode For comma is 188



    let vld

    let cc = getcc()
    if (cc === "00") {
      vld = pastNos[loop].replace(/[\s,]/g, "")
        .replace(/([A-Za-z]+,)|(,[A-Z,a-z]+)/g, "").replace(/[-)(]/g, "").replace("+", "")
        .match(/[1-9]{1}[0-9]{8,14}/)
    } else {
      vld = pastNos[loop].replace(/[\s,]/g, "")
        .replace(/([A-Za-z]+,)|(,[A-Z,a-z]+)/g, "").replace(/[-)(]/g, "").replace("+", "")
        .match(/[0-9]{8,10}/)
    }




    if (vld) {
      let vn = vld[0]
      if (cc !== "00") {
        vn = "+" + cc + vld[0]
      }
      let node = document.createElement("Span");
      node.onclick = function () {
        this.parentElement.removeChild(this);
      };
      node.className = "spanWrap"
      let textnode = document.createTextNode(vn);
      node.appendChild(textnode);
      let x = document.createElement("IMG");
      x.setAttribute("src", "close.png");
      x.setAttribute("width", "14");
      x.setAttribute("height", "14");
      node.appendChild(x)
      document.getElementById("tagcontainer").appendChild(node);
      //document.getElementById("no").innerHTML = ""
    } else {

      if (pastNos[loop] !== "") {
        let node = document.createElement("Span");
        node.onclick = function () {
          this.parentElement.removeChild(this);
        };
        node.className = "spanWrapInvl"
        let textnode = document.createTextNode(pastNos[loop]);
        node.appendChild(textnode);
        let x = document.createElement("IMG");
        x.setAttribute("src", "close.png");
        x.setAttribute("width", "14");
        x.setAttribute("height", "14");
        node.appendChild(x)
        document.getElementById("tagcontainer").appendChild(node);
        //document.getElementById("no").innerHTML = ""
      }
    }

    loop++
    //}
  }
  document.getElementById("no").value = ""
  // storageInstance.spb(document.getElementById("tag").value)
  return

}



function soit() {

  storageInstance.scm(document.getElementById("so").value)

}

/*document.addEventListener('DOMContentLoaded', function() {
    var xhr = new XMLHttpRequest();
  // xhr.open("GET", "http://localhost/phpchrome.php", true);  //Mention your database query file here
  // xhr.onreadystatechange = function() {
    //  if (xhr.readyState == 4) {
          //  varxhrjson = JSON.parse(xhr.responseText);
            /* Replace the below mentioned field id's with that of your form */
//   chrome.tabs.executeScript(null,{code:"document.getElementById('ap_customer_name').value = '"+varxhrjson['cname']+"'"});
// chrome.tabs.executeScript(null,{code:"document.getElementById('ap_email').value = '"+varxhrjson['cmail']+"'"});
//chrome.tabs.executeScript(null,{code:"document.getElementById('ap_password').value = '"+varxhrjson['cpassword']+"'"});
//chrome.tabs.executeScript(null,{code:"document.getElementById('ap_password_check').value = '"+varxhrjson['cpassword']+"'"});
//     }
//  }
//  xhr.send();
//});*
document.getElementById("atfl").addEventListener("click", smaftc);



function smaftc() {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(tabs[0].id, {
      from: 'popup', subject: 'atfl'
    });

  })
  window.close()
}

document.getElementById("countryCode").addEventListener("change", ccChng);


function ccChng() {
  storageInstance.scc(document.getElementById("countryCode").value)
}


var fileInput = document.getElementById("choose_CSV"),

  readFile = function () {
    var reader = new FileReader();
    reader.onload = function () {

      storageInstance.scsv(reader.result)

      flvl(reader.result)

    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
  };

fileInput.addEventListener('change', readFile);


function getStorageInstance() {
  function setStorage(key, value) {
    return new Promise((resolve, reject) => {
      const obj = {};
      obj[key] = value;
      chrome.storage.local.set(obj, function () {
        resolve()
      })
    })
  }

  function getStorage(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, function (result) {
        resolve(result[key])
      })
    })
  }




  function scep(m) {
    return setStorage("KEY_CP", m)
  }


  async function gcep() {
    const cm = await getStorage("KEY_CP")
    if (cm) {
      let d1 = new Date(cm)
      let d2 = new Date()

      if (d2 <= d1) {
        epst = true
        extra()
        document.getElementById("process").style.display = "block"
        document.getElementById("process").innerHTML = "Valid till " + cm
        document.getElementById("atdl").removeAttribute("data-tip");
        document.getElementById("bps").removeAttribute("data-tip")
        document.getElementById("bpl").removeAttribute("data-tip")
        document.getElementById("bcl").removeAttribute("data-tip")
        dstts.removeAttribute("data-tip");
        document.getElementById("chkd").disabled = false
        document.getElementById("atfl").disabled = false
        document.getElementById("chkdrldl").disabled = false
        document.getElementById("ft").disabled = false
        document.getElementById("st").disabled = false
        //document.getElementById("bpl").disabled = false
        //document.getElementById("bcl").disabled = false
        //document.getElementById("profilePicMessage").style.display = "block"
        dstts.disabled = false
      } else {
        document.getElementById("process").style.display = "block"
        document.getElementById("process").innerHTML = "Pro expired on " + cm
        //document.getElementById("profilePicMessage").style.display = "none"
      }

    }
    else {

      //storageInstance.gpb(true)

    }


    return
  }




  function scsv(m) {
    return setStorage("KEY_CV", m)
  }


  async function gcsv() {
    const cm = await getStorage("KEY_CV")
    if (cm) {
      flvl(cm)
      return
    }
    else {

      storageInstance.gpb(true)

    }


    return
  }




  function sd(m) {
    return setStorage("KEY_CD", m)
  }


  async function gd() {
    let cm = await getStorage("KEY_CD")
    if (cm) {
      cm = cm.split(",")

      if (cm[2] === "yes") {
        document.getElementById("chkdrldl").checked = true
        document.getElementById("ft").value = cm[0]
        document.getElementById("st").value = cm[1]
      } else {
        document.getElementById("chkdrldl").checked = false
        document.getElementById("ft").value = ""
        document.getElementById("st").value = ""
      }


      return
    }

  }



  function scm(m) {
    return setStorage("KEY_M", m)
  }

  function scnn() {
    return setStorage("KEY_MO", "")
  }

  async function gcm() {
    const cm = await getStorage("KEY_M")
    if (cm) {
      document.getElementById("so").value = cm
      return
    } else document.getElementById("so").value = ""


    return
  }

  async function gcnn() {
    const cmo = await getStorage("KEY_MO")
    return cmo
  }


  function scc(val) {
    return setStorage("COUN_C", val)
  }

  async function gcc() {
    const cm = await getStorage("COUN_C")
    if (cm) {
      document.getElementById("countryCode").value = cm
      return cm
    } else {
      document.getElementById("countryCode").value = "00"
      return cm
    }

    return
  }


  async function spb(n) {
    return setStorage("KEY_N", n)
  }

  async function gpb(check) {
    let spno = await getStorage("KEY_N");

    if (spno && check) {

      spno = spno.split(',')

      let o = 0;

      while (o < spno.length) {

        let node = document.createElement("Span");
        node.onclick = async function () {
          this.parentElement.removeChild(this);
        };
        node.className = "spanWrap"

        let txt = spno[o]

        if (txt !== "") {

          let c = await storageInstance.gcc()

          if (c && c !== "00" && !(txt.startsWith("+"))) {
            txt = "+" + c + txt
          } else {
            txt = "+" + txt
          }
          let textnode = document.createTextNode(txt);
          node.appendChild(textnode);
          let x = document.createElement("IMG");
          x.setAttribute("src", "close.png");
          x.setAttribute("width", "14");
          x.setAttribute("height", "14");
          node.appendChild(x)
          document.getElementById("tagcontainer").appendChild(node);
        }
        o++
      }
      //document.getElementById("no").value = spno.replace(/"/g, "")
      return
      //return JSON.parse(strPhoneNumbers)
    } else if (spno && !check) {
      return spno
    }

    else return []
  }


  return {
    scm: scm,
    gcm: gcm,
    spb: spb,
    gpb: gpb,
    scc: scc,
    gcc: gcc,
    gcnn: gcnn,
    scnn: scnn,
    scsv: scsv,
    gcsv: gcsv,
    scep: scep,
    gcep: gcep,
    sd: sd,
    gd: gd
  }

}

function getcc() {
  return document.getElementById("countryCode").value
}


function strt() {
  document.getElementById("process").style.display = "block"
  document.getElementById("process").innerHTML = "Checking license key..."

  new Promise(async (resolve, reject) => {
    let num = document.getElementById("key").value

    url = "https://us-central1-dlfirst-244317.cloudfunctions.net/chkpro?wmsid=" + num

    let k = await fetch(url)

    let respo = await k.json()

    if (respo.VAL === "NO_KEY") {
      document.getElementById("process").innerHTML = "INVALID_KEY :("
    } else {

      let tx = respo.VAL.replace(" GMT+0000 (Coordinated Universal Time)", "") + " UTC"
      var date = new Date(tx);



      storageInstance.scep(date.toString())

      document.getElementById("actvtlyt").style.display = "none";
      document.getElementById("prolyt").style.display = "none";
      document.getElementById("dntk").style.display = "none";
      document.getElementById("process").innerHTML = "License applied till " + date.toString()
      document.getElementById("chkd").disabled = false
      document.getElementById("atfl").disabled = false
      document.getElementById("chkdrldl").disabled = false
      document.getElementById("ft").disabled = false
      document.getElementById("st").disabled = false
      dstts.disabled = false
      document.getElementById("atdl").removeAttribute("data-tip");
      document.getElementById("bps").removeAttribute("data-tip")
      document.getElementById("bpl").removeAttribute("data-tip")
      document.getElementById("bcl").removeAttribute("data-tip")
      dstts.removeAttribute("data-tip");
      epst = true
    }


  })
}



function extra() {
  document.getElementById("actvtlyt").style.display = "none";
  document.getElementById("prolyt").style.display = "none";
  document.getElementById("dntk").style.display = "none";
  //document.getElementById("profilePicMessage").style.display = "block";
  dstts.disabled = false
}


function flvl(readerV) {


  document.getElementById("no").disabled = true
  document.getElementById("countryCode").disabled = true

  document.getElementById("tagcontainer").innerHTML = ""
  document.getElementById("customized").innerHTML = ""

  if (readerV.split(",").length > 1 && readerV.split("\r\n").length == 1) {


    let nrs = readerV.split(",\r\n")[0].split(",")
    let i = 0
    let nomb = "";
    while (i < nrs.length) {

      let vld

      let cc = getcc()
      if (cc === "00") {
        vld = nrs[i].replace(/\s/g, "").replace(/([A-Za-z]+,)|(,[A-Z,a-z]+)/g, "").replace(/[-)(]/g, "").replace("+", "")
          .match(/[1-9]{1}[0-9]{6,14}/)
      } else {
        vld = nrs[i].replace(/\s/g, "").replace(/([A-Za-z]+,)|(,[A-Z,a-z]+)/g, "").replace(/[-)(]/g, "").replace("+", "")
          .match(/[0-9]{6,10}/)
      }



      if (vld) {


        let vn = vld[0]
        if (cc !== "00") {
          vn = "+" + cc + vld[0]
        }

        let node = document.createElement("Span");
        /* node.onclick = async function () {
           this.parentElement.removeChild(this);
         };*/
        node.className = "spanWrap"
        let textnode = document.createTextNode(vn);
        node.appendChild(textnode);
        //let x = document.createElement("IMG");
        //x.setAttribute("src", "close.png");
        //x.setAttribute("width", "14");
        //x.setAttribute("height", "14");
        //node.appendChild(x)
        document.getElementById("tagcontainer").appendChild(node);
        nomb = nomb + "," + vn
      } else {
        /*let node = document.createElement("Span");
        node.onclick = function () {
          this.parentElement.removeChild(this);
        };
        node.className = "spanWrapInvl"
        let textnode = document.createTextNode(nrs[i]);
        node.appendChild(textnode);
        let x = document.createElement("IMG");
        x.setAttribute("src", "close.png");
        x.setAttribute("width", "14");
        x.setAttribute("height", "14");
        node.appendChild(x)
        document.getElementById("tagcontainer").appendChild(node);
        document.getElementById("no").value = ""
*/
      }
      i++
    }
    document.getElementById("no").value = ""
    //storageInstance.spb(nomb)

    //let k = reader.result.split(/[\r\n]+/)

    return
  }

  let custom = readerV.split("\r\n")



  if (custom[0].split(",").length === 1) {


    let nrs = custom//[0].split(/[\r\n]+/)
    let i = 0
    let noma = ""
    while (i < nrs.length) {

      let vld

      let cc = getcc()
      if (cc === "00") {
        vld = nrs[i].replace(/\s/g, "").replace(/([A-Za-z]+,)|(,[A-Z,a-z]+)/g, "").replace(/[-)(]/g, "").replace("+", "")
          .match(/[1-9]{1}[0-9]{6,14}/)
      } else {
        vld = nrs[i].replace(/\s/g, "").replace(/([A-Za-z]+,)|(,[A-Z,a-z]+)/g, "").replace(/[-)(]/g, "").replace("+", "")
          .match(/[0-9]{6,10}/)
      }


      if (vld) {

        let vn = vld[0]
        if (cc !== "00") {
          vn = "+" + cc + vld[0]

        }

        let node = document.createElement("Span");
        /*node.onclick = async function () {
          this.parentElement.removeChild(this);
        };*/
        node.className = "spanWrap"
        let textnode = document.createTextNode(vn);
        node.appendChild(textnode);
        //let x = document.createElement("IMG");
        //x.setAttribute("src", "close.png");
        //x.setAttribute("width", "14");
        // x.setAttribute("height", "14");
        //node.appendChild(x)
        document.getElementById("tagcontainer").appendChild(node);
        noma = noma + "," + vn
      } else {
        /*let node = document.createElement("Span");
        node.onclick = function () {
          this.parentElement.removeChild(this);
        };
        node.className = "spanWrapInvl"
        let textnode = document.createTextNode(nrs[i]);
        node.appendChild(textnode);
        let x = document.createElement("IMG");
        x.setAttribute("src", "close.png");
        x.setAttribute("width", "14");
        x.setAttribute("height", "14");
        node.appendChild(x)
        document.getElementById("tagcontainer").appendChild(node);
        document.getElementById("no").value = ""
*/
      }
      i++
    }
    document.getElementById("no").value = ""
    //storageInstance.spb(noma)

    //let k = reader.result.split(/[\r\n]+/)



  } else {
    valves = custom

    let i = 1
    let nom = ""
    while (i < custom.length) {


      let vld

      let cc = getcc()
      if (cc === "00") {
        vld = custom[i].split(",")[0].replace(/\s/g, "").replace(/([A-Za-z]+,)|(,[A-Z,a-z]+)/g, "").replace(/[-)(]/g, "").replace("+", "")
          .match(/[1-9]{1}[0-9]{6,14}/)
      } else {
        vld = custom[i].split(",")[0].replace(/\s/g, "").replace(/([A-Za-z]+,)|(,[A-Z,a-z]+)/g, "").replace(/[-)(]/g, "").replace("+", "")
          .match(/[0-9]{6,14}/)
      }




      if (vld) {


        let vn = vld[0]
        if (cc !== "00") {
          vn = "+" + cc + vld[0]
        }

        let node = document.createElement("Span");
        /*node.onclick = async function () {
          this.parentElement.removeChild(this);
        };*/
        node.className = "spanWrap"
        let textnode = document.createTextNode(vn);
        node.appendChild(textnode);
        //let x = document.createElement("IMG");
        //x.setAttribute("src", "close.png");
        //x.setAttribute("width", "14");
        //x.setAttribute("height", "14");
        //node.appendChild(x)
        document.getElementById("tagcontainer").appendChild(node);
        nom = nom + "," + vn
      } else {
        /*           let node = document.createElement("Span");
                  node.onclick = function () {
                    this.parentElement.removeChild(this);
                  };
                  node.className = "spanWrapInvl"
                  let textnode = document.createTextNode(custom[i].split(",")[0]);
                  node.appendChild(textnode);
                  let x = document.createElement("IMG");
                  x.setAttribute("src", "close.png");
                  x.setAttribute("width", "5");
                  x.setAttribute("height", "5");
                  node.appendChild(x)
                  document.getElementById("tagcontainer").appendChild(node);
                  document.getElementById("no").value = ""
      */
      }
      i++
    }
    document.getElementById("no").value = ""
    //storageInstance.spb(nom)



    let arr = custom[0].split(",");


    let node = document.createElement("Span");

    let textnode = document.createTextNode("Customizations:");
    node.appendChild(textnode);
    document.getElementById("customized").appendChild(node);

    let c = 1;
    while (c < arr.length) {
      //let vld = t[i]
      let node = document.createElement("Span");
      node.onclick = async function () {
        document.getElementById("so").value = document.getElementById("so").value + "{{" + this.innerHTML + "}}";
      };
      node.className = "spanWrap"
      let textnode = document.createTextNode(arr[c]);
      node.appendChild(textnode);
      document.getElementById("customized").appendChild(node);

      c++
    }


  }

  return


}





chrome.tabs.query({
  active: true,
  currentWindow: true
}, tabs => {
  // ...and send a request for the DOM info...
  chrome.tabs.sendMessage(tabs[0].id, {
    from: 'popup', subject: "getUrl"
  }, resolved => {


    if (chrome.runtime.lastError) {
      let errorMsg = chrome.runtime.lastError.message
      if (errorMsg == "Cannot access a chrome:// URL") {
        // Error handling here
      }
    }
    else {

      if (resolved && resolved.match(/web.whatsapp.com/)) {

        document.getElementById("overlay").style.display = "none"
        //return
      }
      else {

        //document.getElementById("overlay").style.display = "block"
        //return
      }
    }
  });

})



function downloadReport() {
  const pom = document.createElement("a");
  pom.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(rprt));
  pom.setAttribute("download", "Statistics.csv");
  if (document.createEvent) {
    const event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event)
  } else {
    pom.click()
  }
}

