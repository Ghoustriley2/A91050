const output = document.getElementById("output");
const input = document.getElementById("cmd");
const filePicker = document.getElementById("filePicker");

/* =========================
   STATE
========================= */
let nanoMode = false;
let nanoBuffer = [];
let nanoFileName = "";

let fsMode = null;

/* =========================
   BOOT
========================= */
window.addEventListener("load", () => input.focus());
document.body.addEventListener("click", () => input.focus());

function print(text){
    output.innerText += text + "\n";
    output.scrollTop = output.scrollHeight;
}

print("CORE TERMINAL ONLINE");
print("type 'help'\n");

/* =========================
   FILE PICKER (READ ONLY)
========================= */
filePicker.addEventListener("change", (e) => {

    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(evt){

        const content = evt.target.result;

        if(fsMode === "read"){
            print("\n--- FILE START ---\n");
            print(content);
            print("\n--- FILE END ---\n");
            fsMode = null;
        }

    };

    reader.readAsText(file);
});

/* =========================
   INPUT HANDLER
========================= */
input.addEventListener("keydown", (e) => {

    if(e.key !== "Enter") return;

    const value = input.value.trim();
    input.value = "";

    if(!value) return;

    /* =========================
       NANO MODE
    ========================= */
    if(nanoMode){

        if(value === ":wq"){
            print(":wq");
            saveFile(nanoFileName, nanoBuffer.join("\n"));
            nanoMode = false;
            input.placeholder = "";
            return;
        }

        if(value === ":q!"){
            nanoMode = false;
            nanoBuffer = [];
            nanoFileName = "";
            input.placeholder = "";
            print("NANO EXIT");
            return;
        }

        nanoBuffer.push(value);
        print(value);
        return;
    }

    /* =========================
       COMMAND MODE
    ========================= */
    print("> " + value);

    const args = value.split(" ");
    const cmd = args[0].toLowerCase();

    switch(cmd){
        
        case "color":
            setColor(args[1]);
            break;
        
        case "a91050":
            glitchSequence();
            break;

        case "nano":
            startNano(args[1]);
            break;

        case "read":
            startRead();
            break;

        case "cls":
            output.innerText = "";
            break;

        case "help":
            print(`
COMMANDS:
help
info
nano <file>
read
cls
exit
            `);
            break;

        case "info":
            print("Industrial_Lord :: restricted profile");
            break;

        case "exit":
            window.location.href = "../index.html";
            break;

        default:
            print("ERROR: unknown command");
    }

});

/* =========================
   READ
========================= */
function startRead(){
    fsMode = "read";
    filePicker.click();
}

/* =========================
   NANO
========================= */
function startNano(fileName){

    if(!fileName){
        print("NANO ERROR: filename required");
        return;
    }

    nanoMode = true;
    nanoBuffer = [];
    nanoFileName = fileName;

    print("\n--- NANO MODE ---");
    print("file: " + fileName);
    print("exit: :wq\n");

    input.placeholder = "nano...";
}

/* =========================
   SAVE
========================= */
function saveFile(name, content){

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = name;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    print("\nSAVED: " + name);
}

function glitchSequence(){

    print(">>> INIT CORE MEMORY ACCESS");
    print(">>> LOADING PROCESS TABLE...");
    print(">>> ATTACHING DEBUG STREAM...\n");

    const chars = "▓▒░<>/\\|[]{}#@%&*!?01ABCDEF";

    let step = 0;

    const addresses = [
        "0x7ffb1c2a9d10",
        "0x7ffb1c2a9d2f",
        "0x7ffb1c2a9e88",
        "0x7ffb1c2a9f11",
        "0x7ffb1c2b0a44",
        "0x7ffb1c2b1c90"
    ];

    const interval = setInterval(() => {

        step++;

        const addr = addresses[Math.floor(Math.random() * addresses.length)];

        let noise = "";
        for(let i = 0; i < 60; i++){
            noise += chars[Math.floor(Math.random() * chars.length)];
        }

        print(`${addr} :: ${noise}`);

        document.body.style.transform = `
            translate(${(Math.random()-0.5)*3}px, ${(Math.random()-0.5)*3}px)
        `;

        document.body.style.filter = `
            contrast(${1 + Math.random()*1.2})
            saturate(${1 + Math.random()*2})
            hue-rotate(${Math.random()*60}deg)
            blur(${Math.random()*0.5}px)
        `;

        if(step === 3){
            print("\n[WARN] heap overflow detected");
        }

        if(step === 6){
            print("[WARN] pointer corruption");
        }

        if(step === 9){
            print("[ERROR] kernel segmentation fault");
        }

        if(step === 12){
            print("[FATAL] process chain unstable");
        }

        if(step === 15){
            print("\n>>> SYSTEM RECOVERY INITIATED\n");
        }

        if(step > 18){

            clearInterval(interval);

            let recovery = 0;

            const recoverInt = setInterval(() => {

                recovery++;

                document.body.style.transform = "none";
                document.body.style.filter = "contrast(1.1) saturate(1.1)";

                print("restoring memory segments...");

                if(recovery > 6){
                    clearInterval(recoverInt);

                    document.body.style.transform = "none";
                    document.body.style.filter = "none";

                    print("\n========================");
                    print("SYSTEM RESTORED");
                    print("NO DATA LOSS DETECTED");
                    print("========================\n");
                }

            }, 500);
        }

    }, 250);
}

function setColor(mode){

    const colors = {
        green:"#00ff66",
        orange:"#ff7a1a",
        white:"#ffffff",
        blue:"#4da3ff",
        red:"#ff3b3b",
        yellow:"#ffd000",

        1:"#00ff66",
        2:"#ff7a1a",
        3:"#ffffff",
        4:"#4da3ff",
        5:"#ff3b3b",
        6:"#ffd000"
    };

    if(!mode || !colors[mode]){
        print("COLOR ERROR: invalid mode");
        print("available: green, orange, white, blue, red, yellow, 1-6");
        return;
    }

    document.documentElement.style.setProperty("--text", colors[mode]);

    print("COLOR SET: " + mode);
}