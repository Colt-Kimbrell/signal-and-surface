/* =========================================================
   POWERPOINT — SIGNAL AND SURFACE
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const workstation =
    document.getElementById("workstation");

const notepadHotspot =
    document.getElementById("notepad-hotspot");

const computerHotspot =
    document.getElementById("computer-hotspot");

const poemOverlay =
    document.getElementById("poem-overlay");

const closePoem =
    document.getElementById("close-poem");

const crtTransition =
    document.getElementById("crt-transition");

const desktop =
    document.getElementById("desktop");

const desktopIcons =
    document.querySelectorAll(".desktop-icon");

const taskbarPrograms =
    document.getElementById("taskbar-programs");

const stsWindow =
    document.getElementById("window-sts107");

const engineeringWindow =
    document.getElementById("window-engineering");

const notesWindow =
    document.getElementById("window-notes");

const excelWindow =
    document.getElementById("window-excel");

const mailWindow =
    document.getElementById("window-mail");

const mailPreview =
    document.getElementById("mail-preview");

const mailStatusText =
    document.getElementById("mail-status-text");

const calculatorWindow =
    document.getElementById("window-calculator");

const calculatorDisplay =
    document.getElementById("calculator-display");

const calculatorMemoryIndicator =
    document.getElementById("calculator-memory-indicator");

const powerpointWarningWindow =
    document.getElementById("window-powerpoint-warning");

const powerpointWarningHeading =
    document.getElementById("powerpoint-warning-heading");

const powerpointWarningText =
    document.getElementById("powerpoint-warning-text");

const powerpointWarningSmall =
    document.getElementById("powerpoint-warning-small");

const powerpointReviewButton =
    document.getElementById("powerpoint-review-button");

const powerpointOpenButton =
    document.getElementById("powerpoint-open-button");

const genericWindow =
    document.getElementById("generic-window");

const genericWindowTitle =
    document.getElementById("generic-window-title");

const genericMessage =
    document.getElementById("generic-message");

const genericIcon =
    document.getElementById("generic-icon");

const notepadTitle =
    document.getElementById("notepad-title");

const notepadContent =
    document.getElementById("notepad-content");


/* =========================================================
   STATE
   ========================================================= */

let poemHasBeenRead = false;

let computerEntered = false;

let highestZIndex = 150;

let currentStsPage = "root";

let currentEngineeringPage = "root";

let powerpointWarningStage = 0;


/* =========================================================
   TEXT DOCUMENTS
   ========================================================= */

const textDocuments = {

    mission: {

        title:
            "Mission Notes.txt - Notepad",

        content:
`STS-107
MISSION NOTES
--------------------------------------------

16 JAN 2003

10:39 EST
Launch.

T+81.7
External Tank foam debris separates.

T+81.9
Debris impacts left wing area.

--------------------------------------------

17 JAN 2003

Launch imagery under review.

Impact event visible in available video.

Damage condition cannot be determined
from available imagery.

--------------------------------------------

23 JAN 2003

Crew notified of debris strike.

Engineering assessment continuing.

--------------------------------------------

OPEN ITEMS

[ ] precise impact location
[ ] damage condition
[ ] imagery resolution
[ ] engineering assessment

--------------------------------------------

A photograph is not the thing photographed.

A model is not the thing modeled.

A briefing is not the thing that happened.`
    },


    rcc: {

        title:
            "RCC Assessment.txt - Notepad",

        content:
`RCC ASSESSMENT
ENGINEERING WORKING NOTE
--------------------------------------------

SUBJECT:
Possible implications of debris impact
to wing thermal protection systems.

STATUS:
UNCERTAIN

Available ascent imagery identifies an
impact in the left wing area.

The imagery does not provide sufficient
resolution to determine the precise
impact location or resulting damage.

Existing analysis is dependent upon:

- estimated debris geometry
- estimated impact conditions
- assumed impact location
- available material / test data
- model applicability

--------------------------------------------

QUESTION:

What if the surface we can see
is not the surface that matters?

--------------------------------------------

NOTE:

This screen is a narrative reconstruction,
not a verbatim NASA engineering document.`
    },


    questions: {

        title:
            "Open Questions.txt - Notepad",

        content:
`OPEN QUESTIONS
STS-107 DEBRIS ASSESSMENT
--------------------------------------------

Can available imagery resolve the
impact site?

Is existing test data applicable to
this event?

What assumptions are being made about
debris size and geometry?

What is the uncertainty in impact
location?

Can damage beneath the visible surface
be determined?

Would higher-resolution imagery change
the assessment?

What information would reduce
uncertainty?

--------------------------------------------

We do not have the image.

We have an image of an event.

We do not have the damage.

We have a model of possible damage.

--------------------------------------------

What happens when uncertainty
has to fit on a slide?`
    }

};


/* =========================================================
   OPENING SEQUENCE
   ========================================================= */

function openPoem() {

    workstation.classList.add("dimmed");

    poemOverlay.classList.add("visible");

    poemOverlay.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closePoemOverlay() {

    workstation.classList.remove("dimmed");

    poemOverlay.classList.remove("visible");

    poemOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    if (!poemHasBeenRead) {

        poemHasBeenRead = true;

        notepadHotspot.classList.add("read");


        setTimeout(function () {

            computerHotspot.disabled = false;

            computerHotspot.classList.add(
                "active"
            );

        }, 1400);
    }
}


function enterComputer() {

    if (
        !poemHasBeenRead ||
        computerEntered
    ) {
        return;
    }


    computerEntered = true;

    computerHotspot.disabled = true;

    computerHotspot.classList.remove(
        "active"
    );

    workstation.classList.add(
        "entering-computer"
    );


    setTimeout(function () {

        crtTransition.classList.add(
            "active"
        );

        crtTransition.setAttribute(
            "aria-hidden",
            "false"
        );

    }, 650);


    setTimeout(function () {

        desktop.classList.add(
            "visible"
        );

        desktop.setAttribute(
            "aria-hidden",
            "false"
        );

    }, 1500);


    setTimeout(function () {

        crtTransition.classList.remove(
            "active"
        );

        crtTransition.style.display =
            "none";

    }, 2350);
}


/* =========================================================
   OPEN PROGRAM
   ========================================================= */

function openProgram(program) {

    if (program === "sts107") {

        showWindow(
            stsWindow,
            "sts107",
            "STS-107"
        );

        return;
    }


    if (program === "engineering") {

        showWindow(
            engineeringWindow,
            "engineering",
            "Engineering"
        );

        return;
    }


    if (program === "calculator") {

        showWindow(
            calculatorWindow,
            "calculator",
            "Calculator"
        );

        updateCalculatorDisplay();

        return;
    }


    if (program === "mail") {

        showWindow(
            mailWindow,
            "mail",
            "Outlook Express - STS-107 Engineering"
        );

        return;
    }


    if (program === "powerpoint") {

        openPowerPointWarning();

        return;
    }
}


function openPlaceholder(
    program,
    title,
    message,
    icon
) {

    genericWindow.dataset.program =
        program;

    genericWindowTitle.textContent =
        title;

    genericMessage.textContent =
        message;

    genericIcon.textContent =
        icon;


    showWindow(
        genericWindow,
        program,
        title
    );
}


/* =========================================================
   STS EXPLORER
   ========================================================= */

const stsPageInfo = {

    root: {
        address: "C:\\STS-107",
        title: "STS-107",
        count: "4 object(s)"
    },

    mission: {
        address: "C:\\STS-107\\Mission",
        title: "Mission",
        count: "Mission Overview"
    },

    imagery: {
        address: "C:\\STS-107\\Imagery",
        title: "Imagery",
        count: "Ascent Imagery Review"
    },

    debris: {
        address: "C:\\STS-107\\Debris",
        title: "Debris",
        count: "Engineering Working File"
    }

};


function navigateSts(pageName) {

    const info =
        stsPageInfo[pageName];


    if (!info) {
        return;
    }


    document
        .querySelectorAll(".sts-page")
        .forEach(function (page) {

            page.classList.remove(
                "active-page"
            );

        });


    document
        .getElementById(
            "sts-page-" + pageName
        )
        .classList.add(
            "active-page"
        );


    currentStsPage =
        pageName;


    document
        .getElementById("sts-address")
        .textContent =
        info.address;


    document
        .getElementById("sts-title")
        .textContent =
        info.title;


    document
        .getElementById(
            "sts-object-count"
        )
        .textContent =
        info.count;


    document
        .getElementById("sts-back")
        .disabled =
        pageName === "root";


    bringToFront(
        stsWindow
    );
}


document
    .querySelectorAll(".sts-folder")
    .forEach(function (folder) {

        folder.addEventListener(
            "dblclick",
            function () {

                navigateSts(
                    folder.dataset.folder
                );

            }
        );

    });


document
    .getElementById("sts-back")
    .addEventListener(
        "click",
        function () {

            navigateSts("root");

        }
    );


/* =========================================================
   ENGINEERING EXPLORER
   ========================================================= */

const engineeringPageInfo = {

    root: {
        address: "C:\\Engineering",
        title: "Engineering",
        count: "5 object(s)"
    },

    team: {
        address:
            "C:\\Engineering\\Debris Team",
        title:
            "Debris Team",
        count:
            "Team Working Status"
    },

    analysis: {
        address:
            "C:\\Engineering\\Analysis",
        title:
            "Analysis",
        count:
            "Impact Analysis"
    }

};


function navigateEngineering(
    pageName
) {

    const info =
        engineeringPageInfo[
            pageName
        ];


    if (!info) {
        return;
    }


    document
        .querySelectorAll(
            ".engineering-page"
        )
        .forEach(function (page) {

            page.classList.remove(
                "active-page"
            );

        });


    document
        .getElementById(
            "engineering-page-" +
            pageName
        )
        .classList.add(
            "active-page"
        );


    currentEngineeringPage =
        pageName;


    document
        .getElementById(
            "engineering-address"
        )
        .textContent =
        info.address;


    document
        .getElementById(
            "engineering-title"
        )
        .textContent =
        info.title;


    document
        .getElementById(
            "engineering-object-count"
        )
        .textContent =
        info.count;


    document
        .getElementById(
            "engineering-back"
        )
        .disabled =
        pageName === "root";


    bringToFront(
        engineeringWindow
    );
}


document
    .querySelectorAll(
        ".engineering-folder"
    )
    .forEach(function (folder) {

        folder.addEventListener(
            "dblclick",
            function () {

                navigateEngineering(
                    folder.dataset.folder
                );

            }
        );

    });


document
    .getElementById(
        "engineering-back"
    )
    .addEventListener(
        "click",
        function () {

            navigateEngineering(
                "root"
            );

        }
    );


/* =========================================================
   TEXT DOCUMENTS
   ========================================================= */

function openTextDocument(
    documentName
) {

    const documentData =
        textDocuments[
            documentName
        ];


    if (!documentData) {
        return;
    }


    notepadTitle.textContent =
        documentData.title;


    notepadContent.textContent =
        documentData.content;


    showWindow(
        notesWindow,
        "notes",
        documentData.title
    );


    /*
       Update existing taskbar text
       if Notepad was already open.
    */

    const taskbarButton =
        document.querySelector(
            '.taskbar-program[data-program="notes"]'
        );


    if (taskbarButton) {

        taskbarButton.textContent =
            documentData.title;

    }
}


document
    .getElementById(
        "mission-notes-file"
    )
    .addEventListener(
        "dblclick",
        function () {

            openTextDocument(
                "mission"
            );

        }
    );


document
    .getElementById(
        "rcc-file"
    )
    .addEventListener(
        "dblclick",
        function () {

            openTextDocument(
                "rcc"
            );

        }
    );


document
    .getElementById(
        "questions-file"
    )
    .addEventListener(
        "dblclick",
        function () {

            openTextDocument(
                "questions"
            );

        }
    );


/* =========================================================
   EXCEL
   ========================================================= */

document
    .getElementById(
        "impact-estimates-file"
    )
    .addEventListener(
        "dblclick",
        function () {

            showWindow(
                excelWindow,
                "excel",
                "Impact Estimates.xls"
            );

        }
    );




/* =========================================================
   MAIL DATA + INTERACTION
   ========================================================= */

const mailMessages = {
    ascent: {
        subject: "STS-107 Ascent Imagery Review",
        from: "Imagery Analysis",
        date: "17 JAN 2003",
        body: `Launch imagery review identifies a debris event during ascent.

The available video shows debris crossing the field of view and contacting the left wing area.

The resulting condition of the wing cannot be resolved from the available imagery.`
    },

    "imagery-request": {
        subject: "Request for Additional Imagery",
        from: "Debris Assessment Team",
        date: "21 JAN 2003",
        body: `Requesting higher-resolution on-orbit imagery of the left wing area.

Current ascent imagery identifies the event but does not resolve the condition of the affected surface.

Additional imagery would improve confidence in the engineering assessment.`
    },

    "imagery-reply": {
        subject: "Re: Imagery Request",
        from: "Mission Operations",
        date: "22 JAN 2003",
        body: `Imagery request status remains unresolved.

Continue assessment using currently available imagery, test information, and engineering models.`
    },

    status: {
        subject: "Debris Assessment Status",
        from: "Debris Assessment Team",
        date: "23 JAN 2003",
        body: `Analysis remains dependent on estimated debris geometry, impact conditions, assumed impact location, and model applicability.

Direct inspection of the affected surface is not available.

Assessment work continues.`
    },

    crew: {
        subject: "Crew Notification — Debris Event",
        from: "Mission Operations",
        date: "23 JAN 2003",
        body: `Crew notification prepared regarding the ascent debris event.

Engineering review is continuing.`
    },

    briefing: {
        subject: "Debris Assessment Briefing",
        from: "Engineering",
        date: "24 JAN 2003",
        body: `Debris assessment results prepared for briefing.

Available evidence has moved from image,
to estimate,
to model,
to presentation.`
    },

    "draft-imagery": {
        subject: "Re: Imagery",
        from: "DRAFT — NOT SENT",
        date: "",
        body: `Can we say with confidence that additional
imagery would not change the assessment?

If we cannot see the affected surface, how
certain are we that the model is answering
the right question?

|`
    }
};

function showMailFolder(folderName) {
    document.querySelectorAll(".mail-folder").forEach(function (button) {
        button.classList.toggle(
            "active-mail-folder",
            button.dataset.mailFolder === folderName
        );
    });

    ["inbox", "drafts", "sent", "deleted"].forEach(function (name) {
        const view = document.getElementById("mail-view-" + name);
        if (view) {
            view.style.display = name === folderName ? "block" : "none";
        }
    });

    const counts = {
        inbox: "6 message(s)",
        drafts: "1 draft(s)",
        sent: "0 message(s)",
        deleted: "0 message(s)"
    };

    if (mailStatusText) {
        mailStatusText.textContent = counts[folderName] || "";
    }

    if (mailPreview) {
        mailPreview.innerHTML =
            '<div class="mail-preview-empty">Select a message to read it.</div>';
    }
}

function openMailMessage(messageName, button) {
    const message = mailMessages[messageName];

    if (!message || !mailPreview) {
        return;
    }

    document.querySelectorAll(".mail-message").forEach(function (item) {
        item.classList.remove("selected-mail");
    });

    if (button) {
        button.classList.add("selected-mail");
        button.classList.remove("unread-mail");
    }

    mailPreview.innerHTML =
        '<h2>' + message.subject + '</h2>' +
        '<div class="mail-header-line"><strong>From:</strong> ' +
        message.from + '</div>' +
        '<div class="mail-header-line"><strong>Date:</strong> ' +
        message.date + '</div>' +
        '<div class="mail-body"></div>' +
        '<div class="mail-reconstruction-note">' +
        'Narrative reconstruction for the interactive work; not a verbatim archival email.' +
        '</div>';

    mailPreview.querySelector(".mail-body").textContent = message.body;
}

document.querySelectorAll(".mail-folder").forEach(function (folder) {
    folder.addEventListener("click", function () {
        showMailFolder(folder.dataset.mailFolder);
    });
});

document.querySelectorAll(".mail-message").forEach(function (messageButton) {
    messageButton.addEventListener("click", function () {
        openMailMessage(
            messageButton.dataset.message,
            messageButton
        );
    });
});



/* =========================================================
   CALCULATOR
   ========================================================= */

let calculatorCurrent = "0";
let calculatorStored = null;
let calculatorOperator = null;
let calculatorWaitingForOperand = false;
let calculatorMemory = 0;

function formatCalculatorNumber(value) {
    if (!Number.isFinite(value)) {
        return "Error";
    }

    const rounded =
        Math.round((value + Number.EPSILON) * 1000000000000) /
        1000000000000;

    return String(rounded).slice(0, 16);
}

function updateCalculatorDisplay() {
    if (!calculatorDisplay) {
        return;
    }

    calculatorDisplay.value = calculatorCurrent;

    if (calculatorMemoryIndicator) {
        calculatorMemoryIndicator.textContent =
            calculatorMemory !== 0 ? "M" : "";
    }
}

function calculatorInputValue(value) {
    if (calculatorCurrent === "Error") {
        calculatorCurrent = "0";
    }

    if (value === ".") {
        if (calculatorWaitingForOperand) {
            calculatorCurrent = "0.";
            calculatorWaitingForOperand = false;
        } else if (!calculatorCurrent.includes(".")) {
            calculatorCurrent += ".";
        }
    } else {
        if (calculatorWaitingForOperand || calculatorCurrent === "0") {
            calculatorCurrent = value;
            calculatorWaitingForOperand = false;
        } else if (calculatorCurrent.length < 16) {
            calculatorCurrent += value;
        }
    }

    updateCalculatorDisplay();
}

function calculatorPerform(left, right, operator) {
    if (operator === "+") return left + right;
    if (operator === "-") return left - right;
    if (operator === "*") return left * right;
    if (operator === "/") return right === 0 ? NaN : left / right;
    return right;
}

function calculatorChooseOperator(nextOperator) {
    const inputValue = Number(calculatorCurrent);

    if (!Number.isFinite(inputValue)) {
        return;
    }

    if (
        calculatorOperator &&
        calculatorStored !== null &&
        !calculatorWaitingForOperand
    ) {
        const result = calculatorPerform(
            calculatorStored,
            inputValue,
            calculatorOperator
        );

        calculatorCurrent = formatCalculatorNumber(result);

        if (calculatorCurrent === "Error") {
            calculatorStored = null;
            calculatorOperator = null;
            calculatorWaitingForOperand = true;
            updateCalculatorDisplay();
            return;
        }

        calculatorStored = Number(calculatorCurrent);
    } else {
        calculatorStored = inputValue;
    }

    calculatorOperator = nextOperator;
    calculatorWaitingForOperand = true;
    updateCalculatorDisplay();
}

function calculatorEquals() {
    if (
        calculatorOperator === null ||
        calculatorStored === null
    ) {
        return;
    }

    const right = Number(calculatorCurrent);
    const result = calculatorPerform(
        calculatorStored,
        right,
        calculatorOperator
    );

    calculatorCurrent = formatCalculatorNumber(result);
    calculatorStored = null;
    calculatorOperator = null;
    calculatorWaitingForOperand = true;
    updateCalculatorDisplay();
}

function calculatorAction(action) {
    const currentNumber = Number(calculatorCurrent);

    if (action === "clear") {
        calculatorCurrent = "0";
        calculatorStored = null;
        calculatorOperator = null;
        calculatorWaitingForOperand = false;
    }

    else if (action === "clear-entry") {
        calculatorCurrent = "0";
        calculatorWaitingForOperand = false;
    }

    else if (action === "backspace") {
        if (
            !calculatorWaitingForOperand &&
            calculatorCurrent !== "Error"
        ) {
            calculatorCurrent =
                calculatorCurrent.length > 1
                    ? calculatorCurrent.slice(0, -1)
                    : "0";
        }
    }

    else if (action === "sign") {
        if (Number.isFinite(currentNumber) && currentNumber !== 0) {
            calculatorCurrent =
                formatCalculatorNumber(currentNumber * -1);
        }
    }

    else if (action === "sqrt") {
        calculatorCurrent =
            currentNumber < 0 || !Number.isFinite(currentNumber)
                ? "Error"
                : formatCalculatorNumber(Math.sqrt(currentNumber));

        calculatorWaitingForOperand = true;
    }

    else if (action === "equals") {
        calculatorEquals();
        return;
    }

    else if (action === "memory-clear") {
        calculatorMemory = 0;
    }

    else if (action === "memory-recall") {
        calculatorCurrent =
            formatCalculatorNumber(calculatorMemory);
        calculatorWaitingForOperand = true;
    }

    else if (action === "memory-store") {
        if (Number.isFinite(currentNumber)) {
            calculatorMemory = currentNumber;
        }
    }

    else if (action === "memory-add") {
        if (Number.isFinite(currentNumber)) {
            calculatorMemory += currentNumber;
        }
    }

    updateCalculatorDisplay();
}

document.querySelectorAll(".calc-key").forEach(function (key) {
    key.addEventListener("click", function () {
        if (key.dataset.calcValue !== undefined) {
            calculatorInputValue(key.dataset.calcValue);
            return;
        }

        if (key.dataset.calcOperator) {
            calculatorChooseOperator(key.dataset.calcOperator);
            return;
        }

        if (key.dataset.calcAction) {
            calculatorAction(key.dataset.calcAction);
        }
    });
});

document.addEventListener("keydown", function (event) {
    if (
        !calculatorWindow ||
        !calculatorWindow.classList.contains("open") ||
        calculatorWindow.classList.contains("minimized")
    ) {
        return;
    }

    if (/^[0-9]$/.test(event.key)) {
        calculatorInputValue(event.key);
        return;
    }

    if (event.key === ".") {
        calculatorInputValue(".");
        return;
    }

    if (["+", "-", "*", "/"].includes(event.key)) {
        calculatorChooseOperator(event.key);
        return;
    }

    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculatorEquals();
        return;
    }

    if (event.key === "Escape") {
        calculatorAction("clear");
        return;
    }

    if (event.key === "Backspace") {
        calculatorAction("backspace");
    }
});

updateCalculatorDisplay();



/* =========================================================
   POWERPOINT WARNING SEQUENCE
   ========================================================= */

function setPowerPointWarningStage(stage) {
    powerpointWarningStage = stage;

    if (stage === 0) {
        powerpointWarningHeading.textContent =
            "You are about to open Debris Assessment.ppt.";

        powerpointWarningText.textContent =
            "Supporting engineering files are available on this workstation.";

        powerpointWarningSmall.textContent =
            "Review the underlying material before opening the presentation?";

        powerpointReviewButton.textContent =
            "Review Engineering";

        powerpointOpenButton.textContent =
            "Open Anyway";
    }

    else if (stage === 1) {
        powerpointWarningHeading.textContent =
            "Are you sure you want to do this?";

        powerpointWarningText.textContent =
            "The presentation is a summary. The underlying evidence contains uncertainty that may not fit cleanly on a slide.";

        powerpointWarningSmall.textContent =
            "Engineering notes, imagery, and analysis remain available.";

        powerpointReviewButton.textContent =
            "Review Engineering";

        powerpointOpenButton.textContent =
            "Open Presentation";
    }

    else if (stage === 2) {
        powerpointWarningHeading.textContent =
            "Seriously?";

        powerpointWarningText.textContent =
            "The calculator is right there.";

        powerpointWarningSmall.textContent =
            "You could still look at the numbers before looking at the bullets.";

        powerpointReviewButton.textContent =
            "Calculator";

        powerpointOpenButton.textContent =
            "Open PowerPoint";
    }

    else {
        powerpointWarningHeading.textContent =
            "...somewhere, Dr. Sherwood is disappointed.";

        powerpointWarningText.textContent =
            "Debris Assessment.ppt is ready to open.";

        powerpointWarningSmall.textContent =
            "The presentation itself is the next stage of the piece.";

        powerpointReviewButton.textContent =
            "Calculator";

        powerpointOpenButton.textContent =
            "Continue";
    }
}

function openPowerPointWarning() {
    setPowerPointWarningStage(0);

    showWindow(
        powerpointWarningWindow,
        "powerpoint",
        "Microsoft PowerPoint"
    );
}

function reviewFromPowerPointWarning() {
    if (powerpointWarningStage >= 2) {
        showWindow(
            calculatorWindow,
            "calculator",
            "Calculator"
        );

        updateCalculatorDisplay();
    }

    else {
        showWindow(
            engineeringWindow,
            "engineering",
            "Engineering"
        );
    }

    bringToFront(
        powerpointWarningWindow
    );
}

function advancePowerPointWarning() {
    if (powerpointWarningStage < 3) {
        setPowerPointWarningStage(
            powerpointWarningStage + 1
        );

        bringToFront(
            powerpointWarningWindow
        );

        return;
    }

    /*
       Presentation intentionally comes next.
       For this checkpoint, reaching this point proves
       the warning/escalation sequence works.
    */

    powerpointWarningHeading.textContent =
        "Debris Assessment.ppt";

    powerpointWarningText.textContent =
        "EVENT → IMAGE → ESTIMATE → MODEL → RESULT → BULLET POINT";

    powerpointWarningSmall.textContent =
        "The information did not disappear. It changed surfaces. What happens to the signal when the surface through which we communicate it changes?";

    powerpointReviewButton.style.display = "none";
    powerpointOpenButton.textContent = "End Presentation";
    powerpointOpenButton.disabled = true;
}

if (powerpointReviewButton) {
    powerpointReviewButton.addEventListener(
        "click",
        reviewFromPowerPointWarning
    );
}

if (powerpointOpenButton) {
    powerpointOpenButton.addEventListener(
        "click",
        advancePowerPointWarning
    );
}



/* =========================================================
   SOUND — SYNTHESIZED IN BROWSER (NO AUDIO FILES REQUIRED)
   ========================================================= */

let audioContext = null;
let ambientOscillator = null;
let ambientGain = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
    return audioContext;
}

function playTone(frequency, duration, volume, type) {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type || "sine";
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume || 0.025, ctx.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
}

function playClickSound() {
    playTone(720, 0.035, 0.018, "square");
}

function playOpenSound() {
    playTone(440, 0.07, 0.022, "sine");
    setTimeout(function () {
        playTone(660, 0.08, 0.018, "sine");
    }, 55);
}

function playWarningSound() {
    playTone(330, 0.11, 0.028, "square");
    setTimeout(function () {
        playTone(260, 0.14, 0.022, "square");
    }, 105);
}

function startComputerHum() {
    if (ambientOscillator) return;

    const ctx = getAudioContext();
    ambientOscillator = ctx.createOscillator();
    ambientGain = ctx.createGain();

    ambientOscillator.type = "sine";
    ambientOscillator.frequency.value = 58;
    ambientGain.gain.value = 0.012;

    ambientOscillator.connect(ambientGain);
    ambientGain.connect(ctx.destination);
    ambientOscillator.start();
}

/* First interaction wakes browser audio. */
document.addEventListener("pointerdown", function wakeAudio() {
    getAudioContext();
}, { once: true });

/* Quiet Windows-style feedback on controls/icons. */
document.addEventListener("click", function (event) {
    if (
        event.target.closest("button") ||
        event.target.closest(".desktop-icon")
    ) {
        playClickSound();
    }
});

/* Poem/notepad gets a softer acknowledgement. */
if (notepadHotspot) {
    notepadHotspot.addEventListener("click", function () {
        playTone(300, 0.12, 0.018, "sine");
    });
}

/* Entering the computer wakes the machine hum. */
if (computerHotspot) {
    computerHotspot.addEventListener("click", function () {
        playTone(95, 0.45, 0.035, "sawtooth");
        /* Real CRT hum is started by the audio transition below. */
    });
}

/* Opening programs gets the old desktop two-note cue. */
desktopIcons.forEach(function (icon) {
    icon.addEventListener("dblclick", function () {
        playOpenSound();
    });
});

/* PowerPoint escalation becomes increasingly intrusive. */
if (powerpointOpenButton) {
    powerpointOpenButton.addEventListener("click", function () {
        if (powerpointWarningStage >= 1) {
            playWarningSound();
        }
    });
}



/* =========================================================
   REAL AUDIO LAYERS — DESK → CRT
   ========================================================= */

const deskRadioAudio = new Audio("audio/ambient/military-chatter.mp3");
deskRadioAudio.loop = true;
deskRadioAudio.volume = 0;

const crtHumAudio = new Audio("audio/ambient/crt-hum.mp3");
crtHumAudio.loop = true;
crtHumAudio.volume = 0;

let realAudioStarted = false;
let crtAudioTransitionStarted = false;

function fadeAudio(audio, from, to, duration) {
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    audio.volume = Math.max(0, Math.min(1, from));

    const timer = setInterval(function () {
        step += 1;
        const progress = step / steps;
        const nextVolume = from + ((to - from) * progress);

        audio.volume = Math.max(0, Math.min(1, nextVolume));

        if (step >= steps) {
            clearInterval(timer);
            audio.volume = Math.max(0, Math.min(1, to));

            if (to === 0) {
                audio.pause();
            }
        }
    }, stepTime);
}

function startDeskRadio() {
    if (realAudioStarted || crtAudioTransitionStarted) return;

    realAudioStarted = true;
    deskRadioAudio.currentTime = 0;

    deskRadioAudio.play().then(function () {
        fadeAudio(deskRadioAudio, 0, 0.035, 2600);
    }).catch(function () {
        /* Browser blocked autoplay. The next user interaction will retry. */
        realAudioStarted = false;
    });
}

function transitionDeskAudioToCrt() {
    if (crtAudioTransitionStarted) return;

    crtAudioTransitionStarted = true;

    if (!deskRadioAudio.paused) {
        fadeAudio(
            deskRadioAudio,
            deskRadioAudio.volume,
            0,
            1200
        );
    }

    crtHumAudio.currentTime = 0;

    crtHumAudio.play().then(function () {
        fadeAudio(crtHumAudio, 0, 0.025, 1700);
    }).catch(function () {
        /* No fatal error if audio cannot start. */
    });
}

/*
   Browsers require a user gesture before audio can play.
   The first click anywhere on the opening scene starts the
   distant room/radio layer and fades it in quietly.
*/
document.addEventListener("pointerdown", function startRealAudioOnce() {
    startDeskRadio();
}, { once: true });

if (computerHotspot) {
    computerHotspot.addEventListener("click", function () {
        transitionDeskAudioToCrt();
    });
}

/*
   When the PowerPoint sequence reaches its final compression,
   remove the machine signal completely.
*/
if (powerpointOpenButton) {
    powerpointOpenButton.addEventListener("click", function () {
        if (powerpointWarningStage >= 3 && !crtHumAudio.paused) {
            fadeAudio(
                crtHumAudio,
                crtHumAudio.volume,
                0,
                450
            );
        }
    });
}

/* =========================================================
   WINDOW MANAGEMENT
   ========================================================= */

function showWindow(
    windowElement,
    program,
    title
) {

    if (!windowElement) {
        return;
    }


    windowElement.dataset.program =
        program;


    windowElement.classList.add(
        "open"
    );


    windowElement.classList.remove(
        "minimized"
    );


    windowElement.setAttribute(
        "aria-hidden",
        "false"
    );


    bringToFront(
        windowElement
    );


    createTaskbarButton(
        program,
        title,
        windowElement
    );
}


function bringToFront(
    windowElement
) {

    highestZIndex += 1;


    windowElement.style.zIndex =
        highestZIndex;


    document
        .querySelectorAll(
            ".taskbar-program"
        )
        .forEach(function (button) {

            button.classList.remove(
                "active"
            );

        });


    const program =
        windowElement.dataset.program;


    if (!program) {
        return;
    }


    const button =
        document.querySelector(
            '.taskbar-program[data-program="' +
            program +
            '"]'
        );


    if (button) {

        button.classList.add(
            "active"
        );

    }
}


function createTaskbarButton(
    program,
    title,
    windowElement
) {

    let button =
        document.querySelector(
            '.taskbar-program[data-program="' +
            program +
            '"]'
        );


    if (button) {

        button.classList.add(
            "active"
        );

        return;
    }


    button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.className =
        "taskbar-program active";


    button.dataset.program =
        program;


    button.textContent =
        title;


    button.addEventListener(
        "click",
        function () {

            if (
                windowElement.classList.contains(
                    "minimized"
                )
            ) {

                windowElement.classList.remove(
                    "minimized"
                );

                bringToFront(
                    windowElement
                );

            }

            else {

                minimizeWindow(
                    windowElement
                );

            }

        }
    );


    taskbarPrograms.appendChild(
        button
    );
}


function minimizeWindow(
    windowElement
) {

    windowElement.classList.add(
        "minimized"
    );


    const button =
        document.querySelector(
            '.taskbar-program[data-program="' +
            windowElement.dataset.program +
            '"]'
        );


    if (button) {

        button.classList.remove(
            "active"
        );

    }
}


function closeApplicationWindow(
    windowElement
) {

    const program =
        windowElement.dataset.program;


    windowElement.classList.remove(
        "open",
        "minimized",
        "maximized"
    );


    windowElement.setAttribute(
        "aria-hidden",
        "true"
    );


    const button =
        document.querySelector(
            '.taskbar-program[data-program="' +
            program +
            '"]'
        );


    if (button) {
        button.remove();
    }
}


function toggleMaximize(
    windowElement
) {

    windowElement.classList.toggle(
        "maximized"
    );


    bringToFront(
        windowElement
    );
}


/* =========================================================
   DESKTOP
   ========================================================= */

desktopIcons.forEach(
    function (icon) {

        icon.addEventListener(
            "dblclick",
            function () {

                openProgram(
                    icon.dataset.program
                );

            }
        );

    }
);


document
    .querySelectorAll(
        "[data-open-program]"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    openProgram(
                        button.dataset.openProgram
                    );

                }
            );

        }
    );


/* =========================================================
   WINDOW BUTTONS
   ========================================================= */

document
    .querySelectorAll(
        ".minimize-window"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                minimizeWindow(
                    button.closest(
                        ".app-window"
                    )
                );

            }
        );

    });


document
    .querySelectorAll(
        ".close-window"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                closeApplicationWindow(
                    button.closest(
                        ".app-window"
                    )
                );

            }
        );

    });


document
    .querySelectorAll(
        ".maximize-window"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleMaximize(
                    button.closest(
                        ".app-window"
                    )
                );

            }
        );

    });


document
    .querySelectorAll(
        ".app-window"
    )
    .forEach(function (windowElement) {

        windowElement.addEventListener(
            "mousedown",
            function () {

                bringToFront(
                    windowElement
                );

            }
        );

    });


/* =========================================================
   DRAGGING
   ========================================================= */

document
    .querySelectorAll(
        ".app-window"
    )
    .forEach(function (windowElement) {

        makeWindowDraggable(
            windowElement
        );

    });


function makeWindowDraggable(
    windowElement
) {

    const titlebar =
        windowElement.querySelector(
            ".window-titlebar"
        );


    if (!titlebar) {
        return;
    }


    let dragging =
        false;

    let offsetX =
        0;

    let offsetY =
        0;


    titlebar.addEventListener(
        "mousedown",
        function (event) {

            if (
                event.target.closest(
                    ".window-control"
                )
            ) {
                return;
            }


            if (
                windowElement.classList.contains(
                    "maximized"
                )
            ) {
                return;
            }


            dragging =
                true;


            bringToFront(
                windowElement
            );


            const rectangle =
                windowElement
                    .getBoundingClientRect();


            offsetX =
                event.clientX -
                rectangle.left;


            offsetY =
                event.clientY -
                rectangle.top;


            document.body.style.userSelect =
                "none";

        }
    );


    document.addEventListener(
        "mousemove",
        function (event) {

            if (!dragging) {
                return;
            }


            const desktopRectangle =
                desktop
                    .getBoundingClientRect();


            const windowRectangle =
                windowElement
                    .getBoundingClientRect();


            const minimumVisible =
                100;


            let newLeft =
                event.clientX -
                desktopRectangle.left -
                offsetX;


            let newTop =
                event.clientY -
                desktopRectangle.top -
                offsetY;


            newLeft =
                Math.max(
                    -(
                        windowRectangle.width -
                        minimumVisible
                    ),

                    Math.min(
                        newLeft,

                        desktopRectangle.width -
                        minimumVisible
                    )
                );


            newTop =
                Math.max(
                    0,

                    Math.min(
                        newTop,

                        desktopRectangle.height -
                        60
                    )
                );


            windowElement.style.left =
                newLeft + "px";


            windowElement.style.top =
                newTop + "px";

        }
    );


    document.addEventListener(
        "mouseup",
        function () {

            if (!dragging) {
                return;
            }


            dragging =
                false;


            document.body.style.userSelect =
                "";

        }
    );
}


/* =========================================================
   EVENTS
   ========================================================= */

notepadHotspot.addEventListener(
    "click",
    openPoem
);


closePoem.addEventListener(
    "click",
    closePoemOverlay
);


computerHotspot.addEventListener(
    "click",
    enterComputer
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            poemOverlay.classList.contains(
                "visible"
            )
        ) {

            closePoemOverlay();

        }

    }
);