const output = document.getElementById("output");
const input = document.getElementById("cmd");

/* print helper */
function print(text){
    output.innerText += text + "\n";
    output.scrollTop = output.scrollHeight;
}

/* boot */
print("CORE TERMINAL INITIALIZED");
print("type 'help' for commands\n");

/* command handler */
input.addEventListener("keydown", (e) => {

    if(e.key !== "Enter") return;

    const value = input.value.trim();
    input.value = "";

    if(!value) return;

    print("> " + value);

    const args = value.split(" ");
    const cmd = args[0];

    switch(cmd){

        case "help":
            print(`
COMMANDS:
- help
- info
- color <mode>
- exit
            `);
            break;

        case "info":
            print(`
NAME: Industrial_Lord
TYPE: Developer
STACK: C / Python
STATUS: PARTIALLY HIDDEN PROFILE

NOTE:
Most identity data is restricted.
Full access available only via archive node.
            `);
            break;

        case "a91050":
            glitchSequence();
            break;

        case "color":
            setColor(args[1]);
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
    print("COLOR SET TO: " + mode);
}

/* glitch + fake crash */
function glitchSequence(){

    print("ACCESSING SECURE NODE...");
    print("WARNING: SYSTEM INSTABILITY DETECTED");

    let i = 0;

    const interval = setInterval(() => {

        print("GLITCH::" + Math.random().toString(36).substring(2,10));

        i++;

        if(i > 8){
            clearInterval(interval);

            setTimeout(() => {
                print("\nCRITICAL ERROR: MEMORY CORRUPTION");
                print("SYSTEM HALTED");

                // fake real crash effect
                document.body.style.filter = "contrast(2) blur(2px)";
                document.body.style.background = "#000";

                setTimeout(() => {
                    throw new Error("CORE TERMINAL FAILURE: a91050");
                }, 1000);

            }, 500);
        }

    }, 120);
}