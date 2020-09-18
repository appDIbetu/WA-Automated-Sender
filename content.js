var fa = []
var attached = false;
let gapContactDownload = 0;
var checkIfcontentInitiated = null;
var ft
var st
var dPsd

var sent = "Sent"
var fld = "Failed/Invalid/Not Available on WhatsApp "
let sentCount = 0;
let failedCount = 0;

var cancel = false;
var play = false;
var pause = false;
var paused = 0;


var first = true

window.onload = function () {

    startExecution()
};


//$(document).ready(function () {
//your code here


// Listen for messages from the popup.
chrome.runtime.onMessage.addListener(async (m, sender, response) => {



    // First, validate the message's structure.
    if ((m.from === 'popup') && (m.subject === 'DOMInfo')) {

        first = true
        cancel = false
        paused = 0
        pause = false
        dPsd = ""

        sentCount = 0
        failedCount = 0
        sent = "Sent"
        fld = "failed"
        nrmlSnd(m, 0)



    } else if (m.subject === 'atfl') {


        fa = []


        let n = m.n
        let s = m.s
        let i = 0;

        if (gmpn() === "") {
            await smP("9779844024092", "attach");
        } else {
            await smP(gmpn(), s);
        }

        await openAttachmentIcons()
        attached = true;


    } else if (m.subject === 'sach') {
        first = true
        cancel = false
        pasused = 0
        pause = false
        dPsd = ""
        /*
                let n = m.n
                let s = m.s
        
        
                //extra
                let prsn = s.match(/{{[a-zA-Z0-9]*}}/g)
                let valves = m.valves
        
        
                let i = 0;
                let f = n.length
                if (prsn) {
                    f = valves.length
                }
        
        
        
        
        
        //extra*/
        sentCount = 0
        failedCount = 0
        sent = "Sent"
        fld = "fld"
        let psdStts = await fmtP(m, 0)
        if (psdStts != "psd") {
            chrome.runtime.sendMessage({
                msg: "rprt",
                data: {
                    sent: sent,
                    fld: fld
                }
            });
        }

    } else if (m.subject === "getUrl") {
        response(window.location.href);
    } else if (m.subject === "psdnrm") {


        if (pause) {


            pause = false
            nrmlSnd(dPsd, paused)


        } else {
            pause = true
        }

    } else if (m.subject === "psdfl") {

        if (pause) {
            pause = false
            await fmtP(dPsd, paused)
            chrome.runtime.sendMessage({
                msg: "rprt",
                data: {
                    sent: sent,
                    fld: fld
                }
            });
        } else {
            pause = true
        }

    } else if (m.subject === "cncl") {

        cancel = true

    }

});



async function nrmlSnd(m, i) {

    fa = []


    let n = m.n
    let s = m.s
    let ccod = m.ccod
    ft = m.ft
    st = m.st

    let prsn = s.match(/{{[a-zA-Z0-9]*}}/g)
    let valves = m.valves

    let f = n.length

    if (prsn && valves) {
        f = valves.length
    }

    while (i < f) {


        if (cancel) {
            return

        }

        if (pause) {
            paused = i
            dPsd = m
            return

        }


        let nos;
        if (prsn) {

            nos = valves[i].split(',')[0].replace(/[)(-]/g, "").replace(/\s/g, "")


            if (ccod !== "00") {
                nos = ccod + nos
            }

            if (valves[i].split(',')[0].replace(/[)(-]/g, "").replace(/\s/g, "").replace("+", "").match(/^[1-9]{1}[0-9]{6,14}/)) {

                let status = await smP(nos.replace("+", ""), await loopReplace(prsn, i, s, valves))

                if (status) {
                    sentCount = sentCount + 1
                } else {
                    failedCount = failedCount + 1
                }

                chrome.runtime.sendMessage({
                    msg: "msgs_sent",
                    data: {
                        sent: sentCount,
                        failed: failedCount
                    }
                });
            }

        }

        else {


            let nos = n[i].replace(/\s/g, "")



            let vld = nos.replace("+", "").match(/[1-9]{1}[0-9]{6,14}/)

            if (vld) {
                let status = await smP(nos.replace('+', ''), s.replace("{{Message}}", ""))



                if (status) {
                    sentCount = sentCount + 1
                } else {
                    failedCount = failedCount + 1
                }

                chrome.runtime.sendMessage({
                    msg: "msgs_sent",
                    data: {
                        sent: sentCount,
                        failed: failedCount
                    }
                });

            } else { fa.push(nos) }


        }

        i++
    }

    chrome.runtime.sendMessage({
        msg: "rprt",
        data: {
            sent: sent,
            fld: fld
        }
    });


}



function replacePrsn(mn, toBep, substp) {


    return new Promise((resolve, reject) => {
        const re = new RegExp(toBep, "g");
        resolve(mn.replace(re, substp))


    })

}


function loopReplace(prsn, ko, mm, valves) {

    return new Promise(async (resolve, reject) => {
        let ll = 0
        while (ll < prsn.length) {

            //let toBe = prsn[ll];
            // let substm = valves[i].split(',')[ll + 1]
            let loom = await searchPos(valves, prsn[ll], ko)
            mm = await replacePrsn(mm, prsn[ll], valves[ko].split(',')[loom])
            ll++
        }
        if (ll == prsn.length) {

            resolve(mm)
        }


    })

}


function searchPos(valves, prop, itrn) {
    return new Promise((resolve, reject) => {
        let customs = valves[0].split(',')
        let loop = 0;
        while (loop < customs.length) {

            let mtch = "{{" + customs[loop] + "}}"

            if (mtch === prop) {
                resolve(loop)
                return
            }
            loop++
        }
        resolve(1)
    })
}



async function sbs() {
    if (!document.querySelector("[data-icon=send]")) {
        setTimeout(async function () {
            await sbs()
        }, 500)
    }
}


async function smP(nm, sm) {
    let d;
    if (first) {
        d = 0
        first = false

    }
    else d = await randomDelay()

    return new Promise(async (resolve, reject) => {
        waLinkCrt(nm, sm).then(() => {
            setTimeout(async function () {
                let result = false;
                result = await frd_clk();


                if (result) {
                    sent = sent + "\n" + nm
                } else {
                    fld = fld + "\n" + nm
                }

                resolve(result)
            }, d)
        })
    })
}

function randomDelay() {
    if (ft == st) {
        return ft * 1000
    }
    return new Promise((resolve, reject) => {
        resolve(Math.floor(Math.random() * ((st * 1000) - (ft * 1000) + 1)) + (ft * 1000))
    })
}


async function waLinkCrt(n, s) {

    return new Promise((resolve, reject) => {
        const et = encodeURIComponent(s);
        const bulkWhatsappLink = document.getElementById("blkwhattsapplink");
        if (bulkWhatsappLink) {
            bulkWhatsappLink.setAttribute("href", `https://wa.me/${n}?text=${et}`)
        } else {
            const spanHtml = `<a href="https://wa.me/${n}?text=${et}" id= "blkwhattsapplink"></a>`;
            const spans = $("#app .app-wrapper-web span");
            $(spans[4]).html(spanHtml)
        }
        setTimeout(() => {
            document.getElementById("blkwhattsapplink").click();
            resolve()
        }, 1000)
    })
}



async function frd_clk() {
    let result = false;
    await sbs();
    if (document.querySelector("[data-icon=send]")) {
        document.querySelector("[data-icon=send]").click();
        result = true
    }
    return result
}


//  });


/*function loadJquerya() {
    
    var script = document.createElement('script');
        return new Promise((resolve, reject) => {
                                
            setTimeout(() => {
                script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
                script.type = 'text/javascript';
                document.getElementsByTagName('head')[0].appendChild(script);
                resolve()
            }, 5000)
        })
    }*/


//_2EXPL CxUIE

function startExecution() {


    console.log("entered")

    checkIfcontentInitiated = setInterval(() => {
        if ($("#side #pane-side ._210SC") && $("#side #pane-side ._210SC").length > 0) {
            console.log("entered1")

            setContactBulkListener();
            clearInterval(checkIfcontentInitiated)
        }
    }, 500)




}


function attachmentImages() {
    return new Promise(async (resolve, reject) => {
        if (!document.querySelector("[data-icon=attach-image]")) {
            await mClsms(document.querySelector("[data-icon=clip]"))
        } else { }
        await sleep(500)
        const fileNode = document.querySelector("[data-icon=attach-image]").parentNode.querySelector("input");
        await mClsms(fileNode);
        resolve()
    })
}

function setContactBulkListener() {
    console.log("entered2")

    $("#side #pane-side ._210SC").on("click", function () {

        console.log("entered3")

        if (gapContactDownload) {
            clearInterval(gapContactDownload)
        }

        gapContactDownload = setInterval(function () {
            const subTitleNode = document.querySelector("#main header ._2ruUq._3xjAz span");

            const groupNameNode = document.querySelector("#main header .DP7CM span");

            console.log(groupNameNode)
            console.log(subTitleNode)

            if (subTitleNode && groupNameNode) {
                console.log("entered4")
                const subtitle = subTitleNode.getAttribute("title");
                const groupName = groupNameNode.getAttribute("title");
                console.log(subtitle)
                if (subtitle.split(",").length > 1) {
                    console.log("entered5")
                    clearInterval(gapContactDownload);
                    let title = "Download contact list from " + groupName
                    gapContactDownload = 0;
                    if (!document.querySelector("#arrowbutton")) {
                        console.log("entered6")
                        $(`<div class='modal-view-disp'><svg xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Capa_1" x="0px" y="0px" width="14px" height="14px" viewBox="0 0 444.819 444.819" style="enable-background:new 0 0 444.819 444.819;"><g><g><path d="M434.252,114.203l-21.409-21.416c-7.419-7.04-16.084-10.561-25.975-10.561c-10.095,0-18.657,3.521-25.7,10.561   L222.41,231.549L83.653,92.791c-7.042-7.04-15.606-10.561-25.697-10.561c-9.896,0-18.559,3.521-25.979,10.561l-21.128,21.416   C3.615,121.436,0,130.099,0,140.188c0,10.277,3.619,18.842,10.848,25.693l185.864,185.865c6.855,7.23,15.416,10.848,25.697,10.848   c10.088,0,18.75-3.617,25.977-10.848l185.865-185.865c7.043-7.044,10.567-15.608,10.567-25.693   C444.819,130.287,441.295,121.629,434.252,114.203z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#7CB342"/></g></g> </svg> </path></svg><div role='button' id='arrowbutton' title=${title}><b style='color:#7CB342;cursor:pointer'>${title}</b></div><span style='color:#fa685e;display:none;' id=''> <i> <a href='#' target='_blank' style='text-decoration:underline;'></a> </i> </span> </div>`).insertBefore("._3nq_A");

                        setTimeout(() => {
                            $("#arrowbutton").click(async () => {

                                //
                                download(`${groupName}.csv`, `${groupName} - Phone Numbers\n${subtitle.split(",").join("\n")}`)
                                // download(`${groupName}.csv`, subtitle)

                            })
                        }, 500)
                    }
                }
            }
        }, 1e3)
    })
}

function download(filename, text) {
    const pom = document.createElement("a");
    pom.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    pom.setAttribute("download", filename);
    if (document.createEvent) {
        const event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        pom.dispatchEvent(event)
    } else {
        pom.click()
    }
}



async function openAttachmentIcons() {

    let application = $("#app");
    let attachmentIcons = $("<div id='fileSelectionBtnWrapper' style='position: fixed; width: 100%; height: 100%; background-color: rgba(0,0,0,0.85);z-index: 11111;display: flex; flex-direction: row; align-items: center;'> <div style='display: flex; width: 100%; justify-content: center;'> <p id='imageAttachment' onclick = 'sendImage()' style='cursor: pointer; margin-right: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center;'> <svg id='image-Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 53 53' enable-background='new 0 0 53 53' width='100' height='100'> <filter height='130%' id='image-dropshadow'> <feOffset dy='2' result='offsetblur'></feOffset> <feComponentTransfer> <feFuncA slope='.08' type='linear'></feFuncA> </feComponentTransfer> <feMerge> <feMergeNode></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <defs> <circle id='image-SVGID_1_' cx='26.5' cy='26.5' r='25.5'></circle> </defs> <clipPath id='image-SVGID_2_'> <use xlink:href='#image-SVGID_1_' overflow='visible'></use> </clipPath> <g clip-path='url(#image-SVGID_2_)'> <path fill='#8333A3' d='M54.1 23.5H35.3v-2.4c0-1-.8-1.8-1.8-1.8H19.2c-.9 0-1.7.8-1.7 1.8v10.7c0 1 .8 1.8 1.8 1.8h14.2c.4 0 .8-.2 1.2-.4L42 48.8c6.7-3.6 12.1-13.2 12.1-25.3z'></path> <path fill='#702A8C' d='M33.6 33.6l-7-.1-10.6 18c4.4 2.4 17 4.5 27-2.6l-8.3-15.7c-.3.3-.7.4-1.1.4z'></path> <path fill='#9A37A3' d='M19.3 33.6c-1 0-1.8-.8-1.8-1.8l.1-1.5-18.7-.3c1.5 9.4 8.9 18.6 17.5 22l10.7-18.4h-7.8z'></path> <path fill='#CE64DE' d='M17.6 21.2c0-.9 1.1-1.7 2-1.8L11.7 4.2C6.4 7.1-.8 12.9-1.1 30.8l18.7-.1v-9.5z'></path> <path fill='#BF59CF' d='M19.3 19.4l9.5.4 9.8-17.3C33.3-.7 21.4-3 10.7 4.6l8.6 14.8z'></path> <path fill='#AC44CF' d='M38.5 1.8L28.4 19.4h5.2c1 0 1.8.8 1.8 1.8l-.4 2.7 19.1-.1c-1-9.2-7.6-18.1-15.6-22z'></path> </g> <path fill='#F5F5F5' filter='url(#image-dropshadow)' d='M33.9 33.9H19.1c-1 0-1.9-.8-1.9-1.9V21c0-1 .8-1.9 1.9-1.9h14.8c1 0 1.9.8 1.9 1.9v11c-.1 1.1-.9 1.9-1.9 1.9zm-2.2-12c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zm1.9 8L28.9 27l-2.4 1.2-4.7-3.5-2.4 2.3v4.7h14.2v-1.8z'></path> </svg> <span style='color: #fff; background-color: #000; padding: 15px; border-radius: 35px; margin: 15px; display: inline-block;'>Photos/Videos</span> </p> <p id='documentAttachment' onclick='sendFile()' style='cursor: pointer; margin-right: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center;'> <svg id='document-Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 53 53' enable-background='new 0 0 53 53' width='100' height='100'> <filter height='130%' id='document-dropshadow'> <feOffset dy='2' result='offsetblur'></feOffset> <feComponentTransfer> <feFuncA slope='.08' type='linear'></feFuncA> </feComponentTransfer> <feMerge> <feMergeNode></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <defs> <circle id='document-SVGID_1_' cx='26.5' cy='26.5' r='25.5'></circle> </defs> <clipPath id='document-SVGID_2_'> <use xlink:href='#document-SVGID_1_' overflow='visible'></use> </clipPath> <g clip-path='url(#document-SVGID_2_)'> <path fill='#5157AE' d='M26.5-1.1C11.9-1.1-1.1 5.6-1.1 27.6h55.2c-.1-19-13-28.7-27.6-28.7z'></path> <path fill='#5F66CD' d='M53 26.5H-1.1c0 14.6 13 27.6 27.6 27.6s27.6-13 27.6-27.6H53z'></path> </g> <path fill='#F5F5F5' filter='url(#document-dropshadow)' d='M21.4 16.3c-1.1 0-2 .9-2 2v15.6c0 1.1.9 2 2 2h11.7c1.1 0 2-.9 2-2V22.1l-5.9-5.9-7.8.1zm6.8 6.1v-4.7l5.4 5.4h-4.8c-.4 0-.6-.3-.6-.7z'></path> </svg> <span style='color: #fff; background-color: #000; padding: 15px; border-radius: 35px; margin: 15px; display: inline-block;'>Documents</span> </p> <p id='contactAttachment' onclick='sendContacts()' style='cursor: pointer; margin-right: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center;'> <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 53 53' width='100' height='100'> <defs> <circle id='contact-SVGID_1_' cx='26.5' cy='26.5' r='25.5'></circle> </defs> <clipPath id='contact-SVGID_2_'> <use xlink:href='#contact-SVGID_1_' overflow='visible'></use> </clipPath> <g clip-path='url(#contact-SVGID_2_)'> <path fill='#0A7BBF' d='M26.5-1.1C11.9-1.1-1.1 5.6-1.1 27.6h55.2c-.1-19-13-28.7-27.6-28.7z'></path> <path fill='#09ABF4' d='M53 26.5H-1.1c0 14.6 13 27.6 27.6 27.6s27.6-13 27.6-27.6H53z'></path> </g> <g fill='#F5F5F5'> <use xlink:href='#svg-contact' filter='url(#attach-shadow)'></use> <path id='svg-contact' d='M26.5 26.1c-2.5 0-4.6-2-4.6-4.6 0-2.5 2-4.6 4.6-4.6 2.5 0 4.6 2 4.6 4.6s-2.1 4.6-4.6 4.6zm-.2 8.4h-8.9V32c0-.4.1-.8.4-1.1 1.3-1.3 4.6-2.4 8.5-2.4s7.3 1.1 8.7 2.4c.3.3.6.7.6 1.1v2.5h-9.3z'></path> </g> </svg> <span style='color: #fff; background-color: #000; padding: 15px; border-radius: 35px; margin: 15px; display: inline-block;'>Contact</span> </p> </div> <span data-icon='x-light' role='button' class='' style='position: absolute; right: 0; top: 0; margin-right: 10px; margin-top: 10px;' id='closeFileSelectionBtnWrapper' onclick='removeAttachmentIcons()'> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='48' height='48'> <path fill='#FFF' d='M19.058 17.236l-5.293-5.293 5.293-5.293-1.764-1.764L12 10.178 6.707 4.885 4.942 6.649l5.293 5.293-5.293 5.293L6.707 19 12 13.707 17.293 19l1.765-1.764z'></path> </svg> </span> </p> </div>");
    application.before(attachmentIcons);
   

    attachments()
}



function attachments() {

    document.getElementById("imageAttachment").addEventListener("click", sendImage);
    document.getElementById("documentAttachment").addEventListener("click", sendFile);
    document.getElementById("contactAttachment").addEventListener("click", sendContacts);
    document.getElementById("closeFileSelectionBtnWrapper").addEventListener("click", removeAttachmentIcons)

}


function removeAttachmentIcons() {
    const el = document.getElementById("fileSelectionBtnWrapper");
    el.parentNode.removeChild(el)
    if (!document.getElementById("modal-view")) {
        let head = "Click 'WA Auto Sender' extension icon above after clicking 'Send' button below"
        $(`<div class='modal-view-disp'><div id="modal-view" title=${head}><b style='padding:2px; vertical-align:top; color:#fff; background-color:#7CB342; cursor:pointer'>${head}</b></div><span style='color:#fa685e;display:none;' id=''> <i> <a href='#' target='_blank' style='text-decoration:underline;'></a> </i> </span> </div>`).insertBefore(".YmSrp ._3Kxus.ba6sz .modal-view-disp:first-child");
    }
}


async function sendFile() {
    removeAttachmentIcons();
    await attachmentDocuments()
}



function lstFrdFrmSlf() {



    let slt = null;
    const frws = document.querySelectorAll(".message-out");




    const lstFW = [];
    frws.forEach(ma => {

        if (chkNd(ma)) {
            lstFW.push(ma)
        }
    });
    if (lstFW && lstFW.length > 0) {
        slt = lstFW[lstFW.length - 1]
    }

    return slt
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function attachmentDocuments() {
    return new Promise(async (resolve, reject) => {
        if (!document.querySelector("[data-icon=attach-document]")) {
            await mClsms(document.querySelector("[data-icon=clip]"))
        } else { }
        const fileNode = document.querySelector("[data-icon=attach-document]").parentNode.querySelector("input");
        await mClsms(fileNode);
        resolve()
    })
}


function getPrntslctr(ment, chooser) {
    let lst = document.querySelectorAll(chooser);
    let now = ment.parentNode;
    while (now && !chkAvaibility(lst, now)) {
        now = now.parentNode
    }
    return now
}


async function sendContacts() {
    removeAttachmentIcons();
    alert("Fasten the seatbelt, contacts attachmentcoming soon!!");
}

async function sendImage() {
    removeAttachmentIcons();
    await attachmentImages()
}




function ndTtl(titleTarget) {
    let node = null;

    let l = 0
    document.querySelector("[data-animate-modal-body=true]").querySelectorAll("._210SC").forEach(n => {
        if (l !== 0) {
            let title = ""
            if (n.querySelector("._3CneP span[dir]"))
                title = n.querySelector("._3CneP span[dir]").getAttribute("title");

            if (title.trim().toLowerCase() === titleTarget.trim().toLowerCase()) {
                node = n
            } else if (title.match(/[a-zA-Z]/)) {
                if (title.trim().toLowerCase() === titleTarget.trim().toLowerCase()) {
                    node = n
                }
            } else {
                if (title.replace(/[^A-Z0-9]/gi, "").trim() === titleTarget.trim()) {
                    node = n
                }
            }


        }
        l++
    });




    if (!node) {
        document.querySelector("[data-animate-modal-body]").querySelectorAll("._210SC ._3TEwt span[dir]").forEach(n => {
            const title = n.getAttribute("title");
            if (title.trim().toLowerCase() === titleTarget.trim().toLowerCase()) {
                node = n
            } else if (title.match(/[a-zA-Z]/)) {
                if (title.trim().toLowerCase() === titleTarget.trim().toLowerCase()) {
                    node = n
                }
            } else {
                if (title.replace(/[^A-Z0-9]/gi, "").trim() === titleTarget.trim()) {
                    node = n
                }
            }
        })
    }
    if (node) {

        node.querySelector("._3CneP span[dir]").click();
    }
    return node
}



function mClsms(targetNode) {
    return new Promise((resolve, reject) => {
        function triggerMouseEvent(targetNode, eventType) {
            var clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent(eventType, true, true);
            targetNode.dispatchEvent(clickEvent)
        } ["mouseover", "mousedown", "mouseup", "click"].forEach(function (eventType) {
            triggerMouseEvent(targetNode, eventType);
            resolve()
        })
    })
}




async function fmtP(m, looper) {



    let nos = m.n
    let t = m.s
    let ccod = m.ccod
    //extra
    let prsn = t.match(/{{[a-zA-Z0-9]*}}/g)
    let valves = m.valves


    let f = nos.length



    if (prsn) {
        f = valves.length
    }

    //extra

    fa = []

    //   nos.forEach((no, index) => {

    //extra





    while (looper < f) {



        if (cancel) {
            return

        }



        if (pause) {
            paused = looper
            dPsd = m
            return "psd"

        }


        /*New change from 0-19 to 0-infinity looper*/

        if (looper !== 0 && looper % 5 === 0) {
            let gppn = gmpn()
            if (gppn === "") {
                await smP("9779844024092", "attach");
                await sendMessgaestoAll("9779844024092", "MiddleAttach")
            } else {
                await smP(gppn, "msg");
                await sendMessgaestoAll(gppn, "MiddleAttach")
            }

        }


        let nosT;
        if (prsn) {

            nosT = valves[looper].split(',')[0].replace(/[)(-]/g, "").replace(/\s/g, "")

            if (ccod !== "00") {
                nosT = ccod + nosT
            }

            if (valves[looper].split(',')[0].replace(/[)(-]/g, "").replace(/\s/g, "").replace("+", "").match(/^[1-9]{1}[0-9]{6,14}/)) {
                let txt = await loopReplace(prsn, looper, t, valves)


                await sendMessgaestoAll(nosT, txt)

                looper++

            } else {
                looper++
            }



        }

        else {


            let nosT = nos[looper].replace(/\s/g, "")

            let vld = nosT.replace("+", "").match(/[1-9]{1}[0-9]{6,14}/)


            if (vld) {


                let mm = await sendMessgaestoAll(vld[0], t)

                looper++
                //return mm


            }

            else {
                fa.push(nosT)
                looper++
            }
            // looper++

        }


    }



}



function chkNd(node) {
    const sendAllnd = node.querySelector('[data-icon="forward-chat"]');
    return sendAllnd ? true : false
}


function gmpn() {
    let upn = "";
    const pID = document.querySelector("#side header img")
    if (pID) {
        const uip = pID.getAttribute("src");
        if (uip.match("&u=[0-9]+")) {
            upn = uip.match("&u=[0-9]+")[0].substring(3)
        }
    }
    return upn
}

async function sendMessgaestoAll(phoneNumber, text) {
    return new Promise(async (resolve, reject) => {

        let result = false;
        let status = await smP(phoneNumber.replace("+", ""), text);

        if (status) {
            sentCount = sentCount + 1
        } else {
            failedCount = failedCount + 1
        }

        chrome.runtime.sendMessage({
            msg: "msgs_sent",
            data: {
                sent: sentCount,
                failed: failedCount
            }
        });

        if (status) {

            const title = nameFinder();



            //const myPhoneNumber = getMyPhoneNumber();
            if (gmpn() === "") {
                await smP("9779844024092", "attach");
            } else {
                await smP(gmpn(), "attach");
            }
            await ofwM();
            let node = await ndTtl(title);

            if (!node) {
                node = await fwui(phoneNumber.replace("+", ""))
            }

            if (node) {

                await clkFwBtn();

                result = true
                resolve("result")
            } else {
                resolve("result")
            }


            // return result
        }

        else {
            resolve("result")
        }
    })

}


function chkAvaibility(a, b) {
    for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] == b) return true
    }
    return false
}

async function ofwM() {

    return new Promise((resolve, reject) => {
        const lastForwardableMsg = lstFrdFrmSlf();

        if (lastForwardableMsg) {
            lastForwardableMsg.querySelector("[data-icon=forward-chat]").click()
            resolve()
        } else {
            resolve()
        }

    })
}


function fwui(phoneNumber) {
    return new Promise(resolve => {
        setTimeout(() => {
            let node = null;
            document.querySelector("[data-animate-modal-body]").querySelectorAll("img").forEach(n => {
                const src = n.getAttribute("src");
                if (src.match("&u=[0-9]+")) {
                    const srcPhone = src.match("&u=[0-9]+")[0].substring(3);
                    if (srcPhone.trim() === phoneNumber.trim()) {
                        node = n
                    }
                }
            });
            if (node) {
                node.click();
                node = getPrntslctr(node, "._210SC")
            }
            resolve(node)
        }, 500)
    })
}



async function clkFwBtn() {
    return new Promise(async (resolve, reject) => {

        if (document.querySelector("[data-icon=send]")) {
            await mClsms(document.querySelector("[data-icon=send]"))
            resolve()
        } else {
            if (document.querySelector("[data-icon=send-light]")) {
                await mClsms(document.querySelector("[data-icon=send-light]"))
                resolve()
            }
        }

    })

}


function nameFinder() {
    let txt = "";
    const node = document.querySelector('header .DP7CM [dir="auto"]');
    if (node) {
        txt = node.getAttribute("title")
    }
    return txt
}









