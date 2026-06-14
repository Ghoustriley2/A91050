const output = document.getElementById("output");
const input = document.getElementById("cmd");
let nanoMode = false;
let nanoBuffer = [];
let nanoFileName = "";

/* auto focus (important for Android) */
window.addEventListener("load", () => {
    input.focus();
});

/* keep focus on tap */
document.body.addEventListener("click", () => input.focus());

function print(text){
    output.innerText += text + "\n";
    output.scrollTop = output.scrollHeight;
}

/* boot */
print("CORE TERMINAL ONLINE");
print("type 'help' for commands\n");

/* command system */
input.addEventListener("keydown", (e) => {

    if(e.key !== "Enter") return;

    const value = input.value.trim();
    input.value = "";

    if(!value) return;

    /* =========================
       NANO MODE (ПРИОРИТЕТ №1)
    ========================= */
    if(nanoMode){

        if(value === ":wq"){
            print(":wq");
            saveNanoFile();
            return;
        }

        if(value === ":q!"){
            nanoMode = false;
            nanoBuffer = [];
            input.placeholder = "";
            print("NANO FORCE EXIT");
            return;
        }

        nanoBuffer.push(value);
        print(value);
        return;
    }

    /* =========================
       NORMAL TERMINAL MODE
    ========================= */

    print("> " + value);

    const args = value.split(" ");
    const cmd = args[0].toLowerCase();

    switch(cmd){

        case "nano":
            startNano(args[1]);
            break;

        case "cls":
            clearTerminal();
            break;

        case "help":
            print(`
COMMANDS:
help
info
a91050
color <mode>
exit
cls
nano <file>
            `);
            break;

        case "info":
            print(`
NAME: Industrial_Lord
ROLE: Developer
STACK: C / Python
PROFILE: PARTIALLY HIDDEN

NOTE:
Some data is restricted.
Full archive access required.
            `);
            break;

        case "color":
            setColor(args[1]);
            break;

        case "a91050":
            glitchSequence();
            break;

        case "exit":
            window.location.href = "index.html";
            break;

        default:
            print("ERROR: unknown command");
    }

});

/* color system */
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

    if(!colors[mode]){
        print("COLOR ERROR: invalid mode");
        return;
    }

    document.documentElement.style.setProperty("--text", colors[mode]);
    print("COLOR SET: " + mode);
}

/* SAFE glitch (no full mobile crash) */
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

        // MEMORY DUMP STYLE OUTPUT
        print(`${addr} :: ${noise}`);

        // progressive visual corruption
        document.body.style.transform = `
            translate(${(Math.random()-0.5)*3}px, ${(Math.random()-0.5)*3}px)
        `;

        document.body.style.filter = `
            contrast(${1 + Math.random()*1.2})
            saturate(${1 + Math.random()*2})
            hue-rotate(${Math.random()*60}deg)
            blur(${Math.random()*0.5}px)
        `;

        // staged system messages (как реальный crash log)
        if(step === 3){
            print("\n[WARN] heap allocation overflow detected");
        }

        if(step === 6){
            print("[WARN] pointer reference corruption");
        }

        if(step === 9){
            print("[ERROR] kernel memory segmentation failure");
        }

        if(step === 12){
            print("[FATAL] system process chain unstable");
        }

        if(step === 15){
            print("\n>>> EMERGENCY RECOVERY INITIATED\n");
        }

        // медленнее, “тяжелее” ощущение сбоя
        if(step > 18){

            clearInterval(interval);

            let recoveryStep = 0;

            const recovery = setInterval(() => {

                recoveryStep++;

                document.body.style.transform = `
                    translate(${(Math.random()-0.5)*1}px, ${(Math.random()-0.5)*1}px)
                `;

                document.body.style.filter = "contrast(1.2) saturate(1.1)";

                print("restoring memory segments...");

                if(recoveryStep > 6){
                    clearInterval(recovery);

                    document.body.style.transform = "none";
                    document.body.style.filter = "none";

                    print("\n========================");
                    print("SYSTEM RESTORED");
                    print("NO DATA LOSS DETECTED");
                    print("========================\n");
                }

            }, 500);
        }

    }, 250); // медленнее = более “реально”
}

function clearTerminal(){

    print("CLEARING MEMORY BUFFER...");
    
    setTimeout(() => {
        output.innerText = "";
        print("SYSTEM RESET COMPLETE");
    }, 200);
}

function startNano(fileName){

    if(!fileName){
        print("NANO ERROR: filename required");
        return;
    }

    nanoMode = true;
    nanoBuffer = [];
    nanoFileName = fileName;

    print("\n--- NANO MODE ACTIVE ---");
    print("file: " + fileName);
    print("type text, ':wq' to save and exit\n");

    input.placeholder = "nano editor...";
}

function saveNanoFile(){

    nanoMode = false;
    input.placeholder = "";

    const content = nanoBuffer.join("\n");

    /* =========================
       ОПРЕДЕЛЕНИЕ РАСШИРЕНИЯ
    ========================= */

    let fileName = nanoFileName;

    let ext = "txt"; // default

    if(fileName.includes(".")){
        ext = fileName.split(".").pop();
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    /* сохраняем с тем же расширением */
    a.download = fileName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    print("\nFILE SAVED: " + fileName);
    print("FORMAT: ." + ext);
    print("DOWNLOADED TO SYSTEM");
}